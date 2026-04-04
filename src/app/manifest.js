export default function manifest() {
  return {
    name: 'Artman Agro',
    short_name: 'Artman Agro',
    description: 'Artman Agro App',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4D8C1E',
    icons: [
      {
        src: '/logo6.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo6.png',
        sizes: '512x512',
        type: 'image/png',
      }
    ],
  };
}
