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
const faker_1 = require("@faker-js/faker");
const http_status_1 = __importDefault(require("http-status"));
const supertest_1 = __importDefault(require("supertest"));
const factories_1 = require("../factories");
const helpers_1 = require("../helpers");
const config_1 = require("@/config");
const app_1 = __importStar(require("@/app"));
beforeAll(async () => {
    await (0, app_1.init)();
    await (0, helpers_1.cleanDb)();
});
const server = (0, supertest_1.default)(app_1.default);
describe("POST /sign-up", () => {
    it("should respond with status 400 when body is not given", async () => {
        const response = await server.post("/sign-up");
        expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
    });
    it("should respond with status 400 when body is not valid", async () => {
        const invalidBody = { [faker_1.faker.lorem.word()]: faker_1.faker.lorem.word() };
        const response = await server.post("/sign-up").send(invalidBody);
        expect(response.status).toBe(http_status_1.default.BAD_REQUEST);
    });
    describe("when body is valid", () => {
        const randomPassword = faker_1.faker.internet.password({ length: 6 });
        const generateValidBody = () => ({
            name: faker_1.faker.person.firstName(),
            email: faker_1.faker.internet.email(),
            password: randomPassword,
            confirmPassword: randomPassword,
            imgUrl: faker_1.faker.internet.url(),
        });
        it("should respond with status 409 when there is an user with given email", async () => {
            const body = generateValidBody();
            await (0, factories_1.createUser)(body.email, body.password, body.name, body.imgUrl);
            const response = await server.post("/sign-up").send(body);
            expect(response.status).toBe(http_status_1.default.CONFLICT);
            expect(response.body).toEqual({
                message: "There is already an user with given email",
            });
        });
        it("should respond with status 201 and create user when given email is unique", async () => {
            const body = generateValidBody();
            const response = await server.post("/sign-up").send(body);
            expect(response.status).toBe(http_status_1.default.CREATED);
            expect(response.body).toEqual({
                id: expect.any(Number),
                email: body.email,
                imgUrl: body.imgUrl,
                name: body.name,
            });
        });
        it("should not return user password on body", async () => {
            const body = generateValidBody();
            const response = await server.post("/sign-up").send(body);
            expect(response.body).not.toHaveProperty("password");
        });
        it("should save user on db", async () => {
            const body = generateValidBody();
            const response = await server.post("/sign-up").send(body);
            const user = await config_1.prisma.user.findUnique({
                where: { email: body.email },
            });
            expect(user).toEqual(expect.objectContaining({
                id: response.body.id,
                email: body.email,
            }));
        });
    });
});
