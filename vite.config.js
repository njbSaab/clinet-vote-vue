import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { fileURLToPath, URL } from 'node:url'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    vue({ reactivityTransform: true }),

    Icons({ compiler: 'vue3', autoInstall: true }),

    Components({
      dirs: ['src/components', 'src/components/ui'],
      dts: 'src/components.d.ts',
    }),

    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  optimizeDeps: {
    exclude: ['fsevents'],
  },

  server: { port: 3333, open: true },
})