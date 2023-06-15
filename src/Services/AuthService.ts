import { Credential } from "../Entities/Credential";
import { RegisterRequest, RegisterResponse } from "../Entities/Dtos/Register";
import Erole from "../Entities/ERole";
import IPersistence from "../Repositories/Interfaces/IPersistence";
import Persistence from "../Repositories/Persistence";
import CredentialService from "./Credentialservice";
import RoleService from "./RoleService";
import UserService from "./UserService";
import { User } from "../Entities/User";

class AuthService{
    _role: RoleService;
    _cred: CredentialService;
    _user: UserService;
    _persistence: IPersistence;

    constructor(){
        this._role = new RoleService();
        this._cred = new CredentialService();
        this._user = new UserService();
        this._persistence = new Persistence();
    }

    async RegisterAdmin(request: RegisterRequest): Promise<RegisterResponse>{
        const result = await this._persistence.transaction(async () => {
            const role = await this._role.getOrSaveRole(Erole.ADMIN);
            const cred = await this._cred.createCredential(new Credential({email: request.email, password: request.password, m_role: role}));
            const user = await this._user.createUser(new User({
                first_name: request.first_name,
                last_name: request.last_name,
                phone: request.phone,
                about: request.about !== null ? request.about : 'Hai Nama saya Syihabudin Tsani',
                m_credential: cred
            }));
            const response: RegisterResponse = {
                name: `${user.first_name} ${user.last_name}`,
                phone: user.phone,
                email: cred.email,
                role: role
            };

            return response;
        });
        return result;
    }
}

export default AuthService;