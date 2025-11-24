<script setup lang="ts">
import { onMounted } from 'vue';
import { useMainEvent, useCarouselEvents } from '@/composables/useApi';
import { useCountdown } from '@/composables/useCountdown';

const { event: mainEvent, load: loadMain } = useMainEvent();
const { events: carouselEvents, load: loadCarousel } = useCarouselEvents();

onMounted(() => {
  loadMain();
  loadCarousel();
});
watch(
  () => mainEvent.value,
  (newEvent: any) => {
    if (newEvent) {
      console.log('Главное событие загружено:', newEvent);
    }
  }
);

// Таймер — только когда есть votingEndsAt
const countdown = useCountdown(
  computed(() => mainEvent.value?.votingEndsAt || null)
);

const timer = computed(() => {
  const t = countdown.timeLeft.value;
  if (!t) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: t.days,
    hours: t.hours,
    minutes: t.minutes,
    seconds: t.seconds,
    expired: t.expired,
  };
});
</script>

<template>
  <div class="bg-gradient-to-b from-black via-[#0a001f] to-black text-white min-h-screen">
    <Header />
    <HeroBlock
      :event="mainEvent"
      :days="timer.days"
      :hours="timer.hours"
      :minutes="timer.minutes"
      :seconds="timer.seconds"
      :is-expired="timer.expired"
    />
    <MainPrize :event="mainEvent" />
    <HowItWork />
    <AllOfMatches :events="carouselEvents" />
    <FAQ />
    <Footer />
  </div>
</template>