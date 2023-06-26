"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const services_1 = require("@/services");
const http_status_1 = __importDefault(require("http-status"));
async function signIn(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password || typeof email !== "string" || typeof password !== "string")
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const signInUser = await services_1.signInService.signIn(email, password);
        return res.status(http_status_1.default.OK).send(signInUser);
    }
    catch (error) {
        next(error);
    }
}
exports.signIn = signIn;
