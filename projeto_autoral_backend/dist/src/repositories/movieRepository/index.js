"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRepository = exports.updateMovie = exports.postMovie = exports.getMovieById = void 0;
const config_1 = require("@/config");
async function getMovieById(id) {
    return config_1.prisma.movie.findFirst({
        where: {
            id,
        },
    });
}
exports.getMovieById = getMovieById;
async function postMovie({ user_id, theme_id, title, streaming }) {
    return config_1.prisma.movie.create({
        data: {
            user_id,
            theme_id,
            title,
            streaming,
        },
    });
}
exports.postMovie = postMovie;
async function updateMovie(id, title, streaming) {
    return config_1.prisma.movie.update({
        where: {
            id
        },
        data: {
            title,
            streaming
        }
    });
}
exports.updateMovie = updateMovie;
const movieRepository = {
    getMovieById,
    postMovie,
    updateMovie
};
exports.movieRepository = movieRepository;
