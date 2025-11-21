<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// true = регистрация, false = вход
const isRegister = ref(false)

const email = ref('')
const password = ref('')
const name = ref('')
const isLoading = ref(false)

const toggleMode = () => {
  isRegister.value = !isRegister.value
  // Сброс полей при переключении (по желанию можно убрать)
  email.value = ''
  password.value = ''
  name.value = ''
}

const handleSubmit = async () => {
  if (!email.value || !password.value || (isRegister.value && !name.value)) return

  isLoading.value = true
  try {
    if (isRegister.value) {
      console.log('Регистрация:', { name: name.value, email: email.value, password: password.value })
      alert('Регистрация успешна! (заглушка)')
    } else {
      console.log('Вход:', { email: email.value, password: password.value })
      alert('Вход успешен! (заглушка)')
      // router.push('/') // можно редиректить на главную после логина
    }
  } catch (err) {
    alert('Ошибка')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-[#0a001f] to-black text-white">
    <Header />

    <main class="container mx-auto px-4 md:pt-20 md:pb-20">
      <div class="max-w-md mx-auto">
        <!-- Заголовок с анимацией -->
        <h1 class="text-4xl md:text-5xl font-bold text-center md:mb-8 bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent"
        :key="isRegister"
        >
            <span 
                class="block animate__animated animate__fadeInDown"
                style="animation-duration: 0.6s;"
            >
                {{ isRegister ? 'Создать аккаунт' : 'Вход в аккаунт' }}
            </span>
        </h1>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Поле Имя — только при регистрации -->
          <transition name="slide-fade">
            <div v-if="isRegister">
              <label class="block text-lg mb-3 opacity-90">Ваше имя</label>
              <input
                v-model="name"
                type="text"
                required
                class="w-full px-6 py-[20px] rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 focus:border-white/50 outline-none transition"
                placeholder="Алексей"
              />
            </div>
          </transition>

          <div>
            <label class="block text-lg mb-3 opacity-90">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-6 py-[20px] rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 focus:border-white/50 outline-none transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label class="block text-lg mb-3 opacity-90">Пароль</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-6 py-[20px] rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 focus:border-white/50 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-70"
          >
            {{ isLoading ? 'Подождите...' : (isRegister ? 'Зарегистрироваться' : 'Войти') }}
          </button>
        </form>

        <!-- Переключатель режимов -->
        <p class="text-center mt-8 text-white/60">
          {{ isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?' }}
          <button
            @click="toggleMode"
            type="button"
            class="text-blue-400 hover:underline font-medium ml-2 transition"
          >
            {{ isRegister ? 'Войти' : 'Зарегистрироваться' }}
          </button>
        </p>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
/* Анимация появления заголовка */
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Плавное появление/исчезновение поля "Имя" */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>