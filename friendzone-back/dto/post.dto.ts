import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';
import {Post} from "../src/entity/Post";

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
            data.users_id = req.body.user_id;

            req.body = data;
            next();
        }catch (e) {
            next(e);
        }
    }
}