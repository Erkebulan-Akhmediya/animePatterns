"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animeSchema = exports.episodeModel = exports.episodeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.episodeSchema = new mongoose_1.Schema({
    number: Number,
    season: {
        type: Number,
        default: 1,
    },
    url: String,
});
exports.episodeModel = (0, mongoose_1.model)('Episode', exports.episodeSchema);
exports.animeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    episodes: {
        type: [exports.episodeSchema],
        default: [],
    },
    imageUrl: String,
});
exports.default = (0, mongoose_1.model)('Anime', exports.animeSchema);
