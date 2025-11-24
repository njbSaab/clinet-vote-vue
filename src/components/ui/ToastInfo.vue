<!-- src/components/ToastInfo.vue — замени ВСЁ содержимое на это -->
<template>
  <div class="fixed inset-x-0 top-4 z-[9999] flex justify-center pointer-events-none">
    <transition name="fade" appear>
      <div
        v-if="toast"
        role="alert"
        :class="toastClass"
        class="alert shadow-2xl max-w-md pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl border"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          :class="iconStroke"
        >
          <path
            v-if="toast.type === 'warning'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
          <path
            v-else-if="toast.type === 'error'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span class="font-medium text-lg">{{ toast.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
const toast = toastStore.toast

const toastClass = computed(() => {
  if (!toast.value) return ''
  switch (toast.value.type) {
    case 'warning': return 'alert-warning bg-yellow-500/20 border-yellow-500/50 text-yellow-100'
    case 'error': return 'alert-error bg-red-500/20 border-red-500/50 text-red-100'
    case 'success': return 'alert-success bg-green-500/20 border-green-500/50 text-green-100'
    default: return 'alert-info bg-blue-500/20 border-blue-500/50 text-blue-100'
  }
})

const iconStroke = computed(() => {
  switch (toast.value?.type) {
    case 'warning': return 'stroke-yellow-400'
    case 'error': return 'stroke-red-400'
    case 'success': return 'stroke-green-400'
    default: return 'stroke-blue-400'
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>