import { createWebHistory, createRouter } from "vue-router"
import $store from '../store'

import Home from '../views/Home/index.vue'
import User from '../views/Users/index.vue'
import AddUser from '../views/Users/AddUser.vue'
import Order from '../views/Orders/index.vue'
import Invoice from '../views/Invoice/index.vue'
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
    meta: { canAccess: ['super', 'administrator'] },
    component: User
  },
  {
    path: '/users/add',
    name: 'AddUser',
    component: AddUser
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Order
  },
  {
    path: '/invoices/:id',
    name: 'Invoice',
    component: Invoice
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

function checkAccessMiddleware (to, from, next) {
  const nextCalled = false
  const currentUserId = $store.state.currentUser?.id
  const currentUserRole = $store.state.currentRole || null

  const canAccess = to.meta.canAccess

  if (currentUserId && canAccess && canAccess.includes(currentUserRole)) return next()

  if (currentUserId && canAccess && !canAccess.includes(currentUserRole)) return next('/')   

  return next()
}

router.beforeEach((to, from, next) => {
  if (to.name == 'Login') {
    if($store.state.currentUser?.id && $store.state.currentRole) {
      return next('/')
    } else {
      return next()
    }
  } else {
    if($store.state.currentUser?.id && $store.state.currentRole) {
      return next()
    } else {
      return next('/login')
    }
  }
})

router.beforeEach(checkAccessMiddleware)

export default router