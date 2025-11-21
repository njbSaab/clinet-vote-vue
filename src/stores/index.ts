import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null as string | null,
    user: null as any | null,
  }),
  persist: true, // ← будет работать после фикса
})