"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.songRouter = void 0;
const controllers_1 = require("@/controllers");
const middlewares_1 = require("@/middlewares");
const authenticationMiddleware_1 = require("@/middlewares/authenticationMiddleware");
const schemas_1 = require("@/schemas");
const express_1 = require("express");
const songRouter = (0, express_1.Router)();
exports.songRouter = songRouter;
songRouter
    .all("/*", authenticationMiddleware_1.authenticateToken)
    .post("/", (0, middlewares_1.validate)(schemas_1.songSchema), controllers_1.postSong)
    .patch("/", (0, middlewares_1.validate)(schemas_1.updateSongSchema), controllers_1.updateSong);
