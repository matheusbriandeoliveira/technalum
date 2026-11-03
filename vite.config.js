import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        main: resolve(root, 'index.html'),
        solutions: resolve(root, 'solucoes.html'),
        privacy: resolve(root, 'politica-de-privacidade.html'),
        terms: resolve(root, 'termos-de-uso.html'),
        cookies: resolve(root, 'politica-de-cookies.html'),
      },
    },
  },
})
