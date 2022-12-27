import {Routes} from "../interfaces/routes.interface";
import {Router} from "express";
import UsersController from "../controllers/users.controller";
import {UsersDto} from "../dto/users.dto";


const usersController = new UsersController();
const usersDto = new UsersDto();

export class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
      this.router.post(`${this.path}/signup`, usersDto.signUp, usersController.signUp);

      /*this.router.get(`${this.path}`, this.usersController.getUsers);
      this.router.get(`${this.path}/:id`, this.usersController.getUserById);
      this.router.post(`${this.path}`, this.usersController.createUser);
      this.router.put(`${this.path}/:id`, this.usersController.updateUser);
      this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);*/
  }
}