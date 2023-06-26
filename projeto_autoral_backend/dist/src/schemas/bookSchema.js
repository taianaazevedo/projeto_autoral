"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookSchema = exports.bookSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bookSchema = joi_1.default.object({
    title: joi_1.default.string().min(1).required(),
    author: joi_1.default.string().min(1).required(),
    theme_id: joi_1.default.number().required(),
});
exports.updateBookSchema = joi_1.default.object({
    title: joi_1.default.string().min(1).required(),
    author: joi_1.default.string().min(1).required(),
    id: joi_1.default.number().required(),
});
