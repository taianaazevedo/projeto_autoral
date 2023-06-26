"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteRouter = void 0;
const controllers_1 = require("@/controllers");
const authenticationMiddleware_1 = require("@/middlewares/authenticationMiddleware");
const express_1 = require("express");
const favoriteRouter = (0, express_1.Router)();
exports.favoriteRouter = favoriteRouter;
favoriteRouter
    .all("/*", authenticationMiddleware_1.authenticateToken)
    .get("/", controllers_1.getFavorite)
    .post("/", controllers_1.postFavorite)
    .delete("/:id", controllers_1.deleteFavorite);
