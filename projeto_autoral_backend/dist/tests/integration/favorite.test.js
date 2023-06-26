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
const http_status_1 = __importDefault(require("http-status"));
const supertest_1 = __importDefault(require("supertest"));
const factories_1 = require("../factories");
const helpers_1 = require("../helpers");
const app_1 = __importStar(require("@/app"));
const themeFactory_1 = require("../factories/themeFactory");
const faker_1 = require("@faker-js/faker");
beforeAll(async () => {
    await (0, app_1.init)();
});
beforeEach(async () => {
    await (0, helpers_1.cleanDb)();
});
const server = (0, supertest_1.default)(app_1.default);
describe("GET /favorites", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.get("/favorite");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should return status 200 and a empty array when there is no favorite", async () => {
            const token = await (0, factories_1.createToken)();
            const response = await server
                .get("/favorite")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
        });
        it("should return status 200 and favorite data", async () => {
            const token = await (0, factories_1.createToken)();
            const user = await (0, factories_1.createUser)();
            const theme = await (0, themeFactory_1.createTheme)(user.id);
            await server
                .post("/favorite")
                .set("Authorization", `Bearer ${token}`)
                .send({ theme_id: theme.id });
            const response = await server
                .get("/favorite")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body).toEqual([
                {
                    id: expect.any(Number),
                    theme_id: expect.any(Number),
                    user_id: expect.any(Number),
                    createdAt: response.body[0].createdAt,
                    updatedAt: response.body[0].updatedAt,
                    Theme: {
                        id: expect.any(Number),
                        title: expect.any(String),
                        user_id: expect.any(Number),
                        createdAt: response.body[0].Theme.createdAt,
                        updatedAt: response.body[0].Theme.updatedAt,
                        User: {
                            imgUrl: expect.any(String),
                            name: expect.any(String),
                        },
                    },
                },
            ]);
        });
    });
});
describe("POST /theme", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.post("/favorite");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should respond with status 400 if theme_id is not a number", async () => {
            const token = await (0, factories_1.createToken)();
            const word = faker_1.faker.lorem.word();
            const response = await server
                .post("/favorite")
                .set("Authorization", `Bearer ${token}`)
                .send({ theme_id: word });
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should respond with status 400 if body is empty", async () => {
            const token = await (0, factories_1.createToken)();
            const response = await server
                .post("/favorite")
                .set("Authorization", `Bearer ${token}`)
                .send({});
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should respond with status 201 and post a favorite", async () => {
            const token = await (0, factories_1.createToken)();
            const user = await (0, factories_1.createUser)();
            const theme = await (0, themeFactory_1.createTheme)(user.id);
            const response = await server
                .post("/favorite")
                .set("Authorization", `Bearer ${token}`)
                .send({ theme_id: theme.id });
            expect(response.status).toBe(http_status_1.default.CREATED);
        });
    });
});
describe("DELETE /favorite", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.delete("/favorite");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should return with 404 if id is not found", async () => {
            const token = await (0, factories_1.createToken)();
            const response = await server
                .delete("/favorite/1")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.NOT_FOUND);
        });
        it("should return with 400 if id is not a number", async () => {
            const token = await (0, factories_1.createToken)();
            const response = await server
                .delete("/favorite/abc")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should return with 400 if id is less than 1", async () => {
            const token = await (0, factories_1.createToken)();
            const response = await server
                .delete("/favorite/0")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("shloud retur status 200 when a theme is deleted", async () => {
            const token = await (0, factories_1.createToken)();
            const user = await (0, factories_1.createUser)();
            const theme = await (0, themeFactory_1.createTheme)(user.id);
            const favorite = await (0, factories_1.createFavorite)(user.id, theme.id);
            const response = await server
                .delete(`/favorite/${favorite.id}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
        });
    });
});
