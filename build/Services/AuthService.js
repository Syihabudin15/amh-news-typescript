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
const ERole_1 = __importDefault(require("../Entities/ERole"));
const Persistence_1 = __importDefault(require("../Repositories/Persistence"));
const Credentialservice_1 = __importDefault(require("./Credentialservice"));
const RoleService_1 = __importDefault(require("./RoleService"));
const UserService_1 = __importDefault(require("./UserService"));
const User_1 = require("../Entities/User");
const ErrorList_1 = require("../Exceptions/ErrorList");
const bcrypt_1 = __importDefault(require("bcrypt"));
const JwtUtil_1 = __importDefault(require("../Utils/JwtUtil"));
class AuthService {
    constructor() {
        this._role = new RoleService_1.default();
        this._cred = new Credentialservice_1.default();
        this._user = new UserService_1.default();
        this._jwt = new JwtUtil_1.default();
        this._persistence = new Persistence_1.default();
    }
    RegisterAdmin(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._persistence.transaction(() => __awaiter(this, void 0, void 0, function* () {
                const hashed = yield bcrypt_1.default.hash(request.password, 8);
                const role = yield this._role.getOrSaveRole(ERole_1.default.ADMIN);
                const cred = yield this._cred.createCredential({ email: request.email.toLowerCase(), password: hashed, mRoleId: role.id, m_role: role });
                const user = yield this._user.createUser({
                    first_name: request.first_name,
                    last_name: request.last_name,
                    phone: request.phone,
                    about: request.about ? request.about : `Hai Nama saya ${request.first_name} ${request.last_name}, dan saya adalah Admin`,
                    m_credential: cred
                });
                const response = {
                    name: `${user.first_name} ${user.last_name}`,
                    phone: user.phone,
                    about: user.about,
                    email: cred.email,
                    role: role
                };
                return response;
            }));
            return result;
        });
    }
    createWriter(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._persistence.transaction(() => __awaiter(this, void 0, void 0, function* () {
                const hashed = yield bcrypt_1.default.hash(request.password, 8);
                const role = yield this._role.getOrSaveRole(ERole_1.default.WRITER);
                const cred = yield this._cred.createCredential(new Credential_1.Credential({ email: request.email.toLowerCase(), password: hashed, m_role: role }));
                const user = yield this._user.createUser(new User_1.User({
                    first_name: request.first_name,
                    last_name: request.last_name,
                    phone: request.phone,
                    about: request.about ? request.about : `Hai Nama saya ${request.first_name} ${request.last_name}, dan saya seorang Penulis`,
                    m_credential: cred
                }));
                const response = {
                    name: `${user.first_name} ${user.last_name}`,
                    phone: user.phone,
                    about: user.about,
                    email: cred.email,
                    role: role
                };
                return response;
            }));
            return result;
        });
    }
    Login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((request.email || request.password) === null)
                throw new ErrorList_1.BadRequest('Email dan Password harus diisi');
            const cred = yield this._cred.getCredentialByEmail(request.email);
            const verify = yield bcrypt_1.default.compare(request.password, cred.password);
            if (cred === null || !verify)
                throw new ErrorList_1.UnAuthorize('Email atau Password salah');
            const user = yield this._user.getUserBymCredentialId(cred._id);
            const jwtToken = this._jwt.sign({ userId: user._id, email: cred.email, role: cred.m_role.role });
            const response = {
                user_id: user._id,
                name: `${user.first_name} ${user.last_name}`,
                email: cred.email,
                role: cred.m_role,
                token: jwtToken
            };
            return response;
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map