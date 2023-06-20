import Express, { NextFunction, Request, Response, Router } from "express";
import NewsService from "../Services/NewsService";
import JwtUtil from "../Utils/JwtUtil";
import { NewsRequest } from "../Entities/Dtos/NewsRequest";
import { News } from "../Entities/News";
import EHttpCode from "../Exceptions/EHttpCode";

class NewsController{
    _router: Router;
    private readonly _path: string = '/user';
    _news: NewsService;
    _jwt: JwtUtil;
    constructor(){
        this._router = Express.Router();
        this._news = new NewsService();
        this._jwt = new JwtUtil();
    }

    initializeRouter(){
        this._router.post(this._path, this._jwt.verify, this.createNews);
    }

    createNews= async (req: Request, res: Response, next: NextFunction) => {
        try{
            const request: NewsRequest = req.body;
            const token: string = <string> req.header('token');
            request.images = <globalThis.Express.Multer.File[]>req.files;

            const result: News = await this._news.CreateNews(request, token);

            res.status(EHttpCode.CREATED).json({
                msg: 'Berhasil buat berita',
                code: EHttpCode.CREATED,
                data: result
            });
        }catch(error){
            next(error);
        }
    }
}

export default NewsController;