const Book = require("./../model/bookModel");

exports.showDetailsPage = async (request, h) => {
  const book = await Book.findOne({ _id: request.params.id });
  return h.view("books/details", { book: book });
};
