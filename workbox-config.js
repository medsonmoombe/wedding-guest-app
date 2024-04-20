module.exports = {
    globDirectory: 'build/',
    globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,json}'],
    swDest: 'build/sw.js',
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|gif|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 20,
          },
        },
      },
    ],
  };
  