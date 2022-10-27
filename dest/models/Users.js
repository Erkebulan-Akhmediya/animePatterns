"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Anime_1 = require("./Anime");
const schema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: String,
    password: {
        type: String,
        required: true,
    },
    planning: {
        type: [Anime_1.animeSchema],
        default: [],
    },
    liked: {
        type: [Anime_1.animeSchema],
        default: [],
    }
});
exports.default = (0, mongoose_1.model)('Users', schema);
