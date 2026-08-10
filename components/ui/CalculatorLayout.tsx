import { ReactNode } from 'react'
import { Breadcrumb } from './Breadcrumb'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { DownloadPDFButton } from './ExportPDFButton'
import { ShareButton } from './ShareButton'
import { getRelatedTools, type RelatedTool } from '@/lib/catalog/related-tools'
import { getYMYLQuality, getYMYLStatusLabel, getYMYLDisclaimer, generateYMYLWebPageSchema, type YMYLCategory } from '@/lib/seo/ymyl'

const BASE_URL = 'https://tooltrio.com'
const SITE_NAME = 'ToolTrio'

function YMYLTrustPanel({ category, slug, title, description, pageUrl }: { category: 'Finance' | 'Health' | 'Dev' | 'Fun'; slug?: string; title: string; description: string; pageUrl: string }) {
  if (!slug || (category !== 'Finance' && category !== 'Health')) return null
  const ymylCategory = category.toLowerCase() as YMYLCategory
  const quality = getYMYLQuality(ymylCategory, slug)
  const statusLabel = getYMYLStatusLabel(quality.status)
  const disclaimer = getYMYLDisclaimer(ymylCategory, quality)
  const schema = generateYMYLWebPageSchema({ title, description, url: pageUrl, category: ymylCategory, quality })
  const sources = quality.sources.slice(0, 6)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className={`mt-8 rounded-2xl border p-6 ${quality.indexable ? 'border-slate-200 bg-slate-50' : 'border-amber-200 bg-amber-50'}`} aria-labelledby="quality-and-methodology">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Quality &amp; methodology</p>
            <h2 id="quality-and-methodology" className="mt-1 text-xl font-bold text-slate-900">How this {ymylCategory === 'health' ? 'health' : 'financial'} result should be interpreted</h2>
          </div>
          <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-bold ${quality.indexable ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-100 text-amber-800'}`}>{statusLabel}</span>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-700">{disclaimer}</p>
        {quality.methodology && (
          <div className="mt-5">
            <h3 className="text-sm font-bold text-slate-900">Methodology</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{quality.methodology}</p>
          </div>
        )}
        {quality.limitations.length > 0 && (
          <div className="mt-5">
            <h3 className="text-sm font-bold text-slate-900">Limitations and assumptions</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
              {quality.limitations.slice(0, 8).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        )}
        <div className="mt-5 rounded-xl border border-white/80 bg-white/70 p-4">
          <h3 className="text-sm font-bold text-slate-900">Evidence status</h3>
          <p className="mt-1 text-sm text-slate-700">{quality.indexable ? "This page has passed ToolTrio's YMYL page-quality gate for documented methodology, limitations, source coverage, safety disclosure and publisher identity." : `Indexation is withheld until the required review is complete: ${quality.indexabilityReason.toLowerCase()}.`}</p>
          {quality.sourceReferencesPending && quality.indexable && (
            <p className="mt-2 text-xs leading-5 text-slate-500">Sources are selected for the topic and are provided for verification. ToolTrio does not claim that a government or professional organization has validated this calculator unless that specific source statement is explicitly documented.</p>
          )}
          <p className="mt-1 text-xs text-slate-500">Publisher: ToolTrio. This page-quality review covers methodology disclosure, limitations, source coverage and safety presentation; it is not a claim of medical or financial professional licensure.</p>
          {quality.currentYear && <p className="mt-1 text-xs text-slate-500">Rule/model year in the quality profile: {quality.currentYear}.</p>}
        </div>
        {sources.length > 0 && (
          <div className="mt-5">
            <h3 className="text-sm font-bold text-slate-900">Sources and references</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {sources.map((source, i) => (
                <li key={i}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-2 hover:text-blue-900">{source.title ?? source.label}</a>
                  {source.sourceDate && <span className="ml-2 text-xs text-slate-500">({source.sourceDateType === 'updated' ? 'updated' : 'published'} {source.sourceDate})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  )
}

type RelatedCalc = RelatedTool

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

  const resolvedRelatedCalculators = relatedCalculators?.length
    ? relatedCalculators
    : slug
      ? getRelatedTools(`/calculators/${catPath}/${slug}`)
      : []

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

        <YMYLTrustPanel category={category} slug={slug} title={title} description={description} pageUrl={pageUrl} />

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
                <p className="text-sm text-gray-500">Our in-depth guide explains every formula, shows worked examples, and helps you understand the calculation, assumptions and limitations.</p>
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
        {resolvedRelatedCalculators.length > 0 && (
          <div className="mt-8">
            <div className="rounded-3xl border overflow-hidden" style={{background:'rgba(255,255,255,0.8)', backdropFilter:'blur(10px)', borderColor:'rgba(255,255,255,0.5)', boxShadow:'0 8px 30px rgba(15,23,42,0.05)'}}>
              <div className={`px-6 py-4 border-b border-gray-100 ${category === 'Finance' ? 'bg-green-50' : category === 'Health' ? 'bg-red-50' : category === 'Dev' ? 'bg-blue-50' : 'bg-purple-50'}`}>
                <h2 className="text-lg font-bold text-gray-900" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>🔗 Related Calculators</h2>
                <p className="text-sm text-gray-500 mt-0.5">You might also find these useful</p>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {resolvedRelatedCalculators.map(rc => (
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
