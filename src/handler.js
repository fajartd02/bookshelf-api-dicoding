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

module.exports = {
    addBookHandler,
};
