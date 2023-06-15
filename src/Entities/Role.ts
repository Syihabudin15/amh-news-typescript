import mongoose, { Model, Schema } from "mongoose";
import Erole from "./ERole";

const schema = new Schema({
    role: {type: String}
});

class Role extends Model{
    role: Erole;
};

schema.loadClass(Role);

const RoleModel = mongoose.model('m_role', schema);

export { Role, RoleModel };