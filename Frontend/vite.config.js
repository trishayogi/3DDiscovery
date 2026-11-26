import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['threeddiscovery-6.onrender.com'],
  },
  preview: {
    allowedHosts: [

      'threeddiscovery-frontend.onrender.com',
    ],
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173,
    strictPort: true,
  },
})
