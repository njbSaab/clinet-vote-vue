// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { router } from './router'
import { useAuthStore } from '@/stores/auth'
import './style.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(autoAnimatePlugin)

// ← ВАЖНО: Ждём, пока восстановится сессия!
const authStore = useAuthStore()

async function bootstrap() {
  await authStore.loadUser()  // ← Ждём ответа от /profile/me
  console.log('Сессия восстановлена:', authStore.isAuthenticated ? 'Да' : 'Нет')

  app.mount('#app')  // ← Только теперь монтируем приложение
}

bootstrap()