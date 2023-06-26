"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSerie = exports.postSerie = void 0;
const services_1 = require("@/services");
const http_status_1 = __importDefault(require("http-status"));
async function postSerie(req, res, next) {
    const user_id = req.userId;
    const { theme_id, title, streaming } = req.body;
    if (!title || !streaming || !theme_id)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const postSerie = await services_1.serieService.postSerie({ user_id, theme_id, title, streaming });
        return res.status(http_status_1.default.CREATED).send(postSerie);
    }
    catch (error) {
        next(error);
    }
}
exports.postSerie = postSerie;
async function updateSerie(req, res, next) {
    const { id, title, streaming } = req.body;
    if (!title || !streaming || !id)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const updatedserie = await services_1.serieService.updateSerie(id, title, streaming);
        return res.status(http_status_1.default.OK).send(updatedserie);
    }
    catch (error) {
        next(error);
    }
}
exports.updateSerie = updateSerie;
