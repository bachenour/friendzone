import {Routes} from "../interfaces/routes.interface";
import {Router} from "express";
import CategoryController from "../controllers/category.controller";
import {CategoryDto} from "../dto/category.dto";
import {JwtService} from "../services/jwt.service";

const categoryController = new CategoryController();
const categoryDto = new CategoryDto();
const authMiddleware = new JwtService();

export class CategoryRoute implements Routes {
    public path = '/category';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/addCategory`, authMiddleware.verify,   categoryDto.addCategory, categoryController.addCategory);
        this.router.get(`${this.path}/getCategories`, categoryController.getCategories);
        this.router.put(`${this.path}/:id`, authMiddleware.verify, categoryController.updateCategory);
        this.router.delete(`${this.path}/:id`, authMiddleware.verify,  categoryController.deleteCategoryById);
    }
}