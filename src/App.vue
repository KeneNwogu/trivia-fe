<template>
  <div id="nav">
    <router-link to="/"> Home </router-link> |
    <router-link to="/about"> About </router-link> |
    <router-link v-if="user && Object.keys(user).length == 0" to="/register">
      Register
    </router-link>
    |
    <span v-if="user && Object.keys(user).length == 0">
      <router-link to="/login">Login</router-link> |
    </span>
    <span v-else> <router-link to="/logout">Logout</router-link> | </span>

    <router-link to="/account">Account Info</router-link> |
    <router-link to="/quiz">Take Quiz</router-link>
  </div>

  <router-view> </router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  text-align: center;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>
