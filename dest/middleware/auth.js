"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    const token = req.cookies.token;
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!token) {
        res.redirect('/sign-in');
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, secret, (err, decodedToken) => {
            const userData = decodedToken.split(' ');
            const user = {
                id: userData[4].slice(10, userData[4].length - 4),
                firstName: userData[7].slice(1, userData[7].length - 3),
                lastName: userData[10].slice(1, userData[10].length - 3),
                decodedToken: decodedToken,
            };
            req.body.user = user;
        });
    }
    catch {
        res.redirect('/sign-in');
        return;
    }
    next();
}
exports.default = auth;
