import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/v1":"http://localhost:8080/api/",
      "/Client":"http://localhost:8080/",
      "/contacts":"http://localhost:8080/api/v1/"
    }
  }
})
