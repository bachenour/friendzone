import {Routes} from "../interfaces/routes.interface";
import {Router} from "express";
import UsersController from "../controllers/users.controller";
import {UsersDto} from "../dto/users.dto";
import {JwtService} from "../services/jwt.service";
import bcrypt from 'bcrypt';


const usersController = new UsersController();
const usersDto = new UsersDto();
const authMiddleware = new JwtService();

export class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
      this.router.post(`${this.path}/signup`, usersDto.signUp, usersController.signUp);
      this.router.post(`${this.path}/signin`, usersDto.signIn, usersController.signIn);
      this.router.put(`${this.path}/:id`, authMiddleware.verify, usersController.updateUserData);

      /*this.router.get(`${this.path}`, this.usersController.getUsers);
      this.router.post(`${this.path}`, this.usersController.createUser);
      this.router.get(`${this.path}/:id`, this.usersController.getUserById);
      this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);*/
  }
}