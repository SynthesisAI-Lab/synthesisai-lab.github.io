import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Set to your repository name for GitHub Pages. Example: '/SynthesisAI-Lab/'
  base: '/',
  plugins: [react(), tailwindcss()],
})
