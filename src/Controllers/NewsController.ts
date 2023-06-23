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
        this._router.get(this._path, this.getAllNews);
        this._router.get(`${this._path}/slug/:slug`, this.getNewsBySlug);
        this._router.get(`${this._path}/title`, this.searchByTitle);
        this._router.get(`${this._path}/category`, this.getAllByCateId);
        this._router.get(`${this._path}/unposted`, this._jwt.verify, this.getNotPostedNews);
        this._router.patch(`${this._path}/status/:id`, this._jwt.verifyAdmin, this.updateStatusPosted);
        this._router.patch(`${this._path}/cancel/:id`, this._jwt.verifyAdmin, this.cancelPosted);
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
            const { page, size } = <any>req.query;
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

    getNewsBySlug = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const slug: string = req.params.slug;
            const result: News = await this._news.getNewsBySlug(slug);

            res.status(EHttpCode.OK).json({
                msg: 'Berhasil',
                code: EHttpCode.OK,
                data: result
            });
        }catch(error){
            next(error);
        }
    }

    searchByTitle = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const title: string = <any>req.query.title;
            const { page, size } = <any>req.query;
            const result: News[] = await this._news.searchNewsByTitle(title, page, size);

            res.status(EHttpCode.OK).json({
                msg: 'berhasil',
                code: EHttpCode.OK,
                data: result
            });
        }catch(error){
            next(error);
        }
    }

    getAllByCateId = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const cateId: string = <any> req.query.cateId;
            const { page, size } = <any> req.query;
            const result: News[] = await this._news.searchNewsByCategoryId(cateId, page, size);

            res.status(EHttpCode.OK).json({
                msg: 'berhasil',
                code: EHttpCode.OK,
                data: result
            });
        }catch(error){
            next(error);
        }
    }

    getNotPostedNews = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const { page, size } = <any> req.query;
            const result: News[] = await this._news.getAllNotPosted(page, size);

            res.status(EHttpCode.OK).json({
                msg: 'Berhasil',
                code: EHttpCode.OK,
                data: result
            });
        }catch(error){
            next(error);
        }
    }

    updateStatusPosted = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const id: string = <any> req.params.id;
            const result: News = await this._news.updateStatusPosted(id);

            res.status(EHttpCode.OK).json({
                msg: 'Berita berhasil diposting',
                code: EHttpCode.OK,
                data: result
            });
        }catch(error){
            next(error);
        }
    }

    cancelPosted = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const id: string = req.params.id;
            const result: News = await this._news.cancelPosted(id);

            res.status(EHttpCode.OK).json({
                msg: 'Membatalkan postingan berita berhasil',
                code: EHttpCode.OK,
                data: result
            });
        }catch(error){
            next(error);
        }
    }
}

export default NewsController;