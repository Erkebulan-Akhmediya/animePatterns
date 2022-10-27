"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Anime_1 = __importDefault(require("../models/Anime"));
const Users_1 = __importDefault(require("../models/Users"));
class animeController {
    constructor() { }
    async catalogue(req, res) {
        res.render('catalogue', { anime: await Anime_1.default.find({}, { name: 1, price: 1 }) });
    }
    async anime(req, res) {
        const animeID = req.params.id;
        const anime = await Anime_1.default.findOne({ _id: animeID });
        res.render('anime', {
            anime: anime,
            animeID: animeID,
        });
    }
    async episode(req, res) {
        const animeID = req.params.id;
        let anime = await Anime_1.default.findOne({ _id: animeID });
        const episodeID = req.params.episodeID;
        let episode = null;
        for (let i = 0; i < anime?.episodes.length; i++) {
            if (anime.episodes[i]._id == episodeID) {
                episode = anime.episodes[i];
            }
        }
        res.render('episode', {
            episode: episode,
            anime: anime,
        });
    }
    async addPlanning(req, res) {
        const animeID = req.params.id;
        const anime = await Anime_1.default.findOne({ _id: animeID });
        await Users_1.default.findOneAndUpdate({ _id: req.body.user.id }, { $push: {
                planning: anime
            } });
        res.redirect('/catalogue/' + animeID);
    }
    async removePlanning(req, res) {
        const animeID = req.params.id;
        const anime = await Anime_1.default.findOne({ _id: animeID });
        await Users_1.default.findOneAndUpdate({ _id: req.body.user.id }, { $pull: {
                planning: anime
            } });
        res.redirect('/profile');
    }
    async addLike(req, res) {
        const animeID = req.params.id;
        const anime = await Anime_1.default.findOne({ _id: animeID });
        await Users_1.default.findOneAndUpdate({ _id: req.body.user.id }, { $push: {
                liked: anime
            } });
        res.redirect('/catalogue/' + animeID);
    }
    async removelike(req, res) {
        const animeID = req.params.id;
        const anime = await Anime_1.default.findOne({ _id: animeID });
        await Users_1.default.findOneAndUpdate({ _id: req.body.user.id }, { $pull: {
                liked: anime
            } });
        res.redirect('/profile');
    }
}
exports.default = animeController;
