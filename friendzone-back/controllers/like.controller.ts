import {Request, Response } from 'express';
import LikeService from "../services/like.service";
import {Like} from "../src/entity/Like";

class LikeController {

     ManageLike = async (req: Request, res: Response) => {
        try {
            const data: Like = req.body;
            const post_id = req.body.post ?? null;
            const user_id = req.body.user ?? null;
            const like = await LikeService.ManageLike(data, post_id, user_id);
            if (like.error) {
                res.status(400).json({ message: like.error });
            }
            res.json({like});
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    getLikesByUserId = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const likes = await LikeService.getLikesByUserId(userId);
            res.json({ likes, message: 'Success' });
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }

    getNumberOfPostsLikes = async (req: Request, res: Response) => {
        try {
            const postId = req.params.id;
            const likes = await LikeService.getNumberOfPostsLikes(postId);
            res.json({ likes, message: 'Success' });
        }catch (error) {
            return error.status(404).json({ message: error.message });
        }
    }
}
export default LikeController;