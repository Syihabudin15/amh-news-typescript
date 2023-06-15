import mongoose, { Model, Schema } from "mongoose";

const schema = new Schema({
    first_name: {type: String},
    last_name: {type: String},
    phone: {type: String, unique: true},
    about: {type: String},
});

class User extends Model{
    first_name: string;
    last_name: string;
    phone: string;
    about: string;
};

schema.loadClass(User);
const UserModel = mongoose.model('m_user', schema);
export { User, UserModel };