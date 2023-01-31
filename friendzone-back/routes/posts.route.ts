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
        // this.router.delete(`${this.path}/deletePost`, this.postControl.deletePost);

        /*this.router.get(`${this.path}`, this.postControl.getPosts);
        this.router.get(`${this.path}/:id`, this.postControl.getPostById);
        this.router.put(`${this.path}/:id`, this.postControl.updatePost);*/
    }
}