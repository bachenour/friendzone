import {AppDataSource} from "../src/data-source";
import {Post} from "../src/entity/Post";

class PostService {
    static async addPost(newPost: Post) {
        try {
            await AppDataSource.manager.save(newPost);
            console.log("New post saved with id: " + newPost.id);
            return newPost;
        } catch (e) {
            return e;
        }
    }
}
export default PostService;
