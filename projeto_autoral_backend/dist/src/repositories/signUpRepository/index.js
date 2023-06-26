"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpRepository = void 0;
const config_1 = require("@/config");
async function findByEmail(email) {
    return config_1.prisma.user.findFirst({
        where: { email },
    });
}
async function createUser(name, email, password, imgUrl) {
    return config_1.prisma.user.create({
        data: {
            name,
            email,
            password,
            imgUrl,
        },
    });
}
const signUpRepository = {
    findByEmail,
    createUser,
};
exports.signUpRepository = signUpRepository;
