"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = exports.Forbiden = exports.UnAuthorize = exports.BadRequest = void 0;
const CustomError_1 = __importDefault(require("./CustomError"));
const EHttpCode_1 = __importDefault(require("./EHttpCode"));
class BadRequest extends CustomError_1.default {
    constructor(message) {
        super(EHttpCode_1.default.BAD_REQUEST, message);
        this.code = EHttpCode_1.default.BAD_REQUEST;
        this.message = message;
    }
}
exports.BadRequest = BadRequest;
class UnAuthorize extends CustomError_1.default {
    constructor(message) {
        super(EHttpCode_1.default.UN_AUTHORIZE, message);
        this.code = EHttpCode_1.default.UN_AUTHORIZE;
        this.message = message;
    }
}
exports.UnAuthorize = UnAuthorize;
class Forbiden extends CustomError_1.default {
    constructor(message) {
        super(EHttpCode_1.default.FORBIDEN, message);
        this.code = EHttpCode_1.default.FORBIDEN;
        this.message = message;
    }
}
exports.Forbiden = Forbiden;
class NotFound extends CustomError_1.default {
    constructor(message) {
        super(EHttpCode_1.default.NOT_FOUND, message);
        this.code = EHttpCode_1.default.NOT_FOUND;
        this.message = message;
    }
}
exports.NotFound = NotFound;
//# sourceMappingURL=ErrorList.js.map