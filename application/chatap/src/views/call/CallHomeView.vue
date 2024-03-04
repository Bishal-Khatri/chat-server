<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { onMounted, onBeforeUnmount } from 'vue';
import { useChatStore } from '@/stores/chat.store';
import { socket } from '@/socket';
import CallList from './CallList.vue';
import SideNav from '../includes/SideNav.vue';
import DefaultView from '../DefaultView.vue';

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
      <CallList />
      <DefaultView/>
    </div>
  </main>
</template>
