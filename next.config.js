/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:  { ignoreBuildErrors: true },
  eslint:      { ignoreDuringBuilds: true },

  compress:        true,
  poweredByHeader: false,
  trailingSlash:   false,
  reactStrictMode: false,
  swcMinify:       true,

  experimental: {
    webpackBuildWorker:              false,
    serverComponentsExternalPackages: ['fs', 'path'],
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      '@/components/ui',
    ],
  },

  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, path: false, os: false, crypto: false,
      }
    }

    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...(config.optimization.splitChunks || {}),
          cacheGroups: {
            ...(config.optimization.splitChunks?.cacheGroups || {}),
            recharts: {
              test: /[\\/]node_modules[\\/](recharts|d3-[a-z-]+|victory-vendor)[\\/]/,
              name: 'recharts-bundle',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            lucide: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: 'lucide-bundle',
              chunks: 'all',
              priority: 25,
              enforce: true,
            },
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 3,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
        ...(dev ? { concatenateModules: false } : {}),
      }
    }

    return config
  },

  images: {
    formats:          ['image/avif', 'image/webp'],
    minimumCacheTTL:  2592000,
    deviceSizes:      [640, 750, 828, 1080, 1200, 1920],
    imageSizes:       [16, 32, 48, 64, 96, 128, 256],
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
          { key: 'X-Content-Type-Options',  value: 'nosniff' },
          { key: 'X-Frame-Options',          value: 'DENY' },
          { key: 'X-XSS-Protection',         value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // ── CRITICAL: www → non-www (fixes ALL duplicate page issues) ──────────
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.tooltrio.com' }],
        destination: 'https://tooltrio.com/:path*',
        permanent: true, // 301 redirect
      },
      // ── CRITICAL: http → https (fixes insecure URL duplicates) ────────────
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://tooltrio.com/:path*',
        permanent: true,
      },

      // ── Trailing slash removal ─────────────────────────────────────────────
      { source: '/calculators/finance/:path*/', destination: '/calculators/finance/:path*', permanent: true },
      { source: '/calculators/health/:path*/',  destination: '/calculators/health/:path*',  permanent: true },
      { source: '/calculators/dev/:path*/',     destination: '/calculators/dev/:path*',     permanent: true },
      { source: '/calculators/fun/:path*/',     destination: '/calculators/fun/:path*',     permanent: true },
      { source: '/calculators/',                destination: '/calculators/finance',         permanent: true },
      { source: '/calculators',                 destination: '/calculators/finance',         permanent: true },
      { source: '/blog/:path*/',                destination: '/blog/:path*',                 permanent: true },
      { source: '/blog/',                       destination: '/blog',                        permanent: true },
      { source: '/commodities/:path*/',         destination: '/commodities/:path*',          permanent: true },
      { source: '/commodities/',                destination: '/commodities',                 permanent: true },
      { source: '/zip/:path*/',                 destination: '/zip/:path*',                  permanent: true },
      { source: '/zip/',                        destination: '/zip',                         permanent: true },

      // ── Pregnancy duplicate redirect ───────────────────────────────────────
      { source: '/calculators/health/pregnancy-due-date-calculator',  destination: '/calculators/health/pregnancy-calculator', permanent: true },
      { source: '/calculators/health/pregnancy-due-date-calculator/', destination: '/calculators/health/pregnancy-calculator', permanent: true },
    ]
  },
}

module.exports = nextConfig
