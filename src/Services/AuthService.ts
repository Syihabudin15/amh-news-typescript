import { Credential } from "../Entities/Credential";
import { RegisterRequest, RegisterResponse } from "../Entities/Dtos/Register";
import Erole from "../Entities/ERole";
import IPersistence from "../Repositories/Interfaces/IPersistence";
import Persistence from "../Repositories/Persistence";
import CredentialService from "./Credentialservice";
import RoleService from "./RoleService";
import UserService from "./UserService";
import { User } from "../Entities/User";
import { LoginRequest, LoginResponse } from "../Entities/Dtos/Login";
import { BadRequest, UnAuthorize } from "../Exceptions/ErrorList";
import bcrypt from 'bcrypt';
import JwtUtil from "../Utils/JwtUtil";

class AuthService{
    _role: RoleService;
    _cred: CredentialService;
    _user: UserService;
    _jwt: JwtUtil;
    _persistence: IPersistence;

    constructor(){
        this._role = new RoleService();
        this._cred = new CredentialService();
        this._user = new UserService();
        this._jwt = new JwtUtil();
        this._persistence = new Persistence();
    }

    async RegisterAdmin(request: RegisterRequest): Promise<RegisterResponse>{
        const result = await this._persistence.transaction(async (): Promise<RegisterResponse> => {
            const hashed = await bcrypt.hash(request.password, 8);

            const role = await this._role.getOrSaveRole(Erole.ADMIN);
            const cred = await this._cred.createCredential({email: request.email.toLowerCase(), password: hashed, mRoleId: role.id, m_role: role});
            const user = await this._user.createUser({
                first_name: request.first_name,
                last_name: request.last_name,
                phone: request.phone,
                about: request.about ? request.about : `Hai Nama saya ${request.first_name} ${request.last_name}, dan saya adalah Admin`,
                m_credential: cred
            });
            const response: RegisterResponse = {
                name: `${user.first_name} ${user.last_name}`,
                phone: user.phone,
                about: user.about,
                email: cred.email,
                role: role
            };

            return response;
        });
        return result;
    }

    async createWriter(request: RegisterRequest): Promise<RegisterResponse>{
        const result = await this._persistence.transaction(async () => {
            const hashed = await bcrypt.hash(request.password, 8);

            const role = await this._role.getOrSaveRole(Erole.WRITER);
            const cred = await this._cred.createCredential(new Credential({email: request.email.toLowerCase(), password: hashed, m_role: role}));
            const user = await this._user.createUser(new User({
                first_name: request.first_name,
                last_name: request.last_name,
                phone: request.phone,
                about: request.about ? request.about : `Hai Nama saya ${request.first_name} ${request.last_name}, dan saya seorang Penulis`,
                m_credential: cred
            }));
            const response: RegisterResponse = {
                name: `${user.first_name} ${user.last_name}`,
                phone: user.phone,
                about: user.about,
                email: cred.email,
                role: role
            };

            return response;
        });
        return result;
    }

    async Login(request: LoginRequest): Promise<LoginResponse>{
        if((request.email || request.password) === null) throw new BadRequest('Email dan Password harus diisi');

        const cred = await this._cred.getCredentialByEmail(request.email);
        const verify = await bcrypt.compare(request.password, cred.password);
        if(cred === null || !verify) throw new UnAuthorize('Email atau Password salah');
        
        const jwtToken = this._jwt.sign({userId: cred.m_user?.id, email: cred.email, role: cred.m_role.role});
        const response: LoginResponse = {
            user_id: cred.m_user?._id,
            name: `${cred.m_user?.first_name} ${cred.m_user?.last_name}`,
            email: cred.email,
            role: cred.m_role,
            token: jwtToken
        };

        return response;
    }
}

export default AuthService;