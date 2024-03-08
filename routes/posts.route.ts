import {Routes} from "../interfaces/routes.interface";
import {Router} from 'express';
import PostController from "../controllers/post.controller";
import {PostDto} from "../dto/post.dto";
import {JwtService} from "../services/jwt.service";

const postControl = new PostController();
const postsDto = new PostDto();
const authMiddleware = new JwtService();

export class PostsRoute implements Routes {
    public path = '/posts';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/addPost`, authMiddleware.verify, postsDto.addPost, postControl.addPost);
        this.router.get(`${this.path}/getPosts`, postControl.getPosts);
        this.router.get(`${this.path}/:id`, postsDto.findPostByUserId, postControl.getPostsByUserId);
        this.router.put(`${this.path}/:id`, authMiddleware.verify,  postControl.updatePost);
        this.router.delete(`${this.path}/:id`, authMiddleware.verify,  postControl.deletePostById);
    }
}