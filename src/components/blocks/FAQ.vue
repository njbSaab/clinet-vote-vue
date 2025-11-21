<script setup lang="ts">
const data = [
  {
    id: 1,
    title: "Это бесплатно?",
    description: "Да, полностью. Вы просто должны подтвердить имейл и в случае правильного прогноза мы пришлем бонус на почту в день события",
  },
  {
    id: 2,
    title: "Что, если я не угадаю?",
    description: "Не расстраивайся! Мы периодически делаем новые опросы, ты можешь участвовать в них",
  },
  {
    id: 3,
    title: "Нужна ли регистрация на сайте?",
    description: "Нет, только почта для отправки бонуса",
  },
];
</script>

<template>
  <section class="h-full py-6 md:py-12 faq overflow-x-hidden overflow-y-auto" id="faq">
    <div class="container">
      <h2 class="text-center text-5xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
        FAQ
      </h2>

      <div class="faq-items grid grid-cols-1 gap-4 md:gap-8 max-w-screen-md mx-auto">
        <div
          v-for="item in data"
          :key="item.id"
          class="collapse collapse-arrow rounded-3xl overflow-hidden transition-all duration-500"
          :class="{
            'glow-white': item.id === 1,
            'glow-red': item.id === 2,
            'glow-blue': item.id === 3,
          }"
        >
          <!-- Главное: checked только у первого -->
          <input
            type="radio"
            name="faq-accordion"
            :id="`faq-${item.id}`"
            :checked="item.id === 1"
          />

          <label
            :for="`faq-${item.id}`"
            class="collapse-title text-xl font-bold cursor-pointer flex items-center justify-between py-4 md:py-6 px-8"
          >
            {{ item.title }}
          </label>

          <div class="collapse-content px-8 pb-0 text-white/60">
            <p class="text-lg leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.collapse {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* Активное состояние — только у открытого */
.collapse:has(input:checked) {
  transform: translateY(-6px) scale(1.02);
  z-index: 10;
  border-width: 2px;
}

/* Цвета только у активного пункта */
.glow-white:has(input:checked) {
  box-shadow: 
    0 0 20px 10px rgba(255, 255, 255, 0.6);
  border-color: rgba(255, 255, 255, 0.6) !important;
}

.glow-red:has(input:checked) {
  box-shadow: 
    0 0 20px 10px rgba(255, 0, 0, 0.6);
    border-color: rgba(255, 0, 0, 0.5) !important;
}

.glow-blue:has(input:checked) {
  box-shadow: 
    0 0 20px 10px rgba(0, 150, 255, .6);
    border-color: rgba(0, 150, 255, 0.5) !important;
}

/* Стрелка поворачивается */
.collapse input:checked + .collapse-title > span {
  transform: rotate(180deg);
}

/* Плавность */
.collapse-content {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>