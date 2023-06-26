"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const controllers_1 = require("@/controllers");
const middlewares_1 = require("@/middlewares");
const authenticationMiddleware_1 = require("@/middlewares/authenticationMiddleware");
const schemas_1 = require("@/schemas");
const express_1 = require("express");
const bookRouter = (0, express_1.Router)();
exports.bookRouter = bookRouter;
bookRouter
    .all("/*", authenticationMiddleware_1.authenticateToken)
    .patch("/", (0, middlewares_1.validate)(schemas_1.updateBookSchema), controllers_1.updateBook)
    .post("/", (0, middlewares_1.validate)(schemas_1.bookSchema), controllers_1.postBook);
