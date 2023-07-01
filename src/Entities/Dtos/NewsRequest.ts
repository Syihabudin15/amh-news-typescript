export type NewsRequest = {
    title: string;
    subBody: string;
    body: string;
    image: globalThis.Express.Multer.File;
    categories: string[];
}