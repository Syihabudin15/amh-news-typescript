import Express, { NextFunction, Request, Response, Router } from "express";
import AuthService from "../Services/AuthService";
import { RegisterRequest } from "../Entities/Dtos/Register";
import { LoginRequest } from "../Entities/Dtos/Login";
import EHttpCode from "../Exceptions/EHttpCode";

class AuthController{
    _router: Router;
    _auth: AuthService;
    constructor(){
        this._router = Express.Router();
        this._auth = new AuthService();

        this.initializeController();
    }

    initializeController(){
        this._router.post('/register', this.register);
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const request: RegisterRequest = req.body;
            const result = await this._auth.RegisterAdmin(request);
            
            res.status(EHttpCode.CREATED).json({
                code: EHttpCode.CREATED,
                message: 'Buat akun berhasil',
                data: result
            });
        }catch(error){
            next(error);
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const request: LoginRequest = req.body;
            const result = await this._auth.Login(request);

            res.status(EHttpCode.OK).json({
                code: EHttpCode.OK,
                message: 'Masuk berhasil',
                data: result
            });
        }catch(error){
            next(error);
        }
    }
}

export default AuthController;