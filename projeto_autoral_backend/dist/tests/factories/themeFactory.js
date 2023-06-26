"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTheme = void 0;
const faker_1 = require("@faker-js/faker");
const config_1 = require("@/config");
async function createTheme(user_id, title) {
    return await config_1.prisma.theme.create({
        data: {
            title: title || faker_1.faker.word.words({ count: 5 }),
            user_id,
        },
    });
}
exports.createTheme = createTheme;
