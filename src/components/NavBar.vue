<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link text-muted" aria-current="page" to="/"
              >Home</router-link
            >
          </li>
        </ul>

        <form class="d-flex">
          <router-link class="nav-link text-muted" to="/myproducts" v-if="user"
            >My Products</router-link
          >
          <a
            class="nav-link text-muted"
            v-on:click="logout"
            style="cursor: pointer"
            v-if="user"
            >Logout</a
          >
          <router-link to="/login"
            ><button
              class="btn btn-outline-success mx-2"
              v-if="user == null"
              type="submit"
            >
              Login
            </button></router-link
          >
          <router-link to="/register"
            ><button
              class="btn btn-outline-primary"
              v-if="user == null"
              type="submit"
            >
              Register
            </button></router-link
          >
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
import firebase from "../Firebase";
import router from "../router";
export default {
  name: "BavBar",
  data() {
    return {
      user: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        this.user = userAuth;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem("uidUser");
          router.push({
            name: "login",
          });
        });
    },
  },
};
</script>
