import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '' // Оставляем пустые кавычки для генерации относительных путей сборки
})
