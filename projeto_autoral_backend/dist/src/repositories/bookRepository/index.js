"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRepository = exports.updateBook = exports.postBook = exports.getBookById = void 0;
const config_1 = require("@/config");
async function getBookById(id) {
    return config_1.prisma.book.findFirst({
        where: {
            id,
        },
    });
}
exports.getBookById = getBookById;
async function postBook({ user_id, theme_id, title, author }) {
    return config_1.prisma.book.create({
        data: {
            user_id,
            theme_id,
            title,
            author,
        },
    });
}
exports.postBook = postBook;
async function updateBook(id, title, author) {
    return config_1.prisma.book.update({
        where: {
            id
        },
        data: {
            title,
            author
        }
    });
}
exports.updateBook = updateBook;
const bookRepository = {
    getBookById,
    postBook,
    updateBook
};
exports.bookRepository = bookRepository;
