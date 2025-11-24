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
      { path: '', name: 'profile', component: () => import('@/pages/dashboard/ProfilePage.vue') },
      { path: 'events', name: 'my-events', component: () => import('@/pages/dashboard/MyEventsPage.vue') },
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
  console.log('Router: переход →', from.path, '→', to.path)

// Запрещаем любой доступ к /vote/* если slug — зарезервированное слово
  if (to.path.startsWith('/vote/')) {
    const slug = to.params.typeEventId as string
    const reserved = ['profile', 'cabinet', 'me', 'login', 'events', 'auth', 'vote', '']
    if (slug && reserved.includes(slug.toLowerCase())) {
      console.log('БЛОКИРУЕМ /vote/profile → редиректим в /cabinet')
      return next('/cabinet')
    }
  }
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