import { v2 } from "cloudinary";
import { cName, cKey, cSecret } from "../config/envi";
import { UploadedFile } from "express-fileupload";
import { BadRequest } from "../Exceptions/ErrorList";

class CloudService{
    _cloud: typeof v2 = v2;
    constructor(){
        this._cloud.config({
            cloud_name: cName,
            api_key: cKey,
            api_secret: cSecret
        })
    }

    async saveImage(file: UploadedFile): Promise<string>{
        if(!file) throw new BadRequest('Image is required');
        const result = await this._cloud.uploader.upload(file.tempFilePath, {
            folder: 'amh-news',
            public_id: `${Date.now()}`
        });
        return result.secure_url;
    }
}

export default CloudService;