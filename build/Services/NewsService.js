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
const News_1 = require("../Entities/News");
const ErrorList_1 = require("../Exceptions/ErrorList");
const Persistence_1 = __importDefault(require("../Repositories/Persistence"));
const Repository_1 = __importDefault(require("../Repositories/Repository"));
const JwtUtil_1 = __importDefault(require("../Utils/JwtUtil"));
const CategoryService_1 = __importDefault(require("./CategoryService"));
const NewsImageService_1 = __importDefault(require("./NewsImageService"));
const UserService_1 = __importDefault(require("./UserService"));
const ViewsService_1 = __importDefault(require("./ViewsService"));
class NewsService {
    constructor() {
        this._news = new Repository_1.default(News_1.NewsModel);
        this._img = new NewsImageService_1.default();
        this._view = new ViewsService_1.default();
        this._user = new UserService_1.default();
        this._jwt = new JwtUtil_1.default();
        this._cate = new CategoryService_1.default();
        this._persis = new Persistence_1.default();
    }
    CreateNews(req, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decode = this._jwt.decode(token);
            if ((req.title || req.body || req.subBody || req.images) === null)
                throw new ErrorList_1.BadRequest('Judul, Body, Sub body, Gambar tidak boleh kosong');
            const result = yield this._persis.transaction(() => __awaiter(this, void 0, void 0, function* () {
                let images = yield this._img.saveAllImage(req.images);
                const viewCount = yield this._view.createViews();
                const slug = req.title.replaceAll(' ', '-');
                const user = yield this._user.getUserById(decode.userId);
                if (user === null)
                    throw new ErrorList_1.NotFound('User tidak ditemukan. mohon login kembali');
                let categories = yield this._cate.getCategoryForNews(req.categories);
                const result = yield this._news.saveModel({
                    title: req.title,
                    slug: slug.toLowerCase(),
                    body: req.body,
                    subBody: req.subBody,
                    createdAt: new Date(),
                    author: user,
                    images: images,
                    views: viewCount,
                    categories: categories
                });
                return result;
            }));
            return result;
        });
    }
    getNewsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._news.findByCriteriaPopulate({ _id: id }, [
                { path: 'images' },
                { path: 'author', populate: {
                        path: 'm_credential', populate: {
                            path: 'm_role'
                        }
                    } },
                { path: 'views' },
                { path: 'categories' }
            ]);
            if (result === null)
                throw new ErrorList_1.NotFound('Berita tidak ditemukan');
            return result;
        });
    }
    getNewsBySlug(slugify) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._news.findByCriteriaPopulate({ slug: slugify }, [
                { path: 'images' },
                { path: 'author', populate: {
                        path: 'm_credential', populate: {
                            path: 'm_role'
                        }
                    } },
                { path: 'views' },
                { path: 'categories' }
            ]);
            if (result === null)
                throw new ErrorList_1.NotFound('Berita tidak ditemukan');
            return result;
        });
    }
    searchNewsByTitle(title, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const currPage = page || 1;
            const currSize = size || 5;
            const result = yield this._news.findAllCriteriaPaginatePopulate({ title: { $regex: '.*' + title + '.*' } }, currPage, currSize, [
                { path: 'images' },
                { path: 'author', populate: {
                        path: 'm_credential', populate: {
                            path: 'm_role'
                        }
                    } },
                { path: 'views' },
                { path: 'categories' }
            ]);
            const filtered = result.filter(e => e.postedAt != null);
            return filtered;
        });
    }
    searchNewsByCategoryId(cateId, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const currPage = page || 1;
            const currSize = size || 5;
            const result = yield this._news.findAllCriteriaPaginatePopulate({ 'categories._id': cateId }, currPage, currSize, [
                { path: 'images' },
                { path: 'author', populate: {
                        path: 'm_credential', populate: {
                            path: 'm_role'
                        }
                    } },
                { path: 'views' },
                { path: 'categories' }
            ]);
            const filtered = result.filter(e => e.postedAt != null);
            return filtered;
        });
    }
    searchByCategoryName(cateName, page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const currPage = page || 1;
            const currSize = size || 5;
            const result = yield this._news.findAllCriteriaPaginatePopulate({ 'categories.title': { $regex: '.*' + cateName + '.*' } }, currPage, currSize, [
                { path: 'images' },
                { path: 'author', populate: {
                        path: 'm_credential', populate: {
                            path: 'm_role'
                        }
                    } },
                { path: 'views' },
                { path: 'categories' }
            ]);
            const filtered = result.filter(e => e.postedAt != null);
            return filtered;
        });
    }
    getAllNews(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const currPage = page || 1;
            const currSize = size || 5;
            const result = yield this._news.findAllPaginatePopulate(currPage, currSize, [
                { path: 'images' },
                { path: 'author', populate: {
                        path: 'm_credential', populate: {
                            path: 'm_role'
                        }
                    } },
                { path: 'views' },
                { path: 'categories' }
            ]);
            const filtered = result.filter(e => e.postedAt != null);
            return filtered;
        });
    }
    getAllNotPosted(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const currPage = page || 1;
            const currSize = size || 5;
            const result = yield this._news.findAllPaginatePopulate(currPage, currSize, [
                { path: 'images' },
                { path: 'author', populate: {
                        path: 'm_credential', populate: {
                            path: 'm_role'
                        }
                    } },
                { path: 'views' },
                { path: 'categories' }
            ]);
            const filtered = result.filter(e => !e.postedAt);
            return filtered;
        });
    }
    updateStatusPosted(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this._news.findById(id);
            if (find === null)
                throw new ErrorList_1.NotFound('Berita yg anda pilih tidak valid');
            if (find.postedAt)
                throw new Error('Berita sudah di posting');
            const result = yield this._news.updateModelById(id, { postedAt: new Date() });
            if (!result)
                throw new Error('Internal Server Error');
            return find;
        });
    }
    cancelPosted(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this._news.findById(id);
            if (find === null)
                throw new ErrorList_1.NotFound('Berita yg anda pilih tidak valid');
            if (find.postedAt === null)
                throw new Error('Berita berada dalam Review Postingan');
            const result = yield this._news.updateModelById(id, { postedAt: null });
            if (!result)
                throw new Error('Internal Server Error');
            return find;
        });
    }
}
exports.default = NewsService;
//# sourceMappingURL=NewsService.js.map