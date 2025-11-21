// src/plugins/index.js
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";

const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function registerPlugins(app: any) {
  app.use(pinia);
  app.use(router);
}