"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const envi_1 = require("../config/envi");
const ErrorList_1 = require("../Exceptions/ErrorList");
class CloudService {
    constructor() {
        this._cloud = cloudinary_1.v2;
        this._cloud.config({
            cloud_name: envi_1.cName,
            api_key: envi_1.cKey,
            api_secret: envi_1.cSecret
        });
    }
    saveImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file)
                throw new ErrorList_1.BadRequest('Image is required');
            const result = yield this._cloud.uploader.upload(file, {
                folder: 'amh-news',
                public_id: `${Date.now()}`
            }).then(res => {
                return res.secure_url;
            })
                .catch(err => {
                throw new Error(err.message);
            });
            return result;
        });
    }
}
exports.default = CloudService;
//# sourceMappingURL=CloudService.js.map