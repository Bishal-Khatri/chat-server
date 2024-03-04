<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import router from '@/router';

const details = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});


const store = useAuthStore();

onMounted(() => {
  if (localStorage.getItem('authToken')) {
    router.push({ name: 'home' });
  }
});
function register() {
  store.dispatchRegisterRequest(details);
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
            <label class="text-lg font-medium" for="email">Name</label>
            <input
              type="text"
              v-model="details.name"
              class="w-full border-2 border-gray-100 rounded-lg p-3 mt-1 bg-transparent"
              placeholder="Enter your name"
            />
          </div>
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

          <div class="mt-2 flex">
            <p class="mr-2 text-gray-500">Already have an account?</p>
            <router-link to="/login"> Login Now</router-link>
          </div>
          <div class="mt-8 flex flex-col gap-y-4">
            <button class="hover:scale-[1.01] active:scale-[0.98] py-3 rounded-xl bg-violet-500 text-white text-lg font-bold" @click.prevent="register">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden relative bg-gray-200 w-1/2 lg:flex h-full items-center justify-center">
      <div class="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-spin" />
      <div class="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
    </div>
  </div>
</template>
