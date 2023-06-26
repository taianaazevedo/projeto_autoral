"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteRepository = exports.getFavoriteById = exports.deleteFavorite = exports.postFavorite = exports.getFavorite = void 0;
const config_1 = require("@/config");
async function getFavorite(user_id) {
    return config_1.prisma.favorite.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            user_id,
        },
        include: {
            Theme: {
                include: {
                    User: {
                        select: {
                            imgUrl: true,
                            name: true
                        }
                    }
                }
            }
        },
    });
}
exports.getFavorite = getFavorite;
async function postFavorite(user_id, theme_id) {
    return config_1.prisma.favorite.create({
        data: {
            user_id,
            theme_id,
        },
    });
}
exports.postFavorite = postFavorite;
async function deleteFavorite(id) {
    await config_1.prisma.favorite.delete({
        where: {
            id,
        },
    });
}
exports.deleteFavorite = deleteFavorite;
async function getFavoriteById(id) {
    return config_1.prisma.favorite.findFirst({
        where: {
            id,
        },
    });
}
exports.getFavoriteById = getFavoriteById;
const favoriteRepository = {
    getFavorite,
    postFavorite,
    deleteFavorite,
    getFavoriteById,
};
exports.favoriteRepository = favoriteRepository;
