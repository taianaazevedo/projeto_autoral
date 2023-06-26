"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteService = exports.getFavoriteById = exports.deleteFavorite = exports.postFavorite = exports.getFavorite = void 0;
const errors_1 = require("@/errors");
const favoriteRepository_1 = require("@/repositories/favoriteRepository");
async function getFavorite(user_id) {
    const favorite = await favoriteRepository_1.favoriteRepository.getFavorite(user_id);
    return favorite;
}
exports.getFavorite = getFavorite;
async function postFavorite(user_id, theme_id) {
    const postFavorite = await favoriteRepository_1.favoriteRepository.postFavorite(user_id, theme_id);
    return postFavorite;
}
exports.postFavorite = postFavorite;
async function deleteFavorite(id) {
    const idExist = await getFavoriteById(id);
    if (!idExist)
        throw (0, errors_1.notFoundError)();
    await favoriteRepository_1.favoriteRepository.deleteFavorite(id);
}
exports.deleteFavorite = deleteFavorite;
async function getFavoriteById(id) {
    const favId = await favoriteRepository_1.favoriteRepository.getFavoriteById(id);
    return favId;
}
exports.getFavoriteById = getFavoriteById;
const favoriteService = {
    getFavorite,
    postFavorite,
    deleteFavorite,
};
exports.favoriteService = favoriteService;
