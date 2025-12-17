import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// All API calls go through the Gateway (port 8888)
// Gateway routes to microservices via Eureka discovery
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
