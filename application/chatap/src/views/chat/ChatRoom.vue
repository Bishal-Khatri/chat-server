<script setup lang="ts">
import type { MessageInput } from '@/services/chat/types';
import { useAuthStore } from '@/stores/auth.store';
import { useChatStore } from '@/stores/chat.store';
import { onMounted, ref, nextTick } from 'vue';
import { ChatEvent } from '@/const';
import { socket } from '@/socket';

const chatStore = useChatStore();
const authStore = useAuthStore();
let newMessage = ref('');
let convDiv = ref();

onMounted(async () => {
  scrollToBottom();
  socket.on(ChatEvent.MESSAGE_RECEIVED_EVENT, payload => {
    chatStore.messages.push(payload);
    scrollToBottom();
    playNotification();
  });
});

function playNotification() {
  var audio = new Audio('/src/assets/notification.mp3');
  audio.play();
}

async function scrollToBottom() {
  await nextTick();
  const element = convDiv.value!;
  if (element && element.lastElementChild !== null) {
    element.lastElementChild.scrollIntoView({ behavior: 'smooth' });
  }
}

async function sendMessage() {
  if (newMessage.value !== '') {
    const formData = {
      inbox_hash: chatStore.current_chat.inbox_hash,
      message: newMessage.value,
    };

    await chatStore.dispatchSendMessage(formData);
    socket.emit(ChatEvent.NEW_CHAT_EVENT, newMessage);
    newMessage = ref('');
    chatStore.dispatchGetMessage(chatStore.current_chat);
    scrollToBottom();
  }
}
</script>
<template>
  <div class="bg-white rounded-lg w-full shadow-lg">
    <nav class="bg-gray-800 text-white shadow">
      <div class="mx-auto px-4 py-2 flex justify-between items-center">
        <!-- User Info -->
        <div class="flex items-center space-x-4 py-2">
          <!-- User Image -->
          <img src="\src\assets\images\user.jpg" alt="User" class="w-10 h-10 rounded-full" />
          <!-- User Name -->
          <div class="flex flex-col">
            <h1 class="text-md font-semibold">{{ chatStore.getCurrentChat.receiver.name ?? '' }}</h1>
            <p class="text-sm">Last seen today at 11:50 AM</p>
          </div>
        </div>
        <!-- Navigation Links (if needed) -->
        <div class="flex items-center space-x-4">
          <!-- Add your navigation links here -->
          <div class="flex bg-gray-200/5 rounded-lg">
            <a href="#" class="text-gray-300 hover:text-white bg-transparent hover:bg-gray-200/10 px-3 py-2 rounded-l-lg">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-300 hover:text-white bg-transparent hover:bg-gray-200/10 px-3 py-2 rounded-r-lg">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
          <!-- Add more links as needed -->
        </div>
      </div>
    </nav>
    <!-- Chat messages -->
    <div class="px-4 py-2 overflow-y-auto max-h-72 min-h-[86.1%]">
      <!-- Example chat messages -->
      <div class="mt-2" ref="convDiv">
        <div v-for="message in chatStore.messages">
          <div class="flex items-end justify-end mb-2" v-if="authStore.user && authStore.user.id === message.sender_id">
            <div class="bg-teal-800 rounded-md p-2">
              <p class="text-sm text-white">
                {{ message.message }}
                <span class="text-[8px] ml-4">{{ message.createdAt }}</span>
              </p>
            </div>
          </div>

          <div class="flex items-start mb-2" v-else>
            <div class="bg-gray-100 rounded-md p-2">
              <p class="text-sm">
                {{ message.message }}
                <span class="text-[8px] ml-4">{{ message.createdAt }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Add more chat messages here -->
    </div>
    <!-- Message input field -->

    <footer class="relative">
      <div class="flex">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          class="flex-1 p-4 border-0 text-white bg-gray-800 focus:border-0 focus:ring-0"
          placeholder="Type a message..."
        />
      </div>
    </footer>
  </div>
</template>
