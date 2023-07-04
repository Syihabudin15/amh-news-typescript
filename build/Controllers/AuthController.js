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
const AuthService_1 = __importDefault(require("../Services/AuthService"));
const EHttpCode_1 = __importDefault(require("../Exceptions/EHttpCode"));
const JwtUtil_1 = __importDefault(require("../Utils/JwtUtil"));
class AuthController {
    constructor() {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const result = yield this._auth.RegisterAdmin(request);
                res.status(EHttpCode_1.default.CREATED).json({
                    code: EHttpCode_1.default.CREATED,
                    message: 'Buat akun berhasil',
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.createWriter = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const result = yield this._auth.createWriter(request);
                res.status(EHttpCode_1.default.CREATED).json({
                    code: EHttpCode_1.default.CREATED,
                    message: 'Buat akun berhasil',
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const result = yield this._auth.Login(request);
                res.status(EHttpCode_1.default.OK).json({
                    code: EHttpCode_1.default.OK,
                    message: 'Masuk berhasil',
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this._router = express_1.default.Router();
        this._auth = new AuthService_1.default();
        this._jwt = new JwtUtil_1.default();
        this.initializeController();
    }
    initializeController() {
        this._router.post('/register', this.register);
        this._router.post('/create-writer', this._jwt.verifyAdmin, this.register);
        this._router.post('/login', this.login);
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map