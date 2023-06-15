import Erole from "../Entities/ERole";
import IPersistence from "../Repositories/Interfaces/IPersistence";
import Persistence from "../Repositories/Persistence";
import RoleService from "./RoleService";

class AuthService{
    _role: RoleService;
    _persistence: IPersistence;
    constructor(){
        this._role = new RoleService();
        this._persistence = new Persistence();
    }

    async RegisterAdmin(): Promise<object>{
        const result = await this._persistence.transaction(async () => {
            const role = await  this._role.getOrSaveRole(Erole.ADMIN);
            return role;
        });
        return result;
    }
}

export default AuthService;