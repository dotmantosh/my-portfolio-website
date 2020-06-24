import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Show from '../views/Show.vue'
import PublicPortfolio from '../views/PublicPortfolio.vue'
import ResetPassword from '../views/ResetPassword.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    // route level code-splitting
    // this generates a separate chunk (portfolio.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "portfolio" */ '../views/Portfolio.vue')
  },

  {
    path: '/portfolio/:username',
    name: 'publicPortfolio',
    component: PublicPortfolio
  },
  {
    path: '/show/:id',
    name: 'show',
    component: Show
  },
  {
    path: '/forgotpassword',
    name: 'forgotPassword',
    component: ForgotPassword
  },
  {
    path: '/resetpassword/:token',
    name: 'resetPassword',
    component: ResetPassword
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
