import {AppDataSource} from "../src/data-source";
import {Post} from "../src/entity/Post";
// import {delete} from "pm2";

class PostService {
    static async addPost(newPost: Post) {
        try {
            await AppDataSource.manager.save(newPost);
            return newPost;
        } catch (e) {
            return e;
        }
    }
    static async getPostsByUserId(userId: any) {
        try {
            const postsToFind = await AppDataSource.manager.find(Post, {where: {users_id: userId.id}});
            return postsToFind;
        } catch (e) {
            return e;
        }
    }

    static async deletePostById(postId: any) {
        try {
            const postToDelete = await AppDataSource.manager.findOne(Post, {where: {id: postId.id}});
            await AppDataSource.manager.remove(postToDelete);
            return postToDelete;
        } catch (e) {
            return e;
        }
    }
}
export default PostService;
