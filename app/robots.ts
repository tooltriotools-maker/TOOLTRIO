import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/cdn-cgi/',
          '/_next/',
          '/static/',
        ],
      },
      // Prevent crawl waste on low-value query params
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/cdn-cgi/',
        ],
      },
    ],
    sitemap: 'https://tooltrio.com/sitemap.xml',
    host: 'https://tooltrio.com',
  }
}
