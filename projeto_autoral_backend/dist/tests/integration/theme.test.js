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
const referencesFactory_1 = require("../factories/referencesFactory");
const faker_1 = require("@faker-js/faker");
beforeAll(async () => {
    await (0, app_1.init)();
});
beforeEach(async () => {
    await (0, helpers_1.cleanDb)();
});
const server = (0, supertest_1.default)(app_1.default);
describe("GET /theme/allthemes", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.get("/theme/allthemes");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should respond with status 200 and a empty array when there is no themes", async () => {
            await (0, factories_1.createUser)();
            const token = await (0, factories_1.createToken)();
            const response = await server
                .get("/theme/allthemes")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body).toEqual([]);
        });
        it("should respond with status 200 and with theme data", async () => {
            const user = await (0, factories_1.createUser)();
            const token = await (0, factories_1.createToken)();
            const theme = await (0, themeFactory_1.createTheme)(user.id);
            const response = await server
                .get("/theme/allthemes")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body).toEqual([
                {
                    id: theme.id,
                    title: theme.title,
                    user_id: theme.user_id,
                    createdAt: theme.createdAt.toISOString(),
                    updatedAt: theme.updatedAt.toISOString(),
                    User: {
                        name: user.name,
                        imgUrl: user.imgUrl,
                    },
                },
            ]);
        });
    });
});
describe("GET /theme/:id", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.get("/theme/1");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should return with 404 if id is not found", async () => {
            const token = await (0, factories_1.createToken)();
            const response = await server
                .get("/theme/1")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.NOT_FOUND);
        });
        it("should return with 400 if id is not a number", async () => {
            const token = await (0, factories_1.createToken)();
            const response = await server
                .get("/theme/abc")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should return with 400 if id is less than 1", async () => {
            const token = await (0, factories_1.createToken)();
            const response = await server
                .get("/theme/0")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should return with status 200 and theme data", async () => {
            const user = await (0, factories_1.createUser)();
            const token = await (0, factories_1.createToken)();
            const theme = await (0, themeFactory_1.createTheme)(user.id);
            const song = await (0, referencesFactory_1.createSong)(user.id, theme.id);
            const movie = await (0, referencesFactory_1.createMovie)(user.id, theme.id);
            const serie = await (0, referencesFactory_1.createSerie)(user.id, theme.id);
            const book = await (0, referencesFactory_1.createBook)(user.id, theme.id);
            const response = await server
                .get(`/theme/${theme.id}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body).toEqual({
                id: theme.id,
                title: theme.title,
                user_id: theme.user_id,
                createdAt: theme.createdAt.toISOString(),
                updatedAt: theme.updatedAt.toISOString(),
                User: {
                    name: user.name,
                },
                Song: [
                    {
                        id: song.id,
                        title: song.title,
                        performer: song.performer,
                    },
                ],
                Movie: [
                    {
                        id: movie.id,
                        title: movie.title,
                        streaming: movie.streaming,
                    },
                ],
                Serie: [
                    {
                        id: serie.id,
                        title: serie.title,
                        streaming: serie.streaming,
                    },
                ],
                Book: [
                    {
                        id: book.id,
                        title: book.title,
                        author: book.author,
                    },
                ],
            });
        });
    });
});
describe("GET /theme?search=", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.get("/theme?search=word");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should return with status 200 and a empty array when there is no theme with a given word", async () => {
            const token = await (0, factories_1.createToken)();
            const word = faker_1.faker.lorem.word();
            const response = await server
                .get(`/theme?search=${word}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body).toEqual([]);
        });
        it("should return with status 200 and theme", async () => {
            const user = await (0, factories_1.createUser)();
            const token = await (0, factories_1.createToken)();
            const theme = await (0, themeFactory_1.createTheme)(user.id);
            const word = theme.title.split(" ")[0];
            const response = await server
                .get(`/theme?search=${word}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body[0].title).toContain(`${word}`);
        });
    });
});
describe("GET /theme/mythemes", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.get("/theme/mythemes");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should respond with 200 and a empty array when there is no theme", async () => {
            const token = await (0, factories_1.createToken)();
            const response = await server
                .get("/theme/mythemes")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body).toEqual([]);
        });
        it("should respond with 200 and themes created by user", async () => {
            const token = await (0, factories_1.createToken)();
            const title = faker_1.faker.lorem.words(5);
            const post = await server
                .post("/theme")
                .set("Authorization", `Bearer ${token}`)
                .send({ title });
            const response = await server
                .get("/theme/mythemes")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body).toEqual([
                {
                    id: post.body.id,
                    title: post.body.title,
                    user_id: post.body.user_id,
                    createdAt: post.body.createdAt,
                    updatedAt: post.body.updatedAt,
                },
            ]);
        });
    });
});
describe("POST /theme", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.post("/theme");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should return with status 400 if body is empty", async () => {
            const token = await (0, factories_1.createToken)();
            const response = await server
                .post("/theme")
                .set("Authorization", `Bearer ${token}`)
                .send({});
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should return with status 409 if theme's title already exist", async () => {
            const user = await (0, factories_1.createUser)();
            const token = await (0, factories_1.createToken)();
            const title = faker_1.faker.lorem.words(5);
            const theme = await (0, themeFactory_1.createTheme)(user.id, title);
            const response = await server
                .post("/theme")
                .set("Authorization", `Bearer ${token}`)
                .send({ title: theme.title });
            expect(response.status).toBe(http_status_1.default.CONFLICT);
        });
        it("should return status 201, create a theme and return theme data", async () => {
            await (0, factories_1.createUser)();
            const token = await (0, factories_1.createToken)();
            const title = faker_1.faker.lorem.words(5);
            const response = await server
                .post("/theme")
                .set("Authorization", `Bearer ${token}`)
                .send({ title });
            expect(response.status).toBe(http_status_1.default.CREATED);
            expect(response.body).toEqual({
                id: expect.any(Number),
                title: response.body.title,
                user_id: expect.any(Number),
                createdAt: response.body.createdAt,
                updatedAt: response.body.updatedAt,
            });
        });
    });
});
describe("PATCH /theme/:id", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.patch("/theme/1");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should return with 404 if id is not found", async () => {
            const token = await (0, factories_1.createToken)();
            const title = faker_1.faker.lorem.words(5);
            const response = await server
                .patch("/theme/1")
                .set("Authorization", `Bearer ${token}`)
                .send({ title });
            expect(response.status).toBe(http_status_1.default.NOT_FOUND);
        });
        it("should return with 400 if id is not a number", async () => {
            const token = await (0, factories_1.createToken)();
            const title = faker_1.faker.lorem.words(5);
            const response = await server
                .patch("/theme/abc")
                .set("Authorization", `Bearer ${token}`)
                .send({ title });
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should return with 400 if id is less than 1", async () => {
            const token = await (0, factories_1.createToken)();
            const title = faker_1.faker.lorem.words(5);
            const response = await server
                .patch("/theme/0")
                .set("Authorization", `Bearer ${token}`)
                .send({ title });
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should return with status 400 if body is empty", async () => {
            const user = await (0, factories_1.createUser)();
            const token = await (0, factories_1.createToken)();
            const theme = await (0, themeFactory_1.createTheme)(user.id);
            const response = await server
                .patch(`/theme/${theme.id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({});
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should return with status 409 if theme's title already exist", async () => {
            const user = await (0, factories_1.createUser)();
            const token = await (0, factories_1.createToken)();
            const title = faker_1.faker.lorem.words(5);
            const theme = await (0, themeFactory_1.createTheme)(user.id, title);
            const response = await server
                .patch(`/theme/${theme.id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ title: theme.title });
            expect(response.status).toBe(http_status_1.default.CONFLICT);
        });
        it("should be return status 200 and theme updated", async () => {
            const user = await (0, factories_1.createUser)();
            const token = await (0, factories_1.createToken)();
            const theme = await (0, themeFactory_1.createTheme)(user.id);
            const title = faker_1.faker.lorem.words(5);
            const response = await server
                .patch(`/theme/${theme.id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ title });
            expect(response.status).toBe(http_status_1.default.OK);
            expect(response.body).toEqual({
                id: theme.id,
                title,
                user_id: theme.user_id,
                createdAt: theme.createdAt.toISOString(),
                updatedAt: response.body.updatedAt,
            });
        });
    });
});
describe("DELETE /theme/:id", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.delete("/theme/1");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should return with 404 if id is not found", async () => {
            const token = await (0, factories_1.createToken)();
            const response = await server
                .delete("/theme/1")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.NOT_FOUND);
        });
        it("should return with 400 if id is not a number", async () => {
            const token = await (0, factories_1.createToken)();
            const response = await server
                .delete("/theme/abc")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should return with 400 if id is less than 1", async () => {
            const token = await (0, factories_1.createToken)();
            const response = await server
                .delete("/theme/0")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("shloud retur status 200 when a theme is deleted", async () => {
            const token = await (0, factories_1.createToken)();
            const user = await (0, factories_1.createUser)();
            const theme = await (0, themeFactory_1.createTheme)(user.id);
            const response = await server
                .delete(`/theme/${theme.id}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(http_status_1.default.OK);
        });
    });
});
