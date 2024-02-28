import axios from "axios";

export default {
  namespaced: true,

  state: {
    chats: [],
    messages: [],
    chatData: ''
  },

  getters: {
    chats: state => state.chats,
    messages: state => state.messages,
    chatData: state => state.chatData,
  },

  mutations: {
    setChats(state, chats) {
      state.chats = chats;
    },
    setMessages(state, messages){
        state.messages = messages;
    },
    setChatData(state, chatData){
      state.chatData = chatData;
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
    // addNewChat(_,payload){
    //   axios
    //     .post("http://localhost:5000/chat/create", payload)
    //     .then(response => {
    //       console.log(response);
    //       alert("User added successfully.")
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },
    getAllMessages({ commit }) {
      axios
        .get("http://localhost:5000/chat/all")
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
          commit("setMessages", response.data.data.messages);
          commit("setChatData", response.data.data.chatData);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
