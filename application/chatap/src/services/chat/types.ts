import type { User } from '../auth/types';

export type ChatListResponse = {
  data: Array<Chat>,
  message: string
}

export type MessageListResponse = {
  data: {
    chatData: Chat,
    messages: Message[]
  };
  message: string;
}

export type SendMessageResponse = {
  data: Chat;
  message: string;
}

export type Chat = {
  id: number;
  name: string;
  is_group: number;
  last_message_id: number;
  admin_id: number;
  receiver_id: number;
  inbox_hash: string;
  createdAt: string;
  updatedAt: string;
  receiver: User;
  owner: User;
};

export type Message = {
  id: number;
  inbox_hash: string;
  sender_id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export type MessageInput = {
  inbox_hash: string;
  message: string;
}
