export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/investor/'], // Protecting internal routes
    },
    sitemap: 'https://artmanagro.com/sitemap.xml',
  }
}
