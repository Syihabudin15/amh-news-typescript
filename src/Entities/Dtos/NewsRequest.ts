export type NewsRequest = {
    title: string;
    subBody: string;
    body: string;
    images: globalThis.Express.Multer.File[];
    categories: string[];
}