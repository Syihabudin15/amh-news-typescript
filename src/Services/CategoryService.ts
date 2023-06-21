import { Category, CategoryModel } from "../Entities/Category";
import { BadRequest, NotFound } from "../Exceptions/ErrorList";
import IRepository from "../Repositories/Interfaces/IRepository";
import Repository from "../Repositories/Repository";

class CategoryService{
    _category: IRepository<Category>;
    constructor(){
        this._category = new Repository<Category>(CategoryModel);
    }

    async createCategory(req: Category): Promise<Category>{
        if((req.title || req.image) === null || req.image === '') throw new BadRequest('Nama Kategori, Sub Body, Gambar tidak boleh kosong');

        const category: Category = await this._category.saveModel({
            title: req.title,
            image: req.image
        });

        return category;
    }

    async getCategoryById(id: string): Promise<Category>{
        const result = await this._category.findById(id);
        if(result === null) throw new NotFound('Kategori tidak ditemukan');

        return result;
    }

    async SearchCategory(search?: string): Promise<Category[]>{
        if(search === null) throw new BadRequest('Masukan nama kategory');

        const result: Category[] = await this._category.findAllCriteria({title: {$regex: '.*' + search + '.*'}});

        return result;
    }

    async getAllCategory(): Promise<Category[]>{
        const result: Category[] = await this._category.findAll();

        return result;
    }

    async getCategoryForNews(cateIds: string[]) : Promise<Category[]>{
        const result: Category[] = [];
        for(let i = 0; i < cateIds.length; i++){
            const find = await this._category.findById(cateIds[i]);
            result.push(find);
        }
        
        return result;
    }
}

export default CategoryService;