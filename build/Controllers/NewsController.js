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
const express_1 = __importDefault(require("express"));
const NewsService_1 = __importDefault(require("../Services/NewsService"));
const JwtUtil_1 = __importDefault(require("../Utils/JwtUtil"));
const EHttpCode_1 = __importDefault(require("../Exceptions/EHttpCode"));
const CloudService_1 = __importDefault(require("../Services/CloudService"));
class NewsController {
    constructor() {
        this._path = '/news';
        this.createNews = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const token = req.header('token');
                const url = yield this._file.saveImage(request.image);
                const cate = req.body.categories.split(',');
                request.image = url;
                request.categories = cate;
                const result = yield this._news.CreateNews(request, token);
                res.status(EHttpCode_1.default.CREATED).json({
                    msg: 'Berhasil buat berita',
                    code: EHttpCode_1.default.CREATED,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.saveImage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const image = req.body.image;
                const result = yield this._file.saveImage(image);
                res.status(EHttpCode_1.default.CREATED).json({
                    msg: 'berhasil menyimpan Image',
                    code: 201,
                    data: { url: result }
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllNews = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, size } = req.query;
                const result = yield this._news.getAllNews(parseInt(page), parseInt(size));
                res.status(EHttpCode_1.default.OK).json({
                    msg: 'Berhasil ambil data',
                    code: EHttpCode_1.default.OK,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getNewsBySlug = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const slug = req.params.slug;
                const result = yield this._news.getNewsBySlug(slug);
                res.status(EHttpCode_1.default.OK).json({
                    msg: 'Berhasil',
                    code: EHttpCode_1.default.OK,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.searchByTitle = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const title = req.query.title;
                const { page, size } = req.query;
                const result = yield this._news.searchNewsByTitle(title, page, size);
                res.status(EHttpCode_1.default.OK).json({
                    msg: 'berhasil',
                    code: EHttpCode_1.default.OK,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllByCateId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cateId = req.query.cateId;
                const { page, size } = req.query;
                const result = yield this._news.searchNewsByCategoryId(cateId, page, size);
                res.status(EHttpCode_1.default.OK).json({
                    msg: 'berhasil',
                    code: EHttpCode_1.default.OK,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getNotPostedNews = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, size } = req.query;
                const result = yield this._news.getAllNotPosted(page, size);
                res.status(EHttpCode_1.default.OK).json({
                    msg: 'Berhasil',
                    code: EHttpCode_1.default.OK,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateStatusPosted = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this._news.updateStatusPosted(id);
                res.status(EHttpCode_1.default.OK).json({
                    msg: 'Berita berhasil diposting',
                    code: EHttpCode_1.default.OK,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.cancelPosted = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this._news.cancelPosted(id);
                res.status(EHttpCode_1.default.OK).json({
                    msg: 'Membatalkan postingan berita berhasil',
                    code: EHttpCode_1.default.OK,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this._router = express_1.default.Router();
        this._news = new NewsService_1.default();
        this._jwt = new JwtUtil_1.default();
        this._file = new CloudService_1.default();
        this.initializeRouter();
    }
    initializeRouter() {
        this._router.post(this._path, this._jwt.verify, this.createNews);
        this._router.post(`${this._path}/save-image`, this._jwt.verify, this.saveImage);
        this._router.get(this._path, this.getAllNews);
        this._router.get(`${this._path}/slug/:slug`, this.getNewsBySlug);
        this._router.get(`${this._path}/title`, this.searchByTitle);
        this._router.get(`${this._path}/category`, this.getAllByCateId);
        this._router.get(`${this._path}/unposted`, this._jwt.verify, this.getNotPostedNews);
        this._router.patch(`${this._path}/status/:id`, this._jwt.verifyAdmin, this.updateStatusPosted);
        this._router.patch(`${this._path}/cancel/:id`, this._jwt.verifyAdmin, this.cancelPosted);
    }
}
exports.default = NewsController;
//# sourceMappingURL=NewsController.js.map