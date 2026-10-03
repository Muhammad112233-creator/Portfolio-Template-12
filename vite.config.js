import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base: './'` keeps every asset path relative, so the built site works from
// any location: GitHub Pages project pages, a sub-folder, or even file://
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // Allow the sandbox preview host (and any host when self-hosting behind a proxy)
  server: { host: true, allowedHosts: true },
  preview: { host: true, allowedHosts: true },
  build: {
    // The static, drag-and-drop ready build lands in `site/`
    outDir: 'site',
    emptyOutDir: true,
  },
})
