import { Category, CategoryModel } from "../Entities/Category";
import { CategoryRequest } from "../Entities/Dtos/CategoryRequest";
import { BadRequest } from "../Exceptions/ErrorList";
import IRepository from "../Repositories/Interfaces/IRepository";
import Repository from "../Repositories/Repository";

class CategoryService{
    _category: IRepository<Category>;
    constructor(){
        this._category = new Repository<Category>(CategoryModel);
    }

    async createCategory(req: CategoryRequest): Promise<Category>{
        if((req.title || req.subBody || req.body || req.image) === null) throw new BadRequest('Nama Kategori, Sub Body, Gambar tidak boleh kosong');
        const slug: string = req.title.replaceAll(' ', '-');

        const category: Category = await this._category.saveModel({
            title: req.title,
            slug: slug.toLowerCase(),
            subBody: req.subBody,
            body: req.body,
            image: req.image.name,
            createdAt: new Date()
        });

        return category;
    }

    async SearchCategory(search?: string): Promise<Category[]>{
        if(search === null) throw new BadRequest('Masukan nama kategory');

        const result: Category[] = await this._category.findAllCriteria({title: {$regex: '.*' + search + '.*'}});

        return result;
    }

    async getAllCategory(page: number, size: number): Promise<Category[]>{
        const result: Category[] = await this._category.findAllPaginate(page, size);

        return result;
    }
}

export default CategoryService;