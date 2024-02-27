import axios from "axios";

export default {
  namespaced: true,

  state: {
    chats: [],
    message: []
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
    send(_,payload){
      axios
        .post("http://localhost:5000/chat/send", payload)
        .then(response => {
          console.log(response);
          
        })
        .catch(e => {
          console.log(e);
        });
    },
    addNewChat(_,payload){
      axios
        .post("http://localhost:5000/chat/create", payload)
        .then(response => {
          console.log(response);
          alert("User added successfully.")
        })
        .catch(e => {
          console.log(e);
        });
    },
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
