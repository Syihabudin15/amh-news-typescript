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
const mongoose_1 = __importDefault(require("mongoose"));
class Persistence {
    constructor() {
        this._context = mongoose_1.default.connection;
    }
    transaction(func) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield this._context.startSession();
            try {
                t.startTransaction();
                const result = yield func(t);
                yield t.commitTransaction();
                return result;
            }
            catch (_a) {
                t.abortTransaction();
            }
        });
    }
}
exports.default = Persistence;
//# sourceMappingURL=Persistence.js.map