import mongoose, { Model, Schema } from "mongoose";
import { Role } from "./Role";

const schema = new Schema({
    email: {type: String},
    password: {type: String},
    m_role: Role
});

class Credential extends Model{
    email: string;
    password: string;
    role: Role;
};

const CredentialModel = mongoose.model('m_credential', schema);
export { Credential, CredentialModel };