<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },

  created() {
    this.$axios.get('user/all')
            .then(res=>{
                    console.log(res.data)
                })
            .catch(e => {
                if (e.response.status === 401) {
                    this.isLoading = false;
                    this.errors = e.response.data.errors;
                }
            });
  }
}
</script>
