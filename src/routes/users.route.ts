import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/users', this.user.getUsers);
    this.router.get('/users/:id(\\d+)', this.user.getUserById);
    this.router.post('/users/find/email', this.user.getUserByEmail);
    this.router.post('/users', ValidationMiddleware(CreateUserDto), this.user.createUser);
    this.router.put('/users/:id(\\d+)', ValidationMiddleware(CreateUserDto, true), this.user.updateUser);
    this.router.delete('/users/:id(\\d+)', this.user.deleteUser);
  }
}
