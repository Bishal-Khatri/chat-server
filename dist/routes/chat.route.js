"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatRoute", {
    enumerable: true,
    get: function() {
        return ChatRoute;
    }
});
const _express = require("express");
const _chatcontroller = require("../controllers/chat.controller");
const _authmiddleware = require("../middlewares/auth.middleware");
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
let ChatRoute = class ChatRoute {
    initializeRoutes() {
        this.router.post('/chat/create', _authmiddleware.AuthMiddleware, this.chatController.createChat);
        this.router.get('/chat/all', _authmiddleware.AuthMiddleware, this.chatController.getAllChats);
        this.router.get('/chat/:receiverId', _authmiddleware.AuthMiddleware, this.chatController.getMessage);
        this.router.post('/chat/send', _authmiddleware.AuthMiddleware, this.chatController.sendMessage);
    }
    constructor(){
        _define_property(this, "router", (0, _express.Router)());
        _define_property(this, "chatController", new _chatcontroller.ChatController());
        this.initializeRoutes();
    }
};

//# sourceMappingURL=chat.route.js.map