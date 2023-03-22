import {AppDataSource} from "../src/data-source";
import {User} from "../src/entity/User";
import {JwtService} from "./jwt.service";
import * as bcrypt from "bcrypt";

class UserService{
    
    static async getUserByEmail(email: any) {
        try{
            const user = await  AppDataSource.manager.findBy(User, {email: email});
            return user;
        }
        catch(e){
            return e;
        }
    }
    static async signUp(newUser: User) {
        try {
            const jwtService= new JwtService();
            await AppDataSource.manager.save(newUser).then(
                (user) => {
                    newUser.token = jwtService.sign({email: user.email, pseudo: user.pseudo});
                }
            );
            console.log("Saved a new user with id: " + newUser.id);
            //Create jwt token
            return newUser;
        } catch (e) {
            return e;
        }
    }
    
    static async signIn(data : any) {
        try {
            const jwtService= new JwtService();
            const user = await AppDataSource.manager.findOne(User, {where: {email: data.email}});
            if (user) {
                //compare password using bcrypt
                const isMatch = await bcrypt.compare(data.password, user.password);
                if (isMatch) {
                    user.token = jwtService.sign({email: user.email, pseudo: user.pseudo});
                    return user;
                } else {
                    throw new Error("User not found");
                }
            } else {
                throw new Error("User not found");
            }
        } catch (e) {
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
