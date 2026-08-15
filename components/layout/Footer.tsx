'use client'
import Link from 'next/link'
import { Mail, Shield, FileText, Info, BookOpen } from 'lucide-react'

const contactEmail = 'tooltrio.tools@gmail.com'

const zipLinks = [
  ['ZIP Code Lookup', '/zip/zip-code-lookup'],
  ['ZIP Distance', '/zip/zip-code-distance'],
  ['ZIP to City', '/zip/zip-to-city'],
  ['City to ZIP', '/zip/city-to-zip'],
  ['ZIPs in Radius', '/zip/zips-within-radius'],
  ['ZIP Timezone', '/zip/zip-to-timezone'],
  ['ZIP Code Map', '/zip/zip-code-map'],
  ['ZIP Validator', '/zip/zip-code-validator'],
  ['USPS Address Format', '/zip/usps-address-format'],
  ['All ZIP Tools →', '/zip'],
]


const blogLinks = [
  ['Blog Home', '/blog'],
]

const companyLinks = [
  ['About ToolTrio', '/about'],
  ['Our Methodology', '/methodology'],
  ['Contact ToolTrio', '/contact'],
  ['Privacy Policy', '/privacy-policy'],
  ['Disclaimer', '/disclaimer'],
]

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img
                src="/tooltrio-logo.png"
                alt="ToolTrio — Free Online Calculators and Tools"
                style={{ height: '40px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              Free online calculators and tools for ZIP codes and fun tools. No signup. No ads. Instant results.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-2 text-sm hover:text-white transition-all text-green-400 font-semibold"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              {contactEmail}
            </a>
          </div>

          {/* ZIP Tools */}
          <div>
            <h2 className="font-bold text-white text-sm mb-4">📮 ZIP Tools</h2>
            <ul className="space-y-2.5 text-sm">
              {zipLinks.map(([name, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-teal-400 transition-all">{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog + Company */}
          <div>
            <h2 className="font-bold text-white text-sm mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" /> Blog
            </h2>
            <ul className="space-y-2.5 text-sm mb-6">
              {blogLinks.map(([name, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-blue-400 transition-all">{name}</Link>
                </li>
              ))}
            </ul>

            <h2 className="font-bold text-white text-sm mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-gray-400" /> Company
            </h2>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map(([name, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-all">{name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO text block — natural, not spammy */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <p className="text-xs text-gray-600 leading-relaxed max-w-5xl">
            <strong className="text-gray-500">ToolTrio.com</strong> provides free online calculators across
            ZIP codes and fun tools. Popular public tools include{' '}
            <Link href="/zip/zip-code-lookup" className="text-gray-500 hover:text-gray-400">ZIP code lookup</Link>, and{' '}
            All tools are free, private, and require no account.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 ToolTrio.com — All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/methodology" className="hover:text-white flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Methodology
            </Link>
            <Link href="/privacy-policy" className="hover:text-white flex items-center gap-1">
              <Shield className="w-3 h-3" /> Privacy Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-white flex items-center gap-1">
              <FileText className="w-3 h-3" /> Disclaimer
            </Link>
            <Link href="/about" className="hover:text-white flex items-center gap-1">
              <Info className="w-3 h-3" /> About
            </Link>
            <Link href="/contact" className="hover:text-white flex items-center gap-1">
              <Mail className="w-3 h-3" /> Contact
            </Link>
          </div>
          <p className="text-gray-700">For informational use only. Not financial or medical advice.</p>
        </div>

      </div>
    </footer>
  )
}
