import { Role } from "../Role";

export type RegisterRequest = {
    first_name: string;
    last_name: string;
    about?: string;
    phone: string;
    email: string;
    password: string;
};

export type RegisterResponse = {
    name: string;
    about?: string;
    phone: string;
    email: string;
    role: Role;
};