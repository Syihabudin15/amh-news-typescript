import { Views, ViewsModel } from "../Entities/Views";
import { NotFound } from "../Exceptions/ErrorList";
import IRepository from "../Repositories/Interfaces/IRepository";
import Repository from "../Repositories/Repository";

class ViewsService{
    _views: IRepository<Views>;
    constructor(){
        this._views = new Repository<Views>(ViewsModel);
    }

    async createViews(): Promise<Views>{
        const result: Views = await this._views.saveModel({count: 0});
        return result;
    }

    async updateViews(id: string): Promise<Views>{
        if(id === null) throw new NotFound('View tidak ditemukan');
        const result: Views = await this._views.findById(id);
        if(result === null) throw new NotFound('View tidak ditemukan');

        await this._views.updateModelById(id, {count: result.count +1});

        return result;
    }
}

export default ViewsService;