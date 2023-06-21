import App from "./App";
import AuthController from "./Controllers/AuthController";
import CategoryController from "./Controllers/CategoryController";
import NewsController from "./Controllers/NewsController";
import UserController from "./Controllers/UserController";
import { port } from "./config/envi";

const app = new App(port, [
    new AuthController(), new UserController(), new CategoryController(), new NewsController()
]);
app.listen();