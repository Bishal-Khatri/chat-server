import { defineStore } from 'pinia';
import type { LoginInput, User, RegisterInput } from '@/services/auth/types';
import { getAuthUser, login, googleLogin, getUserByEmail, register } from '@/services/auth';
import router from '@/router';
import { getActivePinia } from "pinia"

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as User,
    findUser: {} as User,
  }),

  getters: {
    authUser(state) {
      return state.user;
    },
  },
  actions: {
    async dispatchLoginRequest(input: LoginInput) {
      try {
        const response = await login(input);
        if (response) {
          localStorage.setItem('authToken', response.data.token.token);
          this.user = response.data.data;
          router.replace({ name: 'home' });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async dispatchRegisterRequest(input: RegisterInput) {
      const response = await register(input);
      if (response) {
        localStorage.setItem('authToken', response.data.token.token);
        this.user = response.data.data;
        router.replace({ name: 'home' });
      }
    },

    async dispatchGoogleLoginRequest(payload: any) {
      try {
        const response = await googleLogin(payload);
        if (response) {
          localStorage.setItem('authToken', response.data.token.token);
          this.user = response.data.data;
          router.replace({ name: 'home' });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async dispatchGetAuthUserData() {
      const response = await getAuthUser();
      if (response) {
        this.user = response.data.data;
      }
    },

    async dispatchLogout() {
      localStorage.removeItem('authToken');
      getActivePinia()._s.forEach(store => store.$reset());
      router.replace({ name: 'login' });
    },

    async dispatchGetUserByEmail(payload: { email: string }) {
      try {
        const response = await getUserByEmail(payload);
        if (response) {
          this.findUser = response.data.data;
        }
      } catch (error: any) {
        alert(error.response.data.message);
      }
    },
  },
});
