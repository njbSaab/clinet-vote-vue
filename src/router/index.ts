// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', component: () => import('@/pages/public/index.vue') },
  { path: '/login', name: 'login', component: () => import('@/pages/public/RegisterPage.vue') },
    {
    path: '/cabinet',
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: 'profile' },
      { path: '/profile', name: 'profile', component: () => import('@/pages/dashboard/ProfilePage.vue') },
      { path: '/events', name: 'my-events', component: () => import('@/pages/dashboard/MyEventsPage.vue') },
    ],
  },
  { 
    path: '/vote/:typeEventId', 
    name: 'vote', 
    component: () => import('@/pages/public/VotePage.vue'),
    props: true   
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ЖЕЛЕЗНЫЙ ГАРД — РАБОТАЕТ КАК В ПРОДАКШЕНЕ
// src/router/index.ts
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    await authStore.loadUser()

    if (!authStore.isAuthenticated) {
      return next('/login')
    }
  }

  next()
})

export { router }