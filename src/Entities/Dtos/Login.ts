import { Role } from "../Role";

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    user_id: string;
    name: string;
    email: string;
    role: Role,
    token: string;
};