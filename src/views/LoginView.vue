<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card shadow">
          <div class="card-title text-center border-bottom">
            <h2 class="p-3">Login</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="loginUser">
              <div class="mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  class="form-control"
                  id="email"
                  v-model="user.email"
                />
              </div>
              <div class="mb-4">
                <input
                  type="password"
                  placeholder="Enter your password"
                  class="form-control"
                  id="password"
                  v-model="user.password"
                />
              </div>
              <div class="alert alert-danger" v-if="messageError">
                {{ messageError }}
              </div>
              <div class="d-grid">
                <button type="submit" class="btn text-light main-bg">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import firebase from "../Firebase";

export default {
  name: "LoginView",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      messageError: "",
    };
  },
  methods: {
    loginUser() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then((dataUser) => {
          localStorage.setItem("uidUser", dataUser.user.uid);
          router.push({
            name: "HomeView",
          });
        })
        .catch(() => {
          this.messageError = "invalid email and password";
        });
    },
  },
};
</script>
<style>
:root {
  --main-bg: #e91e63;
}

.main-bg {
  background: var(--main-bg) !important;
}
label {
  text-align: start;
}
input:focus,
button:focus {
  border: 1px solid var(--main-bg) !important;
  box-shadow: none !important;
}

.form-check-input:checked {
  background-color: var(--main-bg) !important;
  border-color: var(--main-bg) !important;
}

.card,
.btn,
input {
  border-radius: 0 !important;
}
</style>
