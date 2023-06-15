import Erole from "../ERole";

export type JwtType = {
    userId: string;
    email: string;
    role: Erole
};