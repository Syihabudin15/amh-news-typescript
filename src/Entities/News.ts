import mongoose, { Schema, Model } from "mongoose";
import { User } from "./User";
import { NewsImage } from "./NewsImage";
import { Views } from "./Views";
import { Category } from "./Category";

const schema = new Schema({
    title: {type: String},
    slug: {type: String, unique: true},
    subBody: {type: String},
    body: {type: String},
    revision: {type: Boolean, required: false},
    createdAt: {type: Date},
    postedAt: {type: Date, required: false},
    author: {type: mongoose.Types.ObjectId, ref: 'm_user'},
    images: [{type: mongoose.Types.ObjectId, ref: 'm_image'}],
    views: {type: mongoose.Types.ObjectId, ref: 'm_views'},
    categories: [{type: mongoose.Types.ObjectId, ref: 'm_category'}]
});

class News extends Model{
    title: string;
    slug: string;
    subBody: string
    body: string;
    revision?: boolean;
    createdAt: Date;
    postedAt?: Date;
    author: User;
    images: NewsImage[];
    views: Views;
    categories: Category[];
}

schema.loadClass(News);
const NewsModel = mongoose.model('m_news', schema);

export { News, NewsModel };