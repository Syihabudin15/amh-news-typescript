import Express, { NextFunction, Request, Response, Router } from "express";
import AuthService from "../Services/AuthService";

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
            const result = await this._auth.RegisterAdmin();
            res.json({
                code: 200,
                message: 'Success',
                data: result
            });
        }catch(error){
            next(error);
        }
    }
}

export default AuthController;