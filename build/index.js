"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
const AuthController_1 = __importDefault(require("./Controllers/AuthController"));
const CategoryController_1 = __importDefault(require("./Controllers/CategoryController"));
const NewsController_1 = __importDefault(require("./Controllers/NewsController"));
const UserController_1 = __importDefault(require("./Controllers/UserController"));
const envi_1 = require("./config/envi");
const app = new App_1.default(envi_1.port, [
    new AuthController_1.default(), new UserController_1.default(), new CategoryController_1.default(), new NewsController_1.default()
]);
app.listen();
//# sourceMappingURL=index.js.map