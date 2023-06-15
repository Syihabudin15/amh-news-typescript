interface IPersistence{
    transaction(func: Function): Promise<any>;
}

export default IPersistence;