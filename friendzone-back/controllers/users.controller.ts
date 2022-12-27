import { NextFunction, Request, Response } from 'express';
import UserService from "../services/user.service";
import {User} from "../src/entity/User";

class UsersController{

    public signUp = async (req: Request, res: Response) => {
        try {
            const data: User = req.body;
            const user = await UserService.signUp(data);
            res.json({ user, message: 'success' });
        } catch (e) {
            return e;
        }

    }
}

export default UsersController;