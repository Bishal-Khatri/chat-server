import type { ChatListResponse, MessageInput, MessageListResponse, SendMessageResponse} from "./types";
import instance from "../api";

export async function getChatList() {
  return await instance.get<ChatListResponse>("/chat/all");
}

export async function getMessage(receiverId: number) {
  return await instance.get<MessageListResponse>("chat/"+receiverId);
}

export async function sendMessage(payload: MessageInput) {
  return await instance.post<SendMessageResponse>("/chat/send", payload);
}
