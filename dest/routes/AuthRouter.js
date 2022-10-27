"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const AuthRouter = express_1.default.Router();
const controller = new authController_1.default();
AuthRouter.get('/sign-up', controller.getSignUp);
AuthRouter.post('/sign-up', controller.postSignUp);
AuthRouter.get('/sign-in', controller.getSignIn);
AuthRouter.post('/sign-in', controller.postSignIn);
exports.default = AuthRouter;
