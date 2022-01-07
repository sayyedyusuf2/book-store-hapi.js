const bookRoute = require("./bookRoute");
const manageRoute = require("./manageRoute");
const cartRoute = require("./cartRoute");
const userRoute = require("./userRoute");
const Book = require("./../model/bookModel");

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: async (request, h) => {
      const books = await Book.find({});
      h.response(books);
      return h.view("index", { books });
    },
    options: {
      tags: ["api"],
      auth: {
        mode: "try",
      },
    },
  },
  {
    method: "GET",
    path: "/about",
    handler: (request, h) => {
      return h.view("pages/about");
    },
    options: {
      tags: ["api"],
      auth: false,
    },
  },
].concat(bookRoute, manageRoute, cartRoute, userRoute);
