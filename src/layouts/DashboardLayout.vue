<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-[#0a001f] to-black text-white">
    <main class="container mx-auto px-4 pt-24 pb-20">
      <div class="max-w-4xl mx-auto">
        <!-- Заголовок -->
        <h1 class="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
          Личный кабинет
        </h1>

    

        <!-- Контент -->
        <router-view />
      </div>
    </main>

    <Footer />
  </div>
</template>
