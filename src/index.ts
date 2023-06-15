import App from "./App";
import AuthController from "./Controllers/AuthController";
import { port } from "./config/envi";

const app = new App(port, [
    new AuthController()
]);
app.listen();