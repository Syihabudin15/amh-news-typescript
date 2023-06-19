import mongoose, { Model, Schema } from "mongoose";

const schema = new Schema({
    count: {type: BigInt, default: 0}
});

class Views extends Model{
    count: number;
}

schema.loadClass(Views);
const ViewsModel = mongoose.model('m_views', schema);

export { Views, ViewsModel };