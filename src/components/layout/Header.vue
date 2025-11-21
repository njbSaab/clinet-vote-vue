<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import img1 from "@/assets/images/main-pg/social/1.svg";
import img2 from "@/assets/images/main-pg/social/2.svg";
import img3 from "@/assets/images/main-pg/social/3.svg";
// import img4 from "@/assets/images/main-pg/social/4.svg";
import img5 from "@/assets/images/main-pg/social/5.svg";
import img6 from "@/assets/images/main-pg/social/6.svg";
import { useRoute } from "vue-router";

const route = useRoute();
const activeSection = ref("hero");
const isMobile = ref(false);
// Включаем логику скролла ТОЛЬКО на главной странице
const isHomePage = ref(route.path === "/");
const updateMedia = () => {
  isMobile.value = window.innerWidth <= 768;
};
const sections = [
  { id: "hero", label: "Main page", hover: "hover-white" },
  { id: "how-it-work", label: "How it works", hover: "hover-red" },
  { id: "all-of-matches", label: "All of votes", hover: "hover-blue" },
  { id: "faq", label: "FAQ", hover: "hover-white" },
];
const socials = [
  { id: 1, link: "https://vietget.xyz/vietget?link=2", icon: img1, title: "tiktok" },
  { id: 2, link: "https://vietget.xyz/vietget?link=1", icon: img2, title: "youtube" },
  { id: 3, link: "https://vietget.xyz/vietget?link=4", icon: img3, title: "instagram" },
//   { id: 4, link: "https://vietget.xyz/vietget?link=4", icon: img4, title: "twitter" },
  { id: 5, link: "https://vietget.xyz/vietget?link=3", icon: img5, title: "facebook" },
  { id: 6, link: "https://vietget.xyz/vietget?link=5", icon: img6, title: "telegram" },
];
watch(
  () => route.path,
  (newPath: string) => {
    isHomePage.value = newPath === "/";
  }
);
// Плавный скролл
const scrollToSection = (id: string) => {
  // Работаем только если мы на главной
  if (!isHomePage.value) return;

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    activeSection.value = id;
  }
  if (isMobile.value) {
    const checkbox = document.getElementById("my-drawer-5") as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  }
};

// Отслеживание скролла
const handleScroll = () => {
  if (!isHomePage.value) return; // ← КЛЮЧЕВАЯ ПРОВЕРКА

  const scrollPosition = window.scrollY + 150;
  for (const section of sections) {
    const el = document.getElementById(section.id);
    if (el) {
      const { offsetTop, offsetHeight } = el;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.id;
        break;
      }
    }
  }
};
onMounted(() => {
  if (isHomePage.value) {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    window.addEventListener("resize", updateMedia);
    updateMedia();
  }
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", updateMedia);
});
</script>

