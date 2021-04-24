<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    {{time}}
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

  data() {
    return {
      interval: null,
      time: null
    }
  },

  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval)
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
      // update the time every second
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }).format()
    }, 1000);
  }
}
</script>
