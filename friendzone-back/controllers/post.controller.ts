import {Request, Response } from 'express';
import PostService from "../services/post.service";
import {Post} from "../src/entity/Post";

class PostController {

    public addPost = async (req: Request, res: Response) => {
        try {
            const data: Post = req.body;
            const post = await PostService.addPost(data);
            res.json({ post, message: 'Publication saved' });
        } catch (e) {
            return e;
        }
    }
}

export default PostController;