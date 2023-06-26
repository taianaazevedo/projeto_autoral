"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const services_1 = require("@/services");
const signUpFactory_1 = require("./signUpFactory");
const faker_1 = require("@faker-js/faker");
async function createToken() {
    const userData = {
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password({ length: 6 }),
    };
    await (0, signUpFactory_1.createUser)(userData.email, userData.password);
    const login = await services_1.signInService.signIn(userData.email, userData.password);
    return login.token;
}
exports.createToken = createToken;
