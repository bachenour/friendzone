import {Router} from "express";
import {JwtService} from "../services/jwt.service";
import OpinionController from "../controllers/opinion.controller";
import {OpinionDto} from "../dto/opinion.dto";
import {Routes} from "../interfaces/routes.interface";


const opinionController = new OpinionController();
const opinionDto = new OpinionDto();
const authMiddleware = new JwtService();


export class OpinionRoute implements Routes{
    public path = '/opinion';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }
    
    private initializeRoutes() {
        this.router.post(`${this.path}/addOpinion`, authMiddleware.verify, opinionDto.addOpinion, opinionController.addOpinion);
        this.router.get(`${this.path}/getOpinions`, opinionController.getOpinions);
        // this.router.put(`${this.path}/:id`, authMiddleware.verify, opinionController.updateOpinion);
        this.router.delete(`${this.path}/:id`, authMiddleware.verify, opinionController.deleteOpinion);
    }
    
}