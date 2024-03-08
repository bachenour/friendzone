import {Request, Response } from 'express';
import CategoryService from '../services/category.service';
import {Category} from '../src/entity/Category';

class CategoryController {
    public addCategory = async (req: Request, res: Response) => {
        try {
            const data: Category = req.body;
            const category = await CategoryService.addCategory(data);
            if (category.error) {
                res.status(400).json({ message: category.error });
            }
            res.json({category});
        } catch (e) {
            return e;
        }
    }

    public getCategories = async (req: Request, res: Response) => {
        try {
            const categories = await CategoryService.getCategories();
            res.json({ categories, message: 'Success' });
        }catch (error) {
            return error.status(404).json({ message: error.message });
        }
    }

    public updateCategory = async (req: Request , res: Response) => {
        try {
            const data: Category = req.body;
            const categoryToUpdate = await CategoryService.updateCategory(req.params.id, data);
            res.json({ categoryToUpdate, message: 'La catégorie a bien été mise à jour' });
        } catch (error) {
            return error.status(404).json({ message: error.message });
        }
    }

    public deleteCategoryById = async (req: Request, res: Response) => {
        try {
            const categoryId = req.params.id;
            const deleteCategory = await CategoryService.deleteCategoryById(categoryId);
            res.json({ deleteCategory, message: 'La catégorie a bien été supprimée' });
        } catch (error) {
            return error.status(404).json({ message: error.message });
        }
    }
    public scriptAddCategory = async (req: Request, res: Response) => {
        try {
            const category = ["Jeux de tir", "Soirée dansante", "Sortie culturelle", "Concert", "Sport", "Soirée jeux de société", "Sortie chill", "Activité en plein air", "Cours de cuisine", "Bien-être", "Parc & fun", "Ateliers", "Aquatique", "Pilotage", "Visites"];
            for (let i = 0; i < category.length; i++) {
                const newCategory = new Category();
                newCategory.name = category[i];
                await CategoryService.addCategory(newCategory);
            }
            res.json({ message: 'Success' });
        }
        catch (error) {
            return error.status(404).json({message: error.message});
        }
    }
}

export default CategoryController;