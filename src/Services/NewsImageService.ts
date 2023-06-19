import { NewsImage, NewsImageModel } from "../Entities/NewsImage";
import { BadRequest } from "../Exceptions/ErrorList";
import IRepository from "../Repositories/Interfaces/IRepository";
import Repository from "../Repositories/Repository";

class NewsImageService{
    _img: IRepository<NewsImage>;
    constructor(){
        this._img = new Repository<NewsImage>(NewsImageModel);
    }
    async saveImage(filename: string): Promise<NewsImage>{
        if(filename === null || filename === '') throw new BadRequest('Gambar tidak boleh kosong');
        const result: NewsImage = await this._img.saveModel({image: filename});
        return result;
    }

    async saveAllImage(file: globalThis.Express.Multer.File[]): Promise<NewsImage[]>{
        let result: NewsImage[] = [];
        file.forEach(async (e) => {
            const save = await this._img.saveModel({image: e.filename});
            result.push(save);
        });

        return result;
    }
}

export default NewsImageService;