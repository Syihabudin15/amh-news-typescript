import mongoose, { connection } from "mongoose";
import IPersistence from "./Interfaces/IPersistence";

class Persistence implements IPersistence{
    _context: typeof connection;
    constructor(){
        this._context = mongoose.connection;
    }
    async transaction(func: Function): Promise<any> {
        const t = await this._context.startSession();
        try{
            t.startTransaction();
            const result = await func();
            
            await t.commitTransaction();
            t.endSession();
            return result;
        }catch(err:any){
            t.abortTransaction();
            if(err.message.includes('duplicate')){
                throw Error('Maaf data yang digunakan sudah ada');
            }else{
                throw Error(err.message);
            }
        }
    }
}

export default Persistence;