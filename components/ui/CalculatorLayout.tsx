'use client'
import { ReactNode } from 'react'
import { Breadcrumb } from './Breadcrumb'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { DownloadPDFButton } from './ExportPDFButton'
import { ShareButton } from './ShareButton'

const BASE_URL = 'https://tooltrio.com'
const SITE_NAME = 'ToolTrio'

interface RelatedCalc {
  name: string
  href: string
  icon: string
  desc: string
}

interface CalculatorLayoutProps {
  title: string
  description: string
  icon: string
  category: 'Finance' | 'Health' | 'Dev' | 'Fun'
  children: ReactNode
  /** @deprecated schemas now injected server-side in page.tsx — prop accepted but unused */
  structuredData?: object[]
  relatedCalculators?: RelatedCalc[]
  blogSlug?: string
  slug?: string
}

export function CalculatorLayout({ title, description, icon, category, children, structuredData, relatedCalculators, blogSlug, slug }: CalculatorLayoutProps) {
  const catColor = category === 'Finance' ? 'text-green-700 bg-green-100 border-green-200'
    : category === 'Health' ? 'text-red-700 bg-red-100 border-red-200'
    : category === 'Dev' ? 'text-blue-700 bg-blue-100 border-blue-200'
    : 'text-purple-700 bg-purple-100 border-purple-200'
  const isFinance = category === 'Finance'
  const catPath = category === 'Finance' ? 'finance'
    : category === 'Health' ? 'health'
    : category === 'Dev' ? 'dev'
    : 'fun'

  const pageUrl = slug
    ? `${BASE_URL}/calculators/${catPath}/${slug}`
    : `${BASE_URL}/calculators/${catPath}`

  // ── Schema injection removed from this client component ──────────────────
  // All JSON-LD schemas (BreadcrumbList, HowTo, FAQPage, WebApplication,
  // MedicalWebPage) are now injected server-side in each page.tsx directly,
  // ensuring they appear in the initial HTML response for Googlebot.
  // See: lib/seo/metadata.ts → generateCalculatorPageSchemas()

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: `${category} Calculators`, href: `/calculators/${category.toLowerCase()}` },
          { label: title, href: '#' },
        ]} />

        {/* Header */}
        <div className="mt-5 mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm border ${isFinance ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'}`}>{icon}</div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${catColor}`}>{category}</span>
            {blogSlug && (
              <Link
                href={`/blog/${blogSlug}`}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold border border-blue-200 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-all"
              >
                <BookOpen className="w-3 h-3" /> Read the Guide <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="calc-page-h1 text-2xl sm:text-3xl md:text-4xl font-black text-gray-900" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>{title}</h1>
              <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mt-1">{description}</p>
            </div>
            {/* Export + Share buttons — wraps on mobile */}
            <div className="calc-header-buttons flex items-center gap-2 flex-wrap">
              <ShareButton title={title} description={description} category={category} />
              <DownloadPDFButton title={title} category={category} />
            </div>
          </div>
        </div>

        {/* Main content — wrapped so results-only PDF can target it */}
        <div data-results="true">
          {children}
        </div>

        {/* Blog Guide Card */}
        {blogSlug && (
          <div className="mt-10">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-2xl flex-shrink-0">
                📖
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wide mb-1">Expert Guide</p>
                <h2 className="text-base font-black text-gray-900 mb-1">Want to understand the maths behind this calculator?</h2>
                <p className="text-sm text-gray-500">Our in-depth guide explains every formula, shows worked examples, and helps you make smarter financial decisions.</p>
              </div>
              <Link
                href={`/blog/${blogSlug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow-md whitespace-nowrap flex-shrink-0"
              >
                <BookOpen className="w-4 h-4" /> Read Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Related Calculators */}
        {relatedCalculators && relatedCalculators.length > 0 && (
          <div className="mt-8">
            <div className="rounded-3xl border overflow-hidden" style={{background:'rgba(255,255,255,0.8)', backdropFilter:'blur(10px)', borderColor:'rgba(255,255,255,0.5)', boxShadow:'0 8px 30px rgba(15,23,42,0.05)'}}>
              <div className={`px-6 py-4 border-b border-gray-100 ${category === 'Finance' ? 'bg-green-50' : category === 'Health' ? 'bg-red-50' : category === 'Dev' ? 'bg-blue-50' : 'bg-purple-50'}`}>
                <h2 className="text-lg font-bold text-gray-900" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>🔗 Related Calculators</h2>
                <p className="text-sm text-gray-500 mt-0.5">You might also find these useful</p>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {relatedCalculators.map(rc => (
                  <Link key={rc.href} href={rc.href}
                    className={`flex items-start gap-3 p-4 rounded-2xl border transition-all group hover:-translate-y-0.5 hover:shadow-md hover:border-green-200/60`} style={{borderColor:'rgba(226,232,240,0.6)', transition:'all 0.25s cubic-bezier(.4,0,.2,1)'}}
                  >
                    <span className="text-xl flex-shrink-0">{rc.icon}</span>
                    <span className="block">
                      <span className={`font-semibold text-sm text-gray-800 transition-all block ${category === 'Finance' ? 'group-hover:text-green-700' : category === 'Health' ? 'group-hover:text-red-600' : category === 'Dev' ? 'group-hover:text-blue-600' : 'group-hover:text-purple-600'}`}>{rc.name}</span>
                      <span className="text-xs text-gray-400 mt-0.5 leading-relaxed block">{rc.desc}</span>
                    </span>
                    <ArrowRight className={`w-4 h-4 text-gray-300 transition-all ml-auto flex-shrink-0 mt-0.5 ${category === 'Finance' ? 'group-hover:text-green-500' : category === 'Health' ? 'group-hover:text-red-400' : category === 'Dev' ? 'group-hover:text-blue-400' : 'group-hover:text-purple-400'}`} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom blog prompt */}
        {!blogSlug && (
          <div className="mt-10 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-semibold border border-blue-200 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all">
              <BookOpen className="w-4 h-4" /> Browse our Finance &amp; Health Guides <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
