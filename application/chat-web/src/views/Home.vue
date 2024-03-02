
<template>
  <div>
    <button
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      aria-controls="default-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span class="sr-only">Open sidebar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>

    <aside
      id="default-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div class="grid gap-1">
          <button
            @click.prevent="showAddUser"
            type="button"
            class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-3 h-3 text-white me-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            New Chat
          </button>
          <button
            @click.prevent="logout"
            type="button"
            class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-danger rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-3 h-3 text-white me-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
            </svg>
            Logout
          </button>
        </div>
        <div
          id="add-user-dialog"
          class="fixed left-0 top-0 bg-black w-screen h-screen bg-opacity-50 justify-center items-center hidden opacity-0 transition-opacity duration-500"
        >
          <div class="bg-white rounded shadow-sm px-8 py-4 w-6/12">
            <h2 class="text-center">Find user by email address</h2>
            <div class="grid gap-6 mb-6">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email address</label>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john@exaple.com"
                  required
                />
              </div>
              <div class="gap-2 flex justify-between">
                <button @click.prevent="findUserByEmail" class="w-40 bg-primary p-2 rounded text-white shadow-md inline-flex ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 me-2 text-center">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
Search</button>
                <button @click.prevent="hideAddUser" class="w-40 bg-default p-2 rounded block shadow-md">Cancel</button>
              </div>
              <div v-if="findUser">
                  <div class="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="p-4">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <img class="h-12 w-12 rounded-full object-cover" src="https://via.placeholder.com/150"
                                    alt="Profile Picture">
                            </div>
                            <div class="ml-3">
                                <h2 class="text-lg font-semibold text-gray-800">{{ findUser.name }}</h2>
                                <p class="text-sm text-gray-600">{{ findUser.email }}</p>
                                <button
                              @click.prevent="newChat(findUser)"
                              type="button"
                              class="my-2 px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-primary rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              <svg
                                class="w-4 h-4 text-white me-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                              >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                              Add
                            </button>
                            </div>
                            
                        </div>
                    </div>
                  </div>
              </div>
            </div>
            
          </div>
        </div>

        <ul class="space-y-2 font-medium pt-2">
          <li v-for="chat in chats" :key="chat.id" @click.prevent="getChat(chat)" :class="chat.receiver_id === currentChat.receiver_id ? 'active' : ''">
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
              <div class="relative">
                <img class="w-10 h-10 rounded-full" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                <span
                  class="absolute bottom-0 left-8 transform translate-y-1/4 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"
                ></span>
              </div>
              <span class="ms-3" v-if="chat.receiver">{{ chat.receiver.name }}</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>

    <div class="p-4 sm:ml-64 flex flex-col h-screen" v-if="chatData">
      <div class="grid">
        <div class="flex gap-2">
          <img class="w-10 h-10 rounded-full" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Jese image" />
          <div>
            <h2 class="font-bold">{{ chatData.receiver.name ?? '-' }}</h2>
            <h4>{{ chatData.receiver.email ?? '-' }}</h4>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-lg dark:border-gray-700 overflow-y-auto" style="min-height: 80vh;" >
        <div v-if="messages.length > 0" id="conversations">
          <div v-for="value in messages" :key="value.id" ref="">
            <div class="flex items-end justify-end gap-2.5 mb-2" v-if="user.id === value.sender_id">
              <div class="bg-blue-50 flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                  {{ value.message }}
                </p>
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                  <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
              </div>
              <button
                id="dropdownMenuIconButton"
                data-dropdown-toggle="dropdownDots"
                data-dropdown-placement="bottom-start"
                class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 4 15"
                >
                  <path
                    d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  />
                </svg>
              </button>
              <div
                id="dropdownDots"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="flex items-start gap-2.5 mb-2" v-else>
              <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                  {{ value.message }}
                </p>
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                  <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
              </div>
              <button
                id="dropdownMenuIconButton"
                data-dropdown-toggle="dropdownDots"
                data-dropdown-placement="bottom-start"
                class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 4 15"
                >
                  <path
                    d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  />
                </svg>
              </button>
              <div
                id="dropdownDots"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="relative">
        <div class="flex">
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            type="text"
            class="flex-1 rounded-l-lg p-2 border-dashed border-t border-b border-l text-gray-800 border-gray-300 bg-white h-24 focus:ring-0"
            placeholder="Type a message..."
          />
          <button class="p-4 bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
              />
            </svg>
          </button>
          <button class="p-4 bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex';
