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
class userController {
    constructor() { }
    users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield Users_1.default.find();
            res.render('admin/users', { users: users });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Users_1.default.find();
            const userID = req.params.id;
            yield Users_1.default.findOneAndDelete({ firstName: user[userID].firstName });
            res.redirect('/admin/users');
        });
    }
    getUpdateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Users_1.default.find();
            const userID = req.params.id;
            res.render('admin/updateUsers', {
                user: user[userID],
                userID: req.params.id,
            });
        });
    }
    postUpdateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Users_1.default.find();
            const userID = req.params.id;
            yield Users_1.default.findOneAndUpdate({ firstName: user[userID].firstName }, { $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                } });
            res.redirect('/admin/users');
        });
    }
}
exports.default = userController;
