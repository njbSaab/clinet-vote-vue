<!-- src/pages/Index.vue -->
<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useEventData } from "@/composables/useApi";
import { useCountdown } from "@/composables/useCountdown";

const siteUrl = "https://1xjet.jp/vote/9/";
const { event, load } = useEventData(siteUrl);

const endAt = computed(() => event.value?.endAt ?? null);
const countdown = useCountdown(endAt);

// Вытаскиваем значения для передачи в компонент
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

onMounted(() => load());
</script>

<template>
  <div class="bg-gradient-to-b from-black via-[#0a001f] to-black text-white">
  <Header />
  <HeroBlock
    :event="event"
    :days="timer.days"
    :hours="timer.hours"
    :minutes="timer.minutes"
    :seconds="timer.seconds"
    :is-expired="timer.expired"
  />
  <HowItWork />
  <AllOfMatches
    :event="event"
    :days="timer.days"
    :hours="timer.hours"
    :minutes="timer.minutes"
    :seconds="timer.seconds"
    :is-expired="timer.expired"
  />
  <MainPrize :event="event" />
  <FAQ />
  <Footer />
  </div>
</template>

<style lang="scss" scoped></style>
