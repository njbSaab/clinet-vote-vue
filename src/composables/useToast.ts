// src/composables/useToast.ts
import { ref } from 'vue'

type ToastType = 'warning' | 'error' | 'success' | null

interface Toast {
  type: ToastType
  message: string
}

export const useToast = () => {
  const toast = ref<Toast | null>(null)

  const show = (type: ToastType, message: string, duration = 1500) => {
    toast.value = { type, message }
    setTimeout(() => {
      toast.value = null
    }, duration)
  }

  const warning = (msg: string) => show('warning', msg)
  const error = (msg: string) => show('error', msg)
  const success = (msg: string) => show('success', msg)

  return { toast, warning, error, success }
}

