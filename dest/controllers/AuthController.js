"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class authController {
    constructor() { }
    getSignUp(req, res) {
        res.render('auth/sign-up');
    }
    async postSignUp(req, res) {
        await Users_1.default.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });
        res.redirect('/sign-in');
    }
    getSignIn(req, res) {
        res.render('auth/sign-in');
    }
    async postSignIn(req, res) {
        try {
            const foundUser = await Users_1.default.find({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
            });
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const token = jsonwebtoken_1.default.sign(foundUser.toString(), secret);
            res.clearCookie('token');
            res.cookie('token', token, { maxAge: 15 * 60 * 1000 });
            res.redirect('/profile');
        }
        catch (e) {
            res.send('Incorrect User Data');
        }
    }
}
exports.default = authController;
