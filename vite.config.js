// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({

  root: 'src', // говорит Vite: "стартовая папка — src"
  base: '/My-website5',   // путь к ресурсам
  build: {
    outDir: '../dist', // куда собирать проект
    assetsDir: 'assets'
  },
  server: {
    open: true // автоматически открывает браузер
  }
});