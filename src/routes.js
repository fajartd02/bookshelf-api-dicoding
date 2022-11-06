const { addBookHandler, getAllBooks } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: () => {},
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: () => {},
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: () => {},
    },
];

module.exports = routes;
