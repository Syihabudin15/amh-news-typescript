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
const User_1 = require("../Entities/User");
const ErrorList_1 = require("../Exceptions/ErrorList");
const Repository_1 = __importDefault(require("../Repositories/Repository"));
class UserService {
    constructor() {
        this._user = new Repository_1.default(User_1.UserModel);
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((user.first_name || user.last_name || user.phone) === null)
                throw new ErrorList_1.BadRequest('Mohon masukan Nama depan, belakang, dan No Telepon anda');
            const result = yield this._user.saveModel(user);
            return result;
        });
    }
    getUserBymCredentialId(credId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._user.findByCriteria({ m_credential: credId });
            if (result === null)
                throw new ErrorList_1.NotFound('Data tidak ditemukan');
            return result;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === null)
                throw new ErrorList_1.BadRequest('Bad Request');
            const result = yield this._user.findByCriteriaPopulate({ _id: id }, { path: 'm_credential', populate: { path: 'm_role' } });
            if (result === null)
                throw new ErrorList_1.NotFound('Data tidak ditemukan');
            return result;
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._user.findAllPopulate({ path: 'm_credential', populate: { path: 'm_role' } });
            return result;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map