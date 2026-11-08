import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  base: './' // Заставляет Vite собирать пути относительно текущей папки, чтобы GitHub Pages всё увидел!
})
