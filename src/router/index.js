import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
        isAuth: true,
        title: 'Dashboard',
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
        isAuth: false,
        title: 'Login',
    },

    beforeEnter: (to, from, next) => {

        let auth_token = localStorage.getItem('access_token');
        if(auth_token != null){
            next({ path: '/' })
        }

        else next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  let auth_token = localStorage.getItem('access_token');

  if(to.meta.isAuth == true && auth_token == null){
    next({ path: '/login' })
  }

  else next()

  document.title = to.meta.title + ' | ' + process.env.MIX_APP_NAME;

});

export default router
