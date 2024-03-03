import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import instance from '@/services/api';
import type { Chat, ChatListResponse, Message, MessageInput } from '@/services/chat/types';
import { getChatList, getMessage, sendMessage} from '@/services/chat';

export const useChatStore = defineStore('chat', {
  state: () => ({
    chats: [] as Chat[],
    messages: [] as Message[],
    current_chat: {} as Chat
  }),
  getters: {
    chatList(state) {
      return state.chats
    },
    getMessages(state){
      return state.messages;
    },
    getCurrentChat(state){
      return state.current_chat;
    }
  },
  actions: {
    async dispatchGetChats() {
      const response = await getChatList();
      this.chats = response.data.data;
    },

    async dispatchGetMessage(chat: Chat){
      this.current_chat = chat;
      const response = await getMessage(chat.receiver_id);
      this.messages = response.data.data.messages;
    },

    async dispatchSendMessage(newMessage: MessageInput){
      const response = await sendMessage(newMessage);
      return true;
    }
  },
});
