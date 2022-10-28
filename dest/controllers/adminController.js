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
const express_1 = __importDefault(require("express"));
const Anime_1 = __importStar(require("../models/Anime"));
const Users_1 = __importDefault(require("../models/Users"));
const fs_1 = __importDefault(require("fs"));
const AdminRouter = express_1.default.Router();
class adminController {
    constructor() { }
    async admin(req, res) {
        try {
            const anime = await Anime_1.default.find({}, { name: 1, price: 1 });
            res.render('admin/admin', { anime: anime });
        }
        catch {
            console.log('cannot retrieve records from db');
        }
    }
    getAddAnime(req, res) {
        res.render('admin/addAnime');
    }
    async postAddAnime(req, res) {
        try {
            fs_1.default.mkdirSync(`./episodes/${req.body.name}`);
            await Anime_1.default.create({
                name: req.body.name,
                description: req.body.description,
            });
            res.redirect('/admin');
        }
        catch {
            console.log('cannot add anime');
        }
    }
    async getUpdateAnime(req, res) {
        const animeID = req.params.id;
        const anime = await Anime_1.default.findOne({ _id: animeID });
        res.render('admin/updateAnime', {
            anime: anime,
            animeID: req.params.id,
        });
    }
    async postUpdateAnime(req, res) {
        try {
            const animeID = req.params.id;
            const anime = await Anime_1.default.findOne({ _id: animeID });
            if (anime?.name != req.body.name) {
                fs_1.default.renameSync(`./episodes/${anime?.name}`, `./episodes/${req.body.name}`);
            }
            await Anime_1.default.findOneAndUpdate({ _id: animeID }, {
                name: req.body.name,
                description: req.body.description,
            });
            res.redirect('/admin');
        }
        catch {
            console.log('cannot update anime');
        }
    }
    async addEpisode(req, res) {
        await Anime_1.default.findOneAndUpdate({ _id: req.params.id }, { $push: {
                episodes: new Anime_1.episodeModel({
                    low: '123',
                    medium: '123',
                    high: '123',
                    number: req.body.episodeNumber,
                    season: req.body.seasonNumber,
                }),
            } });
        res.redirect('/admin/update/' + req.params.id);
    }
    async deleteEpisode(req, res) {
        await Anime_1.default.findOneAndUpdate({ _id: req.params.id }, { $pull: {
                episodes: {
                    _id: req.params.episodeID,
                },
            } });
        res.redirect('/admin/update/' + req.params.id);
    }
    async deleteAnime(req, res) {
        const animeID = req.params.id;
        const anime = await Anime_1.default.findOne({ _id: animeID });
        await Anime_1.default.findByIdAndRemove({ _id: anime?._id });
        fs_1.default.rmSync(`episodes/${anime?.name}`, { recursive: true, force: true });
        res.redirect('/admin');
    }
    async users(req, res) {
        const users = await Users_1.default.find();
        res.render('admin/users', { users: users });
    }
    async deleteUser(req, res) {
        const user = await Users_1.default.find();
        const userID = req.params.id;
        await Users_1.default.findOneAndDelete({ firstName: user[userID].firstName });
        res.redirect('/admin/users');
    }
    async getUpdateUser(req, res) {
        const user = await Users_1.default.find();
        const userID = req.params.id;
        res.render('admin/updateUsers', {
            user: user[userID],
            userID: req.params.id,
        });
    }
    async postUpdateUser(req, res) {
        const user = await Users_1.default.find();
        const userID = req.params.id;
        await Users_1.default.findOneAndUpdate({ firstName: user[userID].firstName }, { $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            } });
        res.redirect('/admin/users');
    }
}
exports.default = adminController;
