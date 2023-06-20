import { Category } from "../Entities/Category";
import { NewsRequest } from "../Entities/Dtos/NewsRequest";
import { News, NewsModel } from "../Entities/News";
import { NewsImage } from "../Entities/NewsImage";
import { BadRequest, NotFound } from "../Exceptions/ErrorList";
import IRepository from "../Repositories/Interfaces/IRepository";
import Repository from "../Repositories/Repository";
import JwtUtil from "../Utils/JwtUtil";
import CategoryService from "./CategoryService";
import NewsImageService from "./NewsImageService";
import UserService from "./UserService";
import ViewsService from "./ViewsService";

class NewsService{
    _news: IRepository<News>;
    _img: NewsImageService;
    _view: ViewsService;
    _user: UserService;
    _jwt: JwtUtil;
    _cate: CategoryService;
    constructor(){
        this._news = new Repository<News>(NewsModel);
        this._img = new NewsImageService();
        this._view = new ViewsService();
        this._user = new UserService();
        this._jwt = new JwtUtil();
        this._cate = new CategoryService();
    }
    
    async CreateNews(req: NewsRequest, token: string): Promise<News>{
        const decode = this._jwt.decode(token);

        if((req.title || req.body || req.subBody) === null || req.images.length === 0) throw new BadRequest('Judul, Body, Sub body, Gambar tidak boleh kosong');

        let images: NewsImage[] = await this._img.saveAllImage(req.images);


        const viewCount = await this._view.createViews();
        const slug = req.title.replaceAll(' ', '-');
        const user = await this._user.getUserById(decode.userId);
        if(user === null) throw new NotFound('User tidak ditemukan. mohon login kembali');

        let categories: Category[] = [];

        req.categories.forEach(async (e) => {
            const category: Category = await this._cate.getCategoryById(e);
            categories.push(category);
        });
        
        const result = await this._news.saveModel({
            title: req.title,
            slug: slug.toLowerCase(),
            body: req.body,
            subBody: req.subBody,
            createdAt: new Date(),
            author: user,
            images: images,
            views: viewCount,
            categories: categories
        });

        return result;
    }

    async getNewsById(id: string): Promise<News>{
        const result: News = await this._news.findByCriteriaPopulate({_id: id}, [
            {path: 'images'}, 
            {path: 'author', populate: {
                path: 'm_credential', populate: {
                    path: 'm_role'
                }
            }},
            {path: 'views'},
            {path: 'categories'}
        ]);
        if(result === null) throw new NotFound('Berita tidak ditemukan');

        return result;
    }

    async getNewsBySlug(slugify: string): Promise<News>{
        const result: News = await this._news.findByCriteriaPopulate({slug: slugify}, [
            {path: 'images'}, 
            {path: 'author', populate: {
                path: 'm_credential', populate: {
                    path: 'm_role'
                }
            }},
            {path: 'views'},
            {path: 'categories'}
        ]);
        if(result === null) throw new NotFound('Berita tidak ditemukan');

        return result;
    }

    async searchNewsByTitle(title: string, page: number, size: number): Promise<News[]>{
        const currPage: number = page || 1;
        const currSize: number = size || 5;

        const result: News[] = await this._news.findAllCriteriaPaginatePopulate({title: {$regex: '.*' + title + '.*'}}, currPage, currSize, [
            {path: 'images'}, 
            {path: 'author', populate: {
                path: 'm_credential', populate: {
                    path: 'm_role'
                }
            }},
            {path: 'views'},
            {path: 'categories'}
        ]);
        const filtered: News[] = result.filter(e => e.postedAt != null);

        return filtered;
    }

    async searchNewsByCategoryId(cateId: string, page: number, size: number): Promise<News[]>{
        const currPage: number = page || 1;
        const currSize: number = size || 5;

        const result: News[] = await this._news.findAllCriteriaPaginatePopulate({'categories._id': cateId}, currPage, currSize, [
            {path: 'images'}, 
            {path: 'author', populate: {
                path: 'm_credential', populate: {
                    path: 'm_role'
                }
            }},
            {path: 'views'},
            {path: 'categories'}
        ]);
        const filtered: News[] = result.filter(e => e.postedAt != null);

        return filtered;
    }

    async searchByCategoryName(cateName: string, page: number, size: number): Promise<News[]>{
        const currPage: number = page || 1;
        const currSize: number = size || 5;

        const result: News[] = await this._news.findAllCriteriaPaginatePopulate({'categories.title': {$regex: '.*' + cateName + '.*'}}, currPage, currSize, [
            {path: 'images'}, 
            {path: 'author', populate: {
                path: 'm_credential', populate: {
                    path: 'm_role'
                }
            }},
            {path: 'views'},
            {path: 'categories'}
        ]);
        const filtered: News[] = result.filter(e => e.postedAt != null);

        return filtered;
    }

    async getAllNews(page: number, size: number): Promise<News[]>{
        const currPage: number = page || 1;
        const currSize: number = size || 5;

        const result: News[] = await this._news.findAllPaginatePopulate(currPage, currSize, [
            {path: 'images'}, 
            {path: 'author', populate: {
                path: 'm_credential', populate: {
                    path: 'm_role'
                }
            }},
            {path: 'views'},
            {path: 'categories'}
        ]);
        const filtered: News[] = result.filter(e => e.postedAt != null);

        return filtered;
    }
}

export default NewsService;