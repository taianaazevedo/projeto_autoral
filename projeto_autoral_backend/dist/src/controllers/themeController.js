"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTheme = exports.deleteTheme = exports.createTheme = exports.getThemesFromUser = exports.getThemeByName = exports.getThemeById = exports.getTheme = void 0;
const services_1 = require("@/services");
const http_status_1 = __importDefault(require("http-status"));
async function getTheme(req, res, next) {
    try {
        const themes = await services_1.themeService.getTheme();
        return res.status(http_status_1.default.OK).send(themes);
    }
    catch (error) {
        next(error);
    }
}
exports.getTheme = getTheme;
async function getThemeById(req, res, next) {
    const theme_id = Number(req.params.id);
    if (isNaN(theme_id) || theme_id <= 0)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const themeById = await services_1.themeService.getThemeById(theme_id);
        return res.status(http_status_1.default.OK).send(themeById);
    }
    catch (error) {
        next(error);
    }
}
exports.getThemeById = getThemeById;
async function getThemeByName(req, res, next) {
    const { search } = req.query;
    if (!search)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const theme = await services_1.themeService.getThemeByName(search);
        return res.status(http_status_1.default.OK).send(theme);
    }
    catch (error) {
        next(error);
    }
}
exports.getThemeByName = getThemeByName;
async function getThemesFromUser(req, res, next) {
    const user_id = req.userId;
    try {
        const themeUser = await services_1.themeService.getThemesFromUser(user_id);
        return res.status(http_status_1.default.OK).send(themeUser);
    }
    catch (error) {
        next(error);
    }
}
exports.getThemesFromUser = getThemesFromUser;
async function createTheme(req, res, next) {
    const user_id = req.userId;
    const { title } = req.body;
    if (!title)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const createdTheme = await services_1.themeService.createTheme({ user_id, title });
        return res.status(http_status_1.default.CREATED).send(createdTheme);
    }
    catch (error) {
        next(error);
    }
}
exports.createTheme = createTheme;
async function deleteTheme(req, res, next) {
    const theme_id = Number(req.params.id);
    if (isNaN(theme_id) || theme_id <= 0)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        await services_1.themeService.deleteTheme(theme_id);
        return res.sendStatus(http_status_1.default.OK);
    }
    catch (error) {
        next(error);
    }
}
exports.deleteTheme = deleteTheme;
async function updateTheme(req, res, next) {
    const theme_id = Number(req.params.id);
    const { title } = req.body;
    if (isNaN(theme_id) || theme_id <= 0 || !title)
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const themeUpdated = await services_1.themeService.updateTheme(title, theme_id);
        return res.status(http_status_1.default.OK).send(themeUpdated);
    }
    catch (error) {
        next(error);
    }
}
exports.updateTheme = updateTheme;
