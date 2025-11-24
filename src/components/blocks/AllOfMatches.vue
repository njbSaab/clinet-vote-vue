<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import type { PublicEvent } from "@/types/api";
import { computed } from 'vue'

const props = defineProps<{
  events: PublicEvent[];
}>();

const currentEvent = computed(() => displayEvents.value[currentIndex.value])
const displayEvents = ref<PublicEvent[]>([]);
const currentIndex = ref(0);
let autoPlay: NodeJS.Timeout | null = null;
// Реактивно следим за events
watch(
  () => props.events,
  async (newEvents) => {
    if (!newEvents || newEvents.length === 0) {
      displayEvents.value = [];
      stopAutoPlay();
      return;
    }

    let source = [...newEvents];

    // Дублируем до 4
    while (source.length < 4 && source.length > 0) {
      source = [...source, ...source];
    }

    displayEvents.value = source.slice(0, 4);

    // Ждём, пока DOM обновится, и только потом анимируем
    await nextTick();
    currentIndex.value = 0;
    rotateCube();
    startAutoPlay();
  },
  { immediate: true }
);
const startAutoPlay = () => {
  stopAutoPlay();
  if (displayEvents.value.length > 0) {
    autoPlay = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % 4;
      rotateCube();
    }, 8000);
  }
};
const stopAutoPlay = () => {
  if (autoPlay) {
    clearInterval(autoPlay);
    autoPlay = null;
  }
};
const rotateCube = () => {
  if (!displayEvents.value.length) return;
  const angle = currentIndex.value * -90;
  gsap.to(".cube", {
    rotationY: angle,
    duration: 1.4,
    ease: "back.out(1.4)",
  });
};

onUnmounted(() => stopAutoPlay());
</script>

<template>
  <section class="h-full md:py-16 pb-0" id="all-of-matches">
    <div class="container mx-auto text-center">
      <h2 class="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r
       from-blue-600 to-red-600 bg-clip-text text-transparent">
        Текущие события
      </h2>

      <div v-if="displayEvents.length === 0" class="text-xl text-gray-400 py-10">
          <div class="skeleton rounded-[30px] h-[300px] w-[100%]"></div>
      </div>
      <div v-else class="scene">
        <div class="cube">
          <div
            v-for="(event, i) in displayEvents"
            :key="event.id"
            class="cube-face"
            :class="`face-${i + 1}`"
          >
            <router-link
              :to="{ name: 'vote', params: { typeEventId: event.typeEventId } }"
              class="block w-full h-full"
            >
              <MatchCard :event="event" />
            </router-link>
          </div>
        </div>
      </div>

      <!-- Точки — только 4 -->
      <div class="flex justify-center gap-4 mt-12">
        <button
          v-for="n in 4"
          :key="n"
          @click="() => { currentIndex = n - 1; rotateCube(); }"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="currentIndex === n - 1 ? 'bg-white scale-150 shadow-glow' : 'bg-white/40'"
        />
      </div>
            <!-- Кнопка -->
      <div class="button-wrapp my-8 text-center">
        <button 
          v-if="event?.typeEventId"
          @click="$router.push({ name: 'vote', params: { typeEventId: event.typeEventId } })"
          class="btn btn-gradient-hover"
        >
          Сделать прогноз
        </button>
      </div>

      <!-- Кнопка снизу — ведёт на текущее событие -->
      <div class="button-wrapp my-8 text-center">
        <button 
          v-if="currentEvent"
          @click="$router.push({ name: 'vote', params: { typeEventId: currentEvent.typeEventId } })"
          class="btn btn-gradient-hover text-xl px-12 py-4"
        >
          Сделать прогноз
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scene {
  width: 520px;
  height: 420px;
  margin: 0 auto;
  perspective: 2000px;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
}

/* Только 4 грани — как настоящий куб! */
.face-1 { transform: translateZ(260px); }
.face-2 { transform: rotateY(90deg) translateZ(260px); }
.face-3 { transform: rotateY(180deg) translateZ(260px); }
.face-4 { transform: rotateY(270deg) translateZ(260px); }

.cube-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
  background: rgba(0, 0, 0, 0.5);
}

.shadow-glow {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
}
@media screen and (max-width: 640px) {
  .scene {
    width: 86%;
    height: 285px;
  }
  
}
</style>