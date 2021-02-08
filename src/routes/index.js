import { createWebHistory, createRouter } from "vue-router"

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

export default router