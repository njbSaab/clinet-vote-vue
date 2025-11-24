<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// true = регистрация (по коду), false = вход (пока заглушка)
const isRegister = ref(false)

// Регистрация по коду
const showCodeForm = ref(false)
const email = ref('')
const name = ref('')
const code = ref('')
const isLoading = ref(false)

const toggleMode = () => {
  isRegister.value = !isRegister.value
  showCodeForm.value = false
  email.value = ''
  name.value = ''
  code.value = ''
}

const startRegister = async () => {
  if (!email.value || !name.value) return

  isLoading.value = true
  try {
    await api.post('/auth/send-code', {
      email: email.value,
      name: name.value,
      siteUrl: window.location.origin,
    })
    showCodeForm.value = true
  } catch (err: any) {
    alert(err.response?.data?.message || 'Не удалось отправить код')
  } finally {
    isLoading.value = false
  }
}

const verifyCode = async () => {
  if (code.value.length !== 6) return

  isLoading.value = true
  try {
    const res = await api.post('/auth/verify-code', {
      email: email.value,
      code: code.value,
    })

    // 1. Сохраняем минимальные данные
    authStore.login(res.data.user)

    // 2. КРИТИЧЕСКИ ВАЖНО: сразу загружаем полный профиль!
    await authStore.loadUser()

    // 3. Теперь точно авторизован → можно в кабинет
    router.push('/cabinet')
  } catch (err: any) {
    alert(err.response?.data?.message || 'Неверный код')
  } finally {
    isLoading.value = false
  }
}

// Заглушка для входа (пока не реализовано)
const handleLogin = () => {
  alert('Вход по паролю скоро будет доступен')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-[#0a001f] to-black text-white">
    <Header />

    <main class="container mx-auto px-4 pt-24 min-h-[86dvh]">
      <div class="max-w-md mx-auto">
        <!-- Заголовок -->
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
          <span class="block animate__animated animate__fadeInDown">
            {{ isRegister ? 'Создать аккаунт' : 'Вход в аккаунт' }}
          </span>
        </h1>

        <!-- РЕГИСТРАЦИЯ -->
        <div v-if="isRegister">
          <!-- Первый шаг — ввод имени и email -->
          <form v-if="!showCodeForm" @submit.prevent="startRegister" class="space-y-8">
            <div>
              <label class="block text-lg mb-3 opacity-90">Ваше имя</label>
              <input
                v-model="name"
                type="text"
                required
                class="w-full px-6 py-[20px] rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 focus:border-white/50 outline-none transition"
                placeholder="Алексей"
                autofocus
              />
            </div>

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

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-500 hover:to-red-500 transition-all transform hover:scale-105 disabled:opacity-70"
            >
              {{ isLoading ? 'Отправляем код...' : 'Получить код на почту' }}
            </button>
          </form>

          <!-- Второй шаг — ввод кода -->
          <div v-else class="space-y-8">
            <p class="text-center text-white/70 text-lg">
              Код отправлен на <span class="text-white font-bold">{{ email }}</span>
            </p>

            <input
              v-model="code"
              type="text"
              inputmode="numeric"
              maxlength="6"
              placeholder="000000"
              autofocus
              class="w-full px-6 py-[20px] text-center text-4xl tracking-widest font-mono rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 focus:border-white/50 outline-none transition"
              @input="code = $event.target.value.replace(/\D/g, '').slice(0,6)"
            />

            <button
              @click="verifyCode"
              :disabled="isLoading || code.length !== 6"
              class="w-full py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-500 hover:to-red-500 transition-all transform hover:scale-105 disabled:opacity-70"
            >
              {{ isLoading ? 'Проверяем...' : 'Завершить регистрацию' }}
            </button>

            <button @click="showCodeForm = false" class="text-blue-400 hover:underline text-sm block mx-auto">
              ← Изменить email
            </button>
          </div>
        </div>

        <!-- ВХОД (пока заглушка) -->
        <form v-else @submit.prevent="handleLogin" class="space-y-8">
          <div>
            <label class="block text-lg mb-3 opacity-90">Email</label>
            <input
              type="email"
              required
              class="w-full px-6 py-[20px] rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 focus:border-white/50 outline-none transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label class="block text-lg mb-3 opacity-90">Пароль</label>
            <input
              type="password"
              required
              class="w-full px-6 py-[20px] rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 focus:border-white/50 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            class="w-full py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-500 hover:to-red-500 transition-all transform hover:scale-105"
          >
            Войти
          </button>
        </form>

        <!-- Переключатель -->
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