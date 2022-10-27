"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Anime_1 = __importDefault(require("../models/Anime"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: async function (req, file, cb) {
        const anime = await Anime_1.default.findOne({ _id: req.params.id });
        cb(null, `episodes/${anime?.name}`);
    },
    filename: function (req, res, cb) {
        cb(null, `season${req.body.seasonNumber}-episode${req.body.episodeNumber}.mp4`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const AdminRouter = express_1.default.Router();
const adminController_1 = __importDefault(require("../controllers/adminController"));
const controller = new adminController_1.default();
AdminRouter.get('/', controller.admin);
AdminRouter.get('/add', controller.getAddAnime);
AdminRouter.post('/add', controller.postAddAnime);
AdminRouter.get('/update/:id', controller.getUpdateAnime);
AdminRouter.post('/update/:id', controller.postUpdateAnime);
AdminRouter.post('/update/:id/episodes/add', upload.single('episode'), controller.addEpisode);
AdminRouter.post('/update/:id/:episodeID/delete', controller.deleteEpisode);
AdminRouter.post('/delete/:id', controller.deleteAnime);
AdminRouter.get('/users', controller.users);
AdminRouter.post('/users/delete/:id', controller.deleteUser);
AdminRouter.get('/users/update/:id', controller.getUpdateUser);
AdminRouter.post('/users/update/:id', controller.postUpdateUser);
exports.default = AdminRouter;
