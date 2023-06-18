import Express, { NextFunction, Request, Response, Router } from "express";
import AuthService from "../Services/AuthService";
import { RegisterRequest, RegisterResponse } from "../Entities/Dtos/Register";
import { LoginRequest, LoginResponse } from "../Entities/Dtos/Login";
import EHttpCode from "../Exceptions/EHttpCode";
import JwtUtil from "../Utils/JwtUtil";

class AuthController{
    _router: Router;
    _auth: AuthService;
    _jwt: JwtUtil;
    constructor(){
        this._router = Express.Router();
        this._auth = new AuthService();
        this._jwt = new JwtUtil();

        this.initializeController();
    }

    initializeController(){
        this._router.post('/register', this.register);
        this._router.post('/create-writer', this._jwt.verifyAdmin, this.register);
        this._router.post('/login', this.login);
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const request: RegisterRequest = req.body;
            const result: RegisterResponse = await this._auth.RegisterAdmin(request);
            
            res.status(EHttpCode.CREATED).json({
                code: EHttpCode.CREATED,
                message: 'Buat akun berhasil',
                data: result
            });
        }catch(error){
            next(error);
        }
    }

    createWriter = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const request: RegisterRequest = req.body;
            const result: RegisterResponse = await this._auth.createWriter(request);
            
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
            const result: LoginResponse = await this._auth.Login(request);

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