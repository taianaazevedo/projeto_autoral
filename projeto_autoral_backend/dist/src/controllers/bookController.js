"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.postBook = void 0;
const bookService_1 = require("@/services/bookService");
const http_status_1 = __importDefault(require("http-status"));
async function postBook(req, res, next) {
    const user_id = req.userId;
    const { theme_id, title, author } = req.body;
    if (!title || !author || !theme_id)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const postBook = await bookService_1.bookService.postBook({ user_id, theme_id, title, author });
        return res.status(http_status_1.default.CREATED).send(postBook);
    }
    catch (error) {
        next(error);
    }
}
exports.postBook = postBook;
async function updateBook(req, res, next) {
    const { id, title, author } = req.body;
    if (!title || !author || !id)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const updatedBook = await bookService_1.bookService.updateBook(id, title, author);
        return res.status(http_status_1.default.OK).send(updatedBook);
    }
    catch (error) {
        next(error);
    }
}
exports.updateBook = updateBook;
