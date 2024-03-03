import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import instance from '@/services/api';
import type { ChatListResponse } from '@/services/chat/types';
import { getChatList, getMessage } from '@/services/chat';
import type { FindUserResponse, LoginInput, User } from '@/services/auth/types';
import { getAuthUser, login, googleLogin, getUserByEmail } from '@/services/auth';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as User,
    findUser: {} as User
  }),

  getters: {
    authUser(state) {
      return state.user
    },
  },
  actions: {
    async dispatchLoginRequest(input: LoginInput) {
      const response = await login(input);
      localStorage.setItem("authToken", response.data.token.token);
      this.user = response.data.data
      router.replace({name: 'home'})
    },

    async dispatchGoogleLoginRequest(payload: any) {
      const response = await googleLogin(payload);
      localStorage.setItem("authToken", response.data.token.token);
      this.user = response.data.data
      router.replace({name: 'home'})
    },

    async dispatchGetAuthUserData(){
      const response = await getAuthUser();
      this.user = response.data.data;
    },

    async logout(){
      localStorage.removeItem("authToken");
    },

    async dispatchGetUserByEmail(payload: {email:string}){
      const response = await getUserByEmail(payload);
      this.findUser = response.data.data
    }
  },
});
