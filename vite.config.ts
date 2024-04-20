// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      manifest: {
        name: '',
        short_name: 'J&R Wedding App',
        description: 'wedding app for J&R',
        theme_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
      },
    }),
  ],
})