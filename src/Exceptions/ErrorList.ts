import CustomError from "./CustomError";
import EHttpCode from "./EHttpCode";

export class BadRequest extends CustomError{
    code: number;
    message: string;
    constructor(message: string){
        super(EHttpCode.BAD_REQUEST, message);
        this.code = EHttpCode.BAD_REQUEST;
        this.message = message;
    }
}

export class UnAuthorize extends CustomError{
    code: number;
    message: string;
    constructor(message: string){
        super(EHttpCode.UN_AUTHORIZE, message);
        this.code = EHttpCode.UN_AUTHORIZE;
        this.message = message;
    }
}

export class Forbiden extends CustomError{
    code: number;
    message: string;
    constructor(message: string){
        super(EHttpCode.FORBIDEN, message);
        this.code = EHttpCode.FORBIDEN;
        this.message = message;
    }
}

export class NotFound extends CustomError{
    code: number;
    message: string;
    constructor(message: string){
        super(EHttpCode.NOT_FOUND, message);
        this.code = EHttpCode.NOT_FOUND;
        this.message = message;
    }
}