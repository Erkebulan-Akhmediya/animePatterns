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
const Anime_1 = __importDefault(require("../models/Anime"));
const multer_1 = __importDefault(require("multer"));
const userController_1 = __importDefault(require("../controllers/userController"));
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const anime = yield Anime_1.default.findOne({ _id: req.params.id });
            cb(null, `public/images/`);
        });
    },
    filename: function (req, res, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const anime = yield Anime_1.default.findOne({ _id: req.params.id });
            cb(null, `${anime === null || anime === void 0 ? void 0 : anime.name}.jpg`);
        });
    }
});
const episodeStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const anime = yield Anime_1.default.findOne({ _id: req.params.id });
            cb(null, `episodes/${anime === null || anime === void 0 ? void 0 : anime.name}`);
        });
    },
    filename: function (req, res, cb) {
        cb(null, `season${req.body.seasonNumber}-episode${req.body.episodeNumber}.mp4`);
    }
});
const uploadEpisode = (0, multer_1.default)({ storage: episodeStorage });
const uploadImage = (0, multer_1.default)({ storage: imageStorage });
const AdminRouter = express_1.default.Router();
const adminController_1 = __importDefault(require("../controllers/adminController"));
const controller = new adminController_1.default(new userController_1.default());
AdminRouter.get('/', controller.admin);
AdminRouter.get('/add', controller.getAddAnime);
AdminRouter.post('/add', controller.postAddAnime);
AdminRouter.get('/update/:id', controller.getUpdateAnime);
AdminRouter.post('/update/:id', uploadImage.single('image'), controller.postUpdateAnime);
AdminRouter.post('/update/:id/episodes/add', uploadEpisode.single('episode'), controller.addEpisode);
AdminRouter.post('/update/:id/:episodeID/delete', controller.deleteEpisode);
AdminRouter.post('/delete/:id', controller.deleteAnime);
AdminRouter.get('/users', controller.users);
AdminRouter.post('/users/delete/:id', controller.deleteUser);
AdminRouter.get('/users/update/:id', controller.getUpdateUser);
AdminRouter.post('/users/update/:id', controller.postUpdateUser);
exports.default = AdminRouter;
