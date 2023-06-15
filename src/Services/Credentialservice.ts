import { Credential, CredentialModel } from "../Entities/Credential";
import { BadRequest, UnAuthorize } from "../Exceptions/ErrorList";
import IRepository from "../Repositories/Interfaces/IRepository";
import Repository from "../Repositories/Repository";

class CredentialService{
    _cred: IRepository<Credential>;
    constructor(){
        this._cred = new Repository<Credential>(CredentialModel);
    }

    async createCredential(cred: Credential): Promise<Credential>{
        if(cred.email === null || cred.password === null || cred.password.length < 6) throw new BadRequest('Email atau Password tidak sesuai ketentuan');
        const result = await this._cred.saveModel(cred);
        return result;
    }

    async getCredentialByEmail(email: string): Promise<Credential>{
        if(email === null) throw new BadRequest('Email tidak boleh kosong');

        const result = await this._cred.findByCriteriaPopulate({email: email}, ['mRoleId']);
        if(result === null) throw new UnAuthorize('Email atau Password salah');

        return result;
    }
}

export default CredentialService;