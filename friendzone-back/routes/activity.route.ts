import ActivityController from "../controllers/activity.controller";
import {Routes} from "../interfaces/routes.interface";
import {Router} from "express";
import {ActivityDto} from "../dto/activity.dto";
import {JwtService} from "../services/jwt.service";

const activityController = new ActivityController();
const activityDto = new ActivityDto();
const authMiddleware = new JwtService();

export class ActivityRoute implements Routes {
    public path = '/activity';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/addActivity`, authMiddleware.verify,  activityDto.addActivity, activityController.addActivity);
        this.router.post(`${this.path}/:id/joinActivity`, authMiddleware.verify, activityDto.joinActivity, activityController.joinActivity);
        this.router.get(`${this.path}/getActivities`, activityController.getActivities);
        this.router.get(`${this.path}/:id`, activityDto.findActivityByUserId, activityController.getActivitiesByUserId);
        this.router.put(`${this.path}/:id`, authMiddleware.verify, activityController.updateActivity);
        this.router.delete(`${this.path}/:id`, authMiddleware.verify, activityController.deleteActivityById);
        
    }
}
