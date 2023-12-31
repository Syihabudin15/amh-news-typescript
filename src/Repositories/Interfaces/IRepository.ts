interface IRepository<TEntity>{
    saveModel(entity: TEntity): Promise<TEntity>;
    saveAllModel(entities: TEntity[]): Promise<TEntity[]>;
    
    findById(id: string): Promise<TEntity>;
    findByCriteria(criteria: object): Promise<TEntity>;
    findByCriteriaPopulate(criteria: object, populate: any[] | object): Promise<TEntity>;
    
    findAll(): Promise<TEntity[]>;
    findAllPopulate(populate: any[] | object): Promise<TEntity[]>;
    findAllPaginate(page: number, size: number): Promise<TEntity[]>;
    findAllPaginatePopulate(page: number, size: number, populate: any[] | object): Promise<TEntity[]>;

    findAllCriteria(criteria: object): Promise<TEntity[]>;
    findAllCriteriaPaginate(criteria: object, page: number, size: number): Promise<TEntity[]>;
    findAllCriteriaPaginatePopulate(criteria: object, page: number, size: number, populate: [] | object): Promise<TEntity[]>;

    updateModel(entity: TEntity): Promise<TEntity>;
    updateModelById(id: string, obj: object): Promise<Boolean>;

    deleteById(id: string): Promise<void>;
    deleteByCriteria(criteria: object): Promise<void>;
}

export default IRepository;