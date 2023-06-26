"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serieRepository = exports.updateSerie = exports.postSerie = exports.getSerieById = void 0;
const config_1 = require("@/config");
async function getSerieById(id) {
    return config_1.prisma.serie.findFirst({
        where: {
            id,
        },
    });
}
exports.getSerieById = getSerieById;
async function postSerie({ user_id, theme_id, title, streaming }) {
    return config_1.prisma.serie.create({
        data: {
            user_id,
            theme_id,
            title,
            streaming,
        },
    });
}
exports.postSerie = postSerie;
async function updateSerie(id, title, streaming) {
    return config_1.prisma.serie.update({
        where: {
            id
        },
        data: {
            title,
            streaming
        }
    });
}
exports.updateSerie = updateSerie;
const serieRepository = {
    getSerieById,
    postSerie,
    updateSerie
};
exports.serieRepository = serieRepository;
