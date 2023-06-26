"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSong = exports.postSong = void 0;
const services_1 = require("@/services");
const http_status_1 = __importDefault(require("http-status"));
async function postSong(req, res, next) {
    const user_id = req.userId;
    const { title, performer, theme_id } = req.body;
    if (!title || !performer || !theme_id)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const postSong = await services_1.songService.postSong({ user_id, theme_id, title, performer });
        return res.status(http_status_1.default.CREATED).send(postSong);
    }
    catch (error) {
        next(error);
    }
}
exports.postSong = postSong;
async function updateSong(req, res, next) {
    const { title, performer, id } = req.body;
    if (!title || !performer || !id)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const songUpdated = await services_1.songService.updateSong(id, title, performer);
        return res.status(http_status_1.default.OK).send(songUpdated);
    }
    catch (error) {
        next(error);
    }
}
exports.updateSong = updateSong;
