"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const ErrorList_1 = require("../Exceptions/ErrorList");
class FileService {
    constructor() {
        this.storageFile = multer_1.default.diskStorage({
            destination(req, file, callback) {
                callback(null, 'src/resources/img');
            },
            filename(req, file, callback) {
                callback(null, `${Date.now().toString()}-${file.originalname}`);
            },
        });
        this.filterFile = (req, file, callback) => {
            if (file.mimetype.split('/')[1] == 'png' || file.mimetype.split('/')[1] == 'jpg' || file.mimetype.split('/')[1] == 'jpeg') {
                callback(null, true);
            }
            else {
                callback(new ErrorList_1.BadRequest('Ekstensi File tidak didukung'), false);
            }
        };
        this._file = (0, multer_1.default)({
            storage: this.storageFile,
            fileFilter: this.filterFile
        });
    }
}
;
exports.default = FileService;
//# sourceMappingURL=FileService.js.map