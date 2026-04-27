/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix: Recharts blank charts in Next.js 14 App Router (SSR/ESM issue)
  transpilePackages: ['recharts', 'react-smooth', 'd3-shape', 'd3-path', 'd3-scale', 'd3-array', 'd3-interpolate', 'd3-color', 'd3-format', 'd3-time', 'd3-time-format'],
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
  },

  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // Remove trailing slashes with 301 permanent
      { source: '/calculators/finance/:path*/', destination: '/calculators/finance/:path*', permanent: true },
      { source: '/calculators/health/:path*/', destination: '/calculators/health/:path*', permanent: true },
      { source: '/calculators/dev/:path*/', destination: '/calculators/dev/:path*', permanent: true },
      { source: '/calculators/fun/:path*/', destination: '/calculators/fun/:path*', permanent: true },
      { source: '/calculators/', destination: '/calculators/finance', permanent: true },
      { source: '/calculators', destination: '/calculators/finance', permanent: true },
      { source: '/blog/:path*/', destination: '/blog/:path*', permanent: true },
      { source: '/blog/', destination: '/blog', permanent: true },
      { source: '/commodities/:path*/', destination: '/commodities/:path*', permanent: true },
      { source: '/commodities/', destination: '/commodities', permanent: true },
      { source: '/calculators/health/pregnancy-due-date-calculator', destination: '/calculators/health/pregnancy-calculator', permanent: true },
      { source: '/calculators/health/pregnancy-due-date-calculator/', destination: '/calculators/health/pregnancy-calculator', permanent: true },
    ]
  },
}

export default nextConfig
