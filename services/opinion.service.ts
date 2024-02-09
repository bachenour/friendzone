import {AppDataSource} from "../src/data-source";
import {Opinion} from "../src/entity/Opinion";
import {Activity} from "../src/entity/Activity";
import {Post} from "../src/entity/Post";


export class OpinionService {
    static async addOpinion(newOpinion: Opinion) {
        try {
            await AppDataSource.manager.save(newOpinion);
            return {newOpinion, message: 'Opinion added'};
            
        }
        catch (e) {
            return {error: e};
        }
    }
    
    static async getOpinions(postId: any, activityId: any) {
        try {
            const post = await AppDataSource.manager.findOne(Post, {where: {id: postId}});
            const activity = await AppDataSource.manager.findOne(Activity, {where: {id: activityId}});
            
            const OpinionRepository = AppDataSource.manager.getRepository(Opinion);
            return await OpinionRepository.find({where: [{post: post}, {activity: activity}]});
        } catch (e) {
            return e;
        }
    }
    
    static async deleteOpinionById(opinionId: any) {
        try {
            const opinionToDelete = await AppDataSource.manager.findOne(Opinion, {where: {id: opinionId}});
            await AppDataSource.manager.remove(opinionToDelete);
            return opinionToDelete;
        } catch (e) {
            return e;
        }
    }
    
}