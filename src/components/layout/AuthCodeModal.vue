<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      @click.self="close"
      v-auto-animate
    >
      <div
        class="relative w-full max-w-md bg-gradient-to-b from-zinc-900/95 via-[#0f0029] to-black rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
      >
        <div
          class="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-red-600/10 blur-3xl"
        ></div>

        <div class="relative p-8">
          <button
            @click="close"
            class="absolute top-4 right-4 text-white/60 hover:text-white"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Шаг 1 -->
          <div v-if="step === 1" v-auto-animate>
            <h2
              class="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent"
            >
              Подтвердите голос
            </h2>

            <form @submit.prevent="sendCode" class="space-y-6">
              <div>
                <input
                  v-model="name"
                  required
                  type="text"
                  placeholder="Ваше имя"
                  class="input-auth"
                />
              </div>
              <div>
                <input
                  v-model="email"
                  required
                  type="email"
                  placeholder="Email"
                  class="input-auth"
                />
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="btn-gradient w-full py-5 text-xl"
              >
                {{ loading ? "Отправляем..." : "Получить код" }}
              </button>
            </form>
          </div>

          <!-- Шаг 2 -->
          <div v-if="step === 2" v-auto-animate>
            <h2
              class="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent"
            >
              Введите код
            </h2>
            <p class="text-center text-white/70 mb-8">
              Код отправлен на <span class="text-white">{{ email }}</span>
            </p>

            <form @submit.prevent="verifyCode" class="space-y-8">
              <input
                v-model="code"
                type="text"
                inputmode="numeric"
                maxlength="6"
                placeholder="000000"
                class="input-auth text-center text-4xl tracking-widest font-mono"
                @input="code = $event.target.value.replace(/\D/g, '').slice(0, 6)"
                autofocus
              />

              <button
                type="submit"
                :disabled="loading || code.length !== 6"
                class="btn-gradient w-full py-5 text-xl"
              >
                {{ loading ? "Проверяем..." : "Голосовать" }}
              </button>
            </form>

            <button
              @click="sendCode"
              :disabled="loading"
              class="block mx-auto mt-6 text-blue-400 hover:text-blue-300 text-sm"
            >
              Отправить код повторно
            </button>
          </div>

          <!-- Успех -->
          <div v-if="success" class="text-center py-16"  v-auto-animate>
            <div
              class="w-24 h-24 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-14 h-14 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 class="text-3xl font-bold mb-2">Голос учтён!</h3>
            <p class="text-white/70">Спасибо за участие</p>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import api from "@/api";
import { useAuthStore } from "@/stores/auth";
import { unref } from "vue";
import { useRouter } from "vue-router";
import { nextTick } from 'vue'  // ← ДОБАВЬ ЭТУ СТРОКУ ВВЕРХУ!

const router = useRouter();
const authStore = useAuthStore();

const props = defineProps<{
  typeEventId: string;  // теперь string, не ComputedRef
  choice: number | Ref<number>;
  reloadEvent: () => Promise<any>;
}>();

const emit = defineEmits(["close"]);

const isOpen = ref(true);
const step = ref<1 | 2>(1);
const name = ref("");
const email = ref("");
const code = ref("");
const loading = ref(false);
const success = ref(false);

const sendCode = async () => {
  if (!name.value || !email.value) {
    alert('Введите имя и email')
    return
  }

  loading.value = true
  console.log('AuthCodeModal: отправка кода на →', email.value)

  try {
    await api.post('/auth/send-code', {
      name: name.value,
      email: email.value,
    })

    console.log('Код отправлен, переходим на шаг 2')
    step.value = 2
  } catch (err: any) {
    const msg = err.response?.data?.message || 'Ошибка сервера'
    alert(msg)
    console.error('Ошибка send-code:', msg)
  } finally {
    loading.value = false
  }
}

const verifyCode = async () => {
  if (code.value.length !== 6) return;
  loading.value = true;

  try {
    console.log('AuthCodeModal: начинаем верификацию...')

    // 1. Подтверждаем код
    const res = await api.post("/auth/verify-code", {
      email: email.value,
      code: code.value,
    });

    // 2. Логинимся
    authStore.login(res.data.user);
    await authStore.loadUser();

    // 3. Голосуем — используем зафиксированный id!
    console.log('AuthCodeModal: отправляем голос за событие →', props.typeEventId)
    await api.post(`/events/${props.typeEventId}/vote`, { 
      choice: unref(props.choice) 
    });
    console.log('AuthCodeModal: голос успешно отправлен!')

    // 4. Успех
    success.value = true;
    console.log('AuthCodeModal: показываем успех')

    // 5. Через 1.5 сек — УНИЧТОЖАЕМ всё и уходим
    setTimeout(() => {
          console.log('AuthCodeModal: закрываем модалку...')
          isOpen.value = false
          emit("close")

          // КРИТИЧНО: ждём, пока компонент VotePage уничтожится!
          nextTick(() => {
            console.log('AuthCodeModal: редиректим в /cabinet')
            router.replace('/cabinet')
          })
        }, 1500)

  } catch (err: any) {
    console.error('AuthCodeModal: ошибка →', err.response?.data)
    alert(err.response?.data?.message || "Ошибка")
    await props.reloadEvent();
  } finally {
    loading.value = false;
  }
};

const close = () => {
  console.log('AuthCodeModal: пользователь закрыл модалку вручную')
  isOpen.value = false;
  emit("close");
};
</script>

<style scoped>
.input-auth {
  @apply w-full px-6 py-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 focus:border-white/50 outline-none transition text-white placeholder-gray-500 text-lg;
}
.btn-gradient {
  @apply bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-500 hover:to-red-500 transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed rounded-2xl font-bold;
}
</style>
