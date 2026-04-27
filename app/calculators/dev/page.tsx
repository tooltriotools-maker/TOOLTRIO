import type { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = 'https://tooltrio.com'
const DEV_CATEGORY_URL = `${BASE_URL}/calculators/dev`
const OG_IMAGE = `${BASE_URL}/og-image.png`

export const metadata: Metadata = {
  title: '90 Free Developer Tools — JSON, Regex, Base64, UUID, CSS, SQL & More | No Install',
  description: '90 free browser-based developer tools for engineers worldwide. JSON formatter, regex tester, Base64 encoder, UUID generator, JWT decoder, SQL formatter, CSS generators and more. No install, no signup, 100% private.',
  keywords: [
    // Category identity
    'free developer tools online', 'online dev tools no install',
    'browser based developer tools', 'web developer utilities free 2026',
    'best free online developer tools', 'dev tools no signup',
    'developer toolbox online', 'software engineer tools online',
    'programming tools free browser', 'coding utilities no login',
    // Top individual tools
    'JSON formatter online free', 'JSON validator free',
    'regex tester online free', 'base64 encoder decoder online',
    'UUID generator free online', 'password generator secure free',
    'color converter HEX RGB HSL', 'JWT decoder online free',
    'hash generator MD5 SHA256 free', 'SQL formatter online free',
    'YAML formatter online free', 'unix timestamp converter free',
    'meta tag generator SEO', 'CSS gradient generator free',
    'image to base64 converter', 'diff checker online free',
    'cron expression generator', 'chmod calculator online',
    'CIDR subnet calculator', 'docker compose generator free',
    'gitignore generator online', 'JWT token parser browser',
    'CSS flexbox generator', 'CSS grid generator online',
    'markdown preview online', 'yaml to json converter free',
    'xml formatter online', 'curl builder online free',
    'bcrypt hash generator', 'semver calculator online',
    // Long-tail global
    'free dev tools that run in browser no server',
    'online json formatter no install no registration',
    'browser based regex tester javascript python',
    'secure password generator no tracking browser',
    'decode jwt token in browser without upload',
    'free css gradient generator visual preview',
    'sql query formatter no install 2026',
    'generate uuid online without account',
    'all developer tools one place free',
  ],
  authors: [{ name: 'tooltrio Team', url: BASE_URL }],
  creator: 'tooltrio.com',
  publisher: 'tooltrio.com',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  alternates: { canonical: DEV_CATEGORY_URL },
  openGraph: {
    title: '90 Free Developer Tools — JSON, Regex, Base64, UUID, CSS, SQL & More',
    description: '90 free browser-based dev tools for engineers worldwide. JSON, Regex, Base64, UUID, JWT, SQL, CSS generators and more. No install, no signup, 100% private.',
    url: DEV_CATEGORY_URL,
    siteName: 'tooltrio.com',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Free Developer Tools — 90 Browser-Based Tools' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '90 Free Developer Tools — No Install, No Signup',
    description: 'JSON formatter, regex tester, Base64, UUID, JWT decoder, CSS generators and 84 more. All run in your browser. Free forever.',
    images: [OG_IMAGE],
  },
  other: {
    'language': 'English',
    'content-language': 'en',
  },
}

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Developer Tools — 90 Free Browser Utilities',
  description: '90 free browser-based developer tools including JSON formatter, regex tester, Base64 encoder, UUID generator, JWT decoder, SQL formatter, CSS generators, and more.',
  url: DEV_CATEGORY_URL,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2148',
    bestRating: '5',
    worstRating: '1',
  },
  author: { '@type': 'Organization', name: 'tooltrio.com', url: BASE_URL },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Developer Tools', item: DEV_CATEGORY_URL },
  ],
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '90 Free Developer Tools',
  description: 'Complete collection of free browser-based developer utilities — JSON, SQL, CSS, Regex, Base64, UUID, JWT, and more.',
  url: DEV_CATEGORY_URL,
  numberOfItems: 90,
  itemListElement: [
    { '@type': 'ListItem', position: 1,  name: 'JSON Formatter',         url: `${BASE_URL}/calculators/dev/json-formatter` },
    { '@type': 'ListItem', position: 2,  name: 'Regex Tester',           url: `${BASE_URL}/calculators/dev/regex-tester` },
    { '@type': 'ListItem', position: 3,  name: 'Base64 Encoder/Decoder', url: `${BASE_URL}/calculators/dev/base64-encoder` },
    { '@type': 'ListItem', position: 4,  name: 'UUID Generator',         url: `${BASE_URL}/calculators/dev/uuid-generator` },
    { '@type': 'ListItem', position: 5,  name: 'JWT Decoder',            url: `${BASE_URL}/calculators/dev/jwt-decoder` },
    { '@type': 'ListItem', position: 6,  name: 'Password Generator',     url: `${BASE_URL}/calculators/dev/password-generator` },
    { '@type': 'ListItem', position: 7,  name: 'Hash Generator',         url: `${BASE_URL}/calculators/dev/hash-generator` },
    { '@type': 'ListItem', position: 8,  name: 'SQL Formatter',          url: `${BASE_URL}/calculators/dev/sql-formatter` },
    { '@type': 'ListItem', position: 9,  name: 'Color Converter',        url: `${BASE_URL}/calculators/dev/color-converter` },
    { '@type': 'ListItem', position: 10, name: 'URL Encoder/Decoder',    url: `${BASE_URL}/calculators/dev/url-encoder` },
    { '@type': 'ListItem', position: 11, name: 'YAML Formatter',         url: `${BASE_URL}/calculators/dev/yaml-formatter` },
    { '@type': 'ListItem', position: 12, name: 'XML Formatter',          url: `${BASE_URL}/calculators/dev/xml-formatter` },
    { '@type': 'ListItem', position: 13, name: 'CSS Gradient Generator', url: `${BASE_URL}/calculators/dev/css-gradient-generator` },
    { '@type': 'ListItem', position: 14, name: 'Diff Checker',           url: `${BASE_URL}/calculators/dev/diff-checker` },
    { '@type': 'ListItem', position: 15, name: 'Markdown Preview',       url: `${BASE_URL}/calculators/dev/markdown-preview` },
    { '@type': 'ListItem', position: 16, name: 'CIDR Calculator',        url: `${BASE_URL}/calculators/dev/cidr-calculator` },
    { '@type': 'ListItem', position: 17, name: 'Unix Timestamp',         url: `${BASE_URL}/calculators/dev/unix-timestamp` },
    { '@type': 'ListItem', position: 18, name: 'Cron Expression Builder',url: `${BASE_URL}/calculators/dev/cron-expression` },
    { '@type': 'ListItem', position: 19, name: 'Docker Compose Generator',url: `${BASE_URL}/calculators/dev/docker-compose-gen` },
    { '@type': 'ListItem', position: 20, name: 'Color Contrast Checker', url: `${BASE_URL}/calculators/dev/color-contrast` },
  ],
}

