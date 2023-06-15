"use strict";
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    "development": {
        "url": "mongodb+srv://",
        "username": "syihabudintsani15",
        "password": "EXshHES9puyKEmOb",
        "cluster": "@cluster0.1vfqwvx.mongodb.net",
        "collection": "amh-news",
        "option": "retryWrites=true&w=majority"
    },
    "production": {
        "url": process.env.DB_URL,
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "cluster": process.env.DB_CLUSTER,
        "collection": process.env.DB_COLLECTION,
        "option": process.env.DB_OPTION
    }
};
//# sourceMappingURL=config.js.map