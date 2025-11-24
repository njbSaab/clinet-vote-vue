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
      { path: 'details', name: 'details', component: () => import('@/pages/dashboard/MyDeteils.vue') },
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
router.beforeEach(async (to, from, next) => {
  console.log('Router: переход →', from.path, '→', to.path)

  const authStore = useAuthStore()

  // ← ВОТ ЭТА МАГИЯ — ВСЕГДА пытаемся восстановить сессию при первом переходе
  if (authStore.user === null) {
    await authStore.loadUser()
  }

  // ← АВТОРЕДИРЕКТ: если залогинен и идёт на публичные страницы — сразу в кабинет
  if (authStore.isAuthenticated && (to.path === '/' || to.path === '/login')) {
    console.log('Пользователь авторизован → редиректим в /cabinet')
    return next('/cabinet')
  }

  // Защита от /vote/profile и т.д.
  if (to.path.startsWith('/vote/')) {
    const slug = to.params.typeEventId as string
    const reserved = ['profile', 'cabinet', 'me', 'login', 'events', 'auth', 'vote', '']
    if (slug && reserved.includes(slug.toLowerCase())) {
      console.log('БЛОКИРУЕМ /vote/profile → редиректим в /cabinet')
      return next('/cabinet')
    }
  }

  // Защита приватных роутов
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/')
  }

  next()
})

export { router }