import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

export const mongoUri = `${config.url}${config.username}:${config.password}${config.cluster}/${config.collection}?${config.option}`;
export const port = process.env.PORT || 5000;
export const version = process.env.APP_VERSION || 'v1';
export const secretKey = process.env.APP_SECRET_KEY || 'rahasia_bos';
export const cName:string = <any>process.env.C_NAME;
export const cKey:string = <any>process.env.C_KEY;
export const cSecret:string = <any>process.env.C_SECRET;