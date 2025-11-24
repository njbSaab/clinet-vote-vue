<!-- src/pages/dashboard/ProfilePage.vue -->
<template>
  <div class="py-10">
    <h2 class="text-4xl font-bold mb-8 text-center">Привет, {{ user?.name }}!</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div class="bg-white/5 backdrop-blur rounded-2xl p-8 text-center">
        <p class="text-white/60 text-lg">Всего голосов</p>
        <p class="text-5xl font-bold mt-2">{{ user?.totalVotes || 0 }}</p>
      </div>
      <div class="bg-white/5 backdrop-blur rounded-2xl p-8 text-center">
        <p class="text-white/60 text-lg">Баллы</p>
        <p class="text-5xl font-bold mt-2 text-yellow-400">{{ user?.points || 0 }}</p>
      </div>
      <div class="bg-white/5 backdrop-blur rounded-2xl p-8 text-center">
        <p class="text-white/60 text-lg">Точность</p>
        <p class="text-5xl font-bold mt-2 text-green-400">{{ user?.stats?.accuracy || 0 }}%</p>
      </div>
    </div>

    <!-- История голосов -->
    <div v-if="user?.votesHistory?.length" class="space-y-6">
      <h3 class="text-2xl font-bold mb-6">История голосов</h3>
      <div 
        v-for="vote in user.votesHistory" 
        :key="vote.votedAt"
        class="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10"
      >
        <div class="flex justify-between items-center mb-4">
          <div>
            <h4 class="text-xl font-bold">{{ vote.eventTitle }}</h4>
            <p class="text-white/70">{{ vote.participantA }} vs {{ vote.participantB }}</p>
          </div>
          <span class="text-2xl">
            {{ vote.yourChoice }}
          </span>
        </div>
        <p class="text-sm text-white/50">
          Голосовал: {{ new Date(vote.votedAt).toLocaleDateString('ru-RU') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>