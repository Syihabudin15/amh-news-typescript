import Express, { NextFunction, Response, Request, Router } from "express";
import { User } from "../Entities/User";
import UserService from "../Services/UserService";
import EHttpCode from "../Exceptions/EHttpCode";
import JwtUtil from "../Utils/JwtUtil";

class UserController{
    _user: UserService;
    _router: Router;
    _jwt: JwtUtil;
    constructor(){
        this._user = new UserService();
        this._router = Express.Router();
        this._jwt = new JwtUtil();
        this.initializeRouter();
    }

    initializeRouter(){
        this._router.get('/users', this.getAllUser);
        this._router.get('/user/:id', this.getUserById);
        this._router.get('/user', this.getUserByToken);
    }

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const request: string = req.params.id;
            const result: User = await this._user.getUserById(request);
            res.status(EHttpCode.OK).json({
                msg: 'Berhasil',
                code: EHttpCode.OK,
                data: result
            });
        }catch(error){
            next(error);
        }
    }

    getUserByToken = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const request: string = <string> req.header('token');
            const decode = this._jwt.decode(request);
            const result: User = await this._user.getUserById(decode.userId);
            res.status(EHttpCode.OK).json({
                msg: 'Berhasil',
                code: EHttpCode.OK,
                data: result
            });
        }catch(error){
            next(error);
        }
    }

    getAllUser = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const result: User[] = await this._user.getAllUser();
            res.status(EHttpCode.OK).json({
                msg: 'Berhasil',
                code: EHttpCode.OK,
                data: result
            });
        }catch(error){
            next(error);
        }
    }
}

export default UserController;