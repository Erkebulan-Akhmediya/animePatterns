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
const express_1 = __importDefault(require("express"));
const Anime_1 = __importStar(require("../models/Anime"));
const fs_1 = __importDefault(require("fs"));
const AdminRouter = express_1.default.Router();
class adminController {
    constructor(controller) {
        adminController.controller = controller;
    }
    admin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const anime = yield Anime_1.default.find({}, { name: 1, price: 1 });
                res.render('admin/admin', { anime: anime });
            }
            catch (_a) {
                console.log('cannot retrieve records from db');
            }
        });
    }
    getAddAnime(req, res) {
        res.render('admin/addAnime');
    }
    postAddAnime(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                fs_1.default.mkdirSync(`./episodes/${req.body.name}`);
                yield Anime_1.default.create({
                    name: req.body.name,
                    description: req.body.description,
                });
                res.redirect('/admin');
            }
            catch (_a) {
                console.log('cannot add anime');
            }
        });
    }
    getUpdateAnime(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const animeID = req.params.id;
            const anime = yield Anime_1.default.findOne({ _id: animeID });
            res.render('admin/updateAnime', {
                anime: anime,
                animeID: req.params.id,
            });
        });
    }
    postUpdateAnime(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const animeID = req.params.id;
                const anime = yield Anime_1.default.findOne({ _id: animeID });
                if ((anime === null || anime === void 0 ? void 0 : anime.name) != req.body.name) {
                    fs_1.default.renameSync(`./episodes/${anime === null || anime === void 0 ? void 0 : anime.name}`, `./episodes/${req.body.name}`);
                }
                yield Anime_1.default.findOneAndUpdate({ _id: animeID }, {
                    name: req.body.name,
                    description: req.body.description,
                });
                res.redirect('/admin');
            }
            catch (_a) {
                console.log('cannot update anime');
            }
        });
    }
    addEpisode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Anime_1.default.findOneAndUpdate({ _id: req.params.id }, { $push: {
                    episodes: new Anime_1.episodeModel({
                        number: req.body.episodeNumber,
                        season: req.body.seasonNumber,
                    }),
                } });
            res.redirect('/admin/update/' + req.params.id);
        });
    }
    deleteEpisode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Anime_1.default.findOneAndUpdate({ _id: req.params.id }, { $pull: {
                    episodes: {
                        _id: req.params.episodeID,
                    },
                } });
            res.redirect('/admin/update/' + req.params.id);
        });
    }
    deleteAnime(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const animeID = req.params.id;
            const anime = yield Anime_1.default.findOne({ _id: animeID });
            yield Anime_1.default.findByIdAndRemove({ _id: anime === null || anime === void 0 ? void 0 : anime._id });
            fs_1.default.rmSync(`episodes/${anime === null || anime === void 0 ? void 0 : anime.name}`, { recursive: true, force: true });
            res.redirect('/admin');
        });
    }
    users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            adminController.controller.users(req, res);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            adminController.controller.deleteUser(req, res);
        });
    }
    getUpdateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            adminController.controller.getUpdateUser(req, res);
        });
    }
    postUpdateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            adminController.controller.postUpdateUser(req, res);
        });
    }
}
exports.default = adminController;