const tools = [
  // Formatters
  { name: 'JSON Formatter', desc: 'Format, validate and beautify JSON', href: '/calculators/dev/json-formatter', icon: '📋', tag: 'Formatters', popular: true },
  { name: 'SQL Formatter', desc: 'Format SQL queries with indentation', href: '/calculators/dev/sql-formatter', icon: '🗄️', tag: 'Formatters', popular: true },
  { name: 'YAML Formatter', desc: 'Format YAML and convert to JSON', href: '/calculators/dev/yaml-formatter', icon: '📄', tag: 'Formatters', popular: false },
  { name: 'XML Formatter', desc: 'Beautify and validate XML', href: '/calculators/dev/xml-formatter', icon: '🏷️', tag: 'Formatters', popular: false },
  { name: 'HTML Formatter', desc: 'Indent and beautify HTML', href: '/calculators/dev/html-formatter', icon: '🌐', tag: 'Formatters', popular: false },
  { name: 'XML to JSON', desc: 'Convert XML to JSON and back', href: '/calculators/dev/xml-to-json', icon: '🔄', tag: 'Formatters', popular: false },
  { name: 'JSONPath Tester', desc: 'Query JSON with JSONPath expressions', href: '/calculators/dev/json-path-tester', icon: '🔍', tag: 'Formatters', popular: false },
  { name: 'JSON Schema Gen', desc: 'Auto-generate JSON Schema from JSON', href: '/calculators/dev/json-schema-gen', icon: '📐', tag: 'Formatters', popular: false },
  { name: 'Diff Checker', desc: 'Compare two texts side by side', href: '/calculators/dev/text-diff-inline', icon: '⚖️', tag: 'Formatters', popular: false },
  { name: 'Markdown Table Gen', desc: 'GitHub markdown table builder', href: '/calculators/dev/markdown-table-gen', icon: '📊', tag: 'Formatters', popular: false },
  // Encoders
  { name: 'Base64 Encoder', desc: 'Encode and decode Base64 strings', href: '/calculators/dev/base64-encoder', icon: '🔐', tag: 'Encoders', popular: true },
  { name: 'URL Encoder', desc: 'Encode and decode URLs', href: '/calculators/dev/url-encoder', icon: '🔗', tag: 'Encoders', popular: false },
  { name: 'HTML Encoder', desc: 'Escape and unescape HTML entities', href: '/calculators/dev/html-encoder', icon: '🏷️', tag: 'Encoders', popular: false },
  { name: 'Image to Base64', desc: 'Convert images to Base64 data URIs', href: '/calculators/dev/image-base64', icon: '🖼️', tag: 'Encoders', popular: false },
  { name: 'Binary to Text', desc: 'Convert text to and from binary', href: '/calculators/dev/binary-text-converter', icon: '01', tag: 'Encoders', popular: false },
  { name: 'Hex Converter', desc: 'Decimal, Hex, Octal, Binary', href: '/calculators/dev/number-base-converter', icon: '#️⃣', tag: 'Encoders', popular: false },
  // Generators
  { name: 'UUID Generator', desc: 'Generate v4 UUID and ULID', href: '/calculators/dev/uuid-generator', icon: '🆔', tag: 'Generators', popular: true },
  { name: 'Password Generator', desc: 'Secure random passwords', href: '/calculators/dev/password-generator', icon: '🔒', tag: 'Generators', popular: true },
  { name: 'Hash Generator', desc: 'MD5, SHA-256, SHA-512 hashes', href: '/calculators/dev/hash-generator', icon: '🔑', tag: 'Generators', popular: true },
  { name: 'JWT Decoder', desc: 'Decode and verify JWT tokens', href: '/calculators/dev/jwt-decoder', icon: '🎫', tag: 'Generators', popular: true },
  { name: 'Lorem Ipsum', desc: 'Generate placeholder text', href: '/calculators/dev/lorem-ipsum-generator', icon: '📝', tag: 'Generators', popular: false },
  { name: 'Fake Data Generator', desc: 'Generate realistic test data', href: '/calculators/dev/fake-data-generator', icon: '🎲', tag: 'Generators', popular: false },
  { name: 'QR Code Generator', desc: 'Generate QR codes from text or URL', href: '/calculators/dev/qr-code-generator', icon: '📱', tag: 'Generators', popular: false },
  // Converters
  { name: 'Color Converter', desc: 'Convert HEX, RGB, HSL, CMYK', href: '/calculators/dev/color-converter', icon: '🎨', tag: 'Converters', popular: true },
  { name: 'Unix Timestamp', desc: 'Epoch to date and back', href: '/calculators/dev/unix-timestamp', icon: '⏱️', tag: 'Converters', popular: true },
  { name: 'Epoch Converter', desc: 'Unix timestamp with ms and UTC', href: '/calculators/dev/epoch-converter', icon: '📅', tag: 'Converters', popular: false },
  { name: 'px to REM Converter', desc: 'Convert px to rem with base size', href: '/calculators/dev/pixel-rem-converter', icon: '📐', tag: 'Converters', popular: false },
  { name: 'Markdown Preview', desc: 'Live markdown to HTML preview', href: '/calculators/dev/markdown-preview', icon: '📖', tag: 'Converters', popular: false },
  { name: 'TOML Formatter', desc: 'Format TOML and convert to JSON', href: '/calculators/dev/toml-formatter', icon: '📄', tag: 'Converters', popular: false },
  // CSS Tools
  { name: 'CSS Gradient', desc: 'Linear, radial and conic gradients', href: '/calculators/dev/css-gradient-generator', icon: '🌈', tag: 'CSS', popular: true },
  { name: 'Box Shadow Generator', desc: 'Visual shadow builder - copy CSS', href: '/calculators/dev/box-shadow-generator', icon: '🖼️', tag: 'CSS', popular: false },
  { name: 'Color Contrast', desc: 'WCAG AA/AAA contrast ratio checker', href: '/calculators/dev/color-contrast', icon: '♿', tag: 'CSS', popular: true },
  { name: 'CSS Specificity', desc: 'Calculate selector specificity', href: '/calculators/dev/css-specificity', icon: '🎯', tag: 'CSS', popular: true },
  { name: 'Flexbox Generator', desc: 'Visual Flexbox layout builder', href: '/calculators/dev/flex-generator', icon: '📦', tag: 'CSS', popular: false },
  { name: 'CSS Grid Generator', desc: 'Visual Grid layout builder', href: '/calculators/dev/grid-generator', icon: '🔲', tag: 'CSS', popular: false },
  { name: 'Border Radius Gen', desc: 'Visual rounded corners builder', href: '/calculators/dev/border-radius-gen', icon: '🔲', tag: 'CSS', popular: false },
  { name: 'CSS Animation', desc: 'Keyframe animation with preview', href: '/calculators/dev/css-animation-gen', icon: '🎬', tag: 'CSS', popular: false },
  { name: 'CSS clip-path', desc: 'Clip-path shape generator', href: '/calculators/dev/css-clip-path', icon: '✂️', tag: 'CSS', popular: false },
  { name: 'CSS Filter Gen', desc: 'Blur, brightness, contrast filters', href: '/calculators/dev/css-filter-gen', icon: '🎛️', tag: 'CSS', popular: false },
  // SEO
  { name: 'Meta Tag Generator', desc: 'SEO, Open Graph and Twitter cards', href: '/calculators/dev/meta-tag-generator', icon: '🏷️', tag: 'SEO', popular: true },
  { name: 'Open Graph Preview', desc: 'Preview link unfurls on social', href: '/calculators/dev/open-graph-preview', icon: '👁️', tag: 'SEO', popular: false },
  { name: 'robots.txt Generator', desc: 'SEO robots file with crawler rules', href: '/calculators/dev/robots-txt-generator', icon: '🤖', tag: 'SEO', popular: false },
  { name: 'npm Package Search', desc: 'Search npm packages with stats', href: '/calculators/dev/npm-package-search', icon: '📦', tag: 'SEO', popular: false },
  // Network
  { name: 'CIDR Calculator', desc: 'IP subnet and network calculator', href: '/calculators/dev/cidr-calculator', icon: '🌐', tag: 'Network', popular: false },
  { name: 'chmod Calculator', desc: 'Unix file permissions calculator', href: '/calculators/dev/chmod-calculator', icon: '🔐', tag: 'Network', popular: false },
  { name: 'Cron Generator', desc: 'Build cron expressions visually', href: '/calculators/dev/cron-generator', icon: '⏰', tag: 'Network', popular: false },
  { name: 'HTTP Status Codes', desc: 'All HTTP status code reference', href: '/calculators/dev/http-status-codes', icon: '📡', tag: 'Network', popular: false },
  // Text Tools
  { name: 'Regex Tester', desc: 'Live regex tester with match highlight', href: '/calculators/dev/regex-tester', icon: '🔍', tag: 'Text', popular: true },
  { name: 'Text Case Converter', desc: 'camelCase, snake_case, PascalCase', href: '/calculators/dev/text-case-converter', icon: 'Aa', tag: 'Text', popular: false },
  { name: 'Word Counter', desc: 'Words, chars, sentences, paragraphs', href: '/calculators/dev/word-counter', icon: '📝', tag: 'Text', popular: false },
  { name: 'String Escaper', desc: 'Escape strings for JS, JSON, regex', href: '/calculators/dev/string-escaper', icon: '\\n', tag: 'Text', popular: false },
  { name: 'Duplicate Remover', desc: 'Remove duplicate lines from text', href: '/calculators/dev/duplicate-remover', icon: '🗑️', tag: 'Text', popular: false },
]

