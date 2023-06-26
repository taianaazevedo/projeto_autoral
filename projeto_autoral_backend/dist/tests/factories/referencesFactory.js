"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.createSerie = exports.createMovie = exports.createSong = void 0;
const config_1 = require("@/config");
const faker_1 = require("@faker-js/faker");
async function createSong(user_id, theme_id) {
    return config_1.prisma.song.create({
        data: {
            user_id,
            theme_id,
            title: faker_1.faker.word.words({ count: 5 }),
            performer: faker_1.faker.person.firstName(),
        },
    });
}
exports.createSong = createSong;
async function createMovie(user_id, theme_id) {
    return config_1.prisma.movie.create({
        data: {
            user_id,
            theme_id,
            title: faker_1.faker.word.words({ count: 5 }),
            streaming: faker_1.faker.lorem.word(),
        },
    });
}
exports.createMovie = createMovie;
async function createSerie(user_id, theme_id) {
    return config_1.prisma.serie.create({
        data: {
            user_id,
            theme_id,
            title: faker_1.faker.word.words({ count: 5 }),
            streaming: faker_1.faker.lorem.word(),
        },
    });
}
exports.createSerie = createSerie;
async function createBook(user_id, theme_id) {
    return config_1.prisma.book.create({
        data: {
            user_id,
            theme_id,
            title: faker_1.faker.word.words({ count: 5 }),
            author: faker_1.faker.person.firstName(),
        },
    });
}
exports.createBook = createBook;
