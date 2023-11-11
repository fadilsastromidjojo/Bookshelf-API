const { nanoid } = require ('nanoid');
const notes = require ('./notes.js');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });

        response.code(400);
        return response;
    }

    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });

        response.code(400);
        return response;
    }

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    notes.push(newBook);

    const isSuccess = notes.filter((book) => book.id === id).length > 0;

    if(!isSuccess){
        const response = h.response({
            status: "error",
            message: "Buku gagal ditambahkan"
        });

        response.code(500);
        return response;
    }

    const response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
            bookId: id
        }
    });

    response.code(201);
    return response;
};

const getAllBooksHandler = (request, h) => {
    const { name, reading, finished  } = request.query;

    if(name){
       const data = [];

        notes.map((book) => {
            if(book.name.toLowerCase().includes(name.toLowerCase())){
                data.push({
                    id: book.id, name: book.name, publisher: book.publisher
                });
            }
        });

        const response = h.response({
            status: "success",
            data : {
                notes: data
            }
        });
        response.code(200);
        return response;
    }

    if(reading){
        const data = [];

        notes.map((book) => {
            if(book.reading == reading){
                data.push({
                    id: book.id, name: book.name, publisher: book.publisher
                });
            }
        });

        const response = h.response({
            status: "success",
            data : {
                notes: data
            }
        });
        response.code(200);
        return response;
    }

    if(finished){
        const data = [];

        notes.map((book) => {
            if(book.finished == finished){
                data.push({
                    id: book.id, name: book.name, publisher: book.publisher
                });
            }
        });

        const response = h.response({
            status: "success",
            data : {
                notes: data
            }
        });
        response.code(200);
        return response;
    }

    if(notes.length > 0 && !name && !reading && !finished){
        const data = [];

        notes.map((book) => {
            data.push({
                id: book.id, name: book.name, publisher: book.publisher
            });
        });

        const response = h.response({
            status: "success",
            data : {
                notes: data
            }
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "success",
        data : {
            notes: []
        }
    });

    response.code(200);
    return response;
};

const getBookIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = notes.filter((book) => book.id === bookId)[0];

    if(!book){
        const response = h.response({
            status: "fail",
            message: "Buku tidak ditemukan"
        });

        response.code(404);
        return response;
    }


    const response = h.response({
        status: "success",
        data : {
            book: book
        }
    });

    response.code(200);
    return response;
};

const editBookIdHandler = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku ya!"
        });

        response.code(400);
        return response;
    }

    if(readPage > pageCount){
        const response = h.response({
            status: "fail",
            message:  "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount!"
        });

        response.code(400);
        return response;
    }

    const index = notes.findIndex((book) => book.id === bookId);

    if(index !== 0){
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Karena ID tidak ditemukan"
        });

        response.code(404);
        return response;
    }

notes[index] = {
        ...notes[index],
        name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
    };

    const response = h.response({
        status: "success",
        message: "Buku telah berhasil diperbarui"
    });

    response.code(200);
    return response;
};

const deleteBookIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = notes.findIndex((book) => book.id === bookId);

    if(index !== 0){
        const response = h.response({
            status: "fail",
            message: "Buku gagal dihapus. Karena ID tidak ditemukan!"
        });

        response.code(404);
        return response;
    }

    notes.splice(index, 1);
    const response = h.response({
        status: "success",
        message: "Buku berhasil dihapus!"
    });

    response.code(200);
    return response;
};

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookIdHandler,
    editBookIdHandler,
    deleteBookIdHandler,
};