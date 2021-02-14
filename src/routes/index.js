import { createWebHistory, createRouter } from "vue-router"
import $store from '../store'

import Home from '../views/Home/index.vue'
import User from '../views/Users/index.vue'
import AddUser from '../views/Users/AddUser.vue'
import Login from '../views/Auth/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/users',
    name: 'User',
    component: User
  },
  {
    path: '/users/add',
    name: 'AddUser',
    component: AddUser
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name == 'Login') {
    if($store.state.currentUser?.id && $store.state.currentRole) {
      next('/')
    } else {
      next()
    }
  } else {
    if($store.state.currentUser?.id && $store.state.currentRole) {
      next()
    } else {
      console.log('coming here')
      next('/login')
    }
  }
})

export default router