import {NextFunction, Request, Response} from 'express';
import {HttpException} from '../exceptions/HttpException';
import {User} from "../src/entity/User";
import * as bcrypt from 'bcrypt';

export class UsersDto {
    
    //hash password using bcrypt
    hashPassword(password: string) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    checkUserBody(body) {
        if (!body) throw new HttpException(400, "les champs ne sont pas renseignés");
        if (!body.name || !isNaN(body.name)) throw new HttpException(400, 'erreur pas de name');
        if (!body.full_name || !isNaN(body.full_name)) throw new HttpException(400, "erreur pas de prénom");
        if (!body.email || !isNaN(body.email)) throw new HttpException(400, "erreur pas d'email");
        if (!body.password) throw new HttpException(400, 'erreur pas de mot de passe');
        if (!body.age || isNaN(body.age)) throw new HttpException(400, 'erreur pas d\'age');
        if (!body.pseudo || !isNaN(body.pseudo)) throw new HttpException(400, 'erreur pas de pseudo');
        
        
        return true;
    }

    checkUserLogin(body) {
        if (!body) throw new HttpException(400, "les champs ne sont pas renseignés");
        if (!body.email || !isNaN(body.email)) throw new HttpException(400, "erreur pas d'email");
        if (!body.password) throw new HttpException(400, 'erreur pas de mot de passe');
        return true;
    }

    signIn = (req: Request, res: Response, next: NextFunction) => {
        try {
            this.checkUserLogin(req.body);
            next();
        } catch (e) {
            next(e);
        }
    }
    signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.checkUserBody(req.body)

            const data = new User();
            data.name = req.body.name;
            data.full_name = req.body.full_name;
            data.email = req.body.email;
            data.password = this.hashPassword(req.body.password);
            data.age = req.body.age;
            data.pseudo = req.body.pseudo;
            data.user_address = req.body.user_address;
            data.city = req.body.city;
            data.postal_code = req.body.postal_code;
            data.phone_number = req.body.phone_number;
            data.profile_picture = req.body.profile_picture;
            data.sex = req.body.sexe;
            data.is_verified = req.body.is_verified;
            data.role = req.body.role ? req.body.role : 'user';

            req.body = data;
            next();
        } catch (e) {
            next(e);
        }
    }
    
}