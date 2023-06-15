import CustomError from "./CustomError";

export class BadRequest extends CustomError{
    code: number;
    messsage: string;
    constructor(message: string){
        super(EHttpCode.BAD_REQUEST,message);
        this.code = EHttpCode.BAD_REQUEST;
        this.message = message;
    }
}