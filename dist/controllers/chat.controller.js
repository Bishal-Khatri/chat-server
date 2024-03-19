"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatController", {
    enumerable: true,
    get: function() {
        return ChatController;
    }
});
const _typedi = require("typedi");
const _chatservice = require("../services/chat.service");
const _usermodel = require("../models/user.model");
const _httpException = require("../exceptions/httpException");
const _chatmodel = require("../models/chat.model");
const _socket = require("../socket");
const _messagemodel = require("../models/message.model");
const _constants = require("../constants");
const _uuid = require("uuid");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
let ChatController = class ChatController {
    constructor(){
        _define_property(this, "chat", _typedi.Container.get(_chatservice.ChatService));
        _define_property(this, "getAllChats", async (req, res, next)=>{
            try {
                const authUser = req.user;
                const allChats = await _chatmodel.ChatModel.findAll({
                    where: {
                        admin_id: authUser.id
                    },
                    include: [
                        {
                            model: _usermodel.UserModel,
                            as: 'receiver'
                        },
                        {
                            model: _usermodel.UserModel,
                            as: 'owner'
                        }
                    ]
                });
                res.status(201).json({
                    data: allChats,
                    message: 'allChatList'
                });
            } catch (error) {
                console.log(error);
                next(error);
            }
        });
        _define_property(this, "createChat", async (req, res, next)=>{
            try {
                const { receiver_id } = req.body;
                const receiver = await _usermodel.UserModel.findOne({
                    where: {
                        id: receiver_id
                    }
                });
                if (!receiver) {
                    throw new _httpException.HttpException(404, 'User does not exist');
                }
                const authUser = req.user;
                if (receiver.id === authUser.id) {
                    throw new _httpException.HttpException(404, 'You cannot chat with yourself');
                }
                let chatData = await _chatmodel.ChatModel.findOne({
                    where: {
                        admin_id: authUser.id,
                        receiver_id: receiver.id
                    }
                });
                if (!chatData) {
                    const inboxHash = (0, _uuid.v4)();
                    chatData = await _chatmodel.ChatModel.create({
                        name: 'Chat',
                        admin_id: authUser.id,
                        receiver_id: receiver.id,
                        is_group: false,
                        inbox_hash: inboxHash
                    });
                    await _chatmodel.ChatModel.create({
                        name: 'Chat',
                        admin_id: receiver.id,
                        receiver_id: authUser.id,
                        is_group: false,
                        inbox_hash: inboxHash
                    });
                }
                res.status(201).json({
                    data: chatData,
                    message: 'newChatCreated'
                });
            } catch (error) {
                console.log(error);
                next(error);
            }
        });
        _define_property(this, "getMessage", async (req, res, next)=>{
            try {
                const { receiverId } = req.params;
                const receiver = await _usermodel.UserModel.findByPk(receiverId);
                if (!receiver) {
                    throw new _httpException.HttpException(404, 'Receiver does not exist');
                }
                const authUser = req.user;
                if (receiver.id === authUser.id) {
                    throw new _httpException.HttpException(404, 'You cannot chat with yourself');
                }
                const chatData = await _chatmodel.ChatModel.findOne({
                    where: {
                        admin_id: authUser.id,
                        receiver_id: receiver.id
                    },
                    include: [
                        {
                            model: _usermodel.UserModel,
                            as: 'receiver'
                        }
                    ]
                });
                const { inbox_hash } = chatData;
                const messages = await _messagemodel.MessageModel.findAll({
                    where: {
                        inbox_hash: inbox_hash
                    }
                });
                res.status(201).json({
                    data: {
                        chatData: chatData,
                        messages: messages
                    },
                    message: 'success'
                });
            } catch (error) {
                console.log(error);
                next(error);
            }
        });
        _define_property(this, "sendMessage", async (req, res, next)=>{
            try {
                const authUser = req.user;
                const { message, inbox_hash } = req.body;
                const messageData = await _messagemodel.MessageModel.create({
                    message: message,
                    inbox_hash: inbox_hash,
                    sender_id: authUser.id
                });
                const chatData = await _chatmodel.ChatModel.findOne({
                    where: {
                        inbox_hash: inbox_hash,
                        admin_id: authUser.id
                    }
                });
                chatData.last_message = message.length < 20 ? message : message.substring(0, 20).trimEnd() + '...';
                await chatData.save();
                (0, _socket.emitSocketEvent)(req, chatData.receiver_id, _constants.ChatEvent.MESSAGE_RECEIVED_EVENT, messageData);
                res.status(201).json({
                    data: messageData,
                    message: 'message sent'
                });
            } catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
};

//# sourceMappingURL=chat.controller.js.map