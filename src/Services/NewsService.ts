import { NewsRequest } from "../Entities/Dtos/NewsRequest";
import { News, NewsModel } from "../Entities/News";
import { NewsImage } from "../Entities/NewsImage";
import { BadRequest, NotFound } from "../Exceptions/ErrorList";
import IRepository from "../Repositories/Interfaces/IRepository";
import Repository from "../Repositories/Repository";
import JwtUtil from "../Utils/JwtUtil";
import NewsImageService from "./NewsImageService";
import UserService from "./UserService";
import ViewsService from "./ViewsService";

class NewsService{
    _news: IRepository<News>;
    _img: NewsImageService;
    _view: ViewsService;
    _user: UserService;
    _jwt: JwtUtil;
    constructor(){
        this._news = new Repository<News>(NewsModel);
        this._img = new NewsImageService();
        this._view = new ViewsService();
        this._user = new UserService();
        this._jwt = new JwtUtil();
    }
    
    async CreateNews(req: NewsRequest, token: string): Promise<News>{
        const decode = this._jwt.decode(token);

        if((req.title || req.body || req.subBody) === null || req.images.length === 0) throw new BadRequest('Judul, Body, Sub body, Gambar tidak boleh kosong');

        let images: NewsImage[] = await this._img.saveAllImage(req.images);


        const viewCount = await this._view.createViews();
        const slug = req.title.replaceAll(' ', '-');
        const user = await this._user.getUserById(decode.userId);
        if(user === null) throw new NotFound('User tidak ditemukan. mohon login kembali');
        
        const result = await this._news.saveModel({
            title: req.title,
            slug: slug.toLowerCase(),
            body: req.body,
            subBody: req.subBody,
            createdAt: new Date(),
            author: user,
            images: images,
            views: viewCount
        });

        return result;
    }
}

export default NewsService;