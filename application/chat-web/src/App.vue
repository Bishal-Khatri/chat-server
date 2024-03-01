<template>
  <div id="app">
    <main role="main" class="container-fluid">
      <router-view />
    </main>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
import SocketioService from './socketio.service.js';
export default {
  computed: {
    ...mapGetters("auth", ["user"])
  },
  created() {
    SocketioService.setupSocketConnection();
  },
  beforeUnmount() {
    SocketioService.disconnect();
  },
  mounted() {
    if (localStorage.getItem("authToken")) {
      this.getUserData();
    }
  },

  methods: {
    ...mapActions("auth", ["sendLogoutRequest", "getUserData"])
  }
};
</script>

<style>
body > div > .container {
  padding: 60px 15px 0;
}
</style>
