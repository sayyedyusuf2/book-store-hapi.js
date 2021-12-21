"use strict";
const Book = require("./../model/bookModel");
const Category = require("./../model/categoryModel");

exports.getMangePage = (request, h) => {
  return h.view("manage/index.pug");
};

exports.getMangeBooks = async (requset, h) => {
  const books = await Book.find({});
  return h.view("manage/books/index.pug", { books });
};

exports.getBooksAddPage = async (requset, h) => {
  const categories = await Category.find({});
  return h.view("manage/books/add", { categories });
};

exports.handleBooksAdd = async (request, h) => {
  const { title, category, author, publisher, price, description, coverImage } =
    request.payload;
  if (title == "" || price == "") {
    // h.location("/manage/books/add");
    return h.redirect("/manage/books/add");
  }
  if (isNaN(price)) {
    // h.location("/manage/books/add");
    return h.redirect("/manage/books/add");
  }
  try {
    await Book.create({
      title,
      category,
      author,
      publisher,
      price,
      description,
      coverImage,
    });
    // h.location("/manage/books");
  } catch (err) {
    console.log("Save Error", err);
  }
  return h.redirect("/manage/books");
};

exports.getBooksEditPage = async (request, h) => {
  const categories = await Category.find({});
  const book = await Book.findOne({ _id: request.params.id });
  return h.view("manage/books/edit", { book, categories });
};

exports.handleBooksEditPage = (request, h) => {
  const { title, category, author, publisher, price, description, coverImage } =
    request.payload;
  Book.updateOne(
    { _id: request.params.id },
    {
      title,
      category,
      author,
      publisher,
      price,
      description,
      coverImage,
    },
    function (err) {
      if (err) {
        console.log("update error", err);
      }
      // h.location("/manage/books");
    }
  );
  return h.redirect("/manage/books");
};

exports.deleteBook = (request, h) => {
  Book.deleteOne({ _id: request.params.id }, function (err) {
    if (err) {
      console.log(err);
    }
    // h.location("/manage/books");
  });
  return h.redirect("/manage/books");
};

exports.getManageCategories = async (request, h) => {
  const categories = await Category.find({});
  return h.view("manage/categories/index", { categories });
};

exports.getCategoryAddPage = (request, h) => {
  return h.view("manage/categories/add");
};

exports.handleCategoryAddPage = async (request, h) => {
  const name = request.payload.name;
  if (name === "") {
    // h.location("/manage/categories/add");
    return h.redirect("/manage/categories/add");
  }
  try {
    await Category.create({ name: name });
    // request.flash("success", "Category Added");
    // h.location("/manage/categories/add");
  } catch (err) {
    console.log(err);
  }
  return h.redirect("/manage/categories");
};

exports.getCategoryEditPage = async (request, h) => {
  const category = await Category.findOne({ _id: request.params.id });
  return h.view("manage/categories/edit", { category });
};

exports.handleCategoryEditPage = (request, h) => {
  const name = request.payload.name;
  Category.updateOne(
    { _id: request.params.id },
    { name: name },
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
  return h.redirect("/manage/categories");
};

exports.handleCategoryDelete = (request, h) => {
  Category.deleteOne({ _id: request.params.id }, function (err) {
    if (err) {
      console.log(err);
    }
  });
  return h.redirect("/manage/categories");
};
