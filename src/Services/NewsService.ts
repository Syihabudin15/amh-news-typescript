import { Category } from "../Entities/Category";
import { NewsRequest } from "../Entities/Dtos/NewsRequest";
import { News, NewsModel } from "../Entities/News";
import { BadRequest, NotFound } from "../Exceptions/ErrorList";
import IPersistence from "../Repositories/Interfaces/IPersistence";
import IRepository from "../Repositories/Interfaces/IRepository";
import Persistence from "../Repositories/Persistence";
import Repository from "../Repositories/Repository";
import JwtUtil from "../Utils/JwtUtil";
import CategoryService from "./CategoryService";
import UserService from "./UserService";
import ViewsService from "./ViewsService";

class NewsService{
    _news: IRepository<News>;
    _view: ViewsService;
    _user: UserService;
    _jwt: JwtUtil;
    _cate: CategoryService;
    _persis: IPersistence;
    constructor(){
        this._news = new Repository<News>(NewsModel);
        this._view = new ViewsService();
        this._user = new UserService();
        this._jwt = new JwtUtil();
        this._cate = new CategoryService();
        this._persis = new Persistence();
    }
    
    async CreateNews(req: NewsRequest, token: string): Promise<News>{
        const decode = this._jwt.decode(token);

        if((req.title || req.body || req.subBody || req.image) === null) throw new BadRequest('Judul, Body, Sub body, Gambar tidak boleh kosong');

        const result = await this._persis.transaction(async () => {
            const viewCount = await this._view.createViews();
            const slug = req.title.replaceAll(' ', '-');
            const user = await this._user.getUserById(decode.userId);
            if(user === null) throw new NotFound('User tidak ditemukan. mohon login kembali');

            let categories: Category[] = await this._cate.getCategoryForNews(req.categories);
            
            const result = await this._news.saveModel({
                title: req.title,
                slug: slug.toLowerCase(),
                body: req.body,
                subBody: req.subBody,
                createdAt: new Date(),
                author: user,
                views: viewCount,
                categories: categories,
                image: req.image
            });
            return result;
        })
        
        return result;
    }

    async getNewsById(id: string): Promise<News>{
        const result: News = await this._news.findByCriteriaPopulate({_id: id}, [
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

        const result: News[] = await this._news.findAllCriteriaPaginatePopulate({'categories': cateId}, currPage, currSize, [
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

    async getAllNotPosted(page: number, size: number): Promise<News[]>{
        const currPage: number = page || 1;
        const currSize: number = size || 5;

        const result: News[] = await this._news.findAllPaginatePopulate(currPage, currSize, [
            {path: 'author', populate: {
                path: 'm_credential', populate: {
                    path: 'm_role'
                }
            }},
            {path: 'views'},
            {path: 'categories'}
        ]);
        const filtered: News[] = result.filter(e => !e.postedAt);

        return filtered;
    }

    async updateStatusPosted(id: string): Promise<News>{
        const find: News = await this._news.findById(id);
        if(find === null) throw new NotFound('Berita yg anda pilih tidak valid');
        if(find.postedAt) throw new Error('Berita sudah di posting');

        const result = await this._news.updateModelById(id, {postedAt: new Date()});
        if(!result) throw new Error('Internal Server Error');

        return find;
    }

    async cancelPosted(id: string): Promise<News>{
        const find: News = await this._news.findById(id);
        if(find === null) throw new NotFound('Berita yg anda pilih tidak valid');
        if(find.postedAt === null) throw new Error('Berita berada dalam Review Postingan');

        const result = await this._news.updateModelById(id, {postedAt: null});
        if(!result) throw new Error('Internal Server Error');
        
        return find;
    }
}

export default NewsService;