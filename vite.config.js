import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        introduce: resolve(__dirname, 'pages/introduce.html'),
        permissions: resolve(__dirname, 'pages/permissions.html'),
        image: resolve(__dirname, 'pages/image.html'),
        selfie: resolve(__dirname, 'pages/selfie.html'),
        demographics: resolve(__dirname, 'pages/demographics.html'),
        city: resolve(__dirname, 'pages/city.html'),
        location: resolve(__dirname, 'pages/location.html'),
        region: resolve(__dirname, 'pages/region.html'),
        processing: resolve(__dirname, 'pages/processing.html'),
        'skin-analysis': resolve(__dirname, 'pages/skin-analysis.html'),
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@js': resolve(__dirname, './js'),
      '@css': resolve(__dirname, './css'),
      '@pages': resolve(__dirname, './pages'),
    }
  }
})

