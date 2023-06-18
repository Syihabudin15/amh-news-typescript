import Express, { NextFunction, Request, Response, Router } from "express";
import CategoryService from "../Services/CategoryService";
import { CategoryRequest } from "../Entities/Dtos/CategoryRequest";
import EHttpCode from "../Exceptions/EHttpCode";
import { Category } from "../Entities/Category";

class CategoryController{
    _router: Router;
    _category: CategoryService;
    private readonly _path: string = '/category';
    constructor(){
        this._router = Express.Router();
        this._category = new CategoryService();
    }

    initializeRouter(){
        this._router.post(this._path, this.createCategory);
        this._router.get(`${this._path}/find`, this.searchCategory);
    }

    createCategory = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const request: CategoryRequest = req.body;
            const result: Category = await this._category.createCategory(request);

            res.status(EHttpCode.CREATED).json({
                msg: 'Berhasil membuat Kategori',
                code: EHttpCode.CREATED,
                data: result
            });
        }catch(error){
            next(error);
        }
    }

    searchCategory = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const search = req.query.search;
            const result: Category[] = await this._category.SearchCategory(search?.toString());
            
            res.status(EHttpCode.OK).json({
                code: EHttpCode.OK,
                data: result
            });
        }catch(error){
            next(error);
        }
    }

    getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const page: number = <any>req.query.page || 1;
            const size: number = <any>req.query.size || 5;
            const result: Category[] = await this._category.getAllCategory(page, size);

            res.status(EHttpCode.OK).json({
                code: EHttpCode.OK,
                data: result
            });
        }catch(error){
            next(error);
        }
    }
}

export default CategoryController;