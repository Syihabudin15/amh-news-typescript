import Express, { NextFunction, Response, Request, Router } from "express";
import { User } from "../Entities/User";
import UserService from "../Services/UserService";
import EHttpCode from "../Exceptions/EHttpCode";

class UserController{
    _user: UserService;
    _router: Router;
    constructor(){
        this._user = new UserService();
        this._router = Express.Router();

        this.initializeRouter();
    }

    initializeRouter(){
        this._router.get('/users', this.getAllUser);
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