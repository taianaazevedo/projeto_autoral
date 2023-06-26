"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRouter = void 0;
const controllers_1 = require("@/controllers");
const middlewares_1 = require("@/middlewares");
const authenticationMiddleware_1 = require("@/middlewares/authenticationMiddleware");
const schemas_1 = require("@/schemas");
const express_1 = require("express");
const movieRouter = (0, express_1.Router)();
exports.movieRouter = movieRouter;
movieRouter
    .all("/*", authenticationMiddleware_1.authenticateToken)
    .patch("/", (0, middlewares_1.validate)(schemas_1.updateMovieSchema), controllers_1.updateMovie)
    .post("/", (0, middlewares_1.validate)(schemas_1.movieSchema), controllers_1.postMovie);
