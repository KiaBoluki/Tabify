import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api/usd': {
        target: 'https://alanchand.com',
        changeOrigin: true,
        rewrite: () => '/currencies-price/usd',
      },
      '/api/quote': {
        target: 'https://dummyjson.com',
        changeOrigin: true,
        rewrite: () => '/quotes/random',
      },
    },
  },
})