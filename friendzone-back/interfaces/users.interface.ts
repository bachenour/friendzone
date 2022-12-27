import {Column} from "typeorm";

export interface newUser {
    name: string;
    full_name: string;
    email: string;
    password: string;
    age: number;
    pseudo: string;
    user_address: string;
    city: string;
    postal_code: number;
    phone_number: number;
    profile_picture: string;
    sexe: string;
    is_verified: boolean;
    role: string;
}