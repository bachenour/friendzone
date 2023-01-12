import {AppDataSource} from "../src/data-source";
import {User} from "../src/entity/User";
import {Request, Response} from "express";

class UserService{
    static async signUp(newUser: User) {
        try {
            console.log(newUser);
            await AppDataSource.manager.save(newUser);
            console.log("Saved a new user with id: " + newUser.id);
            return newUser;
        } catch (e) {
            console.log("error");
            return e;
        }
    }
    
    static async updateUserData(id: any, userData: User) {
        try {
            console.log(userData);
            await AppDataSource.manager.update(User, id, userData);
            console.log("Updated a user with id: " + id);
            return userData;
        } catch (e) {
            return e;
        }
    }
}
export default UserService;
