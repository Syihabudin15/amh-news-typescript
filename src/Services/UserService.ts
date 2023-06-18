import { User, UserModel } from "../Entities/User";
import { BadRequest, NotFound } from "../Exceptions/ErrorList";
import IRepository from "../Repositories/Interfaces/IRepository";
import Repository from "../Repositories/Repository";

class UserService{
    _user: IRepository<User>
    constructor(){
        this._user = new Repository<User>(UserModel);
    }

    async createUser(user: User): Promise<User>{
        if((user.first_name || user.last_name || user.phone) === null ) throw new BadRequest('Mohon masukan Nama depan, belakang, dan No Telepon anda');

        const result = await this._user.saveModel(user);
        return result;
    }

    async getUserBymCredentialId(credId: string): Promise<User>{
        const result = await this._user.findByCriteria({m_credential: credId});
        if(result === null) throw new NotFound('Data tidak ditemukan');

        return result;
    }

    async getUserById(id: string): Promise<User>{
        if(id === null) throw new BadRequest('Bad Request');
        const result = await this._user.findByCriteriaPopulate({_id: id}, {path: 'm_credential', populate: {path: 'm_role'}});
        if(result === null) throw new NotFound('Data tidak ditemukan');

        return result;
    }

    async getAllUser(): Promise<User[]>{
        const result = await this._user.findAllPopulate({path: 'm_credential', populate: {path: 'm_role'}});
        return result;
    }
}

export default UserService;