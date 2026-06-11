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
          // NOTE: Do NOT disallow /_next/ — search engines need access to
          // CSS/JS bundles under /_next/static/ for rendering and Core Web Vitals.
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
    sitemap: 'https://tooltrio.com/sitemap.xml'
  }
}
