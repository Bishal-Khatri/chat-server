<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { onMounted, onBeforeUnmount } from 'vue';
import ChatList from './chat/ChatList.vue';
import ChatRoom from './chat/ChatRoom.vue';
import SideNav from './includes/SideNav.vue';
import { useChatStore } from '@/stores/chat.store';
import { socket } from '@/socket';
import DefaultView from './DefaultView.vue';

const chatStore = useChatStore();
const userStore = useAuthStore();

onMounted(() => {
  initData();
});

onBeforeUnmount(() => {
  if (socket) {
    socket.disconnect();
  }
});

async function initData() {
  await userStore.dispatchGetAuthUserData();
  await socket.connect();
  await chatStore.dispatchGetChats();
}
</script>

<template>
  <main>
    <div class="flex h-screen">
      <SideNav />
      <ChatList />
      <ChatRoom v-if="Object.keys(chatStore.chatData).length" />
      <DefaultView v-else/>
    </div>
  </main>
</template>./DefaultView.vue