<template>
  <header class="header fixed top-0 left-0 right-0 z-[100]">
    <div class="container">
      <div class="drawer drawer-end">
        <input id="my-drawer-5" type="checkbox" class="drawer-toggle" />
        
        <div class="drawer-content flex justify-between w-full max-w-[779px] px-4 py-4 mx-auto backdrop-blur-lg rounded-[30px]">
            <img src="https://i.ibb.co/Qvd3RYXX/5.png" alt="">
            <label for="my-drawer-5" class="btn btn-circle swap swap-rotate bg-white/10 backdrop-blur hover:bg-white/20">
                <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
                <svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                <polygon points="368 192 256 304 144 192 114.67 221.33 256 362.67 397.33 221.33 368 192" />
                </svg>
            </label>
        </div>

        <div class="drawer-side z-[200]">
          <label for="my-drawer-5" aria-label="close sidebar" class="drawer-overlay"></label>
          
          <ul class="menu bg-shadow-inset backdrop-blur-lg min-h-full w-[90%] md:w-[400px] p-8 space-y-4">
            <li class="flex login-items items-center justify-between flex-row">
                <img src="https://i.ibb.co/Qvd3RYXX/5.png" class="p-0" alt="">
                <router-link to="/login" class="no-underline" v-if="isHomePage">
                <span class="text-lg p-2 gap-0 hover-gradient login-btn rounded-[25px] flex items-center">Login 
                    <svg class="p-0" xmlns="http://www.w3.org/2000/svg" width="55px" height="55px" viewBox="0 0 24 24"><!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE --><path fill="currentColor" d="M9 2h9c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-2h2v2h9V4H9v2H7V4c0-1.1.9-2 2-2" /><path fill="currentColor" d="M10.09 15.59L11.5 17l5-5l-5-5l-1.41 1.41L12.67 11H3v2h9.67z" /></svg>
                </span>
                </router-link>
                <router-link to="/" class="no-underline" v-else>
                <span class="text-lg p-2 gap-0 hover-gradient login-btn rounded-[25px] flex items-center">Back to 
                    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 24 24"><!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M5 19V9.452l-2.396 1.779l-.598-.787L12 3l10.02 7.439l-.604.792L12 4.25L6 8.716V18h2.673v1zm9.637 2l-3.533-3.538l.708-.714l2.825 2.825l5.675-5.65l.688.714z"/></svg>
                </span>
                </router-link>
            </li>
            <li v-for="section in sections" :key="section.id" class="w-full">
              <!-- Если на главной — плавный скролл -->
              <a
                v-if="isHomePage"
                @click.prevent="scrollToSection(section.id)"
                :class="[
                  'rounded-[35px] text-center block text-xl font-medium py-[15px] md:py-5 transition-all duration-300 cursor-pointer',
                  section.hover,
                  activeSection === section.id ? 'active' : ''
                ]"
                class="nav-link"
              >
                {{ section.label }}
              </a>

              <!-- Если НЕ на главной — переходим на главную и закрываем меню -->
              <router-link
                v-else
                to="/"
                class="rounded-[35px] text-center block text-xl font-medium py-[15px] md:py-5 transition-all duration-300 hover-gradient"
                @click="() => {
                  const checkbox = document.getElementById('my-drawer-5') as HTMLInputElement;
                  if (checkbox) checkbox.checked = false;
                }"
              >
                {{ section.label }}
              </router-link>
            </li>

            <!-- Соцсети -->
            <div class="absolute bottom-8 left-0 right-0 px-8">
              <ul class="flex items-center justify-center gap-[8px] mb-6">
                <li v-for="item in socials" :key="item.id">
                  <a
                    :href="item.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-link"
                  >
                    <img :src="item.icon" :alt="item.title" class="w-10 h-10" />
                  </a>
                </li>
              </ul>
              <span class="block text-center text-sm text-white/60">
                © 2025 site. Все права защищены
              </span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>

.login-items img:hover, :where(.menu li:not(.menu-title, .disabled) > *:not(ul, details, .menu-title)):not(.active, .btn):hover, :where(.menu li:not(.menu-title, .disabled) > details > summary:not(.menu-title)):not(.active, .btn):hover {
			background-color: transparent !important;
}
.hover-gradient{
  transition: all .3s ease-in;
}
.hover-gradient:hover{
    background: linear-gradient(90deg, #0011FF 0%, #FF0000 100%);
    transition: all .3s ease-in;
}

.bg-shadow-inset {
	box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2);
	border-radius: 30px 0 0 30px;
	background: linear-gradient(180deg, #00000071 -17.54%, #000000cf 114.47%);
    backdrop-filter: blur(15px);    
}
.hover-white{
    /* border: 2px solid transparent !important; */
}
.login-btn:active{
    scale: .9;
    transition: all .3s ease-in;
}
/* Hover эффекты */
.hover-red:hover,
.nav-link:hover {
  background: rgba(255, 0, 0, 0.15) !important;
  /* border: 2px solid rgba(255, 0, 0, 0.5) !important; */
}
.drawer-toggle:checked ~ .drawer-side > .drawer-overlay {
    background-color: transparent !important;
}
.hover-blue:hover {
  background: rgba(0, 100, 255, 0.15) !important;
  /* border: 2px solid rgba(0, 150, 255, 0.6) !important; */
}

.hover-white:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  /* border: 2px solid rgba(255, 255, 255, 0.6) !important; */
}
/* .menu li a{
    border: 1px solid transparent !important;
} */
/* Активный пункт */
.active {
    background: linear-gradient(90deg, #0011ffc0 0%, #ff0000bd 100%);
    /* border: 2px solid white !important; */
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
}

/* Соцсети */
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  padding: 8px;
}

.social-link:hover {
  transform: translateY(-6px) scale(1.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  background: linear-gradient(90deg, #0011ffc0 0%, #ff0000bd 100%);
  transition: all .3s ease-in;
}

@media (max-width: 768px) {
    
}
</style>