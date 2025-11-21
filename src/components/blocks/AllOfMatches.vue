<!-- AllMatchesSlider.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap"; // ← работает из коробки!
import type { EventData } from "@/types/api";

const props = defineProps<{
  event?: EventData | null; // одно событие
  events?: EventData[]; // или массив
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  isExpired?: boolean;
}>();

// Создаём массив для куба (минимум 4 элемента, чтобы куб крутился красиво)
const displayEvents = ref<EventData[]>([]);
onMounted(() => {
  const source =
    props.events && props.events.length > 0
      ? props.events
      : props.event
      ? [props.event, props.event, props.event, props.event] // дублируем
      : [];
  // Заполняем минимум 4 карточки
  while (source.length < 4) {
    source.push(source[0] || null);
  }
  displayEvents.value = source.slice(0, 6); // максимум 6 граней
});

const currentIndex = ref(0);
let autoPlay: NodeJS.Timeout | null = null;

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % displayEvents.value.length;
  rotateCube();
};

const prev = () => {
  currentIndex.value =
    (currentIndex.value - 1 + displayEvents.value.length) % displayEvents.value.length;
  rotateCube();
};

const rotateCube = () => {
  const angle = currentIndex.value * -90;
  gsap.to(".cube", {
    rotationY: angle,
    duration: 1.2,
    ease: "back.out(1.7)", // ← работает в gsap@3!
  });
};

onMounted(() => {
  if (displayEvents.value.length > 0) {
    rotateCube();
    autoPlay = setInterval(next, 10000);
  }
});

onUnmounted(() => {
  if (autoPlay) clearInterval(autoPlay);
});
</script>

<template>
  <section class="all-of-matches py-6 md:py-12 relative overflow-hidden" id="all-of-matches">
    <div class="container">
      <h2 class="text-center text-white text-[38px] md:text-5xl font-bold mb-[40px] md:mb-16 text-transparent">
        Текущие события
      </h2>

      <div class="scene" v-if="displayEvents.length > 0">
        <div class="cube">
          <div
            v-for="(event, i) in displayEvents"
            :key="i"
            class="cube-face"
            :class="`face-${i + 1}`"
          >
            <MatchCard :event="event" />
          </div>
        </div>
      </div>
      <!-- Управление -->
      <!-- <div class="flex justify-center gap-12 mt-12">
        <button @click="prev" class="btn-control">←</button>
        <button @click="next" class="btn-control">→</button>
      </div> -->
      <!-- Точки -->
      <div class="flex justify-center gap-3 mt-12">
        <button
          v-for="(_, i) in displayEvents"
          :key="i"
          @click="
            currentIndex = i;
            rotateCube();
          "
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="currentIndex === i ? 'bg-white scale-150 shadow-glow' : 'bg-white/30'"
        />
      </div>

      <!-- Кнопка -->
      <div class="button-wrapp my-8 text-center">
        <button class="btn btn-gradient-hover mx-auto text-xl px-12 py-4">
          Сделать прогноз
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scene {
  width: 520px;
  height: 360px;
  margin: 0 auto;
  perspective: 1800px;
}
.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
}
.cube-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.4);
}
/* Положение граней */
.face-1 {
  transform: translateZ(260px);
}
.face-2 {
  transform: rotateY(90deg) translateZ(260px);
}
.face-3 {
  transform: rotateY(180deg) translateZ(260px);
}
.face-4 {
  transform: rotateY(270deg) translateZ(260px);
}
.face-5 {
  transform: rotateY(0deg) translateZ(-260px);
}
.face-6 {
  transform: rotateY(90deg) translateZ(-260px);
}
.btn-control {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  color: white;
  font-size: 32px;
  font-weight: bold;
  border: 3px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s;
}
.btn-control:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.15);
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.6);
}
.shadow-glow {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
}

@media screen and (max-width: 640px) {
  .scene {
    width: 90%;
    height: 350px;
  }
  
}
</style>
