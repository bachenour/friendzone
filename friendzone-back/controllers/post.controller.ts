import { NextFunction, Request, Response } from 'express';
import PostService from "../services/post.service";
import {Post} from "../src/entity/Post";

class PostController {

    public addPost = async (req: Request, res: Response) => {
        try {
            const data: Post = req.body;
            const post = await PostService.addPost(data);
            res.json({ post, message: 'Publication saved' });
        } catch (error) {
            return error.status(404).json({ message: error.message });
        }
    };
    public getPostsByUserId = async (req: Request, res: Response) => {
        try {
            const post = new Post();
            post.users_id = req.body;
            const find = await PostService.getPostsByUserId(post);
            res.json ({find, message: 'Le voici'})
        }catch (error) {
            return error.status(404).json({ message: error.message });
        }
    };
    public updatePost = async (req: Request , res: Response) => {
        try {
            const data: Post = req.body;
            const postToUpdate = await PostService.updatePost(req.params.id, data);
            res.json({ postToUpdate, message: 'La publication a bien été mise à jour' });
        } catch (error) {
            return error.status(404).json({ message: error.message });
        }
    }

    public deletePostById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = req.params.id;
            const deletePost = await PostService.deletePostById(postId);
            res.json({ deletePost, message: 'La publication a bien été supprimée' });
        } catch (error) {
            return error.status(404).json({ message: error.message });
        }
    };
}

export default PostController;