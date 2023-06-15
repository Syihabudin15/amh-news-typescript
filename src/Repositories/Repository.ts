import { Model } from "mongoose";
import IRepository from "./Interfaces/IRepository";

class Repository<TEntity> implements IRepository<TEntity>{
    _context: typeof Model;
    
    constructor(schema: typeof Model){
        this._context = schema;
    }

    async saveModel(entity: TEntity): Promise<TEntity> {
        const result = await this._context.create(entity);
        return result;
    }
    async saveAllModel(entities: TEntity[]): Promise<TEntity[]> {
        entities.forEach(async e => {
            await this._context.create(e);
        });
        return entities;
    }
    async findById(id: string): Promise<TEntity> {
        const result = await this._context.findById(id);
        return result;
    }
    async findByCriteria(criteria: object): Promise<TEntity> {
        const result = await this._context.findOne(criteria);
        return result;
    }
    async findByCriteriaPopulate(criteria: object, populate: any[]): Promise<TEntity> {
        const result = await this._context.findOne(criteria).populate(populate);
        return result;
    }
    async findAll(): Promise<TEntity[]> {
        const result = await this._context.find();
        return result;
    }
    async findAllPaginate(page: number, size: number): Promise<TEntity[]> {
        const skip: number = (page -1) * size;
        const result = await this._context.find().skip(skip).limit(size);
        return result;
    }
    async findAllPaginatePopulate(page: number, size: number, populate: any[]): Promise<TEntity[]> {
        const skip: number = (page -1) * size;
        const result = await this._context.find().populate(populate).skip(skip).limit(size);
        return result;
    }
    async findAllCriteria(criteria: object): Promise<TEntity[]> {
        const result = await this._context.find(criteria);
        return result;
    }
    async findAllCriteriaPaginate(criteria: object, page: number, size: number): Promise<TEntity[]> {
        const skip: number = (page -1) * size;
        const result = await this._context.find(criteria).skip(skip).limit(size);
        return result;
    }
    async findAllCriteriaPaginatePopulate(criteria: object, page: number, size: number, populate: []): Promise<TEntity[]> {
        const skip: number = (page -1) * size;
        const result = await this._context.find(criteria).populate(populate).skip(skip).limit(size);
        return result;
    }
    async updateModel(entity: TEntity): Promise<TEntity> {
        throw new Error("Method not implemented.");
    }
    updateModelById(id: string, entity: TEntity): Promise<TEntity> {
        throw new Error("Method not implemented.");
    }
    async deleteById(id: string): Promise<void> {
        await this._context.findByIdAndDelete(id);
    }
    async deleteByCriteria(criteria: object): Promise<void> {
        await this._context.deleteOne(criteria);
    }
}

export default Repository;