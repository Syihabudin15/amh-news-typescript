import { Category, CategoryModel } from "../Entities/Category";
import { BadRequest } from "../Exceptions/ErrorList";
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

    async SearchCategory(search?: string): Promise<Category[]>{
        if(search === null) throw new BadRequest('Masukan nama kategory');

        const result: Category[] = await this._category.findAllCriteria({title: {$regex: '.*' + search + '.*'}});

        return result;
    }

    async getAllCategory(): Promise<Category[]>{
        const result: Category[] = await this._category.findAll();

        return result;
    }
}

export default CategoryService;