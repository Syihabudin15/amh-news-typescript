import { Request } from "express";
import multer from "multer";
import { BadRequest } from "../Exceptions/ErrorList";


class FileService{
    _file: multer.Multer;

    constructor() {
        this._file = multer({
            storage: this.storageFile,
            fileFilter: this.filterFile
        })
    }

    storageFile = multer.diskStorage({
        destination(req: Request, file: globalThis.Express.Multer.File, callback) {
            callback(null, 'src/resources/img');
        },
        filename(req, file, callback) {
            callback(null, `${Date.now().toString()}-${file.originalname}`);
        },
    })

    filterFile = (req: Request, file: globalThis.Express.Multer.File, callback: Function) => {
        if(file.mimetype.split('/')[1] == 'png' || file.mimetype.split('/')[1] == 'jpg' || file.mimetype.split('/')[1] == 'jpeg'){
            callback(null, true);
        }else{
            callback(new BadRequest('Ekstensi File tidak didukung'), false);
        }
    }
};

export default FileService;