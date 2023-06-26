"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.postMovie = void 0;
const services_1 = require("@/services");
const http_status_1 = __importDefault(require("http-status"));
async function postMovie(req, res, next) {
    const user_id = req.userId;
    const { theme_id, title, streaming } = req.body;
    if (!title || !streaming || !theme_id)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const postMovie = await services_1.movieService.postMovie({ user_id, theme_id, title, streaming });
        return res.status(http_status_1.default.CREATED).send(postMovie);
    }
    catch (error) {
        next(error);
    }
}
exports.postMovie = postMovie;
async function updateMovie(req, res, next) {
    const { id, title, streaming } = req.body;
    if (!title || !streaming || !id)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const updatedMovie = await services_1.movieService.updateMovie(id, title, streaming);
        return res.status(http_status_1.default.OK).send(updatedMovie);
    }
    catch (error) {
        next(error);
    }
}
exports.updateMovie = updateMovie;
