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
const UserService_1 = __importDefault(require("../Services/UserService"));
const EHttpCode_1 = __importDefault(require("../Exceptions/EHttpCode"));
const JwtUtil_1 = __importDefault(require("../Utils/JwtUtil"));
class UserController {
    constructor() {
        this.getUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.params.id;
                const result = yield this._user.getUserById(request);
                res.status(EHttpCode_1.default.OK).json({
                    msg: 'Berhasil',
                    code: EHttpCode_1.default.OK,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getUserByToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.header('token');
                const decode = this._jwt.decode(request);
                const result = yield this._user.getUserById(decode.userId);
                res.status(EHttpCode_1.default.OK).json({
                    msg: 'Berhasil',
                    code: EHttpCode_1.default.OK,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._user.getAllUser();
                res.status(EHttpCode_1.default.OK).json({
                    msg: 'Berhasil',
                    code: EHttpCode_1.default.OK,
                    data: result
                });
            }
            catch (error) {
                next(error);
            }
        });
        this._user = new UserService_1.default();
        this._router = express_1.default.Router();
        this._jwt = new JwtUtil_1.default();
        this.initializeRouter();
    }
    initializeRouter() {
        this._router.get('/users', this.getAllUser);
        this._router.get('/user/:id', this.getUserById);
        this._router.get('/user', this.getUserByToken);
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map