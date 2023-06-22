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
const Credential_1 = require("../Entities/Credential");
const ErrorList_1 = require("../Exceptions/ErrorList");
const Repository_1 = __importDefault(require("../Repositories/Repository"));
class CredentialService {
    constructor() {
        this._cred = new Repository_1.default(Credential_1.CredentialModel);
    }
    createCredential(cred) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cred.email === null || cred.password === null || cred.password.length < 6)
                throw new ErrorList_1.BadRequest('Email atau Password tidak sesuai ketentuan');
            const result = yield this._cred.saveModel(cred);
            return result;
        });
    }
    getCredentialByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (email === null)
                throw new ErrorList_1.BadRequest('Email tidak boleh kosong');
            const result = yield this._cred.findByCriteriaPopulate({ email: email }, ['m_role']);
            if (result === null)
                throw new ErrorList_1.UnAuthorize('Email atau Password salah');
            return result;
        });
    }
}
exports.default = CredentialService;
//# sourceMappingURL=Credentialservice.js.map