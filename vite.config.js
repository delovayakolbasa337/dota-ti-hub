import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Конфигурация с относительным базовым путем для бесперебойной работы картинок на GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '' 
})
