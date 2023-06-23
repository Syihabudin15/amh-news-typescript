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
const Connection_1 = __importDefault(require("./config/Connection"));
const express_1 = __importDefault(require("express"));
const ErrorMiddleware_1 = __importDefault(require("./Exceptions/ErrorMiddleware"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const envi_1 = require("./config/envi");
const path_1 = __importDefault(require("path"));
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
        this._app.use('/img', express_1.default.static(path_1.default.join(__dirname, '/resources/img')));
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
        return __awaiter(this, void 0, void 0, function* () {
            yield this._connection.connect()
                .then(() => {
                this._app.listen(this._port, () => console.log(`App running in port: ${this._port}`));
            })
                .catch(err => {
                console.log(err);
                throw new Error('Connection timed out');
            });
        });
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map