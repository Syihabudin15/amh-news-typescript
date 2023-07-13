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
const Category_1 = require("../Entities/Category");
const ErrorList_1 = require("../Exceptions/ErrorList");
const Repository_1 = __importDefault(require("../Repositories/Repository"));
class CategoryService {
    constructor() {
        this._category = new Repository_1.default(Category_1.CategoryModel);
    }
    createCategory(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((req.title || req.image) === null || req.image === '')
                throw new ErrorList_1.BadRequest('Nama Kategori, Sub Body, Gambar tidak boleh kosong');
            const category = yield this._category.saveModel({
                title: req.title,
                image: req.image
            });
            return category;
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._category.findById(id);
            if (result === null)
                throw new ErrorList_1.NotFound('Kategori tidak ditemukan');
            return result;
        });
    }
    SearchCategory(search) {
        return __awaiter(this, void 0, void 0, function* () {
            if (search === null)
                throw new ErrorList_1.BadRequest('Masukan nama kategory');
            const result = yield this._category.findAllCriteria({ title: { $regex: '.*' + search + '.*' } });
            return result;
        });
    }
    getAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._category.findAll();
            return result;
        });
    }
    getCategoryForNews(cateIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            for (let i = 0; i < cateIds.length; i++) {
                const find = yield this._category.findById(cateIds[i]);
                result.push(find);
            }
            return result;
        });
    }
}
exports.default = CategoryService;
//# sourceMappingURL=CategoryService.js.map