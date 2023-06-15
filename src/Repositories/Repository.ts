import { Model } from "mongoose";
import IRepository from "./Interfaces/IRepository";

class Repository<TEntity> implements IRepository<TEntity>{
    _context: typeof Model;
    
    constructor(schema: typeof Model){
        this._context = schema;
    }

    saveModel(entity: TEntity): Promise<TEntity> {
        throw new Error("Method not implemented.");
    }
    saveAllModel(entities: TEntity[]): Promise<TEntity[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<TEntity> {
        throw new Error("Method not implemented.");
    }
    findByCriteria(criteria: object): Promise<TEntity> {
        throw new Error("Method not implemented.");
    }
    findByCriteriaPopulate(criteria: object, populate: any[]): Promise<TEntity> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<TEntity[]> {
        throw new Error("Method not implemented.");
    }
    findAllPaginate(page: number, size: number): Promise<TEntity[]> {
        throw new Error("Method not implemented.");
    }
    findAllPaginatePopulate(page: number, size: number, populate: any[]): Promise<TEntity[]> {
        throw new Error("Method not implemented.");
    }
    findAllCriteria(criteria: object): Promise<TEntity[]> {
        throw new Error("Method not implemented.");
    }
    findAllCriteriaPaginate(criteria: object, page: number, size: number): Promise<TEntity[]> {
        throw new Error("Method not implemented.");
    }
    findAllCriteriaPaginatePopulate(criteria: object, page: number, size: number, populate: []): Promise<TEntity[]> {
        throw new Error("Method not implemented.");
    }
    updateModel(entity: TEntity): Promise<TEntity> {
        throw new Error("Method not implemented.");
    }
    updateModelById(id: string, entity: TEntity): Promise<TEntity> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteByCriteria(criteria: object): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default Repository;