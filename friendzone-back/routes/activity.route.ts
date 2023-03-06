import ActivityController from "../controllers/activity.controller";
import {Routes} from "../interfaces/routes.interface";
import {Router} from "express";
import {ActivityDto} from "../dto/activity.dto";

const activityControl = new ActivityController();
const activityDto = new ActivityDto();

export class ActivityRoute implements Routes {
    public path = '/activity';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/addActivity`,  activityDto.addActivity, activityControl.addActivity);
        this.router.get(`${this.path}/getActivities`, activityControl.getActivities);
        this.router.get(`${this.path}/:id`, activityDto.findActivityByUserId, activityControl.getActivitiesByUserId);
        this.router.put(`${this.path}/:id`, activityControl.updateActivity);
        this.router.delete(`${this.path}/:id`, activityControl.deleteActivityById);
    }
}
