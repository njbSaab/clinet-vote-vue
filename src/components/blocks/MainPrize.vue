<script setup lang="ts">
const props = defineProps<{
  event: EventData | null;
}>();
</script>
<template>
  <section class="h-full py-6 md:py-12 main-prize overflow-x-hidden overflow-y-auto" id="main-prize">
    <div class="container">
      <h2
        class="text-center text-5xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent"
      >
        Главный приз
      </h2>

      <div class="main-prize-items max-w-screen-md mx-auto my-6 md:my-12">
        <div class="main-prize-item glow-breath w-[90%] md:min-w-[400px] md:w-fit mx-auto">
          <h3
            class="text-6xl md:text-7xl lg:text-8xl text-center font-bold py-[20px] leading-tight"
          >
            {{ event?.grandPrize || "Выиграй главный приз!" }}
          </h3>
        </div>

        <p class="text-center text-4xl md:text-6xl text-white/70 mt-6 md:mt-12 pt-6">
          {{ event?.everyoneForPrize || "Каждый прогноз — это твой шанс" }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-prize-item {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(14px);
  border-radius: 36px;
  padding: 50px 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.03);
  transition: all 0.6s ease;
}

/* Главная анимация — три цвета по очереди, каждый плавно появляется и гаснет */
@keyframes colorBreath {
  /* Белый — появляется и гаснет */
  0% {
    box-shadow: 0 0 30px 10px rgba(255, 255, 255, 0.7),
      inset 0 0 40px rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.02);
  }
  16% {
    box-shadow: 0 0 50px 20px rgba(255, 255, 255, 0.9),
      inset 0 0 60px rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }
  33% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0), inset 0 0 20px rgba(255, 255, 255, 0);
    transform: scale(1);
  }

  /* Красный — появляется и гаснет */
  33%,
  50% {
    box-shadow: 0 0 20px rgba(255, 0, 0, 0), inset 0 0 20px rgba(255, 0, 0, 0);
  }
  50% {
    box-shadow: 0 0 55px 20px rgba(255, 0, 0, 0.85), inset 0 0 60px rgba(255, 0, 0, 0.2);
    border-color: rgba(255, 0, 0, 0.6);
    transform: scale(1.05);
  }
  66% {
    box-shadow: 0 0 20px rgba(255, 0, 0, 0), inset 0 0 20px rgba(255, 0, 0, 0);
    transform: scale(1);
  }

  /* Синий — появляется и гаснет */
  66%,
  83% {
    box-shadow: 0 0 20px rgba(0, 150, 255, 0), inset 0 0 20px rgba(0, 150, 255, 0);
  }
  83% {
    box-shadow: 0 0 60px 25px rgba(0, 150, 255, 0.95),
      inset 0 0 70px rgba(0, 150, 255, 0.3);
    border-color: rgba(0, 150, 255, 0.7);
    transform: scale(1.05);
  }
  100% {
    box-shadow: 0 0 20px rgba(0, 150, 255, 0), inset 0 0 20px rgba(0, 150, 255, 0);
    transform: scale(1);
  }
}
/* Запускаем */
.glow-breath {
  animation: colorBreath 15s ease-in-out infinite;
}
</style>
