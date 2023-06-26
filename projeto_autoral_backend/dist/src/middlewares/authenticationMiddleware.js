"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const errors_1 = require("@/errors");
const http_status_1 = __importDefault(require("http-status"));
async function authenticateToken(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization)
            throw (0, errors_1.unauthorizedError)();
        const parts = authorization.split(" ");
        if (parts.length !== 2)
            throw (0, errors_1.unauthorizedError)();
        const [schema, token] = parts;
        if (schema !== "Bearer")
            throw (0, errors_1.unauthorizedError)();
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        if (!userId)
            throw (0, errors_1.unauthorizedError)();
        req.userId = userId;
        next();
    }
    catch (error) {
        if (error.name === "unauthorizedError") {
            return res.status(http_status_1.default.UNAUTHORIZED).send((0, errors_1.unauthorizedError)());
        }
        next(error);
    }
}
exports.authenticateToken = authenticateToken;
