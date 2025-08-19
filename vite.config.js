// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: "/My-website4",
  root: 'src', // говорит Vite: "стартовая папка — src"
  base: '/',   // путь к ресурсам
  build: {
    outDir: '../dist', // куда собирать проект
    assetsDir: 'assets'
  },
  server: {
    open: true // автоматически открывает браузер
  }
});