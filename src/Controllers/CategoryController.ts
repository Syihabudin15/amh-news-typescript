import Express, { NextFunction, Request, Response, Router } from "express";
import CategoryService from "../Services/CategoryService";
import EHttpCode from "../Exceptions/EHttpCode";
import { Category } from "../Entities/Category";
import FileService from "../Services/FileService";

class CategoryController{
    _router: Router;
    _category: CategoryService;
    _file: FileService;
    private readonly _path: string = '/category';

    constructor(){
        this._router = Express.Router();
        this._category = new CategoryService();
        this._file = new FileService();
    }

    initializeRouter(){
        this._router.post(this._path, this._file._file.single('image'), this.createCategory);
        this._router.get(this._path, this.getAllCategory);
        this._router.get(`${this._path}/find`, this.searchCategory);
    }

    createCategory = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const request: Category = req.body;
            const image: string = <string>req.file?.filename || '';
            request.image = image;
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
            const result: Category[] = await this._category.getAllCategory();

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