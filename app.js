const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");
const mongoose = require("mongoose");
const indexRoute = require("./routes/indexRoute");
const dotenv = require("dotenv");
const path = require("path");
const jwt = require("jsonwebtoken");
// const joi = require("joi");
const hapiSwagger = require("hapi-swagger");
const pack = require("./package.json");
dotenv.config();
const port = process.env.PORT || 3000;
const User = require("./model/userModel");
const { request } = require("https");

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

const context = {};

function changeContext(user) {
  context.user = user;
}

async function init() {
  const server = Hapi.server({
    port: port,
    routes: {
      files: {
        relativeTo: path.join(__dirname, "public"),
      },
    },
  });
  await server.register([
    Inert,
    Vision,
    require("hapi-auth-jwt2"),
    {
      plugin: require("hapi-server-session"),
      options: {
        cookie: {
          isSecure: false, // never set to false in production
        },
      },
    },
    {
      plugin: hapiSwagger,
      options: {
        info: {
          title: "Test API Documentation",
          version: pack.version,
        },
      },
    },
  ]);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.JWT_SECRET,
    validate: async function (decoded, request, h) {
      try {
        const user = await User.findById(decoded);
        if (!user) {
          return { isValid: false };
        }
        changeContext(user);
        return { isValid: true, credentials: { user } };
      } catch (err) {
        console.log(err);
        return;
      }
    },
  });

  server.auth.default("jwt");

  // server.state("jwt", {
  //   ttl: null,
  //   isSecure: false,
  //   isHttpOnly: true,
  //   encoding: "base64json",
  //   clearInvalid: true,
  //   strictHeader: true,
  // });

  server.views({
    engines: {
      pug: require("pug"),
    },
    relativeTo: __dirname,
    path: "views",
    context,
  });

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
      },
    },
    options: {
      auth: false,
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

exports.changeContext = changeContext;
