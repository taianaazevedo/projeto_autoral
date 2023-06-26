"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.songService = exports.updateSong = exports.postSong = exports.getSongById = void 0;
const errors_1 = require("@/errors");
const songRepository_1 = require("@/repositories/songRepository");
async function getSongById(id) {
    const song = await songRepository_1.songRepository.getSongById(id);
    if (!song)
        throw (0, errors_1.notFoundError)();
}
exports.getSongById = getSongById;
async function postSong({ user_id, theme_id, title, performer }) {
    const post = await songRepository_1.songRepository.postSong({ user_id, theme_id, title, performer });
    return post;
}
exports.postSong = postSong;
async function updateSong(id, title, performer) {
    await getSongById(id);
    const song = await songRepository_1.songRepository.updateSong(id, title, performer);
    return song;
}
exports.updateSong = updateSong;
const songService = {
    postSong,
    updateSong,
};
exports.songService = songService;
