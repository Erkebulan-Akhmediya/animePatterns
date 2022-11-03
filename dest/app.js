"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.set('views', './views');
        this.app.set('view engine', 'pug');
        this.app.use(express_1.default.static('public'));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    static createApp() {
        if (this.instance == null) {
            this.instance = new App();
        }
        return this.instance;
    }
    addRouter(path, router) {
        this.app.use(path, router);
    }
    listen(port) {
        this.app.listen(port);
    }
}
exports.default = App;
