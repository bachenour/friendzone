import {NextFunction, Request, Response} from "express";
import {HttpException} from "../exceptions/HttpException";
import {Activity} from "../src/entity/Activity";
import {AppDataSource} from "../src/data-source";
import {Category} from "../src/entity/Category";
import {User} from "../src/entity/User";

export class ActivityDto {

    addActivity = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.body.subject) throw new HttpException(400, 'erreur: aucun sujet');
            if (!req.body.max_person) throw new HttpException(400, 'erreur: champ non renseigné');
            if (!req.body.date_activity) throw new HttpException(400, 'erreur: date non renseignée');
            if (!req.body.address) throw new HttpException(400, 'erreur: pas d\'adresse');
            if (!req.body.city) throw new HttpException(400, 'erreur: pas de ville');
            if (!req.body.postal_code) throw new HttpException(400, 'erreur: pas de code postal');

            const data = new Activity();
            data.subject = req.body.subject;
            data.max_person = req.body.max_person;
            data.date_activity = req.body.date_activity;
            data.address = req.body.address;
            data.city = req.body.city;
            data.postal_code = req.body.postal_code;
            AppDataSource.manager.findOne(Category, {where: {id: req.body.category_id}}).then((category) => {
                data.category = category;
                req.body = data;
            });
            AppDataSource.manager.findOne(User, {where: {id: req.body.users_id}}).then((user) => {
                data.users = user;
                req.body = data;
                next();
            });

        }catch (e) {
            next(e);
        }
    }

    findActivityByUserId = (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.params.id) throw new HttpException(400, 'erreur pas d\'id');

                let id = parseInt(req.params.id);
                AppDataSource.manager.findOne(User, {where: {id: id}}).then((user) => {
                    req.body = user;
                    next();
                });
            }catch (e) {
                next(e);
            }
    }
}