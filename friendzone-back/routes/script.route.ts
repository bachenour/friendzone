import {Routes} from "../interfaces/routes.interface";
import {Router} from "express";
import {JwtService} from "../services/jwt.service";
import bcrypt from 'bcrypt';
import ActivityController from "../controllers/activity.controller";
import PostController from "../controllers/post.controller";
import OpinionController from "../controllers/opinion.controller";

const activityController = new ActivityController();
const postController = new PostController();
const OpinionsController = new OpinionController();


export class ScriptRoute implements Routes {
    public path = '/script';
    public router = Router();
    
    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.get(`${this.path}/addActivity`, activityController.scriptAddActivity);
        this.router.get(`${this.path}/addPost`, postController.scriptAddPost);
        this.router.get(`${this.path}/addOpinion`, OpinionsController.scriptAddOpinion);
    }
    
}