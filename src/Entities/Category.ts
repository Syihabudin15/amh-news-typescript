import mongoose, { Model, Schema } from "mongoose";

const schema = new Schema({
    title: {type: String},
    slug: {type: String, unique: true},
    subBody: {type: String},
    body: {type: String},
    image: {type: String},
    createdAt: {type: Date, default: new Date()},
    postedAt: {type: Date, required: false}
});

class Category extends Model{
    title: string;
    slug: string;
    subBody: string;
    body: string;
    image: string;
    createdAt: Date;
    updatedAt?: Date;
}

schema.loadClass(Category);

const CategoryModel = mongoose.model('m_category', schema);

export { Category, CategoryModel };