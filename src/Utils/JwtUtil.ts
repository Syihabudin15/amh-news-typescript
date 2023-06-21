import Jwt from 'jsonwebtoken';
import { secretKey } from '../config/envi';
import { Forbiden } from '../Exceptions/ErrorList';
import { NextFunction, Request, Response } from 'express';
import { JwtType } from '../Entities/Dtos/JwtUtil';
import Erole from '../Entities/ERole';

class JwtUtil{

    sign(jwtType: JwtType): string{
        const token = Jwt.sign(jwtType, secretKey, {expiresIn: '48h'});
        return token;
    }

    verifyAdmin(req: Request, res: Response, next: NextFunction): void{
        const token: string = req.header('token') || '';
        if(token === '') throw new Forbiden('Mohon Login');

        const verify = Jwt.verify(token, secretKey);
        if(!verify) throw new Forbiden('Token tidak valid. Silahkan Masuk kembali');
        
        const decode = Jwt.decode(token);
        const claims: JwtType = JSON.parse(JSON.stringify(decode));
        if(claims.role !== Erole.ADMIN) throw new Forbiden('Anda tidak diizinkan mengakses fitur ini');

        next();
    }

    verify(req: Request, res: Response, next: NextFunction): void{
        const token: string = req.header('token') || '';
        if(token === '') throw new Forbiden('Mohon Login');

        const verify = Jwt.verify(token, secretKey);
        if(!verify) throw new Forbiden('Token tidak valid. Silahkan Masuk kembali');
        
        next();
    }

    decode(token: string): JwtType{
        const decode = Jwt.decode(token);
        const result: JwtType = JSON.parse(JSON.stringify(decode));
        return result;
    }
}


export default JwtUtil;