<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { onMounted, computed } from 'vue';
import ChatList from './chat/ChatList.vue';
import ChatRoom from './chat/ChatRoom.vue';
import SideNav from './includes/SideNav.vue';
import { useChatStore } from '@/stores/chat.store';
import DefaultView from './chat/DefaultView.vue';
const chatStore = useChatStore();

onMounted(() => {
  initData();
});

async function initData() {
  await chatStore.dispatchGetChats();
}
</script>

<template>
  <main>
    <div class="flex h-screen">
      <SideNav />
      <ChatList />
      <ChatRoom v-if="chatStore.messages.length" />
      <DefaultView v-else/>
    </div>
  </main>
</template>
