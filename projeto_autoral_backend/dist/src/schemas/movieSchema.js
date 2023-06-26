"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovieSchema = exports.movieSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.movieSchema = joi_1.default.object({
    title: joi_1.default.string().min(1).required(),
    streaming: joi_1.default.string().min(1).required(),
    theme_id: joi_1.default.number().required(),
});
exports.updateMovieSchema = joi_1.default.object({
    title: joi_1.default.string().min(1).required(),
    streaming: joi_1.default.string().min(1).required(),
    id: joi_1.default.number().required(),
});
