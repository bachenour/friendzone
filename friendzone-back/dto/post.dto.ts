import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';
import {Post} from "../src/entity/Post";
import {AppDataSource} from "../src/data-source";
import {User} from "../src/entity/User";

export class PostDto {
    addPost = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.body.title) throw new HttpException(400, 'erreur pas de titre');
            if (!req.body.content) throw new HttpException(400, "Veuillez renseigner un corps");
            if (!req.body.creationDate) throw new HttpException(400, "erreur pas de date");

            const data = new Post();
            data.title = req.body.title;
            data.content = req.body.content;
            data.creationDate = req.body.creationDate;
            AppDataSource.manager.findOne(User, {where: {id: req.body.users_id}}).then((user) => {
                data.users_id = user;
                req.body = data;
                next();
            });
        }catch (e) {
            next(e);
        }
    }

    findPostByUserId = (req: Request, res: Response, next: NextFunction) => {
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