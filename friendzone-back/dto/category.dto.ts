import { Request, Response, NextFunction } from 'express';
import {Category} from "../src/entity/Category";
import {HttpException} from "../exceptions/HttpException";

export class CategoryDto {
        addCategory = (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.body.name) throw new HttpException(400, 'erreur: champ vide');

                const data = new Category();
                data.name = req.body.name;
                req.body = data;
                next();

            }catch (e) {
                next(e);
            }
        }
}