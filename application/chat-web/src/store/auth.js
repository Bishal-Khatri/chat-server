import axios from "axios";

export default {
  namespaced: true,

  state: {
    userData: null
  },

  getters: {
    user: state => state.userData
  },

  mutations: {
    setUserData(state, user) {
      state.userData = user;
    }
  },

  actions: {
    getUserData({ commit }) {
      axios
        .get("http://localhost:5000/user")
        .then(response => {
          commit("setUserData", response.data);
        })
        .catch(() => {
          localStorage.removeItem("authToken");
        });
    },
    sendLoginRequest({ commit }, data) {
      commit("setErrors", {}, { root: true });
      return axios.post("http://localhost:5000/login", data).then(response => {
        commit("setUserData", response.data.data);
        localStorage.setItem("authToken", response.data.token.token);
      });
    },

    async sendRegisterRequest({ commit }, data) {
      commit("setErrors", {}, { root: true });
      const response = await axios.post("http://localhost:5000/signup", data);
      commit("setUserData", response.data.data);
      localStorage.setItem("authToken", response.data.token.token);
    },

    sendLogoutRequest({ commit }) {
      axios.post("http://localhost:5000/logout").then(() => {
        commit("setUserData", null);
        localStorage.removeItem("authToken");
      });
    },

    sendVerifyResendRequest() {
      return axios.get(process.env.VUE_APP_API_URL + "email/resend");
    },

    sendVerifyRequest({ dispatch }, hash) {
      return axios
        .get(process.env.VUE_APP_API_URL + "email/verify/" + hash)
        .then(() => {
          dispatch("getUserData");
        });
    }
  }
};
