import Express, { NextFunction, Request, Response, Router } from "express";
import CategoryService from "../Services/CategoryService";
import EHttpCode from "../Exceptions/EHttpCode";
import { Category } from "../Entities/Category";
import JwtUtil from "../Utils/JwtUtil";
import CloudService from "../Services/CloudService";

class CategoryController{
    _router: Router;
    _category: CategoryService;
    _file: CloudService;
    _jwt: JwtUtil;
    private readonly _path: string = '/category';

    constructor(){
        this._router = Express.Router();
        this._category = new CategoryService();
        this._file = new CloudService();
        this._jwt = new JwtUtil();
        
        this.initializeRouter();
    }

    initializeRouter(){
        this._router.post(this._path, this._jwt.verifyAdmin, this.createCategory);
        this._router.get(this._path, this.getAllCategory);
        this._router.get(`${this._path}/find`, this.searchCategory);
    }

    createCategory = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const request: Category = req.body;
            const url = await this._file.saveImage(request.image);
            request.image = url;
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