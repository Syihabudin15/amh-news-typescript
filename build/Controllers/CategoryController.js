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
const CategoryService_1 = __importDefault(require("../Services/CategoryService"));
const EHttpCode_1 = __importDefault(require("../Exceptions/EHttpCode"));
const FileService_1 = __importDefault(require("../Services/FileService"));
const JwtUtil_1 = __importDefault(require("../Utils/JwtUtil"));
class CategoryController {
    constructor() {
        this._path = '/category';
        this.createCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const request = req.body;
                const image = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || '';
                request.image = image;
                const result = yield this._category.createCategory(request);
                res.status(EHttpCode_1.default.CREATED).json({
                    msg: 'Berhasil membuat Kategori',
                    code: EHttpCode_1.default.CREATED,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.searchCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const search = req.query.search;
                const result = yield this._category.SearchCategory(search === null || search === void 0 ? void 0 : search.toString());
                res.status(EHttpCode_1.default.OK).json({
                    code: EHttpCode_1.default.OK,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._category.getAllCategory();
                res.status(EHttpCode_1.default.OK).json({
                    code: EHttpCode_1.default.OK,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this._router = express_1.default.Router();
        this._category = new CategoryService_1.default();
        this._file = new FileService_1.default();
        this._jwt = new JwtUtil_1.default();
        this.initializeRouter();
    }
    initializeRouter() {
        this._router.post(this._path, this._jwt.verifyAdmin, this._file._file.single('image'), this.createCategory);
        this._router.get(this._path, this.getAllCategory);
        this._router.get(`${this._path}/find`, this.searchCategory);
    }
}
exports.default = CategoryController;
//# sourceMappingURL=CategoryController.js.map