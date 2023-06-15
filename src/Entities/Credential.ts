import mongoose, { Model, Schema } from "mongoose";
import { Role } from "./Role";
import { User } from "./User";

const schema = new Schema({
    email: {type: String, unique: true},
    password: {type: String},
    m_role: {type: mongoose.Types.ObjectId, ref: 'm_role'},
    m_user: {type: mongoose.Types.ObjectId, ref: 'm_user'}
});

class Credential extends Model{
    email: string;
    password: string;
    mRoleId: string;
    m_role: Role;
    m_user?: User;
};

schema.loadClass(Credential);

const CredentialModel = mongoose.model('m_credential', schema);
export { Credential, CredentialModel };