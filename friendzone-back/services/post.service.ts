import {AppDataSource} from "../src/data-source";
import {Post} from "../src/entity/Post";
import {User} from "../src/entity/User";

class PostService {
    static async addPost(newPost: Post) {
        try {
            const isPostExist = await AppDataSource.manager.findOne(Post, {where: {title: newPost.title, content: newPost.content}});
            if (!isPostExist) {
                await AppDataSource.manager.save(newPost);
                return {newPost, message: 'Post added'};
            } else {
                return {error: 'Post already exist'};
            }
        } catch (e) {
            return e;
        }
    }

    static async getposts() {
        try {
            return await AppDataSource.getRepository(Post)
                .createQueryBuilder('post')
                .select('post')
                .addSelect('users.pseudo')
                .leftJoin('post.users', 'users')
                .leftJoinAndSelect('post.opinion','opinion').getMany();
        } catch (e) {
            return e;
        }
    }

    static async getPostsByUserId(userId: any) {
        try {
            if (userId == null) {
                return {error:"No Posts found with this user id"};
            }
            const PostData = await AppDataSource.manager.findBy(Post, {users: userId});
            return PostData.length === 0 ? {error: 'Posts not found'} : PostData;
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
