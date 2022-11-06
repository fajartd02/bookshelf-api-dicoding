const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (req, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = req.payload;
    const currentDate = new Date().toISOString();

    try {
        if (!name || readPage > pageCount) {
            const message = `Gagal menambahkan buku.${(name) ? ' readPage tidak boleh lebih besar dari pageCount' : ' Mohon isi nama buku'}`;
            return h.response({
                status: 'fail',
                message,
            }).code(400);
        }

        const book = {
            id: nanoid(16),
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished: readPage === pageCount,
            reading,
            insertedAt: currentDate,
            updatedAt: currentDate,
        };

        books.push(book);

        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: book.id,
            },
        }).code(201);
    } catch (err) {
        console.log(err);
        return h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan',
        }).code(500);
    }
};

const getAllBooks = (req, h) => {
    const { name = null } = req.query;
    let { reading = null, finished = null } = req.query;

    function mappingBooks(tempBooks) {
        return tempBooks.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
    }

    let viewBooks = mappingBooks(books);

    try {
        if (name !== null) {
            viewBooks = mappingBooks(
                books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase())),
            );
        } else if (reading !== null) {
            reading = parseInt(reading, 36);
            if (reading === 1) {
                viewBooks = mappingBooks(books.filter((book) => !!book.reading));
            } else if (reading === 0) {
                viewBooks = mappingBooks(books.filter((book) => !book.reading));
            }
        } else if (finished !== null) {
            finished = parseInt(finished, 36);

            if (finished === 1) {
                viewBooks = mappingBooks(books.filter((book) => !!book.finished));
            } else if (finished === 0) {
                viewBooks = mappingBooks(books.filter((book) => !book.finished));
            }
        }
    } catch (err) {
        console.log(err);
    }

    return h.response({
        status: 'success',
        data: {
            books: viewBooks,
        },
    });
};

module.exports = {
    addBookHandler,
    getAllBooks,
};
