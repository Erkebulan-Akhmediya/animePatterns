"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Anime_1 = __importDefault(require("../models/Anime"));
const Users_1 = __importDefault(require("../models/Users"));
class animeController {
    constructor() { }
    catalogue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('catalogue', { anime: yield Anime_1.default.find({}) });
        });
    }
    anime(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const animeID = req.params.id;
            const anime = yield Anime_1.default.findOne({ _id: animeID });
            res.render('anime', {
                anime: anime,
                animeID: animeID,
            });
        });
    }
    episode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const animeID = req.params.id;
            let anime = yield Anime_1.default.findOne({ _id: animeID });
            const episodeID = req.params.episodeID;
            let episode = null;
            for (let i = 0; i < (anime === null || anime === void 0 ? void 0 : anime.episodes.length); i++) {
                if (anime.episodes[i]._id == episodeID) {
                    episode = anime.episodes[i];
                }
            }
            res.render('episode', {
                episode: episode,
                anime: anime,
            });
        });
    }
    addPlanning(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const animeID = req.params.id;
            const anime = yield Anime_1.default.findOne({ _id: animeID });
            yield Users_1.default.findOneAndUpdate({ _id: req.body.user.id }, { $push: {
                    planning: animeID
                } });
            res.redirect('/catalogue/' + animeID);
        });
    }
    removePlanning(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const animeID = req.params.id;
            const anime = yield Anime_1.default.findOne({ _id: animeID });
            yield Users_1.default.findOneAndUpdate({ _id: req.body.user.id }, { $pull: {
                    planning: animeID
                } });
            res.redirect('/profile');
        });
    }
    addLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const animeID = req.params.id;
            const anime = yield Anime_1.default.findOne({ _id: animeID });
            yield Users_1.default.findOneAndUpdate({ _id: req.body.user.id }, { $push: {
                    liked: animeID
                } });
            res.redirect('/catalogue/' + animeID);
        });
    }
    removelike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const animeID = req.params.id;
            const anime = yield Anime_1.default.findOne({ _id: animeID });
            yield Users_1.default.findOneAndUpdate({ _id: req.body.user.id }, { $pull: {
                    liked: animeID
                } });
            res.redirect('/profile');
        });
    }
}
exports.default = animeController;
