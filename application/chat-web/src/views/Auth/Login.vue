<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Chatap</h2>
        <div class="text-center mb-5 text-dark">Realtime chat application</div>
        <div class="card my-5">

          <form class="card-body cardbody-color p-lg-5">

            <div class="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile">
            </div>

            <div class="mb-3">
              <input type="email" class="form-control" :class="{ 'is-invalid': errors.email }" id="email" aria-describedby="emailHelp"
                placeholder="Email address" v-model="details.email">
                <div class="invalid-feedback" v-if="errors.email">
                {{ errors.email[0] }}
              </div>
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" :class="{ 'is-invalid': errors.password }" 
              id="password" v-model="details.password" placeholder="password">
              <div class="invalid-feedback" v-if="errors.password">
                {{ errors.password[0] }}
              </div>
            </div>
            <div class="text-center"><button type="submit" @click.prevent="login" class="btn btn-color px-5 mb-5 w-100">Login</button></div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
              Registered? <a href="/register" class="text-dark fw-bold"> Create an
                Account</a>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",

  data: function() {
    return {
      details: {
        email: null,
        password: null
      }
    };
  },

  computed: {
    ...mapGetters(["errors"])
  },

  mounted() {
    this.$store.commit("setErrors", {});
  },

  methods: {
    ...mapActions("auth", ["sendLoginRequest"]),

    login: function() {
      console.log(this.details)
      this.sendLoginRequest(this.details).then(() => {
        this.$router.push({ name: "Home" });
      });
    }
  }
};
</script>
<style scoped>
.btn-color{
  background-color: #0e1c36;
  color: #fff;
  
}

.profile-image-pic{
  height: 200px;
  width: 200px;
  object-fit: cover;
}
.cardbody-color{
  background-color: #ebf2fa;
}
a{
  text-decoration: none;
}
</style>
