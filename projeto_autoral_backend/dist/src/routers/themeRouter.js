"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeRouter = void 0;
const controllers_1 = require("@/controllers");
const middlewares_1 = require("@/middlewares");
const authenticationMiddleware_1 = require("@/middlewares/authenticationMiddleware");
const schemas_1 = require("@/schemas");
const express_1 = require("express");
const themeRouter = (0, express_1.Router)();
exports.themeRouter = themeRouter;
themeRouter
    .all("/*", authenticationMiddleware_1.authenticateToken)
    .get("/mythemes", controllers_1.getThemesFromUser)
    .get("/allthemes", controllers_1.getTheme)
    .get("/:id", controllers_1.getThemeById)
    .get("/", controllers_1.getThemeByName)
    .post("/", (0, middlewares_1.validate)(schemas_1.themeSchema), controllers_1.createTheme)
    .patch("/:id", (0, middlewares_1.validate)(schemas_1.themeSchema), controllers_1.updateTheme)
    .delete("/:id", controllers_1.deleteTheme);
