import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'

import mkcert from 'vite-plugin-mkcert'

import twConfig from './tailwind.config.js'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    autoImport({
      imports: ['vue', 'pinia', '@vueuse/core'],
    }),
    mkcert(),
  ],

  css: {
    postcss: {
      plugins: [tailwind(twConfig), autoprefixer()],
    },
  },
})
