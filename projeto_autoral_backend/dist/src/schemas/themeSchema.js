"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.themeSchema = joi_1.default.object({
    title: joi_1.default.string().min(6).required(),
});
