<template>
  <div>
    <form @submit.prevent="login">
        <input type="text" name="username" v-model="form.username"> <br/>
        <input type="password" name="password" v-model="form.password"><br/><br/>
        <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Login',

  data () {
        return {
            form: new this.$form({
                username: '',
                password: '',
            }),
            isLoading: false,
            errors: [],
        }
    },

  methods: {
      login() {
          this.form.post('login')
            .then(res=>{
                    localStorage.setItem("access_token", res.data.token);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    localStorage.setItem('role', res.data.role);
                    localStorage.setItem('permission', JSON.stringify(res.data.permission));

                    this.$router.push({ path: '/'});
                    location.reload();
                })
            .catch(e => {
                if (e.response.status === 401) {
                    this.isLoading = false;
                    this.errors = e.response.data.errors;
                }
            });
      }
  }
}
</script>
