"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cSecret = exports.cKey = exports.cName = exports.secretKey = exports.version = exports.port = exports.mongoUri = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];
exports.mongoUri = `${config.url}${config.username}:${config.password}${config.cluster}/${config.collection}?${config.option}`;
exports.port = process.env.PORT || 5000;
exports.version = process.env.APP_VERSION || 'v1';
exports.secretKey = process.env.APP_SECRET_KEY || 'rahasia_bos';
exports.cName = process.env.C_NAME;
exports.cKey = process.env.C_KEY;
exports.cSecret = process.env.C_SECRET;
//# sourceMappingURL=envi.js.map