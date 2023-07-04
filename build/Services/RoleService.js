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
const Role_1 = require("../Entities/Role");
const Repository_1 = __importDefault(require("../Repositories/Repository"));
const ErrorList_1 = require("../Exceptions/ErrorList");
class RoleService {
    constructor() {
        this._role = new Repository_1.default(Role_1.RoleModel);
    }
    getOrSaveRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            if (role === null)
                throw new ErrorList_1.BadRequest('Role tidak boleh kosong');
            const findRole = yield this._role.findByCriteria({ role: role });
            if (findRole !== null)
                return findRole;
            const saveRole = yield this._role.saveModel({ role: role });
            return saveRole;
        });
    }
}
;
exports.default = RoleService;
//# sourceMappingURL=RoleService.js.map