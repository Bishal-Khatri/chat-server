/* eslint-disable prettier/prettier */
import { HttpException } from "@/exceptions/httpException";
import { UserModel } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { ChatEvent } from '@/constants'
import { SECRET_KEY } from '@config';

/**
 * @description This function is responsible to allow user to join the chat represented by chatId (chatId). event happens when user switches between the chats
 * @param {Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>} socket
 */
const mountJoinChatEvent = socket => {
  socket.on(ChatEvent.JOIN_CHAT_EVENT, chatId => {
    console.log(`User joined the chat. chatId: `, chatId);
    // joining the room with the chatId will allow specific events to be fired where we don't bother about the users like typing events
    // E.g. When user types we don't want to emit that event to specific participant.
    // We want to just emit that to the chat where the typing is happening
    socket.join(chatId);
  });
};

/**
 * @description This function is responsible to emit the typing event to the other participants of the chat
 * @param {Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>} socket
 */
const mountParticipantTypingEvent = (socket) => {
  socket.on(ChatEvent.TYPING_EVENT, (chatId) => {
    console.log(chatId)
    socket.in(chatId).emit(ChatEvent.TYPING_EVENT, chatId);
  });
};

/**
 * @description This function is responsible to emit the stopped typing event to the other participants of the chat
 * @param {Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>} socket
 */
const mountParticipantStoppedTypingEvent = (socket) => {
  socket.on(ChatEvent.STOP_TYPING_EVENT, (chatId) => {
    socket.in(chatId).emit(ChatEvent.STOP_TYPING_EVENT, chatId);
  });
};


const initializeSocketIO = (io) => {
    return io.on("connection", async (socket) => {
      try {
        const { token } = socket.handshake.auth;

        if (!token) {
          throw new HttpException(403, "Un-authorized handshake. Token is missing");
        }
        
        const decodedToken = jwt.verify(token, SECRET_KEY);
  
        const user = await UserModel.findByPk(decodedToken?.id);
  
        if (!user) {
            throw new HttpException(403, "Un-authorized handshake. Token is invalid");
        }
        socket.user = user;
        
        // We are creating a room with user id so that if user is joined but does not have any active chat going on.
        // still we want to emit some socket events to the user.
        // so that the client can catch the event and show the notifications.
        socket.join(user.id.toString());
        socket.emit(ChatEvent.CONNECTED_EVENT); // emit the connected event so that client is aware
        console.log("User connected. userId: ", user.id.toString());
  
        // Common events that needs to be mounted on the initialization
        mountJoinChatEvent(socket);
        mountParticipantTypingEvent(socket);
        mountParticipantStoppedTypingEvent(socket);
  
        socket.on('disconnect', () => {
          console.log("user has disconnected 🚫");
          if (socket.user?.id) {
            socket.leave(socket.user.id);
          }
        });

      } catch (error) {
        console.log('SocketError: '+error.message)
        socket.emit(
          ChatEvent.SOCKET_ERROR_EVENT,
          error?.message || "Something went wrong while connecting to the socket."
        );
      }
    });
  };
  
  /**
   *
   * @param {import("express").Request} req - Request object to access the `io` instance set at the entry point
   * @param {string} roomId - Room where the event should be emitted
   * @param {AvailableChatEvents[0]} event - Event that should be emitted
   * @param {any} payload - Data that should be sent when emitting the event
   * @description Utility function responsible to abstract the logic of socket emission via the io instance
   */
  const emitSocketEvent = (req, roomId, event, payload) => {
    req.app.get("io").in(roomId.toString()).emit(event, payload);
  };
  
  export { initializeSocketIO, emitSocketEvent };
  