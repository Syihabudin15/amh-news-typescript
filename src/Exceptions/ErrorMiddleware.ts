import { NextFunction, Request, Response } from "express";
import CustomError from "./CustomError";

function ErrorMiddleware(err: CustomError, req: Request, res: Response, next: NextFunction){
    const code: number = err.code || 500;
    const message: string = err.message || 'Internal server error';
    return res.status(code).json({code, message});
};

export default ErrorMiddleware;