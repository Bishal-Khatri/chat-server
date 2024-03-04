<script setup lang="ts">
import type { User } from '@/services/auth/types';
import { useAuthStore } from '@/stores/auth.store';
import { useChatStore } from '@/stores/chat.store';
import { onMounted, computed, ref, reactive } from 'vue';

const store = useChatStore();
const authStore = useAuthStore();
const chats = computed(() => {
  return store.chatList;
});

const foundUser = computed(() => {
  return authStore.findUser;
});

const email = ref('');
const findUser = reactive({ email: 'Not-Available', name: 'Not-Available' });
onMounted(() => {
  //   console.log(useChatStore.chatList)
});
function showAddUser() {
  let dialog = document.getElementById('add-user-dialog');
  dialog?.classList.remove('hidden');
  dialog?.classList.add('flex');
  setTimeout(() => {
    dialog?.classList.add('opacity-100');
  }, 20);
}

function hideAddUser() {
  let dialog = document.getElementById('add-user-dialog');
  dialog?.classList.add('opacity-0');
  dialog?.classList.remove('opacity-100');
  setTimeout(() => {
    dialog?.classList.add('hidden');
    dialog?.classList.remove('flex');
  }, 500);
}

function findUserByEmail() {
  const formData = {
    email: email.value!,
  };
  authStore.dispatchGetUserByEmail(formData);
}

async function newChat(user: User) {
  const formData = {
    receiver_id: user.id,
  };
  await store.dispatchNewChat(formData);
  store.dispatchGetChats();
  hideAddUser();
}
</script>
<template>
  <div class="flex h-screen">
    <div class="w-64 bg-gray-800 border-r border-gray-900">
      <!-- Logo/Header -->
      <div class="flex flex-col px-3 py-2 h-16">
        <div class="text-white text-md font-semibold flex justify-between">
          <span class="py-2 px-3">Chats</span>
          <div class="flex gap-2">
            <a href="#" @click.prevent="showAddUser" class="text-gray-300 hover:text-white bg-transparent hover:bg-gray-200/10 px-3 py-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white">
                <path
                  d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
                />
                <path
                  d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-300 hover:text-white bg-transparent hover:bg-gray-200/10 px-3 py-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white">
                <path
                  d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div class="flex justify-center mt-3">
          <div class="relative">
            <input
              type="text"
              placeholder="Search or start new chat"
              class="bg-gray-950/30 rounded-md px-4 py-2 pl-10 focus:outline-none focus:bg-gray-950 text-white"
            />
            <svg class="absolute left-3 top-3 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <nav class="mt-12">
        <div class="flex flex-col pl-2 pr-2">
          <p v-if="chats.length == 0" class="text-gray-400 text-sm p-4">You don't have any active chats. Add user to start chatting.</p>
          <!-- Chat Card Links -->
          <a
            v-else
            v-for="chat in chats"
            href="#"
            @click.prevent="store.dispatchGetMessage(chat)"
            class="flex items-center p-4 rounded-md"
            :class="(chat.receiver_id === store.current_chat.receiver_id) ? 'bg-green-800 hover:bg-green-700' : 'bg-transparent hover:bg-gray-200/5'"
          >
            <img v-if="chat.receiver.profile_image" :src="chat.receiver.profile_image" alt="User" class="w-10 h-10 rounded-full mr-4" />
            <div v-else class="w-10 h-10 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <div>
              <span class="text-white text-md font-semibold">{{ chat.receiver.name }}</span>
              <p class="text-gray-300 text-sm">Hello dude. k xa?</p>
            </div>
          </a>
        </div>
      </nav>
    </div>

    <!-- //dialog -->
    <div
      id="add-user-dialog"
      class="fixed left-0 top-0 bg-black w-screen h-screen bg-opacity-50 justify-center items-center hidden opacity-0 transition-opacity duration-500"
    >
      <div class="rounded bg-white shadow-sm px-6 pt-8 w-4/12">
        <h1 class="text-lg font-bold text-center">Find user by email address</h1>
        <div class="grid gap-6 mb-6 mt-10">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium"> Email address</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="bg-gray-100 px-2 py-4 border border-gray-300 text-gray-900 text-sm rounded-md block w-full"
              placeholder="john@exaple.com"
              required
            />
          </div>
          <div v-if="Object.keys(foundUser).length">
            <div class="w-full border rounded-md overflow-hidden">
              <div class="p-4">
                <div class="flex justify-between">
                  <div class="flex space-x-4">
                    <img class="h-12 w-12 rounded-md object-cover" src="https://via.placeholder.com/150" alt="Profile Picture" />
                    <div>
                      <h2 class="text-md font-semibold text-gray-800">{{ foundUser.name ?? 'Not-Available' }}</h2>
                      <p class="text-sm text-gray-600">{{ foundUser.email ?? 'Not-Available' }}</p>
                    </div>
                  </div>

                  <button
                    @click.prevent="newChat(foundUser)"
                    type="button"
                    class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-primary rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      class="w-4 h-4 text-white me-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <button @click.prevent="findUserByEmail" class="w-40 bg-gray-950 py-2 flex justify-center items-center rounded shadow-md text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 me-2 text-center"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              Search
            </button>
            <button @click.prevent="hideAddUser" class="w-40 bg-default py-2 rounded block shadow-md bg-gray-200">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
