<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <a href="javascript:void(0)" @click="logout">Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
        logout() {
            this.$axios.post('logout')
            .then(res=>{
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("role");
                    localStorage.removeItem("permission");
                    console.log(res);
                    this.$router.push({ path: '/login' });
                })
            .catch(e=>{
              console.log(e);
            });
        }
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
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
