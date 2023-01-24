import { NextFunction, Request, Response } from 'express';
import UserService from "../services/user.service";
import {User} from "../src/entity/User";
import {HttpException} from "../exceptions/HttpException";

export class UsersController{

    public signUp = async (req: Request, res: Response) => {
        try {
            const data: User = req.body;
            const user = await UserService.signUp(data);
            res.json({ user, message: 'success' });
        } catch (e) {
            return e.status(404).json({ message: e.message });
        }
    }
    
    public updateUserData = async (req: Request , res: Response) => {
        try {
            const data: User = req.body;
            const user = await UserService.updateUserData(req.params.id, data);
            res.json({ user, message: 'success' });
        } catch (e) {
            return e.status(404).json({ message: e.message });
        }
    }
}

export default UsersController;