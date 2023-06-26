"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTheme = exports.deleteTheme = exports.getThemesFromUser = exports.findThemeByTitle = exports.getThemeByName = exports.getThemeById = exports.createTheme = exports.getTheme = void 0;
const config_1 = require("@/config");
async function getTheme() {
    return config_1.prisma.theme.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            User: {
                select: {
                    name: true,
                    imgUrl: true,
                },
            },
        },
    });
}
exports.getTheme = getTheme;
async function createTheme({ user_id, title }) {
    return config_1.prisma.theme.create({
        data: {
            user_id,
            title,
        },
    });
}
exports.createTheme = createTheme;
async function getThemeById(theme_id) {
    return config_1.prisma.theme.findUnique({
        where: {
            id: theme_id,
        },
        include: {
            User: {
                select: {
                    name: true,
                },
            },
            Serie: {
                select: {
                    id: true,
                    title: true,
                    streaming: true,
                },
            },
            Song: {
                select: {
                    id: true,
                    title: true,
                    performer: true,
                },
            },
            Movie: {
                select: {
                    id: true,
                    title: true,
                    streaming: true,
                },
            },
            Book: {
                select: {
                    id: true,
                    title: true,
                    author: true,
                },
            },
        },
    });
}
exports.getThemeById = getThemeById;
async function getThemeByName(search) {
    return config_1.prisma.theme.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    title: {
                        contains: search.replace(/\s/g, ""),
                        mode: "insensitive",
                    },
                },
            ],
        },
    });
}
exports.getThemeByName = getThemeByName;
async function findThemeByTitle(title) {
    return config_1.prisma.theme.findFirst({
        where: {
            title: {
                equals: title,
                mode: "insensitive"
            }
        },
    });
}
exports.findThemeByTitle = findThemeByTitle;
async function getThemesFromUser(user_id) {
    return config_1.prisma.theme.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            user_id,
        },
    });
}
exports.getThemesFromUser = getThemesFromUser;
async function deleteTheme(theme_id) {
    await config_1.prisma.theme.delete({
        where: {
            id: theme_id,
        },
    });
}
exports.deleteTheme = deleteTheme;
async function updateTheme(title, theme_id) {
    return config_1.prisma.theme.update({
        where: {
            id: theme_id,
        },
        data: {
            title,
        },
    });
}
exports.updateTheme = updateTheme;
const themeRepository = {
    getTheme,
    getThemeById,
    getThemeByName,
    findThemeByTitle,
    createTheme,
    getThemesFromUser,
    deleteTheme,
    updateTheme,
};
exports.default = themeRepository;
