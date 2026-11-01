import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Served from the evercgi.com custom domain root (see public/CNAME).
  base: '/',
  plugins: [react()],
})
