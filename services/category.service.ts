import {AppDataSource} from "../src/data-source";
import {Category} from "../src/entity/Category";

class CategoryService{

    static async addCategory (newCategory: Category) {
        try {
            const isCategoryExist = await AppDataSource.manager.findOne(Category, {where: {name: newCategory.name}}).then((category) => { return !!category;});
            if (!isCategoryExist) {
                await AppDataSource.manager.save(newCategory);
                return {newCategory, message: 'Category added'};
            } else {
                return {error: 'Category already exist'};
            }
        } catch (e) {
            return {error: e};
        }
    }

    static async getCategories() {
        try {
            return await AppDataSource.manager.find(Category);
        } catch (e) {
            return e;
        }
    }

    static async updateCategory(id: any, categoryData: Category) {
        try {
            await AppDataSource.manager.update(Category, id, categoryData);
            return categoryData;
        } catch (e) {
            return e;
        }
    }

    static async deleteCategoryById(categoryId: any) {
        try {
            const categoryToDelete = await AppDataSource.manager.findOne(Category, {where: {id: categoryId}});
            await AppDataSource.manager.remove(categoryToDelete);
            return categoryToDelete;
        } catch (e) {
            return e;
        }
    }
}
export default CategoryService;