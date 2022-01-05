const bookRoute = require("./bookRoute");
const manageRoute = require("./manageRoute");
const cartRoute = require("./cartRoute");
const Book = require("./../model/bookModel");

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: async (request, h) => {
      const books = await Book.find({});
      return h.view("index", { books });
    },
    options: {
      tags: ["api"],
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
    },
  },
].concat(bookRoute, manageRoute, cartRoute);
