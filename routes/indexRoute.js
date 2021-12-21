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
  },
  {
    method: "GET",
    path: "/about",
    handler: (request, h) => {
      return h.view("pages/about");
    },
  },
].concat(bookRoute, manageRoute, cartRoute);
