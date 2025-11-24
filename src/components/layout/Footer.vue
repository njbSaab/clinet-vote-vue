<script setup lang="ts">
import img1 from "@/assets/images/main-pg/social/1.svg";
import img2 from "@/assets/images/main-pg/social/2.svg";
import img3 from "@/assets/images/main-pg/social/3.svg";
// import img4 from "@/assets/images/main-pg/social/4.svg";
import img5 from "@/assets/images/main-pg/social/5.svg";
import img6 from "@/assets/images/main-pg/social/6.svg";

const data = [
  { id: 1, link: "https://vietget.xyz/vietget?link=2", icon: img1, title: "tiktok" },
  { id: 2, link: "https://vietget.xyz/vietget?link=1", icon: img2, title: "youtube" },
  { id: 3, link: "https://vietget.xyz/vietget?link=4", icon: img3, title: "instagram" },
//   { id: 4, link: "https://vietget.xyz/vietget?link=4", icon: img4, title: "twitter" },
  { id: 5, link: "https://vietget.xyz/vietget?link=3", icon: img5, title: "facebook" },
  { id: 6, link: "https://vietget.xyz/vietget?link=5", icon: img6, title: "telegram" },
];
</script>

<template>
  <footer class="h-full py-6 pb-4 md:pt-12 footer overflow-x-hidden overflow-y-auto bg-gradient-main container md:max-w-[779px]">
    <div class="container">
      <div class="footer-social-items max-w-screen-md mx-auto">
        <ul class="flex items-center justify-center gap-[8px] md:gap-8 flex-wrap" v-auto-animate>
          <li v-for="item in data" :key="item.id">
            <a 
              :id="item.title" 
              :href="item.link" 
              target="_blank" 
              rel="noopener noreferrer"
              class="social-link w-[50px] h-[50px] md:w-[64px] md:h-[64px]"
            >
              <img :src="item.icon" :alt="`social-${item.title}`" class="w-8 h-8 md:w-12 md:h-12" />
            </a>
          </li>
        </ul>
        <span class="flex items-center mx-auto w-fit text-sm text-white/70 mt-4 md:mt-8">
          © 2025 site. Все права защищены
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-radius: 30px;
  /* margin-bottom: 10px; */
  width: calc(100% - 6rem);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 768px) {
  .footer {
    width: calc(100% - 1rem);
  }
}
</style>
