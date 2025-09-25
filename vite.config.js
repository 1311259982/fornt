import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // --- ADD THIS BLOCK --- 
  server: {
    proxy: {
      // String shorthand: http://localhost:5173/api -> http://localhost:8080/api
      '/api': {
        target: 'http://localhost:8080', // Your backend server
        changeOrigin: true, // Needed for virtual hosted sites
        // No rewrite needed because your backend endpoints are already prefixed with /api
      }
    }
  }
  // --- END OF BLOCK ---
})
