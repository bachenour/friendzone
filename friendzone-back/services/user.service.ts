import {AppDataSource} from "../src/data-source";
import {User} from "../src/entity/User";
import {Request, Response} from "express";

class UserService{
    
    static async getUserByEmail(email: any) {
        try{
            console.log(email);
            const user = await  AppDataSource.manager.findBy(User, {email: email});
            console.log(user);
            return user;
        }
        catch(e){
            console.log("error");
            return e;
        }
    }
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
    
    static async deleteUserById(id: any) {
        try {
            await AppDataSource.manager.delete(User, id);
            console.log("Deleted a user with id: " + id);
            return id;
        } catch (e) {
            return e;
        }
    }   
}
export default UserService;
