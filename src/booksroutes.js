const {
  addBookHandler,
  getAllBooksHandler,
  editBookIdHandler,
  getBookIdHandler,
  deleteBookIdHandler,
} = require ('./handler');

const booksroutes = [
  {
    method: 'GET',
    path: '/notes',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/notes/{bookId}',
    handler: getBookIdHandler,
  },
  {
    method: 'POST',
    path: '/notes',
    handler: addBookHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{bookId}',
    handler: editBookIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{bookId}',
    handler: deleteBookIdHandler,
  },
];

module.exports = booksroutes;
