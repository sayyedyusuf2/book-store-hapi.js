const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");
const mongoose = require("mongoose");
const indexRoute = require("./routes/indexRoute");

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "localhost",
  });
  await server.register([
    Inert,
    Vision,
    {
      plugin: require("hapi-server-session"),
      options: {
        cookie: {
          isSecure: false, // never set to false in production
        },
      },
    },
  ]);

  server.views({
    engines: {
      pug: require("pug"),
    },
    relativeTo: __dirname,
    path: "views",
  });

  server.route({
    method: "GET",
    path: "/css/{file*}",
    handler: {
      directory: {
        path: "public/css",
      },
    },
  });

  server.route({
    method: "GET",
    path: "/js/{file*}",
    handler: {
      directory: {
        path: "public/js",
      },
    },
  });

  server.route({
    method: "GET",
    path: "/js/vendor/{file*}",
    handler: {
      directory: {
        path: "public/js/vendor",
      },
    },
  });

  server.route(indexRoute);

  await server.start();

  console.log(`Server is running  at ${server.info.uri} .`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
