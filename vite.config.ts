import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig((/*{ command, mode }*/) => {
  return {
  plugins: [react()],
  base: "/store/",
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 80,
  }
}});
