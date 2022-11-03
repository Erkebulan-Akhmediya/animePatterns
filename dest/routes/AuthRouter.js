"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const signInController_1 = __importDefault(require("../controllers/signInController"));
const signUpController_1 = __importDefault(require("../controllers/signUpController"));
const AuthRouter = express_1.default.Router();
const controller = new authController_1.default(new signUpController_1.default());
AuthRouter.get('/sign-up', function (req, res, next) {
    controller.setStrategy(new signUpController_1.default());
    next();
}, controller.getMethod);
AuthRouter.post('/sign-up', function (req, res, next) {
    controller.setStrategy(new signUpController_1.default());
    next();
}, controller.postMethod);
AuthRouter.get('/sign-in', function (req, res, next) {
    controller.setStrategy(new signInController_1.default());
    next();
}, controller.getMethod);
AuthRouter.post('/sign-in', function (req, res, next) {
    controller.setStrategy(new signInController_1.default());
    next();
}, controller.postMethod);
exports.default = AuthRouter;
