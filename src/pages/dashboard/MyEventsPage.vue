<!-- src/pages/dashboard/MyEventsPage.vue -->
<template>
  <div class="space-y-6">
    <h2 class="text-3xl font-bold mb-8 text-center">Мои голоса ({{ user?.totalVotes || 0 }})</h2>

    <!-- Если нет голосов -->
    <div v-if="!user?.votesHistory || user.votesHistory.length === 0" class="text-center py-20">
      <p class="text-2xl text-white/60">Вы ещё не голосовали</p>
      <router-link to="/" class="mt-6 inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl font-bold hover:scale-105 transition">
        Перейти к событиям
      </router-link>
    </div>

    <!-- Список голосов -->
    <div v-else class="space-y-6">
      <div
        v-for="vote in user.votesHistory"
        :key="vote.votedAt"
        class="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/30 transition"
        v-auto-animate
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-2xl font-bold">{{ vote.eventTitle }}</h3>
            <p class="text-white/70">
              {{ vote.participantA }} vs {{ vote.participantB }}
            </p>
          </div>

          <!-- Статус результата -->
          <div class="text-right">
            <span
              v-if="vote.isCorrect === true"
              class="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-bold"
            >
              УГАДАЛ
            </span>
            <span
              v-else-if="vote.isCorrect === false"
              class="px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm font-bold"
            >
              НЕ УГАДАЛ
            </span>
            <span
              v-else
              class="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-bold"
            >
              ЖДЁМ РЕЗУЛЬТАТ
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
          <div>
            <p class="text-white/60">Ваш прогноз:</p>
            <p class="font-bold text-xl">{{ vote.yourChoice }}</p>
          </div>
          <div>
            <p class="text-white/60">Результат:</p>
            <p class="font-bold text-xl">
              {{ vote.result }}
            </p>
          </div>
          <div>
            <p class="text-white/60">Приз события:</p>
            <p class="font-bold text-xl text-yellow-400">
              {{ vote.grandPrize ? vote.grandPrize + ' $' : '—' }}
            </p>
          </div>
        </div>

        <div class="mt-4 text-right text-white/50 text-sm">
          Проголосовано: {{ formatDate(vote.votedAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

// Красивая дата
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.bg-green-500\/20 { background-color: rgba(34, 197, 94, 0.2); }
.bg-red-500\/20 { background-color: rgba(239, 68, 68, 0.2); }
.bg-yellow-500\/20 { background-color: rgba(251, 191, 36, 0.2); }
</style>