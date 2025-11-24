<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-[#0a001f] to-black text-white">
    <main class="container mx-auto pt-[15px] px-[20px] mb-0 min-h-[77dvh]">
      <div class="max-w-4xl mx-auto" v-auto-animate>
        <!-- Табы -->
        <div class="flex justify-center gap-8 mb-8 border-b border-white/20 w-fit mx-auto">
        <router-link
            to="/"
            class="pb-4 px-6 text-xl font-medium transition relative"
            :class="{
              'text-white border-b-4 border-blue-500': !$route.path.includes('/cabinet/'),
              'text-white/60 hover:text-white': $route.path.includes('/cabinet/')
            }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M5 19V9.452l-2.396 1.779l-.598-.787L12 3l10.02 7.439l-.604.792L12 4.25L6 8.716V18h2.673v1zm9.637 2l-3.533-3.538l.708-.714l2.825 2.825l5.675-5.65l.688.714z"/></svg>
            <span v-if="$route.path.includes('profile')" class="absolute bottom-0 left-0 w-full h-1 bg-white">
            </span>
          </router-link>

          <router-link
            to="/cabinet/details"
            class="pb-4 px-6 text-xl font-medium transition relative"
            :class="{
              'text-white border-b-4 border-blue-500': $route.path.includes('/details'),
              'text-white/60 hover:text-white': !$route.path.includes('/details')
            }"
          >
            Профиль
            <span v-if="$route.path.includes('profile')" class="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></span>
          </router-link>

          <router-link
            to="/cabinet/events"
            class="pb-4 px-6 text-xl font-medium transition"
            :class="{
              'text-white border-b-4 border-red-500': $route.path.includes('events'),
              'text-white/60 hover:text-white': !$route.path.includes('events')
            }"
          >
            Мои голоса
          </router-link>


          <div class="logout cursor-pointer" @click="logout">
            <svg class="p-0" xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24"><!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE --><path fill="currentColor" d="M9 2h9c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-2h2v2h9V4H9v2H7V4c0-1.1.9-2 2-2" /><path fill="currentColor" d="M10.09 15.59L11.5 17l5-5l-5-5l-1.41 1.41L12.67 11H3v2h9.67z" /></svg>
          </div>
        </div>

        <!-- Контент -->
        <router-view />
      </div>
    </main>

    <Footer />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import api from '@/api/index'

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()

// В твоём компоненте или сторе
const logout = async () => {
  try {
    await api.post('/auth/logout')  // ← это удалит куку на сервере
  } catch (err) {
    console.log('Сервер не ответил, но кука всё равно умрёт при перезагрузке')
  }
  // Очищаем фронт
  authStore.user = null
  localStorage.clear()
  toastStore.success('Вы вышли!')
  router.push('/')
}

</script>