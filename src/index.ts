import App from "./App";
import AuthController from "./Controllers/AuthController";
import UserController from "./Controllers/UserController";
import { port } from "./config/envi";

const app = new App(port, [
    new AuthController(), new UserController()
]);
app.listen();