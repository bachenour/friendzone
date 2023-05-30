import {Activity} from "../src/entity/Activity";
import ActivityService from "../services/activity.service";
import {Request, Response} from "express";
import {faker} from "@faker-js/faker";
import {AppDataSource} from "../src/data-source";

class ActivityController {

    public addActivity = async (req: Request, res: Response) => {
        try {
            const data: Activity = req.body;
            const activity = await ActivityService.addActivity(data);
            if (activity.error) {
                res.status(400).json({ message: activity.error });
            }
            res.json({activity});
        } catch (e) {
            return e;
        }
    }

    public getActivities = async (req: Request, res: Response) => {
        try {
            const activities = await ActivityService.getActivities();
            res.json({ activities, message: 'Success' });
        }catch (error) {
            return error.status(404).json({ message: error.message });
        }
    }

    public getActivitiesByUserId = async (req: Request, res: Response) => {
        try {
            const activities = await ActivityService.getActivitiesByUserId(req.body);
            res.json({ activities, message: 'Success' });
        }catch (error) {
            return error.status(404).json({ message: error.message });
        }
    }

    public updateActivity = async (req: Request , res: Response) => {
        try {
            const data: Activity = req.body;
            const activityToUpdate = await ActivityService.updateActivity(req.params.id, data);
            res.json({ activityToUpdate, message: 'L\'activité a bien été mise à jour' });
        } catch (error) {
            return error.status(404).json({ message: error.message });
        }
    }

    public deleteActivityById = async (req: Request, res: Response) => {
        try {
            const activityId = req.params.id;
            const deleteActivity = await ActivityService.deleteActivityById(activityId);
            res.json({ deleteActivity, message: 'L\'activité a bien été supprimée' });
        } catch (error) {
            return error.status(404).json({ message: error.message });
        }
    }
    
    public joinActivity = async (req: Request, res: Response) => {
        try {
            const activity = req.body.activity;
            const user = req.body.user;
            const joinActivity = await ActivityService.joinActivity(activity, user);
            res.json({ joinActivity, message: 'L\'utilisateur a bien été ajouté à l\'activité' });
        } catch (error) {
            return res.status(404).json({message: error.message});
        }
    }
    
    public scriptAddActivity = async (req: Request, res: Response) => {
        const activitySubjects = [
            'Paintball Extrême',
            'Randonnée à Rambouillet',
            'Five à Beaumont',
            'Cours de Yoga Zen',
            'Atelier de Poterie',
            'Escalade en Montagne',
            'Canoë-kayak en Rivière',
            'Cours de Danse Salsa',
            'Initiation au Tir à l\'Arc',
            'Soirée Astronomie',
            'Visite Guidée du Musée',
            'Tournoi de Tennis',
            'Plongée Sous-marine',
            'Bootcamp Fitness',
            'Pique-nique Gourmet',
            'Dégustation de Vins',
            'Cours de Cuisine Italienne',
            'Atelier de Peinture',
            'Marathon de la Ville',
            'Camping en Forêt',
            'Excursion à Vélo',
            'Balade à Cheval',
            'Cours de Photographie',
            'Atelier d\'Écriture Créative',
            'Visite du Zoo',
            'Cours de Méditation',
            'Match de Basketball',
            'Tournoi d\'Échecs',
            'Atelier de Fabrication de Bijoux',
            'Paddle sur le Lac',
            'Cours de Dessin',
            'Soirée Cinéma en Plein Air',
            'Cours de Langue Espagnole',
            'Atelier de Cuisine Végétarienne',
            'Journée de Ski',
            'Atelier de Bande Dessinée',
            'Visite de la Brasserie',
            'Initiation au Kitesurf',
            'Atelier de Yoga Aérien',
            'Session de CrossFit',
            'Atelier de Couture',
            'Cours de Guitare',
            'Visite de l\'Aquarium',
            'Excursion en Montgolfière',
            'Randonnée Botanique',
            'Cours de Calligraphie',
            'Balade en Bateau',
            'Visite de la Ferme',
            'Atelier de Sculpture',
            'Cours de Parkour'
        ];
        const frenchCitiesAndPostalCodes = {
            'Cergy': 95000, 'Argenteuil': 95100, 'Sarcelles': 95200,
            'Saint-Denis': 93200, 'Montreuil': 93100, 'Aubervilliers': 93300,
            'Boulogne-Billancourt': 92100, 'Nanterre': 92000, 'Courbevoie': 92400,
            'Créteil': 94000, 'Vitry-sur-Seine': 94400, 'Saint-Maur-des-Fossés': 94100,
            'Paris': 75000,
            'Lyon': 69000, 'Villeurbanne': 69100, 'Vénissieux': 69200,
            'Fort-de-France': 97200, 'Le Lamentin': 97232,
            'Les Abymes': 97139, 'Baie-Mahault': 97122
        };        
        try {
            for (const subject of activitySubjects) {

                const cityNames = Object.keys(frenchCitiesAndPostalCodes);
                const randomCity = cityNames[Math.floor(Math.random() * cityNames.length)];
                let userIds  =  [2,3,4,6,9]
                //random id from userIds
                let randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
                
                //random 16 to 30
                let randomCategoryId = Math.floor(Math.random() * (30 - 16 + 1)) + 16;
                let categoryObj = null;
                let userObj = null;
                
                //get Random single Category
                while (categoryObj === null) {
                    //find by id
                    categoryObj = await AppDataSource.getRepository('Category').findOneBy({id:randomCategoryId})
                }
                
                //get Random single User
                while (userObj === null) {
                    userObj = await AppDataSource.getRepository('User').findOneBy({id: randomUserId})
                }
                
                const activity = new Activity();
                activity.subject = subject;
                activity.max_person = Math.floor(Math.random() * 10) + 1;
                activity.date_activity = faker.date.future();
                activity.address = `${faker.location.street()}`;
                activity.city = randomCity;
                activity.postal_code = frenchCitiesAndPostalCodes[randomCity];
                activity.category = categoryObj;
                activity.user = userObj;
                
                await AppDataSource.getRepository('Activity').save(activity);
            }
            res.json({ message: 'Script OK' });
        }
        catch (error) {
            return { message: error.message }
        }
    }
}
export default ActivityController;