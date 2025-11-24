// src/composables/useVoteWithAuth.ts
import { useAuthStore } from '@/stores/auth'
import api from '@/api'

export function useVoteWithAuth(typeEventId: string, reloadEvent: () => Promise<any>) {
  const authStore = useAuthStore()
  const selectedChoice = ref<1 | 2 | 3>(1)

  const setChoice = (choice: 1 | 2 | 3) => {
    selectedChoice.value = choice
  }

  const voteIfAuthenticated = () => {
    if (authStore.isAuthenticated) {
      return api.post(`/events/${typeEventId}/vote`, { choice: selectedChoice.value })
        .then(() => reloadEvent())
        .catch(() => alert('Ошибка голосования'))
    } else {
      // Открываем модалку через глобальный emit или Pinia — но проще передать через компонент
      // Мы сделаем это через прямой вызов модалки из VoteView
      return Promise.reject('need-auth')
    }
  }

  return { selectedChoice, setChoice, voteIfAuthenticated }
}