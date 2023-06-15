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
        if(cred.email === null || cred.password === null) throw new BadRequest('Wrong email or password');
        const result = await this._cred.saveModel(cred);
        return result;
    }

    async getCredentialByEmail(email: string): Promise<Credential>{
        if(email === null) throw new BadRequest('Criteria not found');

        const result = await this._cred.findByCriteria({email: email});
        if(result === null) throw new UnAuthorize('Wrong email or password');

        return result;
    }
}

export default CredentialService;