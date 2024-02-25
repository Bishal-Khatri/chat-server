<template>
  <div class="row clearfix">
    <div class="col-lg-12 p-0">
      <div class="card chat-app">
        <div id="plist" class="people-list">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fa fa-search"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="Search..." />
          </div>
          <div class="row">
            <div class="col-md-12">
              <a class="btn btn-link float-right" href="#" @click="logout"
                ><i class="fa fa-sign-out mr-1 text-danger"></i>Logout</a
              >
            </div>
          </div>
          <ul class="list-unstyled chat-list mt-2 mb-0" v-if="chats.length > 0">
            <li
              class="clearfix"
              v-for="chat in chats"
              :key="chat.id"
              @click.prevent="getChat(chat.receiver.id)"
            >
              <img
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt="avatar"
              />
              <div class="about">
                <div class="name" v-if="chat.receiver">{{ chat.receiver.name}}</div>
                <div class="status">
                  <i class="fa fa-circle offline"></i> left 7 mins ago
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="chat" v-if="message">
          <div class="chat-header clearfix">
            <div class="row">
              <div class="col-lg-6">
                <a
                  href="javascript:void(0);"
                  data-toggle="modal"
                  data-target="#view_info"
                >
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar2.png"
                    alt="avatar"
                  />
                </a>
                <div class="chat-about">
                  <h6 class="m-b-0" v-if="message[0].receiver">{{ message[0].receiver.name ?? ''}}</h6>
                  <small>Last seen: 2 hours ago</small>
                </div>
              </div>
              <div class="col-lg-6 hidden-sm text-right">
                <a href="javascript:void(0);" class="btn btn-outline-secondary"
                  ><i class="fa fa-camera"></i
                ></a>
                <a href="javascript:void(0);" class="btn btn-outline-primary"
                  ><i class="fa fa-image"></i
                ></a>
                <a href="javascript:void(0);" class="btn btn-outline-info"
                  ><i class="fa fa-cogs"></i
                ></a>
                <a href="javascript:void(0);" class="btn btn-outline-warning"
                  ><i class="fa fa-question"></i
                ></a>
              </div>
            </div>
          </div>
          <div class="chat-history" v-if="message[0].message.length > 0">
            <ul class="m-b-0" >
              <li class="clearfix" v-for="value in message[0].message" :key="value.id">
                <template v-if="user.id===value.sender_id">
                <div class="message-data text-right">
                  <span class="message-data-time">10:10 AM, Today</span>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="avatar"
                  />
                </div>
                <div class="message other-message float-right">
                 {{value.message}}
                </div>
              </template>
              <template v-else>
                <div class="message-data">
                  <span class="message-data-time">10:12 AM, Today</span>
                </div>
                <div class="message my-message">{{value.message}}</div>
              </template>
              </li>
              <!-- <li class="clearfix">
                <div class="message-data">
                  <span class="message-data-time">10:12 AM, Today</span>
                </div>
                <div class="message my-message">Are we meeting today?</div>
              </li> -->
            </ul>
          </div>
          <div class="chat-message clearfix">
            <div class="input-group mb-0">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-send"></i></span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Enter text here..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",

  data() {
    return {
      success: null,
      error: null
    };
  },
  mounted() {
    this.getAllMessages();
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    ...mapGetters("message", ["chats", "message"])
  },

  methods: {
    ...mapActions("auth", ["sendLogoutRequest", "sendVerifyResendRequest"]),
    ...mapActions("message", ["getAllMessages", 'getMessage']),

    verifyResend() {
      this.success = this.error = null;
      this.sendVerifyResendRequest()
        .then(() => {
          this.success =
            "A fresh verification link has been sent to your email address.";
        })
        .catch(error => {
          this.error = "Error sending verification link.";
          console.log(error.response);
        });
    },

    getChat(receiverId){
      this.getMessage(receiverId);
    },

    logout() {
      this.sendLogoutRequest();
      this.$router.push("/");
    }
  }
};
</script>
