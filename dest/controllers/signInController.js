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
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class signInController {
    getMethod(req, res) {
        res.render('auth/sign-in');
    }
    postMethod(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUser = yield Users_1.default.find({
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
        });
    }
}
exports.default = signInController;
