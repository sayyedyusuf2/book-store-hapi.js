const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  category: String,
  publisher: String,
  coverImage: String,
  price: String,
});

bookSchema.methods.truncText = function (length) {
  return this.description.substring(0, length);
};

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
