import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoList.vue'),
      meta: {
        isLogin: true,
      },
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberList.vue'),
      meta: {
        isLogin: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue'),
      meta: {
        isLogin: false,
      },
    },
  ],
})

router.beforeEach((to, from) => {
  const { auth } = useAuthStore()
  if (to.meta.isLogin && !auth) {
    return { name: 'login' }
  } else {
    return true
  }
})
export default router
