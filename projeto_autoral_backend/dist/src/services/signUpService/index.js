"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpService = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const duplicatedEmailError_1 = require("@/errors/duplicatedEmailError");
const index_1 = require("@/repositories/signUpRepository/index");
async function signUp(name, email, password, imgUrl) {
    await validateEmail(email);
    const hashedPassword = await bcrypt_1.default.hash(password, 12);
    const userCreated = await index_1.signUpRepository.createUser(name, email, hashedPassword, imgUrl);
    return userCreated;
}
exports.signUp = signUp;
async function validateEmail(email) {
    const duplicatedEmail = await index_1.signUpRepository.findByEmail(email);
    if (duplicatedEmail)
        throw (0, duplicatedEmailError_1.duplicatedEmailError)();
}
const signUpService = {
    signUp,
};
exports.signUpService = signUpService;
