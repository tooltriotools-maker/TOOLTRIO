import Link from 'next/link'
import type { ReactNode } from 'react'

interface RelatedTool {
  name: string
  href: string
  icon: string
}

interface Props {
  title: string
  description: string
  icon: string
  children: ReactNode
  relatedTools?: RelatedTool[]
  tips?: string[]
}

export function ZipToolLayout({ title, description, icon, children, relatedTools, tips }: Props) {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/zip" className="hover:text-green-600 transition-colors">ZIP Tools</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium truncate">{title}</span>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{icon}</span>
            <div>
              <h1 className="text-2xl font-black text-gray-900 leading-tight" style={{ fontFamily: "'Playfair Display',serif" }}>
                {title}
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">{description}</p>
            </div>
          </div>
        </div>

        {/* Main tool card */}
        <div className="rounded-3xl border p-6 mb-5"
          style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', borderColor: 'rgba(226,232,240,0.7)', boxShadow: '0 8px 30px rgba(15,23,42,0.06)' }}>
          {children}
        </div>

        {/* Tips */}
        {tips && tips.length > 0 && (
          <div className="rounded-2xl border p-4 mb-5"
            style={{ background: 'rgba(239,246,255,0.8)', borderColor: 'rgba(147,197,253,0.4)' }}>
            <div className="font-semibold text-blue-800 text-sm mb-2">💡 Tips</div>
            <ul className="space-y-1">
              {tips.map((t, i) => (
                <li key={i} className="text-sm text-blue-700 flex gap-2">
                  <span className="text-blue-400 shrink-0">→</span>{t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related tools */}
        {relatedTools && relatedTools.length > 0 && (
          <div className="rounded-2xl border p-5"
            style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', borderColor: 'rgba(226,232,240,0.6)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">🔗 Related ZIP Tools</h3>
              <Link href="/zip" className="text-xs text-green-600 hover:text-green-700 font-semibold">
                All tools →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {relatedTools.map(t => (
                <Link key={t.href} href={t.href}
                  className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 bg-white hover:border-green-300 hover:bg-green-50/50 transition-all text-sm group">
                  <span className="text-lg">{t.icon}</span>
                  <span className="font-medium text-gray-700 group-hover:text-green-700 text-xs leading-tight">{t.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
