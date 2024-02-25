import axios from "axios";

export default {
  namespaced: true,

  state: {
    chats: [],
    message: null
  },

  getters: {
    chats: state => state.chats,
    message: state => state.message,
  },

  mutations: {
    setChats(state, chats) {
      state.chats = chats;
    },
    setMessage(state, message){
        state.message = message;
    }
  },

  actions: {
    getAllMessages({ commit }) {
      axios
        .get("http://localhost:5000/chat/messages")
        .then(response => {
          commit("setChats", response.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    getMessage({commit}, receiverId){
        axios
        .get("http://localhost:5000/chat/"+receiverId)
        .then(response => {
          commit("setMessage", response.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
