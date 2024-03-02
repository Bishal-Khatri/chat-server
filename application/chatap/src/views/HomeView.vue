<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { onMounted } from 'vue';

onMounted(() => {
  const store = useAuthStore();
  store.dispatchGetUserData();
});
</script>

<template>
  <main>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
  </main>
</template>
