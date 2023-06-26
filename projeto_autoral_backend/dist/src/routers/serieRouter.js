"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serieRouter = void 0;
const controllers_1 = require("@/controllers");
const middlewares_1 = require("@/middlewares");
const authenticationMiddleware_1 = require("@/middlewares/authenticationMiddleware");
const schemas_1 = require("@/schemas");
const express_1 = require("express");
const serieRouter = (0, express_1.Router)();
exports.serieRouter = serieRouter;
serieRouter
    .all("/*", authenticationMiddleware_1.authenticateToken)
    .patch("/", (0, middlewares_1.validate)(schemas_1.updateSerieSchema), controllers_1.updateSerie)
    .post("/", (0, middlewares_1.validate)(schemas_1.serieSchema), controllers_1.postSerie);
