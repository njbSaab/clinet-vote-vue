// src/stores/toast.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toast = ref<{ type: string; message: string } | null>(null)

  const show = (type: string, message: string, duration = 1500) => {
    toast.value = { type, message }
    setTimeout(() => toast.value = null, duration)
  }

  return {
    toast,
    success: (msg: string) => show('success', msg),
    error: (msg: string) => show('error', msg),
    warning: (msg: string) => show('warning', msg),
  }
})