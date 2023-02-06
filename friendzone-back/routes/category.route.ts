import {Routes} from "../interfaces/routes.interface";
import {Router} from "express";
import CategoryController from "../controllers/category.controller";
import {CategoryDto} from "../dto/category.dto";

const categoryControl = new CategoryController();
const categoryDto = new CategoryDto();

export class CategoryRoute implements Routes {
    public path = '/category';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/addCategory`,  categoryDto.addCategory, categoryControl.addCategory);
        this.router.get(`${this.path}/getCategories`, categoryControl.getCategories);
        this.router.put(`${this.path}/:id`, categoryControl.updateCategory);
        this.router.delete(`${this.path}/:id`, categoryControl.deleteCategoryById);
    }
}