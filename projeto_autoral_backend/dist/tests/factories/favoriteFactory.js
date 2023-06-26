"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFavorite = void 0;
const config_1 = require("@/config");
async function createFavorite(user_id, theme_id) {
    return await config_1.prisma.favorite.create({
        data: {
            theme_id,
            user_id,
        },
    });
}
exports.createFavorite = createFavorite;
