import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Настройка базового пути для корректного поиска ассетов в репозитории dota-ti-hub
export default defineConfig({
  plugins: [react()],
  base: '/dota-ti-hub/'
})
