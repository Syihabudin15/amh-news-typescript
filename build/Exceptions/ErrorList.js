"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const CustomError_1 = __importDefault(require("./CustomError"));
class BadRequest extends CustomError_1.default {
    constructor(message) {
        super(EHttpCode.BAD_REQUEST, message);
        this.code = EHttpCode.BAD_REQUEST;
        this.message = message;
    }
}
exports.BadRequest = BadRequest;
//# sourceMappingURL=ErrorList.js.map