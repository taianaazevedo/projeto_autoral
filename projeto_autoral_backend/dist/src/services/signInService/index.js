"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInService = exports.verifyPassword = exports.verifyCredential = exports.signIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const invalidCredentialError_1 = require("@/errors/invalidCredentialError");
const signUpRepository_1 = require("@/repositories/signUpRepository");
async function signIn(email, password) {
    const user = await verifyCredential(email);
    await verifyPassword(password, user.password);
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
    return {
        id: user.id,
        name: user.name,
        imgUrl: user.imgUrl,
        token,
    };
}
exports.signIn = signIn;
async function verifyCredential(email) {
    const user = await signUpRepository_1.signUpRepository.findByEmail(email);
    if (!user)
        throw (0, invalidCredentialError_1.invalidCredentialsError)();
    return user;
}
exports.verifyCredential = verifyCredential;
async function verifyPassword(password, userPassword) {
    const verifyPassword = await bcrypt_1.default.compare(password, userPassword);
    if (!verifyPassword)
        throw (0, invalidCredentialError_1.invalidCredentialsError)();
}
exports.verifyPassword = verifyPassword;
const signInService = {
    signIn,
};
exports.signInService = signInService;
