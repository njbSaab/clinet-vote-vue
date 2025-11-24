// src/composables/useCodeAttempts.ts
import { ref, computed, onMounted, watch } from 'vue'

const MAX_ATTEMPTS = 5
const BLOCK_DURATION = 10 * 60 * 1000 // 10 минут
const STORAGE_KEY = 'code_attempts'

export function useCodeAttempts() {
  const failedAttempts = ref(0)
  const blockedUntil = ref<number | null>(null)

  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return

      const data = JSON.parse(saved)
      failedAttempts.value = data.count ?? 0
      blockedUntil.value = data.blockedUntil ?? null

      if (blockedUntil.value && Date.now() > blockedUntil.value) {
        resetAttempts()
      }
    } catch (e) {
      console.error('Ошибка чтения code_attempts', e)
      resetAttempts()
    }
  }

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      count: failedAttempts.value,
      blockedUntil: blockedUntil.value
    }))
  }

  const resetAttempts = () => {
    failedAttempts.value = 0
    blockedUntil.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  const incrementFailed = () => {
    failedAttempts.value += 1
    if (failedAttempts.value >= MAX_ATTEMPTS) {
      blockedUntil.value = Date.now() + BLOCK_DURATION
    }
    saveToStorage()
  }

  const isBlocked = computed(() => {
    if (!blockedUntil.value) return false
    if (Date.now() < blockedUntil.value) return true
    resetAttempts()
    return false
  })

  const blockTimeLeft = computed(() => {
    if (!blockedUntil.value || Date.now() >= blockedUntil.value) return 0
    return Math.ceil((blockedUntil.value - Date.now()) / 1000)
  })

  // Осталось попыток (для отображения)
  const attemptsLeft = computed(() => {
    return Math.max(0, MAX_ATTEMPTS - failedAttempts.value)
  })

  onMounted(loadFromStorage)
  watch([failedAttempts, blockedUntil], saveToStorage)

  return {
    failedAttempts,     // ← ДОБАВИЛ!
    attemptsLeft,       // ← ДОБАВИЛ! (удобно для UI)
    isBlocked,
    blockTimeLeft,
    incrementFailed,
    resetAttempts,
  }
}