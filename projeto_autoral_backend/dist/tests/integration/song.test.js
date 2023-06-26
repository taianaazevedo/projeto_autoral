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
describe("POST /song", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.post("/song");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    describe("when token is valid", () => {
        it("should return with status 400 if title is missing", async () => {
            const user = await (0, factories_1.createUser)();
            const token = await (0, factories_1.createToken)();
            const theme = await (0, themeFactory_1.createTheme)(user.id);
            const performer = faker_1.faker.person.firstName();
            const response = await server
                .post("/song")
                .set("Authorization", `Bearer ${token}`)
                .send({ performer, theme_id: theme.id });
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should return with status 400 if performer is missing", async () => {
            const user = await (0, factories_1.createUser)();
            const token = await (0, factories_1.createToken)();
            const theme = await (0, themeFactory_1.createTheme)(user.id);
            const title = faker_1.faker.music.songName();
            const response = await server
                .post("/song")
                .set("Authorization", `Bearer ${token}`)
                .send({ title, theme_id: theme.id });
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should return with status 400 if theme_id is missing", async () => {
            const token = await (0, factories_1.createToken)();
            const title = faker_1.faker.music.songName();
            const performer = faker_1.faker.person.firstName();
            const response = await server
                .post("/song")
                .set("Authorization", `Bearer ${token}`)
                .send({ title, performer });
            expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
        });
        it("should respond with status 201 and with song data", async () => {
            const user = await (0, factories_1.createUser)();
            const token = await (0, factories_1.createToken)();
            const theme = await (0, themeFactory_1.createTheme)(user.id);
            const title = faker_1.faker.music.songName();
            const performer = faker_1.faker.person.firstName();
            const response = await server
                .post("/song")
                .set("Authorization", `Bearer ${token}`)
                .send({ title, performer, theme_id: theme.id });
            expect(response.status).toBe(http_status_1.default.CREATED);
            expect(response.body).toEqual({
                id: expect.any(Number),
                title: expect.any(String),
                performer: expect.any(String),
                theme_id: expect.any(Number),
                user_id: expect.any(Number),
                createdAt: response.body.createdAt,
                updatedAt: response.body.updatedAt,
            });
        });
    });
});
describe("PATCH /song", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.patch("/song");
        expect(response.status).toBe(http_status_1.default.UNAUTHORIZED);
    });
    it("should return with status 400 if title is missing", async () => {
        const user = await (0, factories_1.createUser)();
        const token = await (0, factories_1.createToken)();
        const theme = await (0, themeFactory_1.createTheme)(user.id);
        const performer = faker_1.faker.person.firstName();
        const response = await server
            .patch("/song")
            .set("Authorization", `Bearer ${token}`)
            .send({ performer, theme_id: theme.id });
        expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
    });
    it("should return with status 400 if performer is missing", async () => {
        const user = await (0, factories_1.createUser)();
        const token = await (0, factories_1.createToken)();
        const theme = await (0, themeFactory_1.createTheme)(user.id);
        const title = faker_1.faker.music.songName();
        const response = await server
            .patch("/song")
            .set("Authorization", `Bearer ${token}`)
            .send({ title, theme_id: theme.id });
        expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
    });
    it("should return with status 400 if id is missing", async () => {
        const token = await (0, factories_1.createToken)();
        const title = faker_1.faker.music.songName();
        const performer = faker_1.faker.person.firstName();
        const response = await server
            .patch("/song")
            .set("Authorization", `Bearer ${token}`)
            .send({ title, performer });
        expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
    });
    it("should return status 404 if id is not found", async () => {
        const user = await (0, factories_1.createUser)();
        const token = await (0, factories_1.createToken)();
        const title = faker_1.faker.music.songName();
        const performer = faker_1.faker.person.firstName();
        await (0, themeFactory_1.createTheme)(user.id);
        const idFake = 10;
        const response = await server
            .patch("/song")
            .set("Authorization", `Bearer ${token}`)
            .send({ title, performer, id: idFake });
        expect(response.status).toBe(http_status_1.default.NOT_FOUND);
    });
    it("should respond with status 201 and with song data", async () => {
        const user = await (0, factories_1.createUser)();
        const token = await (0, factories_1.createToken)();
        const theme = await (0, themeFactory_1.createTheme)(user.id);
        const song = await (0, referencesFactory_1.createSong)(user.id, theme.id);
        const title = faker_1.faker.music.songName();
        const performer = faker_1.faker.person.firstName();
        const response = await server
            .patch("/song")
            .set("Authorization", `Bearer ${token}`)
            .send({ title, performer, id: song.id });
        expect(response.status).toBe(http_status_1.default.OK);
        expect(response.body).toEqual({
            id: expect.any(Number),
            title: expect.any(String),
            performer: expect.any(String),
            theme_id: expect.any(Number),
            user_id: expect.any(Number),
            createdAt: response.body.createdAt,
            updatedAt: response.body.updatedAt,
        });
    });
});
