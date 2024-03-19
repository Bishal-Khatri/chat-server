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
    ChatEvent: function() {
        return ChatEvent;
    },
    SignInMethod: function() {
        return SignInMethod;
    }
});
const ChatEvent = Object.freeze({
    CONNECTED_EVENT: 'connected',
    DISCONNECT_EVENT: 'disconnect',
    JOIN_CHAT_EVENT: 'joinChat',
    LEAVE_CHAT_EVENT: 'leaveChat',
    UPDATE_GROUP_NAME_EVENT: 'updateGroupName',
    MESSAGE_RECEIVED_EVENT: 'messageReceived',
    NEW_CHAT_EVENT: 'newChat',
    SOCKET_ERROR_EVENT: 'socketError',
    STOP_TYPING_EVENT: 'stopTyping',
    TYPING_EVENT: 'typing'
});
const SignInMethod = Object.freeze({
    EMAIL: 1,
    PHONE: 2,
    GOOGLE: 3
});

//# sourceMappingURL=constants.js.map