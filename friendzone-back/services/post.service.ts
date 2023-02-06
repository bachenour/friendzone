import {AppDataSource} from "../src/data-source";
import {Post} from "../src/entity/Post";

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
            return await AppDataSource.manager.findBy(Post,  {users_id: userId})
        } catch (e) {
            return e;
        }
    }

    static async updatePost(id: any, postData: Post ) {
        try {
            await AppDataSource.manager.update(Post, id, postData);
            return postData;
        } catch (e) {
            return e;
        }
    }

    static async deletePostById(postId: any) {
        try {
            const postToDelete = await AppDataSource.manager.findOne(Post, {where: {id: postId}});
            await AppDataSource.manager.remove(postToDelete);
            return postToDelete;
        } catch (e) {
            return e;
        }
    }
}
export default PostService;
