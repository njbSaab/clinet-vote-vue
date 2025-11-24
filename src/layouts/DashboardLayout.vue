<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-[#0a001f] to-black text-white">
    <main class="container mx-auto px-4 pt-24 pb-20">
      <div class="max-w-4xl mx-auto">
        <!-- Заголовок -->
        <h1 class="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
          Личный кабинет
        </h1>

        <!-- Табы -->
        <div class="flex justify-center gap-8 mb-12 border-b border-white/20 w-fit mx-auto">
        <router-link
            to="/"
            class="pb-4 px-6 text-xl font-medium transition relative"
            :class="{
              'text-white border-b-4 border-blue-500': !$route.path.includes('/cabinet/'),
              'text-white/60 hover:text-white': $route.path.includes('/cabinet/')
            }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ --><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2s2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715S22 9.915 22 12.203v1.522c0 3.9 0 5.851-1.172 7.063S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212S2 17.626 2 13.725z"/><path stroke-linecap="round" d="M12 15v3"/></g></svg>
    <span v-if="$route.path.includes('profile')" class="absolute bottom-0 left-0 w-full h-1 bg-white"></span>
          </router-link>

          <router-link
            to="/cabinet/details"
            class="pb-4 px-6 text-xl font-medium transition relative"
            :class="{
              'text-white border-b-4 border-blue-500': $route.path.includes('/details'),
              'text-white/60 hover:text-white': !$route.path.includes('/details')
            }"
          >
            Профиль
            <span v-if="$route.path.includes('profile')" class="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></span>
          </router-link>

          <router-link
            to="/cabinet/events"
            class="pb-4 px-6 text-xl font-medium transition"
            :class="{
              'text-white border-b-4 border-red-500': $route.path.includes('events'),
              'text-white/60 hover:text-white': !$route.path.includes('events')
            }"
          >
            Мои голоса
          </router-link>
        </div>

        <!-- Контент -->
        <router-view />
      </div>
    </main>

    <Footer />
  </div>
</template>
