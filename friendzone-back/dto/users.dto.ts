import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { newUser } from '../interfaces/users.interface';
import {User} from "../src/entity/User";

export class UsersDto {
    signUp = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.body.name) throw new HttpException(400, 'erreur pas de nom');
            if (!req.body.full_name) throw new HttpException(400, "erreur pas de prénom");
            if (!req.body.email) throw new HttpException(400, "erreur pas d'email");
            if (!req.body.password) throw new HttpException(400, 'erreur pas de mot de passe');
            if (!req.body.age) throw new HttpException(400, 'erreur pas d\'age');

            const data = new User();
            data.name = req.body.name;
            data.full_name = req.body.full_name;
            data.email = req.body.email;
            data.password = req.body.password;
            data.age = req.body.age;
            data.pseudo = req.body.pseudo;
            data.user_address = req.body.user_address;
            data.city = req.body.city;
            data.postal_code = req.body.postal_code;
            data.phone_number = req.body.phone_number;
            data.profile_picture = req.body.profile_picture;
            data.sexe = req.body.sexe;
            data.is_verified = req.body.is_verified;
            data.role = req.body.role;

            req.body = data;
            next();
        }catch (e) {
            next(e);
        }
    }
}