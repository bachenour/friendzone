import {Routes} from "../interfaces/routes.interface";
import {Router} from "express";
import {JwtService} from "../services/jwt.service";
import bcrypt from 'bcrypt';
import ActivityController from "../controllers/activity.controller";

const activityController = new ActivityController();


export class ScriptRoute implements Routes {
    public path = '/script';
    public router = Router();
    
    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`${this.path}/addActivity`, activityController.scriptAddActivity);
    }
    
}