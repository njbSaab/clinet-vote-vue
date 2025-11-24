// src/stores/auth.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{
    uuid: string
    email: string
    name: string
    emailVerified: boolean
    points?: number
    totalVotes?: number
    correctPredictions?: number
    votesHistory?: any[]
    stats?: any
  } | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  // ВОССТАНАВЛИВАЕМ СЕССИЮ ИЗ КУКИ
  const loadUser = async () => {
    try {
      const res = await api.get('/profile/me') 
      user.value = res.data
    } catch (err: any) {
      if (err.response?.status !== 401) {
        console.error('Ошибка восстановления сессии:', err)
      }
      user.value = null
    }
  }

  const login = (userData: any) => {
    user.value = userData
  }

  const logout = () => {
    // УДАЛЯЕМ КУКУ 5 РАЗНЫМИ СПОСОБАМИ — один точно сработает
    const deleteCookie = (name: string) => {
      // 1. Основной способ — без domain
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict`;
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`;
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;

      // 2. С domain (для localhost, 127.0.0.1 и реального домена)
      const domain = location.hostname;
      document.cookie = `${name}=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict`;
      document.cookie = `${name}=; path=/; domain=.${domain}; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict`;

      // 3. Для поддоменов (если будет)
      if (domain !== 'localhost') {
        document.cookie = `${name}=; path=/; domain=.votevibe.club; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict`;
      }
    }

    deleteCookie('access_token')

    // Очищаем юзера
    user.value = null
    localStorage.clear()
  }

  // Вызывай это в main.ts
  const init = () => {
    loadUser()
  }

  console.log('useAuthStore init')

  return {
    user,
    isAuthenticated,
    login,
    logout,
    loadUser,
    init,
  }
})