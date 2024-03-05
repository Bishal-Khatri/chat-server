import { useAuthStore } from '@/stores/auth.store';
import axios from 'axios';
import type { User } from './auth/types';
import router from '@/router';
import { toast } from 'vue3-toastify';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

instance.interceptors.response.use(
  response => response,
  error => {
    const store = useAuthStore();
    if (error.response.status === 422) {
    } else if (error.response.status === 401) {
      store.user = {} as User;
      localStorage.removeItem('authToken');
      router.push({ name: 'login' });
    } else if (error.response.status === 400) {
      store.user = {} as User;
      localStorage.removeItem('authToken');
      router.push({ name: 'login' });
    } else if (error.response.status === 409) {
    } else {
      return Promise.reject(error);
    }
    // if (error.response.data) {
      toast.error(error.response.data.message, {
        dangerouslyHTMLString: true,
      });
    // }
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
