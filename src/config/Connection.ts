import mongoose from "mongoose";
import { mongoUri } from './envi';

class Connection{
    _db: typeof mongoose;
    _uri: string = mongoUri;
    constructor(){
        this._db = mongoose;
    }

    async connect(){
        this._db.connect(this._uri);
    }
}

export default Connection;