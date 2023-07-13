"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envi_1 = require("../config/envi");
const ErrorList_1 = require("../Exceptions/ErrorList");
const ERole_1 = __importDefault(require("../Entities/ERole"));
class JwtUtil {
    sign(jwtType) {
        const token = jsonwebtoken_1.default.sign(jwtType, envi_1.secretKey, { expiresIn: '48h' });
        return token;
    }
    verifyAdmin(req, res, next) {
        const token = req.header('token') || '';
        if (token === '')
            throw new ErrorList_1.Forbiden('Mohon Login');
        const verify = jsonwebtoken_1.default.verify(token, envi_1.secretKey);
        if (!verify)
            throw new ErrorList_1.Forbiden('Token tidak valid. Silahkan Masuk kembali');
        const decode = jsonwebtoken_1.default.decode(token);
        const claims = JSON.parse(JSON.stringify(decode));
        if (claims.role !== ERole_1.default.ADMIN)
            throw new ErrorList_1.Forbiden('Anda tidak diizinkan mengakses fitur ini');
        next();
    }
    verify(req, res, next) {
        const token = req.header('token') || '';
        if (token === '')
            throw new ErrorList_1.Forbiden('Mohon Login');
        const verify = jsonwebtoken_1.default.verify(token, envi_1.secretKey);
        if (!verify)
            throw new ErrorList_1.Forbiden('Token tidak valid. Silahkan Masuk kembali');
        next();
    }
    decode(token) {
        const decode = jsonwebtoken_1.default.decode(token);
        const result = JSON.parse(JSON.stringify(decode));
        return result;
    }
}
exports.default = JwtUtil;
//# sourceMappingURL=JwtUtil.js.map