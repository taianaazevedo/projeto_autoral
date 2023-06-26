"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = exports.updateBook = exports.postBook = exports.getBookById = void 0;
const errors_1 = require("@/errors");
const bookRepository_1 = require("@/repositories/bookRepository");
async function getBookById(id) {
    const book = await bookRepository_1.bookRepository.getBookById(id);
    if (!book)
        throw (0, errors_1.notFoundError)();
}
exports.getBookById = getBookById;
async function postBook({ user_id, theme_id, title, author }) {
    const postBook = await bookRepository_1.bookRepository.postBook({
        user_id,
        theme_id,
        title,
        author,
    });
    return postBook;
}
exports.postBook = postBook;
async function updateBook(id, title, author) {
    await getBookById(id);
    const update = await bookRepository_1.bookRepository.updateBook(id, title, author);
    return update;
}
exports.updateBook = updateBook;
const bookService = {
    postBook,
    updateBook
};
exports.bookService = bookService;
