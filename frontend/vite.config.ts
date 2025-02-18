import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    allowedHosts: ['weather-app.tony219y.com'], // เพิ่มโฮสต์ที่ต้องการ
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:{
    proxy:{
      '/api': 'https://api-weather-app.tony219y.com/'
    }
  }
});
