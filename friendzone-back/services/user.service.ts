import {AppDataSource} from "../src/data-source";
import {User} from "../src/entity/User";
import {JwtService} from "./jwt.service";

class UserService{
    static async signUp(newUser: User) {
        try {
            console.log(newUser);
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
