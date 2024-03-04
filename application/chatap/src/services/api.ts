import { useAuthStore } from '@/stores/auth.store';
import axios from 'axios';
import type { User } from './auth/types';
import router from '@/router';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

instance.interceptors.response.use(
  response => response,
  error => {
    const store = useAuthStore();
    if (error.response.status === 422) {
      // store.commit("setErrors", error.response.data.errors);
    } else if (error.response.status === 401) {
      store.user = {} as User;
      localStorage.removeItem('authToken');
      router.push({ name: 'login' });
    } else {
      return Promise.reject(error);
    }
  },
);

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
