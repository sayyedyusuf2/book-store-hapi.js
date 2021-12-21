const manageControllers = require("./../controller/manageController");

module.exports = [
  { method: "GET", path: "/manage", handler: manageControllers.getMangePage },
  {
    method: "GET",
    path: "/manage/books",
    handler: manageControllers.getMangeBooks,
  },
  {
    method: "GET",
    path: "/manage/books/add",
    handler: manageControllers.getBooksAddPage,
  },
  {
    method: "POST",
    path: "/manage/books",
    handler: manageControllers.handleBooksAdd,
  },
  {
    method: "GET",
    path: "/manage/books/edit/{id}",
    handler: manageControllers.getBooksEditPage,
  },
  {
    method: "POST",
    path: "/manage/books/edit/{id}",
    handler: manageControllers.handleBooksEditPage,
  },
  {
    method: "POST",
    path: "/manage/books/delete/{id}",
    handler: manageControllers.deleteBook,
  },
  {
    method: "GET",
    path: "/manage/categories",
    handler: manageControllers.getManageCategories,
  },
  {
    method: "GET",
    path: "/manage/categories/add",
    handler: manageControllers.getCategoryAddPage,
  },
  {
    method: "POST",
    path: "/manage/categories",
    handler: manageControllers.handleCategoryAddPage,
  },
  {
    method: "GET",
    path: "/manage/categories/edit/{id}",
    handler: manageControllers.getCategoryEditPage,
  },
  {
    method: "POST",
    path: "/manage/categories/edit/{id}",
    handler: manageControllers.handleCategoryEditPage,
  },
  {
    method: "POST",
    path: "/manage/categories/delete/{id}",
    handler: manageControllers.handleCategoryDelete,
  },
];
