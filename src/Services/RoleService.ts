import IRepository from "../Repositories/Interfaces/IRepository";
import { Role, RoleModel } from "../Entities/Role";
import Repository from "../Repositories/Repository";
import Erole from "../Entities/ERole";
import { BadRequest } from "../Exceptions/ErrorList";

class RoleService{
    _role: IRepository<Role>
    constructor() {
        this._role = new Repository<Role>(RoleModel);
    }

    async getOrSaveRole(role: Erole): Promise<Role>{
        if(role === null) throw new BadRequest('Role is cannot be null');

        const findRole = await this._role.findByCriteria({role: role});
        if(findRole !== null) return findRole;

        const saveRole = await this._role.saveModel({role: role});
        return saveRole;
    }
};

export default RoleService;