// src/composables/useCountdown.ts
import { ref, computed, watch, onUnmounted, type Ref } from 'vue'

export function useCountdown(targetDateRef: Ref<string | null | undefined>) {
  console.log(targetDateRef.value);
  
  const now = ref(Date.now())
  let interval: number | null = null

  const timeLeft = computed(() => {
    const endAt = targetDateRef.value
    if (!endAt) return null

    const diff = new Date(endAt).getTime() - now.value
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds, expired: false }
  })

  const start = () => {
    if (interval) return // вже запущено
    interval = setInterval(() => {
      now.value = Date.now()
    }, 1000)
  }

  const stop = () => {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  // Ключовий момент — стежимо за зміною targetDateRef
  watch(targetDateRef, (newDate) => {
    if (newDate) {
      start()           // ← запускаємо таймер, коли прийшла дата
    } else {
      stop()            // якщо дата зникла — зупиняємо
    }
  }, { immediate: true }) // immediate — перевіряємо одразу

  onUnmounted(() => stop())

  return {
    timeLeft,
    isExpired: computed(() => timeLeft.value?.expired ?? true),
  }
}