// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/public/index.vue'
import RegisterPage from '@/pages/public/RegisterPage.vue'


const routes = [
  { path: '/', component: HomePage },
  { path: '/login', name: 'login', component: RegisterPage },

]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})