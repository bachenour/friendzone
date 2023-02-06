import {Routes} from "../interfaces/routes.interface";
import {Router} from 'express';
import PostController from "../controllers/post.controller";
import {PostDto} from "../dto/post.dto";

const postControl = new PostController();
const postsDto = new PostDto();

export class PostsRoute implements Routes {
    public path = '/posts';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/addPost`, postsDto.addPost, postControl.addPost);
        this.router.get(`${this.path}/:id`, postControl.getPostsByUserId);
        this.router.put(`${this.path}/:id`, postControl.updatePost);
        this.router.delete(`${this.path}/:id`, postControl.deletePostById);

        /*this.router.get(`${this.path}`, postControl.getPosts);
        */
    }
}