import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { LoginInput, User } from '@/services/auth/types';
import instance from '@/services/api';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  const userData = ref(null);

  function setUserData(userData: User | null) {
    userData = userData;
  }

  async function dispatchLoginRequest(input: LoginInput): Promise<null> {
    try {
      const response = await instance.post('/login', input);
      localStorage.setItem("authToken", response.data.token.token);
      setUserData(response.data)
      router.replace({name: 'home'})
    } catch (error) {
      console.log(error)
    }
    return null;
  }

  async function dispatchGetUserData():Promise<null> {
    try {
        const response = await instance.get('/user');
        setUserData(response.data)
        router.replace({name: 'home'})
      } catch (error) {
        console.log(error)
      }
      return null;
  }

  return { userData, dispatchLoginRequest, setUserData, dispatchGetUserData };
});
