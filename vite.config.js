import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: '/',
  optimizeDeps: {
    exclude: ['maplibre-gl'],
  },
})
