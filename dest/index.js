"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const AdminRouter_1 = __importDefault(require("./routes/AdminRouter"));
const MainRouter_1 = __importDefault(require("./routes/MainRouter"));
const AuthRouter_1 = __importDefault(require("./routes/AuthRouter"));
const AnimeRouter_1 = __importDefault(require("./routes/AnimeRouter"));
dotenv.config();
const app = app_1.default.createApp();
const port = process.env.PORT;
const connectionUrl = process.env.CONNECTION_URL;
app.addRouter('/admin', AdminRouter_1.default);
app.addRouter('/', MainRouter_1.default);
app.addRouter('/', AuthRouter_1.default);
app.addRouter('/catalogue', AnimeRouter_1.default);
async function start() {
    try {
        await mongoose_1.default.connect(connectionUrl);
        app.listen(port);
    }
    catch {
        console.log('db connection failed');
    }
}
start();
