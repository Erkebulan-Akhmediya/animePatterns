"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const animeController_1 = __importDefault(require("../controllers/animeController"));
const AnimeRouter = express_1.default.Router();
const controller = new animeController_1.default();
AnimeRouter.get('/', controller.catalogue);
AnimeRouter.get('/:id', controller.anime);
AnimeRouter.get('/:id/:episodeID', controller.episode);
AnimeRouter.post('/:id/planning', auth_1.default, controller.addPlanning);
AnimeRouter.post('/:id/planning/remove', auth_1.default, controller.removePlanning);
AnimeRouter.post('/:id/like', auth_1.default, controller.addLike);
AnimeRouter.post('/:id/like/remove', auth_1.default, controller.removelike);
exports.default = AnimeRouter;
