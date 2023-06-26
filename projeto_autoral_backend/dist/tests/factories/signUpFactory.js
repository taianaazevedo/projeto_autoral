"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const faker_1 = require("@faker-js/faker");
const config_1 = require("@/config");
async function createUser(email, password, name, imgUrl) {
    const createdPassword = password || faker_1.faker.internet.password({ length: 6 });
    const hashedPassword = await bcrypt_1.default.hash(createdPassword, 10);
    return config_1.prisma.user.create({
        data: {
            name: name || faker_1.faker.person.firstName(),
            imgUrl: imgUrl || faker_1.faker.internet.url(),
            email: email || faker_1.faker.internet.email(),
            password: hashedPassword,
        },
    });
}
exports.createUser = createUser;
