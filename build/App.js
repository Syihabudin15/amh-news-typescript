"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = __importDefault(require("./config/Connection"));
const express_1 = __importDefault(require("express"));
const ErrorMiddleware_1 = __importDefault(require("./Exceptions/ErrorMiddleware"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const envi_1 = require("./config/envi");
class App {
    constructor(port, controllers) {
        this._v = envi_1.version;
        this._port = port;
        this._connection = new Connection_1.default();
        this._app = (0, express_1.default)();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorMiddleware();
    }
    initializeMiddleware() {
        this._app.use(body_parser_1.default.json());
        this._app.use((0, cors_1.default)());
        this._app.use(express_1.default.json());
    }
    initializeControllers(controllers) {
        controllers.forEach(controller => {
            this._app.use(`/api/${this._v}`, controller._router);
        });
    }
    initializeErrorMiddleware() {
        this._app.use(ErrorMiddleware_1.default);
    }
    listen() {
        this._connection.connect()
            .then(() => {
            this._app.listen(this._port, () => console.log(`App running in port: ${this._port}`));
        })
            .catch(err => {
            console.log(err);
        });
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map