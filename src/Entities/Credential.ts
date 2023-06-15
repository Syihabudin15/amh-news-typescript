import mongoose, { Model, Schema } from "mongoose";
import { Role } from "./Role";

const schema = new Schema({
    email: {type: String, unique: true},
    password: {type: String},
    m_role: Role
});

class Credential extends Model{
    email: string;
    password: string;
    role: Role;
};

schema.loadClass(Credential);

const CredentialModel = mongoose.model('m_credential', schema);
export { Credential, CredentialModel };