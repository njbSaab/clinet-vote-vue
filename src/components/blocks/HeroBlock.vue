<script setup lang="ts">
import type { EventData } from "@/types/api";

// ЭТО ОБЯЗАТЕЛЬНО: defineProps + типы
const props = defineProps<{
  event: EventData | null;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}>();
</script>
<template>
  <section class="h-full py-6 md:pb-12 pt-[80px] hero overflow-x-hidden overflow-y-auto relative" id="hero">
    <div class="container">
      <div class="hero-wrapper flex flex-col items-center justify-center gap-6 md:gap-[25px] text-clip">
        <!-- Заголовок -->
        <div class="hero-title-wrapper title-wrapper text-center md:max-w-[779px]">
          <h1 class="hero-title title-text">Делай прогнозы и выигрывай призы</h1>
          <p
            class="hero-description display-none md:display-block title-text bg-decor-gradient w-[96%] md:w-fit mx-auto"
          >
            Выбери, как закончится матч — и мы отправим тебе бонус
          </p>
        </div>

        <!-- Декор -->
        <!-- <div class="card-decor card-decor--first"></div>
        <div class="card-decor card-decor--second"></div> -->

        <!-- Карточка матча (теперь отдельный компонент с декорами!) -->
        <div class="v-card w-full md:max-w-[450px] mx-auto" v-if="event?.typeEventId"
          v-auto-animate
          :to="{ name: 'vote', params: { typeEventId: event.typeEventId } }">
          <MatchCard :event="event" />
        </div>

        <!-- Если событие ещё не загрузилось — показываем заглушку -->
        <div v-else class="animate-pulse">
          <MatchCard :event="null" />
        </div>

        <!-- Таймер -->
        <div class="footer-wrapper flex flex-col gap-6">
          <div class="timer-group" v-auto-animate>
            <p class="text-white text-center">До события осталось:</p>
            <p
              class="text-3xl md:text-5xl text-white text-center font-bold bg-shadow-inset px-4 py-4"
            >
              <span
                class="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent"
              >
                {{ String(days).padStart(2, "0") }}
              </span>
              <span class="text-gray-400 mx-2">дней</span>
              <span
                class="bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent"
              >
                {{ String(hours).padStart(2, "0") }}
              </span>
              <span class="text-gray-400">:</span>
              <span
                class="bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent"
              >
                {{ String(minutes).padStart(2, "0") }}
              </span>
              <span class="text-gray-400">:</span>
              <span
                class="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent animate-pulse"
              >
                {{ String(seconds).padStart(2, "0") }}
              </span>
            </p>
            <!-- Если закончилось -->
            <div class="skeleton h-[80px] w-full" v-if="isExpired"></div>

          </div>
        </div>

        <button 
          v-if="event?.typeEventId"
          @click="$router.push({ name: 'vote', params: { typeEventId: event.typeEventId } })"
          class="btn btn-gradient-hover"
        >
          Сделать прогноз
        </button>
      </div>
    </div>
  </section>
  <div>
    
  </div>
</template>
<style scoped>
.hero {
  background-image: url(../../assets/images/main-pg/banner/banner-without.jpg);
  position: relative;
}
.card-decor {
  position: relative;
}
.card-primary {
  position: relative;
}
.card-decor--first {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/images/main-pg/banner/blue.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  top: 0px;
  left: -45%;
  animation: pulseScale 5s ease infinite alternate;
  z-index: 1;
}
.card-decor--second {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/images/main-pg/banner/red.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  top: 0px;
  right: -45%;
  animation: pulseScale 5s ease infinite alternate;
  z-index: 1;
  animation-delay: 2.5s;
}
.mebmer img {
  width: 150px;
  height: 150px;
  /* object-fit: cover; */
  /* border-radius: 50%; */
}
.result img {
  width: 100px;
  height: 100px;
}
.card-wrapper {
  /* border: 2px solid; */
  border-radius: 25px;
  padding: 20px 10px;
  backdrop-filter: blur(7px);
  position: relative;
  z-index: 0;
  background: linear-gradient(180deg, #00000049 -17.54%, #000000c0 114.47%);
  /* background: radial-gradient(
    ellipse at center,
    rgb(16, 13, 13) 0%,
    rgba(7, 7, 7, 0.609) 70%
  );*/
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.509);
}
.hero-description{
  display: block;
}
@media (max-width: 568px) {

  .hero-description {
    display: none;
  }
}
</style>
