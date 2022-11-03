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
const express_1 = __importDefault(require("express"));
const Users_1 = __importDefault(require("../models/Users"));
const auth_1 = __importDefault(require("../middleware/auth"));
const fs_1 = __importDefault(require("fs"));
const Anime_1 = __importDefault(require("../models/Anime"));
const MainRouter = express_1.default.Router();
MainRouter.get('/profile', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Users_1.default.find({ _id: req.body.user.id }, { planning: 1, liked: 1 });
    res.render('profile', {
        user: req.body.user,
        planning: cart[0].planning,
        liked: cart[0].liked,
    });
}));
MainRouter.get('/', (req, res) => {
    res.render('welcome');
});
MainRouter.get('/video/:animeID/:episodeID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const animeID = req.params.animeID;
    let anime = yield Anime_1.default.findOne({ _id: animeID });
    const episodeID = req.params.episodeID;
    let episode = null;
    for (let i = 0; i < (anime === null || anime === void 0 ? void 0 : anime.episodes.length); i++) {
        if (anime.episodes[i]._id == episodeID) {
            episode = anime.episodes[i];
        }
    }
    const videoPath = 'episodes/' + anime.name + '/season' + episode.season + '-episode' + episode.number + '.mp4';
    try {
        const videoSize = fs_1.default.statSync(videoPath).size;
        const CHUNK_SIZE = Math.pow(10, 6);
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, headers);
        const videoStream = fs_1.default.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
    }
    catch (_a) {
        res.send('file not found');
    }
}));
exports.default = MainRouter;
