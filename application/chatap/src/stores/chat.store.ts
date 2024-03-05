import { defineStore } from 'pinia';
import type { Chat, Message, MessageInput } from '@/services/chat/types';
import { getChatList, getMessage, sendMessage, addNewChat } from '@/services/chat';

export const useChatStore = defineStore('chat', {
  state: () => ({
    chats: [] as Chat[],
    messages: [] as Message[],
    chatData: {} as Chat,
    current_chat: {} as Chat,
  }),
  getters: {
    chatList(state) {
      return state.chats;
    },
    getMessages(state) {
      return state.messages;
    },
    getCurrentChat(state) {
      return state.current_chat;
    },
  },
  actions: {
    async dispatchGetChats() {
      const response = await getChatList();
      if (response) {
        this.chats = response.data.data;
      }
    },

    async dispatchGetMessage(chat: Chat) {
      this.current_chat = chat;
      const response = await getMessage(chat.receiver_id);
      if (response) {
        this.chatData = response.data.data.chatData;
        this.messages = response.data.data.messages;

        // replace chat data
        let newList = [...new Map([...this.chats, this.chatData].map(item => [item['id'], item])).values()];
        this.chats = newList;
      }
    },

    async dispatchSendMessage(newMessage: MessageInput) {
      const response = await sendMessage(newMessage);
      if (response) {
        return true;
      }
      return false;
    },

    async dispatchNewChat(payload: { receiver_id: number }) {
      try {
        const response = await addNewChat(payload);
        if (response) {
          return true;
        }
        return false;
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    },
  },
});
