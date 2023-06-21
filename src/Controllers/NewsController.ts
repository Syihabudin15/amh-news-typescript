import Express, { NextFunction, Request, Response, Router } from "express";
import NewsService from "../Services/NewsService";
import JwtUtil from "../Utils/JwtUtil";
import { NewsRequest } from "../Entities/Dtos/NewsRequest";
import { News } from "../Entities/News";
import EHttpCode from "../Exceptions/EHttpCode";
import FileService from "../Services/FileService";

class NewsController{
    _router: Router;
    private readonly _path: string = '/news';
    _news: NewsService;
    _jwt: JwtUtil;
    _file: FileService;
    constructor(){
        this._router = Express.Router();
        this._news = new NewsService();
        this._jwt = new JwtUtil();
        this._file = new FileService();

        this.initializeRouter();
    }

    initializeRouter(){
        this._router.post(this._path, this._jwt.verify, this._file._file.any(), this.createNews);
    }

    createNews= async (req: Request, res: Response, next: NextFunction) => {
        try{
            const request: NewsRequest = req.body;
            const token: string = <string> req.header('token');
            request.images = <globalThis.Express.Multer.File[]>req.files;
            const cate = req.body.categories.split(',');
            request.categories = cate;

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

    getAllNews = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const { page, size } = <any>req.headers;
            const result: News[] = await this._news.getAllNews(parseInt(page), parseInt(size));

            res.status(EHttpCode.OK).json({
                msg: 'Berhasil ambil data',
                code: EHttpCode.OK,
                data: result
            });
        }catch(error){
            next(error);
        }
    }
}

export default NewsController;