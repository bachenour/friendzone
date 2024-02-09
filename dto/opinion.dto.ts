import {Opinion} from "../src/entity/Opinion";
import {HttpException} from "../exceptions/HttpException";
import {NextFunction, Request, Response} from "express";


export class OpinionDto {
    addOpinion = (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.body.text) throw new HttpException(400, 'erreur: champ vide');
                if (req.body.post_id && req.body.activity_id) throw new HttpException(400, 'erreur: opinion sur post ou activité');
                if (!req.body.post_id && !req.body.activity_id) throw new HttpException(400, 'erreur: pas de post ou d\'activité');
                

                const data = new Opinion();
                data.post = req.body.post_id ?? null
                data.activity = req.body.activity_id ?? null;
                data.text = req.body.text;
                data.users = req.body.userPayload.id;
                req.body = data;
                next();

            }catch (e) {
                next(e);
            }
        }
    
    
}