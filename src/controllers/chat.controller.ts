/* eslint-disable prettier/prettier */
import { Container } from 'typedi';
import { ChatService } from '@/services/chat.service';
import { NextFunction, Request, Response } from 'express';
import { ClientToServerEvents } from '@/interfaces/socket.io.interface';
import { UserModel } from '@/models/user.model';
import { RequestWithUser } from '@interfaces/auth.interface';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { ChatModel } from '@/models/chat.model';
import { FindOptions, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { emitSocketEvent } from '@/socket';
import { MessageModel } from '@/models/message.model';

export class ChatController {
  public chat = Container.get(ChatService);

  public createChat = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      
      // Find receiver by ID
      const receiver = await UserModel.findOne({
        where:{
          email: email
        }
      });

      if (!receiver) {
        throw new HttpException(404, "User does not exist");
      }
      const userData: User = req.user;
    
      if (receiver.id === userData.id) {
        throw new HttpException(404, "You cannot chat with yourself");
      }

      /*
       * Create new chat record between auth user and receiver if not available
       */
      const chatData = await ChatModel.findOrCreate({
        where:{
          [Op.or]: [
            {
              admin_id: userData.id,
              receiver_id: receiver.id
            }, 
            {
              receiver_id: userData.id,
              admin_id: receiver.id
            },
          ],
        },
        include:[
          {
            model: MessageModel,
            as: 'message'
          },
          {
            model: UserModel,
            as: 'receiver'
          }
        ],
        defaults: {
          name: 'Chat',
          admin_id: userData.id, 
          receiver_id: receiver.id,
          is_group: false
        }
      });

      emitSocketEvent(
        req,
        userData.id,
        'newChat',
        []
      );

      res.status(201).json({
        data: chatData,
        message: 'newChat',
      });
    } catch (error) {
      console.log(error)
      next(error);
    }
  };


  public getChat = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { receiverId } = req.params;
      
      // Find receiver by ID
      const receiver = await UserModel.findByPk(receiverId);

      if (!receiver) {
        throw new HttpException(404, "Receiver does not exist");
      }
      const userData: User = req.user;
    
      if (receiver.id === userData.id) {
        throw new HttpException(404, "You cannot chat with yourself");
      }

      /*
       * Create new chat record between auth user and receiver if not available
       */
      const chatData = await ChatModel.findOrCreate({
        where:{
          [Op.or]: [
            {
              admin_id: userData.id,
              receiver_id: receiver.id
            }, 
            {
              receiver_id: userData.id,
              admin_id: receiver.id
            },
          ],
        },
        include:[
          {
            model: MessageModel,
            as: 'message'
          },
          {
            model: UserModel,
            as: 'receiver'
          }
        ],
        defaults: {
          name: 'Chat',
          admin_id: userData.id, 
          receiver_id: receiver.id,
          is_group: false
        }
      });

      emitSocketEvent(
        req,
        userData.id,
        'newChat',
        []
      );

      res.status(201).json({
        data: chatData,
        message: 'save',
      });
    } catch (error) {
      console.log(error)
      next(error);
    }
  };


  public getAllMessages = async(req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
          
      const messages = await ChatModel.findAll({
        where:{
          [Op.or]: [
            {
              admin_id: userData.id}, 
            {
              receiver_id: userData.id
            },
          ],
        },
        include:[{
          model: UserModel,
          as: 'receiver'
        },
        {
          model: UserModel,
          as: 'owner'
        }
      ],
      });

      res.status(201).json({
        data: messages,
        message: 'save',
      });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}
