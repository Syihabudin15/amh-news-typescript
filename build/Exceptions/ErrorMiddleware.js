"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ErrorMiddleware(err, req, res, next) {
    const code = err.code || 500;
    const message = err.message || 'Internal server error';
    return res.status(code).json({ code, message });
}
;
exports.default = ErrorMiddleware;
//# sourceMappingURL=ErrorMiddleware.js.map