import {Activity} from "../src/entity/Activity";
import ActivityService from "../services/activity.service";
import {Request, Response} from "express";

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
}
export default ActivityController;