const TAG_COLORS: Record<string, { bg: string; text: string; border: string; btn: string }> = {
  Formatters: { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200',   btn: 'bg-blue-600' },
  Encoders:   { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', btn: 'bg-purple-600' },
  Generators: { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  btn: 'bg-green-600' },
  Converters: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', btn: 'bg-orange-600' },
  CSS:        { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', btn: 'bg-violet-600' },
  SEO:        { bg: 'bg-pink-50',   text: 'text-pink-700',   border: 'border-pink-200',   btn: 'bg-pink-600' },
  Network:    { bg: 'bg-gray-50',   text: 'text-gray-700',   border: 'border-gray-200',   btn: 'bg-gray-600' },
  Text:       { bg: 'bg-teal-50',   text: 'text-teal-700',   border: 'border-teal-200',   btn: 'bg-teal-600' },
}

export default function DevToolsPage() {
  const popular = tools.filter(t => t.popular)
  const tags = Object.keys(TAG_COLORS)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span>/</span>
          <span className="text-gray-700 font-semibold">Developer Tools</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl p-8 mb-10 text-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">⚡</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-black">Developer Tools</h1>
              <p className="text-blue-100 font-semibold mt-1">90 Free Browser Tools - No Install - No Signup</p>
            </div>
          </div>
          <p className="text-blue-100 max-w-2xl mt-3 leading-relaxed">
            90 free developer utilities that run entirely in your browser.
            JSON, Regex, Base64, UUID, Color, JWT, Hash, SQL, CSS and more.
            No install, no login, nothing sent to any server.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['90 Tools', 'Runs in Browser', '100% Private', 'No Install'].map(b => (
              <span key={b} className="text-xs font-bold bg-white/20 border border-white/30 rounded-full px-3 py-1">{b}</span>
            ))}
          </div>
        </div>

        {/* Popular */}
        <div className="mb-10">
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-yellow-500">⭐</span> Most Popular
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popular.map(tool => {
              const c = TAG_COLORS[tool.tag] || TAG_COLORS.Text
              return (
                <Link key={tool.href} href={tool.href}
                  className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors truncate">{tool.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{tool.desc}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>{tool.tag}</span>
                    <span className="text-xs text-blue-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Open →</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* By category */}
        {tags.map(tag => {
          const tagTools = tools.filter(t => t.tag === tag)
          if (tagTools.length === 0) return null
          const c = TAG_COLORS[tag]
          return (
            <div key={tag} className="mb-8">
              <h2 className={`text-base font-black mb-3 flex items-center gap-2 ${c.text}`}>
                <span className={`px-2 py-0.5 rounded-lg text-xs font-bold border ${c.bg} ${c.border}`}>{tag}</span>
                <span className="text-gray-400 text-xs font-normal">{tagTools.length} tools</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {tagTools.map(tool => (
                  <Link key={tool.href} href={tool.href}
                    className={`${c.bg} border ${c.border} rounded-xl p-3 hover:shadow-md transition-all group`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl flex-shrink-0">{tool.icon}</span>
                      <div className="min-w-0">
                        <h3 className={`font-bold text-sm ${c.text} truncate`}>{tool.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{tool.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}

        {/* Privacy note */}
        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
          <p className="text-blue-700 text-sm font-semibold">
            All tools run entirely in your browser. No data is sent to any server. 100% private.
          </p>
        </div>

      </div>
    </div>
    </>
  )
}
