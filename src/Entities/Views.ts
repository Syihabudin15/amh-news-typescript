import mongoose, { Model, Schema } from "mongoose";

const schema = new Schema({
    count: {type: Number}
});

class Views extends Model{
    count: number;
}

schema.loadClass(Views);
const ViewsModel = mongoose.model('m_views', schema);

export { Views, ViewsModel };