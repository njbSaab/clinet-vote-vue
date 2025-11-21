<!-- src/components/blocks/MatchCard.vue -->
<script setup lang="ts">
import type { EventData } from "@/types/api";

const props = defineProps<{
  event: EventData | null;
}>();
</script>

<template>
  <div class="card-wrapper md:max-w-[450px] md:w-full w-[100%] mx-auto">
    <!-- Декоративные PNG — теперь внутри компонента! -->
    <!-- <div class="card-decor card-decor--first"></div>
    <div class="card-decor card-decor--second"></div> -->

    <div class="card-primary">
      <div class="card-primary-inner flex flex-col items-center justify-center gap-lg">
        <div class="card-primary-text flex-col-center">
          <h5
            class="card-primary-title bg-gradient-to-r from-blue-300 via-white to-red-300 bg-clip-text text-transparent text-[50px] font-bold text-center leading-[1.1]"
          >
            {{ event?.name || "Событие завершилось..." }}
          </h5>
          <p class="card-primary-text text-center text-xl text-white">
            {{ event?.type || "ожидайте новое голосование" }}
            <span class="card-primary-subtext block text-center">
              {{
                event?.endAt
                  ? new Date(event.endAt).toLocaleDateString("ru-RU")
                  : "ожидайте новое голосование"
              }}
            </span>
          </p>
        </div>

        <div class="card-primary-image flex items-center justify-center gap-xl">
          <div class="mebmer flex flex-col items-center justify-center gap-2">
            <picture>
              <img
                :src="event?.imageMemberA"
                :alt="event?.memberA"
                class="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </picture>
            <p class="text-[22px] text-white">{{ event?.memberA }}</p>
          </div>

          <div class="result px-4">
            <p v-if="event?.result" class="text-5xl text-nowrap font-bold text-white">
              {{ event?.result }}
            </p>
            <img
              v-else
              src="https://vietget.online/vote/2/img/card-primary/VS.svg"
              alt="VS"
              class="w-24 h-24"
            />
          </div>

          <div class="mebmer flex flex-col items-center justify-center gap-2">
            <picture>
              <img
                :src="event?.imageMemberB"
                :alt="event?.memberB"
                class="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </picture>
            <p class="text-[22px] text-white">{{ event?.memberB }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .card-decor--first {
  position: absolute;
  width: 140%;
  height: 140%;
  background: url("@/assets/images/main-pg/banner/blue.png") center/contain no-repeat;
  top: -20%;
  left: -45%;
  animation: pulseScale 6s ease-in-out infinite alternate;
  z-index: 1;
  pointer-events: none;
} */
/* .card-decor--second {
  position: absolute;
  width: 140%;
  height: 140%;
  background: url("@/assets/images/main-pg/banner/red.png") center/contain no-repeat;
  top: -20%;
  right: -45%;
  animation: pulseScale 6s ease-in-out infinite alternate;
  animation-delay: 3s;
  z-index: 1;
  pointer-events: none;
} */

@keyframes pulseScale {
  0% {
    transform: scale(0.9);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.1);
    opacity: 1;
  }
}

.card-wrapper {
  position: relative;
  border-radius: 25px;
  padding: 30px 15px;
  backdrop-filter: blur(10px);
  background: linear-gradient(180deg, #00000049 -17.54%, #000000c0 114.47%);
  box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.4);
  overflow: hidden;
}
</style>
