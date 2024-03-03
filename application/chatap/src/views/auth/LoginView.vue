<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import { ref, reactive, computed, onMounted } from 'vue';
import { googleSdkLoaded } from 'vue3-google-login';

const details = reactive({ email: '', password: '' });

const store = useAuthStore();

onMounted(() => {
  if (localStorage.getItem('authToken')) {
    router.push({ name: 'home' });
  }
});
function login() {
  store.dispatchLoginRequest(details);
}

function googleLogin() {
  googleSdkLoaded(google => {
    google.accounts.oauth2
      .initCodeClient({
        client_id: '198239904766-eijfbnkvcs5ni21o8ecncnt93feeklbv.apps.googleusercontent.com',
        scope: 'email profile openid',
        redirect_uri: 'http://localhost:4000/auth/callback',
        callback: response => {
          if (response.code) {
            sendCodeToBackend(response.code);
          }
        },
      })
      .requestCode();
  });
}

async function sendCodeToBackend(code: any) {
  console.log(code)
  try {
    const payload = {
      code,
    };
    await store.dispatchGoogleLoginRequest(payload);
  } catch (error) {
    console.error('Failed to send authorization code:', error);
  }
}
</script>

<template>
  <div class="flex w-full h-screen">
    <div class="w-full flex items-center justify-center lg:w-1/2">
      <div class="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
        <h1 class="text-5xl font-semibold">Welcome Back</h1>
        <p class="font-medium text-lg text-gray-500 mt-4">Please enter your credentials.</p>
        <div class="mt-8">
          <div class="my-3">
            <label class="text-lg font-medium" for="email">Email</label>
            <input
              type="email"
              v-model="details.email"
              class="w-full border-2 border-gray-100 rounded-lg p-3 mt-1 bg-transparent"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label class="text-lg font-medium" for="password">Password</label>
            <input
              type="password"
              v-model="details.password"
              class="w-full border-2 border-gray-100 rounded-lg p-3 mt-1 bg-transparent"
              placeholder="Enter password"
            />
          </div>
          <div class="mt-8 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label class="ml-2 font-medium text-base" for="remember">Remember me.</label>
            </div>
            <button class="font-medium text-base text-violet-500">Forgot password?</button>
          </div>
          <div class="mt-2 flex">
            <p class="mr-2 text-gray-500">Don't have an account?</p>
            <a href="/register"> Register Now</a>
          </div>
          <div class="mt-8 flex flex-col gap-y-4">
            <button class="hover:scale-[1.01] active:scale-[0.98] py-3 rounded-xl bg-violet-500 text-white text-lg font-bold" @click.prevent="login">
              Sign in
            </button>
            <button @click.prevent="googleLogin" class="hover:scale-[1.01] active:scale-[0.98] py-3 rounded-xl flex items-center justify-center gap-2 border-2 border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden relative bg-gray-200 w-1/2 lg:flex h-full items-center justify-center">
      <!-- <img class="w-1/2 rounded-lg" src="/images/chatap.png" alt=""> -->
      <div class="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin" />
      <div class="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
    </div>
  </div>
</template>
