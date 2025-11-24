<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-[#0a001f] to-black text-white" v-auto-animate>
    <Header />

    <ToastInfo />
    <main class="container mx-auto px-4 md:pt-24 pt-32 min-h-[85.5dvh] md:min-h-[77dvh]">
      <div class="max-w-md mx-auto" v-auto-animate>

        <!-- Заголовок -->
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
          <span class="block animate__animated animate__fadeInDown">
            Вход по коду
          </span>
        </h1>

        <!-- Первый шаг — ввод имени и email -->
        <form v-if="!showCodeForm" @submit.prevent="sendCode" class="space-y-8">
          <div>
            <label class="block text-lg mb-3 opacity-90">Ваше имя</label>
            <input
              v-model="name"
              type="text"
              required
              autofocus
              class="w-full px-6 py-[20px] rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 focus:border-white/50 outline-none transition"
              placeholder="Алексей"
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
          <small v-if="message">{{ message }}</small>
          <button
            type="submit"
            :disabled="isLoading || isBlocked"

            class="w-full py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-500 hover:to-red-500 transition-all transform hover:scale-105 disabled:opacity-70"
          >
            <span v-if="isBlocked">
                Заблокировано ({{ blockTimeLeft }} сек)
              </span>
              <span v-else>
            {{ isLoading ? 'Отправляем код...' : 'Получить код на почту' }}
              </span>
          </button>
        </form>

        <!-- Второй шаг — ввод кода -->
        <div v-else class="space-y-8 text-center">
          <p class="text-white/70 text-lg">
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
          <small class="text-[15px] text-error relative bottom-[-15px]" v-if="message">{{ message }}</small>
          <button
              @click="verifyCode"
              :disabled="isLoading || code.length !== 6 || isBlocked"
              class="w-full py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-blue-600 to-red-600 transition-all transform hover:scale-105 disabled:opacity-50"
            >
              <span v-if="isBlocked">
                Заблокировано ({{ blockTimeLeft }} сек)
              </span>
              <span v-else>
                {{ isLoading ? 'Проверяем...' : 'Войти' }}
              </span>
            </button>

          <button @click="showCodeForm = false" class="text-blue-400 hover:underline text-sm">
            ← Изменить email
          </button>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import { useAuthStore } from '@/stores/auth'
import { useCodeAttempts } from '@/composables/useCodeAttempts'

const router = useRouter()
const authStore = useAuthStore()
// Защита от брута
const { failedAttempts, attemptsLeft, isBlocked, blockTimeLeft, incrementFailed, resetAttempts } = useCodeAttempts()
const showCodeForm = ref(false)
const email = ref('')
const name = ref('')
const code = ref('')
const isLoading = ref(false)
const message = ref('')
const sendCode = async () => {
  if (!email.value || !name.value) return

  resetAttempts()
  isLoading.value = true

  try {
    await api.post('/auth/send-code', {
      email: email.value,
      name: name.value,
      siteUrl: window.location.origin,
    })
    showCodeForm.value = true
  } catch (err: any) {
    message.value = (err.response?.data?.message || 'Не удалось отправить код')
  } finally {
    isLoading.value = false
  }
}

const verifyCode = async () => {
  if (code.value.length !== 6) return

  if (isBlocked.value) {
    message.value = (`Слишком много попыток! Подождите ${blockTimeLeft.value} сек`)
    return
  }

  isLoading.value = true

  try {
    const res = await api.post('/auth/verify-code', {
      email: email.value,
      code: code.value,
    })

    resetAttempts()
    authStore.login(res.data.user)
    // await authStore.loadUser()
    router.replace('/cabinet')

  } catch (err: any) {
    incrementFailed()

    const left = attemptsLeft.value

    if (left <= 0) {
      message.value = ('Аккаунт заблокирован на 10 минут')
    } else {
      message.value = (`Неверный код! Осталось попыток: ${left}`)
    }
  } finally {
    isLoading.value = false
  }
}
</script>
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