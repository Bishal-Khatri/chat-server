"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    emitSocketEvent: function() {
        return emitSocketEvent;
    },
    initializeSocketIO: function() {
        return initializeSocketIO;
    }
});
const _httpException = require("../exceptions/httpException");
const _usermodel = require("../models/user.model");
const _jsonwebtoken = _interop_require_default(require("jsonwebtoken"));
const _constants = require("../constants");
const _config = require("../config");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const mountJoinChatEvent = (socket)=>{
    socket.on(_constants.ChatEvent.JOIN_CHAT_EVENT, (chatId)=>{
        console.log(`User joined the chat. chatId: `, chatId);
        socket.join(chatId);
    });
};
const mountParticipantTypingEvent = (socket)=>{
    socket.on(_constants.ChatEvent.TYPING_EVENT, (chatId)=>{
        console.log(chatId);
        socket.in(chatId).emit(_constants.ChatEvent.TYPING_EVENT, chatId);
    });
};
const mountParticipantStoppedTypingEvent = (socket)=>{
    socket.on(_constants.ChatEvent.STOP_TYPING_EVENT, (chatId)=>{
        socket.in(chatId).emit(_constants.ChatEvent.STOP_TYPING_EVENT, chatId);
    });
};
const initializeSocketIO = (io)=>{
    return io.on("connection", async (socket)=>{
        try {
            const { token } = socket.handshake.auth;
            if (!token) {
                throw new _httpException.HttpException(403, "Un-authorized handshake. Token is missing");
            }
            const decodedToken = _jsonwebtoken.default.verify(token, _config.SECRET_KEY);
            const user = await _usermodel.UserModel.findByPk(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id);
            if (!user) {
                throw new _httpException.HttpException(403, "Un-authorized handshake. Token is invalid");
            }
            socket.user = user;
            socket.join(user.id.toString());
            socket.emit(_constants.ChatEvent.CONNECTED_EVENT);
            console.log("User connected. userId: ", user.id.toString());
            mountJoinChatEvent(socket);
            mountParticipantTypingEvent(socket);
            mountParticipantStoppedTypingEvent(socket);
            socket.on('disconnect', ()=>{
                var _socket_user;
                console.log("user has disconnected 🚫");
                if ((_socket_user = socket.user) === null || _socket_user === void 0 ? void 0 : _socket_user.id) {
                    socket.leave(socket.user.id);
                }
            });
        } catch (error) {
            console.log('SocketError: ' + error.message);
            socket.emit(_constants.ChatEvent.SOCKET_ERROR_EVENT, (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong while connecting to the socket.");
        }
    });
};
const emitSocketEvent = (req, roomId, event, payload)=>{
    req.app.get("io").in(roomId.toString()).emit(event, payload);
};

//# sourceMappingURL=index.js.map