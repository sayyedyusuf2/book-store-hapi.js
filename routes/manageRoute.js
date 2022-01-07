const Joi = require("joi");
const manageControllers = require("./../controller/manageController");

module.exports = [
  {
    method: "GET",
    path: "/manage",
    handler: manageControllers.getMangePage,
    options: {
      tags: ["api"],
    },
  },
  {
    method: "GET",
    path: "/manage/books",
    handler: manageControllers.getMangeBooks,
    options: {
      tags: ["api"],
    },
  },
  {
    method: "GET",
    path: "/manage/books/add",
    handler: manageControllers.getBooksAddPage,
    options: {
      tags: ["api"],
    },
  },
  {
    method: "POST",
    path: "/manage/books",
    handler: manageControllers.handleBooksAdd,
    options: {
      tags: ["api"],

      validate: {
        query: Joi.object({
          title: Joi.string(),
          author: Joi.string(),
          publisher: Joi.string(),
          price: Joi.number(),
          category: Joi.string(),
          description: Joi.string(),
          coverImage: Joi.string(),
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/manage/books/edit/{id}",
    handler: manageControllers.getBooksEditPage,
    options: {
      tags: ["api"],
    },
  },
  {
    method: "POST",
    path: "/manage/books/edit/{id}",
    handler: manageControllers.handleBooksEditPage,
    options: {
      tags: ["api"],
    },
  },
  {
    method: "POST",
    path: "/manage/books/delete/{id}",
    handler: manageControllers.deleteBook,
    options: {
      tags: ["api"],
    },
  },
  {
    method: "GET",
    path: "/manage/categories",
    handler: manageControllers.getManageCategories,
    options: {
      tags: ["api"],
    },
  },
  {
    method: "GET",
    path: "/manage/categories/add",
    handler: manageControllers.getCategoryAddPage,
    options: {
      tags: ["api"],
    },
  },
  {
    method: "POST",
    path: "/manage/categories",
    handler: manageControllers.handleCategoryAddPage,
    options: {
      tags: ["api"],
    },
  },
  {
    method: "GET",
    path: "/manage/categories/edit/{id}",
    handler: manageControllers.getCategoryEditPage,
    options: {
      tags: ["api"],
    },
  },
  {
    method: "POST",
    path: "/manage/categories/edit/{id}",
    handler: manageControllers.handleCategoryEditPage,
    options: {
      tags: ["api"],
    },
  },
  {
    method: "POST",
    path: "/manage/categories/delete/{id}",
    handler: manageControllers.handleCategoryDelete,
    options: {
      tags: ["api"],
    },
  },
];
