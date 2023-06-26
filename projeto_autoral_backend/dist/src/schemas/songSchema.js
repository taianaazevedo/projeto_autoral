"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSongSchema = exports.songSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.songSchema = joi_1.default.object({
    title: joi_1.default.string().min(1).required(),
    performer: joi_1.default.string().min(1).required(),
    theme_id: joi_1.default.number().required(),
});
exports.updateSongSchema = joi_1.default.object({
    title: joi_1.default.string().min(1).required(),
    performer: joi_1.default.string().min(1).required(),
    id: joi_1.default.number().required(),
});
