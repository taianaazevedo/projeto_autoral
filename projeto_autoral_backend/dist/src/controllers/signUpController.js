"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const services_1 = require("@/services");
const http_status_1 = __importDefault(require("http-status"));
async function signUp(req, res, next) {
    const { name, email, password, imgUrl } = req.body;
    if (!name ||
        !email ||
        !password ||
        !imgUrl ||
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof imgUrl !== "string")
        return res.sendStatus(http_status_1.default.BAD_REQUEST);
    try {
        const user = await services_1.signUpService.signUp(name, email, password, imgUrl);
        return res
            .status(http_status_1.default.CREATED)
            .json({
            id: user.id,
            name: user.name,
            imgUrl: user.imgUrl,
            email: user.email,
        });
    }
    catch (error) {
        next(error);
    }
}
exports.signUp = signUp;
