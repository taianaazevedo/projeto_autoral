"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeService = exports.updateTheme = exports.deleteTheme = exports.getThemesFromUser = exports.findThemeByTitle = exports.createTheme = exports.getThemeByName = exports.getThemeById = exports.getTheme = void 0;
const errors_1 = require("@/errors");
const themeRepository_1 = __importDefault(require("@/repositories/themeRepository"));
async function getTheme() {
    const theme = await themeRepository_1.default.getTheme();
    return theme;
}
exports.getTheme = getTheme;
async function getThemeById(theme_id) {
    const themeById = await themeRepository_1.default.getThemeById(theme_id);
    if (!themeById)
        throw (0, errors_1.notFoundError)();
    return themeById;
}
exports.getThemeById = getThemeById;
async function getThemeByName(search) {
    const theme = await themeRepository_1.default.getThemeByName(search);
    return theme;
}
exports.getThemeByName = getThemeByName;
async function createTheme({ user_id, title }) {
    await findThemeByTitle(title);
    const theme = await themeRepository_1.default.createTheme({ user_id, title });
    return theme;
}
exports.createTheme = createTheme;
async function findThemeByTitle(title) {
    const theme = await themeRepository_1.default.findThemeByTitle(title);
    if (theme)
        throw (0, errors_1.duplicatedThemeError)();
    return theme;
}
exports.findThemeByTitle = findThemeByTitle;
async function getThemesFromUser(user_id) {
    const themes = await themeRepository_1.default.getThemesFromUser(user_id);
    return themes;
}
exports.getThemesFromUser = getThemesFromUser;
async function deleteTheme(theme_id) {
    await getThemeById(theme_id);
    await themeRepository_1.default.deleteTheme(theme_id);
}
exports.deleteTheme = deleteTheme;
async function updateTheme(title, theme_id) {
    await getThemeById(theme_id);
    await findThemeByTitle(title);
    const theme = await themeRepository_1.default.updateTheme(title, theme_id);
    return theme;
}
exports.updateTheme = updateTheme;
const themeService = {
    getTheme,
    getThemeById,
    getThemeByName,
    createTheme,
    getThemesFromUser,
    deleteTheme,
    updateTheme,
};
exports.themeService = themeService;
