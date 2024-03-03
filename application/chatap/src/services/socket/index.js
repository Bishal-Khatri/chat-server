/* eslint-disable */
import vue from 'vue'
import { io } from 'socket.io-client';

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io('http://localhost:5000', {
      auth: {
        token: localStorage.getItem("authToken")
      }
    });
    Vue.prototype.$socket = this.socket;
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
}
}

export default new SocketioService();