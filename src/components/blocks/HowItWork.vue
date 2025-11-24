<script setup lang="ts">
import img1 from "@/assets/images/main-pg/how-it-work/1.png";
import img2 from "@/assets/images/main-pg/how-it-work/2.png";
import img3 from "@/assets/images/main-pg/how-it-work/3.png";

const data = [
  {
    id: 1,
    image: img1,
    title: "Выбираешь матч ",
    description: "– топовые события недели (футбол, баскетбол, теннис)",
  },
  {
    id: 2,
    image: img2,
    title: "Делаешь прогноз ",
    description: "– угадываешь счет или победителя.",
  },
  {
    id: 3,
    image: img3,
    title: "Получаешь бонус ",
    description: "– 500 баллов за участие + шанс выиграть приз за точный прогноз.",
  },
];
</script>
<template>
  <section class="h-full md:py-12 py-6 pb-[3.5rem] how-it-work overflow-x-hidden overflow-y-auto pt-0">
    <div class="container">
      <div class="text-center">
        <h2
          class="text-center text-[38px] md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent"
        >
          Как это работает
        </h2>
      </div>
      <div class="how-it-work-items grid grid-cols-1 gap-[30px] max-w-screen-md mx-auto">
        <div
          v-for="item in data"
          :key="item.id"
          class="item flex items-center px-4 py-8 rounded-[20px] bg-shadow-inset gap-[30px]"
          :class="`glow-step-${item.id}`"
        >
          <img :src="item.image" :alt="item.title" class="w-18 h-18 md:w-24 md:h-24 object-contain" />
          <div class="items-text w-full">
            <h3 class="item-title text-left text-xl font-bold">
              {{ item.id }} {{ item.title }}
            </h3>
            <p class="item-description text-left text-gray-300">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Базовая тень (всегда есть) */
.item {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

/* Анимация появления + свечение */
@keyframes glowWhite {
  0%,
  100% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 40px 8px rgba(255, 255, 255, 0.6);
    transform: scale(1.03);
  }
}

@keyframes glowRed {
  0%,
  100% {
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 45px 10px rgba(255, 0, 0, 0.6);
    transform: scale(1.04);
  }
}

@keyframes glowBlue {
  0%,
  100% {
    box-shadow: 0 0 15px rgba(0, 100, 255, 0.3);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 45px 12px rgba(0, 150, 255, 0.6);
    transform: scale(1.04);
  }
}

/* Последовательное свечение */
.glow-step-1 {
  animation: glowWhite 4s ease-in-out 0s infinite;
}

.glow-step-2 {
  animation: glowRed 4s ease-in-out 1.25s infinite;
}

.glow-step-3 {
  animation: glowBlue 4s ease-in-out 2.5s infinite;
}
</style>
