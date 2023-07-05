import {Routes} from "../interfaces/routes.interface";
import {Router} from "express";
import LikeController from "../controllers/like.controller";

const likesController = new LikeController();

export class LikesRoute implements Routes {
    public path = '/likes';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/getUserLikes/:id`, likesController.getLikesByUserId);
        this.router.get(`${this.path}/getPostsLikes/:id`, likesController.getNumberOfPostsLikes);
        this.router.post(`${this.path}/manageLikes`, likesController.ManageLike);
    }
}