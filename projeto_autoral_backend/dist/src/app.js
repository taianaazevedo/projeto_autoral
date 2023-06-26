"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.init = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("@/config");
const routers_1 = require("@/routers");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
(0, config_1.loadEnv)();
const app = (0, express_1.default)();
app
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .use("/sign-up", routers_1.signUpRouter)
    .use("/sign-in", routers_1.signInRouter)
    .use("/theme", routers_1.themeRouter)
    .use("/favorite", routers_1.favoriteRouter)
    .use("/song", routers_1.songRouter)
    .use("/serie", routers_1.serieRouter)
    .use("/movie", routers_1.movieRouter)
    .use("/book", routers_1.bookRouter)
    .use(errorMiddleware_1.handleApplicationErrors);
function init() {
    (0, config_1.connectDb)();
    return Promise.resolve(app);
}
exports.init = init;
async function close() {
    await (0, config_1.disconnectDB)();
}
exports.close = close;
exports.default = app;
