// src/composables/useEventBySlug.ts
import { ref, watch, computed, unref } from 'vue'
import api from '@/api'
import type { PublicEvent } from '@/types/api'

export const useEventBySlug = (typeEventId: any) => {
  const event = ref<PublicEvent | null>(null)
  const loading = ref(true)
  const error = ref(false)

  const idRef = computed(() => unref(typeEventId))

  const load = async () => {
    const id = idRef.value?.trim()

    // Если id пустой — сразу ошибка
    if (!id) {
      event.value = null
      error.value = true
      loading.value = false
      console.log('useEventBySlug: id пустой → ошибка')
      return
    }

    try {
      loading.value = true
      error.value = false // ВАЖНО: сбрасываем ошибку перед запроса!

      console.log('useEventBySlug: делаем запрос → GET /events/', id)
      const res = await api.get(`/events/${id}`)

      console.log('useEventBySlug: событие загружено →', res.data.title)
      event.value = res.data
    } catch (e: any) {
      console.error('useEventBySlug: ошибка загрузки →', e.response?.status || e.message)
      event.value = null
      error.value = true
    } finally {
      loading.value = false
    }
  }

  watch(idRef, load, { immediate: true })

  const reload = () => load()

  return { event, loading, error, reload }
}