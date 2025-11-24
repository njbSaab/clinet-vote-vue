// src/composables/useEventBySlug.ts
import { ref, watch, computed, unref, type ComputedRef } from 'vue'
import api from '@/api'
import type { PublicEvent } from '@/types/api'

export const useEventBySlug = (typeEventId: ComputedRef<string> | string) => {
  const event = ref<PublicEvent | null>(null)
  const loading = ref(true)
  const error = ref(false)

  // Приводим всё к реактивной ссылке
  const idRef = computed(() => unref(typeEventId))

  const load = async () => {
    const id = idRef.value
    if (!id) {
      event.value = null
      loading.value = false
      error.value = true
      return
    }

    try {
      loading.value = true
      error.value = false
      const res = await api.get(`/events/${id}`)
      event.value = res.data
    } catch (e) {
      event.value = null
      error.value = true
      console.error('Event load error:', e)
    } finally {
      loading.value = false
    }
  }

  // Следим за изменением slug (важно при навигации и прямом заходе!)
  watch(idRef, load, { immediate: true })

  return { 
    event, 
    loading, 
    error, 
    reload: load 
  }
}