"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Anime_1 = __importDefault(require("../models/Anime"));
const Users_1 = __importDefault(require("../models/Users"));
const auth_1 = __importDefault(require("../middleware/auth"));
const AnimeRouter = express_1.default.Router();
AnimeRouter.get('/', async (req, res) => {
    res.render('catalogue', { anime: await Anime_1.default.find({}, { name: 1, price: 1 }) });
});
AnimeRouter.get('/:id', async (req, res) => {
    const animeID = req.params.id;
    const anime = await Anime_1.default.findOne({ _id: animeID });
    res.render('anime', {
        anime: anime,
        animeID: animeID,
    });
});
AnimeRouter.post('/:id/planning', auth_1.default, async (req, res) => {
    const animeID = req.params.id;
    const anime = await Anime_1.default.findOne({ _id: animeID });
    await Users_1.default.findOneAndUpdate({ _id: req.body.user.id }, { $push: {
            planning: anime
        } });
    res.redirect('/catalogue/' + animeID);
});
AnimeRouter.post('/:id/planning/remove', auth_1.default, async (req, res) => {
    const animeID = req.params.id;
    const anime = await Anime_1.default.findOne({ _id: animeID });
    await Users_1.default.findOneAndUpdate({ _id: req.body.user.id }, { $pull: {
            planning: anime
        } });
    res.redirect('/profile');
});
AnimeRouter.post('/:id/like', auth_1.default, async (req, res) => {
    const animeID = req.params.id;
    const anime = await Anime_1.default.findOne({ _id: animeID });
    await Users_1.default.findOneAndUpdate({ _id: req.body.user.id }, { $push: {
            liked: anime
        } });
    res.redirect('/catalogue/' + animeID);
});
AnimeRouter.post('/:id/like/remove', auth_1.default, async (req, res) => {
    const animeID = req.params.id;
    const anime = await Anime_1.default.findOne({ _id: animeID });
    await Users_1.default.findOneAndUpdate({ _id: req.body.user.id }, { $pull: {
            liked: anime
        } });
    res.redirect('/profile');
});
exports.default = AnimeRouter;
