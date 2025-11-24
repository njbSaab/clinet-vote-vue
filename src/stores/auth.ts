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

  const logout = async () => {
    try {
      await api.post('/auth/logout') // если будет
    } catch {}
    user.value = null
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