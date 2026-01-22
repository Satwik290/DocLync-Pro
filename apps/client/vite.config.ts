import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Use the Vite-specific plugin
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add this to the plugins array
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api/auth': {
        target: 'http://localhost:4001',
        changeOrigin: true,
      },
      '/api/consultation': {
        target: 'http://localhost:4002',
        changeOrigin: true,
      },
      '/api/chat': {
        target: 'http://localhost:4003',
        changeOrigin: true,
      },
    },
  },
})