import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
// import fs from 'fs';
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      manifest: {
        name: 'moamoa',
        short_name: 'moamoa',
        description: 'moamoa Progressive Web App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/images/Moamoa-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '/images/Moamoa-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/images/Moamoa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/Moamoa-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/images/Moamoa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@assets': '/src/assets',
      '@icons': '/src/assets/icons',
      '@common': '/src/common',
    },
  },
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.pem')),
  //   },
  // },
});
