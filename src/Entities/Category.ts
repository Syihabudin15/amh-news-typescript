import mongoose, { Model, Schema } from "mongoose";

const schema = new Schema({
    title: {type: String, unique: true},
    image: {type: String},
});

class Category extends Model{
    title: string;
    image: string;
}

schema.loadClass(Category);

const CategoryModel = mongoose.model('m_category', schema);

export { Category, CategoryModel };