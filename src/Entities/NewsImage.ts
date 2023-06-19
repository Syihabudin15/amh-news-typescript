import mongoose, { Model, Schema } from "mongoose";

const schema = new Schema({
    image: {type: String}
});

class NewsImage extends Model{
    image: string;
}

schema.loadClass(NewsImage);
const NewsImageModel = mongoose.model('m_image', schema);

export { NewsImage, NewsImageModel };