"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieService = exports.updateMovie = exports.postMovie = exports.getMovieById = void 0;
const errors_1 = require("@/errors");
const movieRepository_1 = require("@/repositories/movieRepository");
async function getMovieById(id) {
    const movie = await movieRepository_1.movieRepository.getMovieById(id);
    if (!movie)
        throw (0, errors_1.notFoundError)();
}
exports.getMovieById = getMovieById;
async function postMovie({ user_id, theme_id, title, streaming }) {
    const post = await movieRepository_1.movieRepository.postMovie({
        user_id,
        theme_id,
        title,
        streaming,
    });
    return post;
}
exports.postMovie = postMovie;
async function updateMovie(id, title, streaming) {
    await getMovieById(id);
    const update = await movieRepository_1.movieRepository.updateMovie(id, title, streaming);
    return update;
}
exports.updateMovie = updateMovie;
const movieService = {
    getMovieById,
    postMovie,
    updateMovie
};
exports.movieService = movieService;
