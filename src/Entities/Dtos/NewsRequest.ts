import { UploadedFile } from "express-fileupload";

export type NewsRequest = {
    title: string;
    subBody: string;
    body: string;
    image: string;
    categories: string[];
}