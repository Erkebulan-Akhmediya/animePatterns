"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function adminAuth(req, res, next) {
    const adminToken = req.cookies.adminToken;
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!adminToken) {
        res.redirect('/sign-in');
        return;
    }
    try {
        console.log(jsonwebtoken_1.default.verify(adminToken, secret));
    }
    catch (_a) {
        res.redirect('/sign-in');
        return;
    }
    next();
}
exports.default = adminAuth;
