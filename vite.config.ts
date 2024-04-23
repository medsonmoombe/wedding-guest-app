// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })


// import { defineConfig } from 'vite'
// import { VitePWA } from 'vite-plugin-pwa'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'prompt',
//       manifest: {
//         name: '',
//         short_name: 'J&R Wedding App',
//         description: 'wedding app for J&R',
//         theme_color: '#ffffff',
//         display: 'standalone',
//         orientation: 'portrait',
//         start_url: '/',
//       },
//     }),
//   ],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Change to 'autoUpdate' for better user experience
    //    // add this to cache all the imports
    //    workbox: {
    //     globPatterns: ["**/*"],
    // },
    // // add this to cache all the
    // // static assets in the public folder
    // includeAssets: [
    //     "**/*",
    // ],
      manifest: {
        name: 'J&R Wedding App',
        short_name: 'Nosso Dia',
        description: 'Wedding app for J&R',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/J&R_icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/J&R_icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});