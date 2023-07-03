import {AppDataSource} from "../src/data-source";
import {Like} from "../src/entity/Like";
import {Post} from "../src/entity/Post";
import {User} from "../src/entity/User";
class LikeService {
    static async ManageLike (newLike: Like, postId: any, userId: any) {
        try {
            const getUserId = await AppDataSource.manager.findOne(User, {where: {id: userId}});
            const getPostId = await AppDataSource.manager.findOne(Post, {where: {id: postId}});

            const LikeRepository = AppDataSource.manager.getRepository(Like);
            const isLikeExists = await LikeRepository.find({where: [{user: getUserId, post: getPostId}]});

            if (isLikeExists.length === 0) {
                await LikeRepository.save(newLike);
                return {newLike, message: 'Like added'};
            } else {
                await LikeRepository.remove(isLikeExists[0]);
                return "Like removed";
            }
        } catch (error) {
            return error;
        }
    }

    static async getLikesByUserId (userId: any) {
        try {
            const getUserId = await AppDataSource.manager.find(User, {where: {id: userId}});

            if (getUserId.length === 0) {
                return {message: 'User not found'};
            }

            const LikesRepository = AppDataSource.manager.getRepository(Like);
            const likes = await LikesRepository.find({ where: [{ user: getUserId } ]});
            return likes.length;

        } catch (error) {
            return error;
        }
    }

    static async getNumberOfPostsLikes (postId: any) {
        try {
            const getPostId = await AppDataSource.manager.find(Post, {where: {id: postId}});

            if (getPostId.length === 0) {
                return {message: 'Post not found'};
            }

            const LikesRepository = AppDataSource.manager.getRepository(Like);
            const likes = await LikesRepository.find({ where: [{ post: getPostId } ]});
            return likes.length;

        } catch (error) {
            return error;
        }
    }
}
export default LikeService;