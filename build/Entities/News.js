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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsModel = exports.News = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const schema = new mongoose_1.Schema({
    title: { type: String },
    slug: { type: String, unique: true },
    subBody: { type: String },
    body: { type: String },
    revision: { type: Boolean, required: false },
    createdAt: { type: Date },
    postedAt: { type: Date, required: false },
    author: { type: mongoose_1.default.Types.ObjectId, ref: 'm_user' },
    images: [{ type: mongoose_1.default.Types.ObjectId, ref: 'm_image' }],
    views: { type: mongoose_1.default.Types.ObjectId, ref: 'm_views' },
    categories: [{ type: mongoose_1.default.Types.ObjectId, ref: 'm_category' }]
});
class News extends mongoose_1.Model {
}
exports.News = News;
schema.loadClass(News);
const NewsModel = mongoose_1.default.model('m_news', schema);
exports.NewsModel = NewsModel;
//# sourceMappingURL=News.js.map