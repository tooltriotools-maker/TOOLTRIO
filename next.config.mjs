/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build safety: TypeScript and ESLint errors MUST fail production builds.
  // Do not re-enable build-error suppression.

  compress:        true,
  poweredByHeader: false,
  trailingSlash:   false,
  reactStrictMode: true,
  swcMinify:       true,

  // Optimize package imports — reduces module resolution work on large deps
  // This is the main lever for cutting the 4+ second dev compile on first visit
  experimental: {
    optimizePackageImports: [
      'recharts',
      'd3-shape', 'd3-path', 'd3-scale', 'd3-array',
      'd3-interpolate', 'd3-color', 'd3-format',
      'd3-time', 'd3-time-format',
    ],
  },

  // Fix: Recharts blank charts in Next.js 14 App Router (SSR/ESM issue)
  transpilePackages: [
    'recharts', 'react-smooth',
    'd3-shape', 'd3-path', 'd3-scale', 'd3-array',
    'd3-interpolate', 'd3-color', 'd3-format',
    'd3-time', 'd3-time-format',
  ],

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [
      // ── Immutable cache for hashed static assets ────────────────────────────
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // ── Security + SEO headers on all routes ────────────────────────────────
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',       value: 'nosniff' },
          { key: 'X-Frame-Options',               value: 'DENY' },
          { key: 'Referrer-Policy',               value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',            value: 'camera=(), microphone=(), geolocation=()' },
          // HSTS — tells browsers to always use HTTPS (Google trust signal)
          { key: 'Strict-Transport-Security',     value: 'max-age=63072000; includeSubDomains; preload' },
          // Prevent MIME sniffing-based XSS (also a Lighthouse/CWV signal)
          { key: 'Cross-Origin-Opener-Policy',    value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy',  value: 'same-origin' },
          // Basic browser-side hardening. Keep the policy compatible with Next.js,
          // Google Analytics, Google Fonts, Leaflet tiles, and the Census API.
          { key: 'Content-Security-Policy', value: [
            "default-src 'self'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
            "object-src 'none'",
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://cdnjs.cloudflare.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com data:",
            "img-src 'self' data: blob: https:",
            "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://geocoding.geo.census.gov https://tigerweb.geo.census.gov; frame-src 'self' https://maps.google.com https://www.google.com",
          ].join('; ') },
        ],
      },
      // ── Cache rendered HTML for 60s at CDN edge (improves TTFB / LCP) ──────
      {
        source: '/calculators/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=300' },
        ],
      },
      {
        source: '/zip/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=300' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // ── Canonical host: www → non-www (consolidates duplicate URL signals) ─────
      {
        source:      '/:path*',
        has:         [{ type: 'host', value: 'www.tooltrio.com' }],
        destination: 'https://tooltrio.com/:path*',
        permanent:   true,
      },
      // ── Canonical protocol: http → https ─────────────────────────────────────
      {
        source:      '/:path*',
        has:         [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://tooltrio.com/:path*',
        permanent:   true,
      },
      // ── Trailing slash removal (canonical URL enforcement) ───────────────────
      { source: '/calculators/fun/:path*/',     destination: '/calculators/fun/:path*',     permanent: true },
      { source: '/zip/:path*/',                 destination: '/zip/:path*',                  permanent: true },
      { source: '/zip/',                        destination: '/zip',                         permanent: true },
      { source: '/blog/:path*/',                destination: '/blog/:path*',                 permanent: true },
      { source: '/blog/',                       destination: '/blog',                        permanent: true },
      // ── Pregnancy duplicate fix ──────────────────────────────────────────────
    ]
  },
}

export default nextConfig
