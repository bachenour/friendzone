import {Request, Response } from 'express';
import PostService from "../services/post.service";
import {Post} from "../src/entity/Post";
import {AppDataSource} from "../src/data-source";
import {User} from "../src/entity/User";
import {faker} from "@faker-js/faker";

class PostController {

    public addPost = async (req: Request, res: Response) => {
        try {
            const data: Post = req.body;
            const post = await PostService.addPost(data);
            if (post.error) {
                res.status(400).json({ message: post.error });
            }
            res.json({post});
        } catch (e) {
            return e;
        }
    };

    public getPosts = async (req: Request, res: Response) => {
        try {
            const posts = await PostService.getPosts();
            res.json({ posts, message: 'Success' });
        }catch (error) {
            return error.status(404).json({ message: error.message });
        }
    }

    public getPostsByUserId = async (req: Request, res: Response) => {
        try {
            const posts = await PostService.getPostsByUserId(req.body);
            res.json({ posts, message: 'Success' });
        }catch (error) {
            return error.status(404).json({ message: error.message });
        }
    }

    public updatePost = async (req: Request , res: Response) => {
        try {
            const data: Post = req.body;
            const postToUpdate = await PostService.updatePost(req.params.id, data);
            res.json({ postToUpdate, message: 'La publication a bien été mise à jour' });
        } catch (error) {
            return error.status(404).json({ message: error.message });
        }
    }

    public deletePostById = async (req: Request, res: Response) => {
        try {
            const postId = req.params.id;
            const deletePost = await PostService.deletePostById(postId);
            res.json({ deletePost, message: 'La publication a bien été supprimée' });
        } catch (error) {
            return error.status(404).json({ message: error.message });
        }
    };
    
    public scriptAddPost = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        const postTitles = [
            'Ma nouvelle aventure',
            'Le coucher de soleil d\'hier était incroyable',
            'Meilleure recette de cookies jamais',
            'Travail en cours',
            'Nouvelle routine d\'entraînement',
            'Petite balade matinale',
            'Incroyable concert la nuit dernière',
            'Découverte de nouveaux horizons',
            'C\'est l\'heure du café',
            'Mon voyage à la montagne',
            'Nouvelle aquarelle en cours',
            'Essai de la nouvelle recette de grand-mère',
            'Superbe randonnée en forêt',
            'Dégustation de la cuisine locale',
            'Découverte d\'un nouveau groupe de musique',
            'Première fois au surf',
            'Séance de yoga du matin',
            'Ma collection de plantes s\'agrandit',
            'Bonne soirée entre amis',
            'Bricolage du dimanche',
            'Nouvelle lecture passionnante',
            'Première tentative de tricot',
            'Vue imprenable depuis mon bureau',
            'Mon petit coin de paradis',
            'Recette de smoothie du jour',
            'Rencontre avec un ami de longue date',
            'Le plaisir simple de la pâtisserie',
            'Retour sur mon voyage en Espagne',
            'Exposition d\'art locale',
            'Petit déjeuner gourmand',
            'Première neige de l\'année',
            'Détente en bord de mer',
            'Ma passion pour la photographie',
            'Nouvelles idées de décoration intérieure',
            'Soirée cinéma à la maison',
            'Cours de dessin en plein air',
            'Plaisir de la cuisine maison',
            'Rêverie sous les étoiles',
            'Séance de méditation du soir',
            'Essai de la nouvelle tenue',
            'Petit plaisir sucré',
            'Nouveau projet de bricolage',
            'Café et bonne lecture',
            'Balade en ville',
            'Découverte d\'un nouveau parc',
            'Pause détente et bien-être',
            'Première course de 10 km',
            'Expérience culinaire réussie',
            'Cours de poterie du week-end',
            'Petite escapade en pleine nature'
        ];
        
        try{
            for (const title of postTitles) {
                const post = new Post();
                post.title = title;
                post.content = faker.lorem.paragraphs(1);
                post.creationDate = faker.date.between({ from: '2022-09-01', to: '2023-07-31'});
                post.users = users[Math.floor(Math.random() * users.length)];
    
                AppDataSource.getRepository('Post').save(post);
            }
            res.json({ message: 'Script add post success' });
        }
        catch (error) {
            return { message: error.message }
        }
        
        
    }
}

export default PostController;