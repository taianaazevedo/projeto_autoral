"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serieService = exports.updateSerie = exports.postSerie = exports.getSerieById = void 0;
const errors_1 = require("@/errors");
const serieRepository_1 = require("@/repositories/serieRepository");
async function getSerieById(id) {
    const serie = await serieRepository_1.serieRepository.getSerieById(id);
    if (!serie)
        throw (0, errors_1.notFoundError)();
}
exports.getSerieById = getSerieById;
async function postSerie({ user_id, theme_id, title, streaming }) {
    const post = await serieRepository_1.serieRepository.postSerie({ user_id, theme_id, title, streaming });
    return post;
}
exports.postSerie = postSerie;
async function updateSerie(id, title, streaming) {
    await getSerieById(id);
    const update = await serieRepository_1.serieRepository.updateSerie(id, title, streaming);
    return update;
}
exports.updateSerie = updateSerie;
const serieService = {
    getSerieById,
    postSerie,
    updateSerie,
};
exports.serieService = serieService;
