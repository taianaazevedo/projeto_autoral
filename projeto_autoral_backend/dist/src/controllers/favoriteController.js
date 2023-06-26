"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFavorite = exports.postFavorite = exports.getFavorite = void 0;
const services_1 = require("@/services");
const http_status_1 = __importDefault(require("http-status"));
async function getFavorite(req, res, next) {
    const user_id = req.userId;
    try {
        const favorite = await services_1.favoriteService.getFavorite(user_id);
        return res.status(http_status_1.default.OK).send(favorite);
    }
    catch (error) {
        next(error);
    }
}
exports.getFavorite = getFavorite;
async function postFavorite(req, res, next) {
    const user_id = req.userId;
    const { theme_id } = req.body;
    if (!theme_id || isNaN(theme_id))
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const postFavorite = await services_1.favoriteService.postFavorite(user_id, theme_id);
        return res.status(http_status_1.default.CREATED).send(postFavorite);
    }
    catch (error) {
        next(error);
    }
}
exports.postFavorite = postFavorite;
async function deleteFavorite(req, res, next) {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        await services_1.favoriteService.deleteFavorite(id);
        return res.sendStatus(http_status_1.default.OK);
    }
    catch (error) {
        next(error);
    }
}
exports.deleteFavorite = deleteFavorite;
