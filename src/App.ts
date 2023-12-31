import { Application } from "express";
import Connection from "./config/Connection";
import Express from "express";
import ErrorMiddleware from "./Exceptions/ErrorMiddleware";
import BodyParser from "body-parser";
import { version } from './config/envi';
import path from "path";
import cors from 'cors';


class App{
    _port: number | string;
    _connection: Connection;
    _app: Application;
    _v: string = version;

    constructor(port: number | string, controllers: any[]){
        this._port = port;
        this._connection = new Connection();
        this._app = Express();

        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorMiddleware()
    }

    initializeMiddleware(){
        this._app.use(cors());
        this._app.use(Express.json());
        this._app.use(BodyParser.json());
        this._app.use(BodyParser.urlencoded());
        this._app.use(BodyParser.urlencoded({extended: true}));
    }

    initializeControllers(controllers: any[]){
        controllers.forEach(controller => {
            this._app.use(`/api/${this._v}`, controller._router);
        });
    }

    initializeErrorMiddleware(){
        this._app.use(ErrorMiddleware);
    }

    async listen(){
        await this._connection.connect()
        .then(() => {
            this._app.listen(this._port, () => console.log(`App running in port: ${this._port}`));
        })
        .catch(err => {
            console.log(err);
            throw new Error('Connection timed out');
        });
    }
}

export default App;