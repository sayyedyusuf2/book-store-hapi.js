const bookController = require("./../controller/bookController");

module.exports = [
  {
    method: "GET",
    path: "/books/details/{id}",
    handler: bookController.showDetailsPage,
  },
];
