// src/composables/useApi.ts
import { ref } from 'vue'
import type { EventData } from '@/types/api'
import { config } from '@/config'

export async function fetchEventByUrl(siteUrl: string): Promise<EventData> {
  const url = `${config.api.baseUrl}${config.api.endpoints.eventByUrl}?site_url=${encodeURIComponent(siteUrl)}`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const data = await res.json()
  if (!data?.id) throw new Error('Invalid response')

  return data as EventData
}

export function useEventData(siteUrl: string) {
  const event = ref<EventData | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const load = async () => {
    try {
      loading.value = true      
      event.value = await fetchEventByUrl(siteUrl)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error'
    } finally {
      loading.value = false
    }
  }

  return { event, loading, error, load }
}