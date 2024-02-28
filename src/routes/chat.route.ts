import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { ChatController } from '@/controllers/chat.controller';
import { AuthMiddleware } from '@middlewares/auth.middleware';

export class ChatRoute implements Routes {
  public router = Router();
  public chatController = new ChatController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/chat/create', AuthMiddleware, this.chatController.createChat);

    this.router.get('/chat/all', AuthMiddleware, this.chatController.getAllChats);

    this.router.get('/chat/:receiverId', AuthMiddleware, this.chatController.getMessage);

    this.router.post('/chat/send', AuthMiddleware, this.chatController.sendMessage);
  }
}
