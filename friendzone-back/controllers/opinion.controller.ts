import {Activity} from "../src/entity/Activity";
import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {User} from "../src/entity/User";
import {Post} from "../src/entity/Post";
import {Opinion} from "../src/entity/Opinion";
import {AppDataSource} from "../src/data-source";
import {OpinionService} from "../services/opinion.service";

class OpinionController{
    
    public scriptAddOpinion = async (req: Request, res: Response) => {
        // Récupérer les utilisateurs, les posts et les activités
        const userRepository = AppDataSource.getRepository(User);
        const postRepository = AppDataSource.getRepository(Post);
        const activityRepository = AppDataSource.getRepository(Activity);
        const users = await userRepository.find();
        const posts = await postRepository.find();
        const activities = await activityRepository.find();

        if (users.length === 0 || (posts.length === 0 && activities.length === 0)) {
            console.log('No users, posts or activities found in the database. Please create some first.');
            return;
        }

        const opinionRepository = AppDataSource.getRepository(Opinion);

        const positiveOpinions = [
            'Super expérience !',
            'Je me suis vraiment amusé.',
            'Excellente activité.',
            'J\'ai adoré ce post.',
            // Ajoutez autant d'opinions positives que vous le souhaitez
        ];

        const negativeOpinions = [
            'Ce n\'était pas à la hauteur de mes attentes.',
            'Je me suis ennuyé.',
            'Je n\'ai pas aimé cette activité.',
            'Ce post n\'était pas intéressant.',
            // Ajoutez autant d'opinions négatives que vous le souhaitez
        ];

        for (let i = 0; i < 100; i++) {
            const opinion = new Opinion();
            opinion.users = users[Math.floor(Math.random() * users.length)];

            // Choisir aléatoirement entre un post et une activité
            if (Math.random() < 0.5 && posts.length > 0) {
                opinion.post = posts[Math.floor(Math.random() * posts.length)];
                opinion.activity = null;
            } else if (activities.length > 0) {
                opinion.activity = activities[Math.floor(Math.random() * activities.length)];
                opinion.post = null;
            }

            // Choisir aléatoirement entre une opinion positive et négative
            if (Math.random() < 0.5) {
                opinion.text = positiveOpinions[Math.floor(Math.random() * positiveOpinions.length)];
            } else {
                opinion.text = negativeOpinions[Math.floor(Math.random() * negativeOpinions.length)];
            }

            await opinionRepository.save(opinion);
        }
        res.json({ message: 'Opinions added' });
    }
    
    public addOpinion = async (req: Request, res: Response) => {
        try {
            const data: Opinion = req.body;
            const opinion = await OpinionService.addOpinion(data);
            if (opinion.error) {
                res.status(400).json(opinion);
            }
            res.json(opinion);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
    
    public getOpinions = async (req: Request, res: Response) => {
        try {
            const post_id = req.body.post_id ?? null;
            const activity_id = req.body.activity_id ?? null;
            const opinions = await OpinionService.getOpinions(post_id, activity_id);
            res.json(opinions);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
    
    public deleteOpinion = async (req: Request, res: Response) => {
        try {
            const id = req.body.id;
            const opinion = await OpinionService.deleteOpinionById(id);
            res.json(opinion);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}

export default OpinionController;