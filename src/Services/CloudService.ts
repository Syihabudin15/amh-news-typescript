import { v2 } from "cloudinary";
import { cName, cKey, cSecret } from "../config/envi";
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

    async saveImage(file: string): Promise<string>{
        if(!file) throw new BadRequest('Image is required');
        const result: string = await this._cloud.uploader.upload(file, {
            folder: 'amh-news',
            public_id: `${Date.now()}`
        }).then(res => {
            return res.secure_url;
        })
        .catch(err => {
            throw new Error(err.message);
        });

        return result;
    }
}

export default CloudService;