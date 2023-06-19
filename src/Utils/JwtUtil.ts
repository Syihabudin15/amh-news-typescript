import jwt from 'jsonwebtoken';
import { secretKey } from '../config/envi';
import { Forbiden } from '../Exceptions/ErrorList';
import { NextFunction, Request, Response } from 'express';
import { JwtType } from '../Entities/Dtos/JwtUtil';
import Erole from '../Entities/ERole';

class JwtUtil{
    _jwt: typeof jwt;
    _secret: string = secretKey;
    constructor(){
        this._jwt = jwt;
    }
    sign(jwtType: JwtType): string{
        const token = this._jwt.sign(jwtType, secretKey, {expiresIn: '48h'});
        return token;
    }

    verifyAdmin(req: Request, res: Response, next: NextFunction): void{
        const token: string = req.header('token') || '';
        if(token === '') throw new Forbiden('Mohon Login');

        const verify = this._jwt.verify(token, this._secret);
        if(!verify) throw new Forbiden('Token tidak valid. Silahkan Masuk kembali');
        
        const claims = this.decode(token);
        if(claims.role !== Erole.ADMIN) throw new Forbiden('Anda tidak diizinkan mengakses fitur ini');

        next();
    }

    verify(req: Request, res: Response, next: NextFunction): void{
        const token: string = req.header('token') || '';
        if(token === '') throw new Forbiden('Mohon Login');

        const verify = this._jwt.verify(token, this._secret);
        if(!verify) throw new Forbiden('Token tidak valid. Silahkan Masuk kembali');
        
        next();
    }

    decode(token: string): JwtType{
        const decode = this._jwt.decode(token);
        const result: JwtType = JSON.parse(JSON.stringify(decode));
        return result;
    }
}


export default JwtUtil;