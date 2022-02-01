// https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build
module.exports = {
  globDirectory: 'dist',
  globPatterns: [
    '**/*.{html,js,css,png,svg,jpg,gif,json,woff2,ico,webmanifest,map}',
  ],
  swDest: 'public/service-worker.ts',
  swSrc: 'src/service-worker.ts',
}
