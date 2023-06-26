"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.songRepository = exports.updateSong = exports.postSong = exports.getSongById = void 0;
const config_1 = require("@/config");
async function getSongById(id) {
    return config_1.prisma.song.findFirst({
        where: {
            id,
        },
    });
}
exports.getSongById = getSongById;
async function postSong({ user_id, theme_id, title, performer }) {
    return config_1.prisma.song.create({
        data: {
            user_id,
            theme_id,
            title,
            performer,
        },
    });
}
exports.postSong = postSong;
async function updateSong(id, title, performer) {
    return config_1.prisma.song.update({
        where: {
            id,
        },
        data: {
            title,
            performer
        }
    });
}
exports.updateSong = updateSong;
const songRepository = {
    getSongById,
    postSong,
    updateSong,
};
exports.songRepository = songRepository;
