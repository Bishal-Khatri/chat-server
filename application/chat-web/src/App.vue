<template>
  <div id="app">
    <main role="main" class="container-fluid">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["user"])
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
