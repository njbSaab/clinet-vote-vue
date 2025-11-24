<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-[#0a001f] to-black text-white">
    <Header />

    <main class="container mx-auto px-4 pt-20 min-h-[86dvh]">
      <div class="max-w-md mx-auto">

        <h1 class="text-4xl mt-[15px] mb-[30px] md:text-5xl font-bold text-center md:mb-8 bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
          <span class="block animate__animated animate__fadeInDown">Проголосовать</span>
        </h1>

        <!-- Лоадинг -->
        <div v-if="loading" class="text-center py-20">
          <div class="skeleton h-96 w-full rounded-3xl"></div>
        </div>

        <!-- Ошибка -->
        <div v-else-if="error" class="text-center py-20 text-red-500 text-2xl">
          Событие не найдено
        </div>

        <!-- Событие загружено -->
        <div v-else-if="event">
          <MatchCard :event="event" />

          <!-- Радиокнопки -->
          <div class="radio-container" :class="{
            'blue': selectedChois === 'participantA',
            'red': selectedChois === 'participantB',
            'white': selectedChois === 'draw'
          }">
            <input v-model="selectedChois" value="participantA" id="participantA" type="radio" />
            <label for="participantA" class="flex items-center gap-3 participant-label">
              <img :src="event.logoA" :alt="event.participantA" class="w-10 h-10 rounded-full object-contain transition-all">
              <span class="font-medium">{{ event.participantA }}</span>
            </label>

            <input v-model="selectedChois" value="participantB" id="participantB" type="radio" />
            <label for="participantB" class="flex items-center gap-3 participant-label">
              <img :src="event.logoB" :alt="event.participantB" class="w-10 h-10 rounded-full object-contain transition-all">
              <span class="font-medium">{{ event.participantB }}</span>
            </label>

            <input v-model="selectedChois" value="draw" id="draw" type="radio" />
            <label for="draw" class="text-center font-medium">Draw</label>

            <div class="glider-container"><div class="glider"></div></div>
          </div>

          <!-- Кнопка голосования -->
          <button 
            @click="openAuthModal" 
            :disabled="timer.expired"
            class="w-full py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed mt-8 mb-[30px]"
          >
            {{ timer.expired ? 'Голосование окончено' : 'Голосовать' }}
          </button>
        </div>
      </div>
    </main>

    <!-- Модалка авторизации -->
    <AuthCodeModal
      v-if="showAuthModal"
        :type-event-id="fixedEventId"
        :choice="selectedChoice"
        :reload-event="reload"
        @close="showAuthModal = false"
        :key="fixedEventId"
    />

    <Footer />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEventBySlug } from '@/composables/useEventBySlug'
import { useCountdown } from '@/composables/useCountdown'

const route = useRoute()

// Запоминаем slug один раз
const fixedEventId = ref<string>('')

onMounted(() => {
  const slug = route.params.typeEventId as string
  console.log('VotePage: ЗАПОМИНАЕМ slug →', slug)
  fixedEventId.value = slug
})

// Загружаем событие
const { event, loading, error, reload } = useEventBySlug(fixedEventId)

// Таймер
const countdown = useCountdown(computed(() => event.value?.votingEndsAt || null))
const timer = computed(() => countdown.timeLeft.value || { expired: true })

// Выбор
const selectedChois = ref<'participantA' | 'participantB' | 'draw'>('participantA')
const selectedChoice = ref<1 | 2 | 3>(1)

watch(selectedChois, (val) => {
  selectedChoice.value = val === 'participantA' ? 1 : val === 'participantB' ? 2 : 3
}, { immediate: true })

// Модалка
const showAuthModal = ref(false)

const openAuthModal = () => {
  console.log('VotePage: открываем модалку')
  if (!fixedEventId.value) {
    alert('Событие не загружено')
    return
  }
  showAuthModal.value = true
}
</script>

<style scoped>
.radio-container {
  --main-color: #ffffff;
  --main-color-opacity: rgba(255, 255, 255, 0.1);
  font-size: 22px;
  --total-radio: 3;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 0.5rem;
  transition: all 0.4s ease;
}

.radio-container.blue   { --main-color: #3b82f6; --main-color-opacity: rgba(59, 130, 246, 0.2); }
.radio-container.red    { --main-color: #ef4444; --main-color-opacity: rgba(239, 68, 68, 0.2); }
.radio-container.white  { --main-color: #ffffff; --main-color-opacity: rgba(255, 255, 255, 0.2); }

.radio-container input { appearance: none; cursor: pointer; }

.radio-container .glider-container {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(0deg, transparent 0%, #1a1a1a 50%, transparent 100%);
}

.radio-container .glider-container .glider {
  position: relative;
  height: calc(100% / var(--total-radio));
  width: 100%;
  background: linear-gradient(0deg, transparent 0%, var(--main-color) 50%, transparent 100%);
  transition: transform 0.5s cubic-bezier(0.37, 1.95, 0.66, 0.56);
}

.radio-container .glider-container .glider::before {
  content: "";
  position: absolute;
  height: 70%;
  width: 400%;
  left: -150%;
  top: 50%;
  transform: translateY(-50%);
  background: var(--main-color);
  filter: blur(12px);
  border-radius: 50%;
}

/* .radio-container .glider-container .glider::after {
  content: "";
  position: absolute;
  left: -5px;
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, var(--main-color-opacity) 0%, transparent 100%);
} */

.radio-container label {
  cursor: pointer;
  padding: 1rem 0;
  color: #9ca3af;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.radio-container input:checked + label {
  color: var(--main-color);
  font-size: 38px;
  font-weight: 700;
  padding-left: 0.5rem;
}

.radio-container input:checked + label img {
  padding-right: 5px;
  padding-left: 5px;
  transform: scale(2);
  filter: drop-shadow(0 0 10px var(--main-color));
}

.radio-container input:nth-of-type(1):checked ~ .glider-container .glider { transform: translateY(0%); }
.radio-container input:nth-of-type(2):checked ~ .glider-container .glider { transform: translateY(100%); }
.radio-container input:nth-of-type(3):checked ~ .glider-container .glider { transform: translateY(200%); }
</style>