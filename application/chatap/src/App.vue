<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from './stores/auth.store';
import { socket } from '@/socket';

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
  socket.connect();
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