import { ChatEvent } from '../constants.js';
import axios from "axios";
import Vue from 'vue'
export default {
  name: 'Home',

  data() {
    return {
      success: null,
      error: null,
      searching_user: false,
      email: '',
      newMessage: '',
      currentChat: '',
      findUser: ''
    };
  },
  async mounted() {
    await this.getAllMessages();
    this.scrollToBottom()
    this.$socket.on(ChatEvent.MESSAGE_RECEIVED_EVENT, (payload) => {
      this.messages.push(payload);
      this.scrollToBottom()
    });
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('message', ['chats', 'messages', 'chatData']),
  },
  methods: {
    ...mapActions('auth', ['sendLogoutRequest', 'sendVerifyResendRequest']),
    ...mapActions('message', ['getAllMessages', 'getMessage', 'addNewChat', 'send']),

    scrollToBottom() {
      setTimeout(() => {
        const element = this.$el.querySelector("#conversations");
          if(element && element.lastElementChild !== null){
            element.lastElementChild.scrollIntoView({behavior: 'smooth'})
          }
        }, 500);
    },
    showAddUser() {
      let dialog = document.getElementById('add-user-dialog');
      dialog.classList.remove('hidden');
      dialog.classList.add('flex');
      setTimeout(() => {
        dialog.classList.add('opacity-100');
      }, 20);
    },

    hideAddUser() {
      let dialog = document.getElementById('add-user-dialog');
      dialog.classList.add('opacity-0');
      dialog.classList.remove('opacity-100');
      setTimeout(() => {
        dialog.classList.add('hidden');
        dialog.classList.remove('flex');
      }, 500);
    },

    async findUserByEmail() {
      this.searching_user = true;
      const formData = {
        email: this.email,
      };
      const findUser = await axios.post("http://localhost:5000/users/find/email", formData).then(response => {
        this.findUser = response.data.data;
          // console.log(response);
        })
        .catch(e => {
          alert("User not found.")
          // console.log(e);
        });
        this.searching_user = false;
      // this.getAllMessages();
      // this.hideAddUser();
      this.$socket.emit(ChatEvent.NEW_CHAT_EVENT, this.message);
    },


    async newChat(findUser) {
      const formData = {
        receiver_id: findUser.id,
      };
      const newChat = await axios.post("http://localhost:5000/chat/create", formData).then(response => {
        alert("New chat created")
        })
        .catch(e => {
          alert("User not found.")
          // console.log(e);
        });
      this.getAllMessages();
      this.hideAddUser();
      this.$socket.emit(ChatEvent.NEW_CHAT_EVENT, this.message);
    },

    async sendMessage() {
      if (this.newMessage) {
        const formData = {
          inbox_hash: this.chatData.inbox_hash,
          message: this.newMessage,
        };
        await this.send(formData);
        this.$socket.emit(ChatEvent.NEW_CHAT_EVENT, this.newMessage);
        this.newMessage = '';
        this.getMessage(this.currentChat.receiver.id);
        this.scrollToBottom();
      }
    },

    verifyResend() {
      this.success = this.error = null;
      this.sendVerifyResendRequest()
        .then(() => {
          this.success = 'A fresh verification link has been sent to your email address.';
        })
        .catch(error => {
          this.error = 'Error sending verification link.';
          console.log(error.response);
        });
    },

    async getChat(chat) {
      this.currentChat = chat;
      await this.getMessage(chat.receiver.id);
      this.scrollToBottom();
      this.$socket.emit(ChatEvent.JOIN_CHAT_EVENT, this.chatData.inbox_hash);
    },

    async logout() {
      await this.sendLogoutRequest();
    },
  },
};
</script>
<style scoped>
.btn-color {
  background-color: #0e1c36;
  color: #fff;
}

.profile-image-pic {
  height: 200px;
  width: 200px;
  object-fit: cover;
}
.cardbody-color {
  background-color: #ebf2fa;
}
a {
  text-decoration: none;
}
.active{
  background-color: lightblue;
  border-radius: 5px;
}
.active:hover{
  background-color: lightblue;
  border-radius: 5px;
}
</style>
