// src/composables/useApi.ts
import { ref } from 'vue';
import api from '@/api';
import type { PublicEvent } from '@/types/api';

// src/composables/useApi.ts
export const useMainEvent = () => {
  const event = ref<PublicEvent | null>(null);
  const loading = ref(true);

  const load = async () => {
    const res = await api.get('/events/main');
    event.value = res.data;
    loading.value = false;
  };

  return { event, loading, load };
};

export const useCarouselEvents = () => {
  const events = ref<PublicEvent[]>([]);
  const loading = ref(true);

  const load = async () => {
    const res = await api.get('/events/carousel');
    events.value = res.data;
    loading.value = false;
  };

  return { events, loading, load };
};