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
const Views_1 = require("../Entities/Views");
const ErrorList_1 = require("../Exceptions/ErrorList");
const Repository_1 = __importDefault(require("../Repositories/Repository"));
class ViewsService {
    constructor() {
        this._views = new Repository_1.default(Views_1.ViewsModel);
    }
    createViews() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._views.saveModel({ count: 0 });
            return result;
        });
    }
    updateViews(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === null)
                throw new ErrorList_1.NotFound('View tidak ditemukan');
            const result = yield this._views.findById(id);
            if (result === null)
                throw new ErrorList_1.NotFound('View tidak ditemukan');
            yield this._views.updateModelById(id, { count: result.count + 1 });
            return result;
        });
    }
}
exports.default = ViewsService;
//# sourceMappingURL=ViewsService.js.map