import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    role: String
});

export const Role = mongoose.model('m_role', schema);