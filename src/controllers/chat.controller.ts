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
import { ChatEvent } from '@/constants';
import { v4 as uuidv4 } from 'uuid';

export class ChatController {
  public chat = Container.get(ChatService);

  public getAllChats = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const authUser: User = req.user;

      const allChats = await ChatModel.findAll({
        where:{
          admin_id: authUser.id,
        },
        include: [
          {
            model: UserModel,
            as: 'receiver',
          },
          {
            model: UserModel,
            as: 'owner',
          },
        ],
      });
      
      res.status(201).json({
        data: allChats,
        message: 'allChatList',
      });

    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createChat = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { receiver_id } = req.body;

      // Find receiver by ID
      const receiver = await UserModel.findOne({
        where: {
          id: receiver_id,
        },
      });

      if (!receiver) {
        throw new HttpException(404, 'User does not exist');
      }

      const authUser: User = req.user;

      if (receiver.id === authUser.id) {
        throw new HttpException(404, 'You cannot chat with yourself');
      }

      /*
       * Find chat record from chats table
       */

      let chatData = await ChatModel.findOne({
        where: {
          admin_id: authUser.id,
          receiver_id: receiver.id
        }
      });

       /*
       * Create two new chat record between auth user and receiver if not available
       */
      if(!chatData){
        // Generate Inbox Hash
        const inboxHash = uuidv4();

        chatData = await ChatModel.create({
          name: 'Chat',
          admin_id: authUser.id,
          receiver_id: receiver.id,
          is_group: false,
          inbox_hash: inboxHash
        });

        await ChatModel.create({
          name: 'Chat',
          admin_id: receiver.id,
          receiver_id: authUser.id,
          is_group: false,
          inbox_hash: inboxHash
        });
      }

      // emitSocketEvent(req, userData.id, 'newChat', []);

      res.status(201).json({
        data: chatData,
        message: 'newChatCreated',
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getMessage = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { receiverId } = req.params;

      // Find receiver by ID
      const receiver = await UserModel.findByPk(receiverId);

      if (!receiver) {
        throw new HttpException(404, 'Receiver does not exist');
      }

      const authUser: User = req.user;

      if (receiver.id === authUser.id) {
        throw new HttpException(404, 'You cannot chat with yourself');
      }

      /*
       * Create new chat record between auth user and receiver if not available
       */
      const chatData = await ChatModel.findOne({
        where: {
          admin_id: authUser.id,
          receiver_id: receiver.id,
        },
        include: [
          {
            model: UserModel,
            as: 'receiver',
          },
        ],
      });

      const {inbox_hash} = chatData;

      const messages = await MessageModel.findAll({
        where: {
          inbox_hash: inbox_hash
        }
      });

      res.status(201).json({
        data: {chatData: chatData, messages: messages},
        message: 'success',
      });
      
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public sendMessage = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const authUser: User = req.user;

      const { message, inbox_hash } = req.body;

      const messageData = await MessageModel.create({
        message: message,
        inbox_hash: inbox_hash,
        sender_id: authUser.id,
      });

      // Find receiver
      const chatData = await ChatModel.findOne({
        where: {
          inbox_hash: inbox_hash,
          admin_id: authUser.id
        }
      });

      chatData.last_message = message.length < 20 ? message : message.substring(0, 20).trimEnd() + '...';
      await chatData.save();

      emitSocketEvent(req, chatData.receiver_id, ChatEvent.MESSAGE_RECEIVED_EVENT, messageData);
      
      res.status(201).json({
        data: messageData,
        message: 'message sent',
      });

    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
