import { NextFunction, Request, Response } from 'express';
import UserService from "../services/user.service";
import {User} from "../src/entity/User";
import {HttpException} from "../exceptions/HttpException";
import MailerService from "../services/mailer.service";
import {AppDataSource} from "../src/data-source";

export class UsersController{

    public getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await UserService.getUserByEmail(req.body.email)
                .then((user: User) => {
                    res.status(200).json({data: user, message: 'ok'});
                    return user;
                })
                .catch((error: HttpException) => {
                    next(error);
                });
        }
        catch (e) {
            return e.status(404).json({ message: e.message });
        }
    }
    public signUp = async (req: Request, res: Response) => {
        try {
            const data: User = req.body;
            const user = await UserService.signUp(data);
            res.json({ user, message: 'success' });
        } catch (e) {
            return e.status(404).json({ message: e.message });
        }
    }
    public signIn = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const user = await UserService.signIn(data);
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
    
    public deletsUserById = async (req: Request, res: Response) => {
        try {
            const user = await UserService.deleteUserById(req.params.id);
            res.json({ user, message: 'success' });
        } catch (e) {
            return e.status(404).json({ message: e.message });
        }
    }
    
    public verifyEmail = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const user = await UserService.verifyEmail(data);
            if(!user){
                throw new Error("Email is required");
            }
            await MailerService.sendWelcomeEmail(user.email, 'Bienvenue sur Friendzone');
            res.json({message: 'success' });
        } catch (e) {
            return res.status(404).json({ message: e.message });
        }
    }
    
    public sendVerifyEmail = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const user = await AppDataSource.manager.findOne(User, {where: {email: data.email}});
            if(!user){
                throw new Error("Email is required");
            }
            await MailerService.sendVerifyEmail(user.email, 'Confirmez votre email');
            res.json({message: 'success'});
        }
        catch (e) {
            return res.status(404).json({ message: e.message });
        }
    }
}

export default UsersController;