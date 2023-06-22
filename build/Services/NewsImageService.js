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
const NewsImage_1 = require("../Entities/NewsImage");
const ErrorList_1 = require("../Exceptions/ErrorList");
const Repository_1 = __importDefault(require("../Repositories/Repository"));
class NewsImageService {
    constructor() {
        this._img = new Repository_1.default(NewsImage_1.NewsImageModel);
    }
    saveImage(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            if (filename === null || filename === '')
                throw new ErrorList_1.BadRequest('Gambar tidak boleh kosong');
            const result = yield this._img.saveModel({ image: filename });
            return result;
        });
    }
    saveAllImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            file.forEach((e) => __awaiter(this, void 0, void 0, function* () {
                const save = yield this._img.saveModel({ image: e.filename });
                result.push(save);
            }));
            return result;
        });
    }
}
exports.default = NewsImageService;
//# sourceMappingURL=NewsImageService.js.map