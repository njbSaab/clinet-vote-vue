<script setup lang="ts">
const props = defineProps<{
  event: EventData | null;
}>();
const isVisible = ref(false);
</script>
<template>
  <section class="h-full py-6 pb-10 md:py-12 main-prize overflow-x-hidden overflow-y-auto"  id="how-it-work">
    <div class="container">
      <h2
        class="text-center text-5xl font-bold mb-12 bg-gradient-to-r 
        from-blue-600 to-red-600 bg-clip-text text-transparent"
      >
        Главный приз
      </h2>

      <div class="main-prize-items max-w-screen-md mx-auto my-6 md:mt-12 mb-0" v-auto-animate>
        <div class="main-prize-item glow-breath w-[90%] md:min-w-[400px] md:w-fit mx-auto">
          <h3
            class="text-6xl md:text-7xl lg:text-8xl text-center font-bold py-[20px] leading-tight"
          >
            {{ event?.grandPrize || "Выиграй главный приз!" }}
          </h3>
        </div>

        <p class="text-center text-white/70 mt-6 md:mt-12 pt-6 cursor-pointer"
        @click="isVisible = !isVisible">
        <span v-auto-animate class="md:text-[38px] text-2xl"> Каждый прогноз — это твой шанс выиграть главны призы!
          <span v-show="!isVisible">👇</span>
          <span v-show="isVisible">👆</span>
        </span>
        <span>{{ event?.everyoneForPrize }}</span>
        <span class="present text-[130px] flex justify-center items-center pt-[0px] scale-anim" v-if="!isVisible">
          🎁
        </span>
        </p>
          <ul v-if="isVisible" class="text-lg md:text-xl text-white/70 bg-shadow-inset py-4 px-2 prize-list w-[90%] md:w-fit mx-auto md:p-[20px] mt-4 md:mt-[20px] md:pl-[60px] md:pr-[60px]"  v-auto-animate>
            <li class="md:ml-[-35px] text-3xl md:text-4xl bg-gradient-to-r 
        from-blue-500 to-red-500 bg-clip-text text-transparent pb-[10px]"> 📌 - Гланый приз {{ event?.grandPrize || "Первый приз" }}</li>
            <li class="text-2xl text-red-400"> 📌 - 20 баллов {{ event?.secondPrize || "Чашка" }}</li>
            <li class="text-2xl text-blue-400"> 📌 - 30 баллов {{ event?.secondPrize || "Футболка" }}</li>
            <li class="text-2xl"> 📌 - 50 баллов {{ event?.secondPrize || "Куртка" }}</li>
          </ul>
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
.prize-list{
    box-shadow: 0 0 30px 10px rgba(255, 255, 255, 0.7),
    inset 0 0 40px rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
}
/* Запускаем */
.glow-breath {
  animation: colorBreath 15s ease-in-out infinite;
}
</style>
