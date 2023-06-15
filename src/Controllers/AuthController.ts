import Express, { NextFunction, Request, Response, Router } from "express";

class AuthController{
    _router: Router;
    constructor(){
        this._router = Express.Router();

        this.initializeController();
    }

    initializeController(){
        this._router.get('/register', this.register);
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try{
            res.json({
                code: 200,
                message: 'Success',
                data: {
                    name: 'Syihabudin Tsani'
                }
            });
        }catch(error){
            next(error);
        }
    }
}

export default AuthController;