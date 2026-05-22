import Link from 'next/link'
import type { ReactNode } from 'react'

interface RelatedTool { name: string; href: string; icon: string }
interface FAQ { q: string; a: string }
interface ChartBar { label: string; value: number; color?: string }
interface PopulationChart { title: string; subtitle?: string; bars: ChartBar[]; unit?: string }
interface StatsRow { label: string; value: string }
interface FeatureCard { icon: string; title: string; desc: string; bullets?: string[] }
interface UseCase { icon: string; title: string; desc: string }
interface RouteRow { from: string; to: string; dist: string; note: string }
interface HowToStep { num: number; title: string; desc: string }

interface SeoContent {
  heading: string
  tagline?: string
  verifiedDate?: string
  body: string
  faqs?: FAQ[]
  populationChart?: PopulationChart
  statsTable?: StatsRow[]
  featureCards?: FeatureCard[]
  useCases?: UseCase[]
  howToSteps?: HowToStep[]
  popularRoutes?: RouteRow[]
  proTip?: string
  successStory?: { title: string; problem: string; fix: string; icon: string }
  dataSources?: { name: string; desc: string; icon: string }[]
  prefixTable?: { prefix: string; region: string; states: string }[]
}

interface Props {
  title: string
  description: string
  icon: string
  children: ReactNode
  relatedTools?: RelatedTool[]
  tips?: string[]
  seoContent?: SeoContent
}

function renderBody(text: string) {
  const paras = text.trim().split(/\n\n+/)
  return paras.map((para, i) => {
    const trimmed = para.trim()
    if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
      return (
        <h3 key={i} className="text-lg font-bold text-gray-900 mt-7 mb-2 pb-1 border-b border-gray-100">
          {trimmed.replace(/\*\*/g, '')}
        </h3>
      )
    }
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/)
    return (
      <p key={i} className="text-sm text-gray-600 leading-7 mb-3">
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="font-semibold text-gray-800">{part.replace(/\*\*/g, '')}</strong>
            : part
        )}
      </p>
    )
  })
}

function PopulationBarChart({ chart }: { chart: PopulationChart }) {
  const max = Math.max(...chart.bars.map(b => Math.abs(b.value)))
  const palette = ['#3b82f6','#22c55e','#f59e0b','#8b5cf6','#ef4444','#06b6d4','#f97316','#84cc16']
  return (
    <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">📊</span>
        <h3 className="text-base font-bold text-gray-900">{chart.title}</h3>
      </div>
      {chart.subtitle && <p className="text-xs text-gray-500 mb-4 ml-7">{chart.subtitle}</p>}
      <div className="space-y-3">
        {chart.bars.map((bar, i) => {
          const absVal = Math.abs(bar.value)
          const pct = Math.round((absVal / max) * 100)
          const color = bar.color || palette[i % palette.length]
          const displayVal = bar.value < 0 ? `${bar.value.toLocaleString()}` : bar.value.toLocaleString()
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="w-32 text-xs text-gray-600 text-right shrink-0 leading-tight font-medium">{bar.label}</div>
              <div className="flex-1 bg-white/70 rounded-full h-6 overflow-hidden shadow-inner">
                <div
                  className="h-6 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${Math.max(pct, 6)}%`, backgroundColor: color, transition: 'width 0.8s ease' }}
                >
                  <span className="text-[10px] font-bold text-white drop-shadow">{displayVal}{chart.unit ? ` ${chart.unit}` : ''}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ZipToolLayout({ title, description, icon, children, relatedTools, tips, seoContent }: Props) {
  return (
    <main className="min-h-screen bg-gray-50/50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5 flex-wrap">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/zip" className="hover:text-green-600 transition-colors">ZIP Tools</Link>
          <span>›</span>
          <span className="text-gray-600 font-medium">{title}</span>
        </nav>

        {/* ── HERO HEADER ───────────────────────────────────────── */}
        <div className="text-center mb-8">
          {seoContent?.verifiedDate && (
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              VERIFIED: {seoContent.verifiedDate}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>
            {title}
          </h1>
          {seoContent?.tagline ? (
            <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
              {seoContent.tagline.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
                part.startsWith('**') && part.endsWith('**')
                  ? <strong key={i} className="text-blue-600 font-semibold">{part.replace(/\*\*/g, '')}</strong>
                  : part
              )}
            </p>
          ) : (
            <p className="text-gray-500 text-base max-w-xl mx-auto">{description}</p>
          )}
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">⚡ Optimized for USA Addresses</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-green-600 font-medium">🆓 Free & Fast</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-green-600 font-medium">🔒 No Data Stored</span>
          </div>
        </div>

        {/* ── MAIN TOOL CARD ────────────────────────────────────── */}
        <div className="rounded-3xl border bg-white p-6 sm:p-8 mb-6 shadow-sm"
          style={{ borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 4px 24px rgba(15,23,42,0.07)' }}>
          {children}
        </div>

        {/* ── PRO TIP ───────────────────────────────────────────── */}
        {seoContent?.proTip && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 mb-6 flex gap-3 items-start">
            <span className="text-xl shrink-0">💡</span>
            <div>
              <div className="font-semibold text-amber-800 text-sm mb-1">Pro Tip:</div>
              <p className="text-sm text-amber-700 leading-relaxed">{seoContent.proTip}</p>
            </div>
          </div>
        )}

        {/* ── HOW TO USE ────────────────────────────────────────── */}
        {seoContent?.howToSteps && seoContent.howToSteps.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0">1</span>
              <h2 className="text-lg font-bold text-gray-900">How to Use the {title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                {seoContent.howToSteps.map((step) => (
                  <div key={step.num} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{step.num}</div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{step.title}</div>
                      <div className="text-xs text-gray-500 leading-relaxed mt-0.5">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              {seoContent.proTip && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 self-start">
                  <div className="flex items-center gap-1.5 text-amber-700 font-semibold text-sm mb-1.5">
                    <span>💡</span> Pro Tip:
                  </div>
                  <p className="text-xs text-amber-700 leading-relaxed">{seoContent.proTip}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── FEATURE CARDS ─────────────────────────────────────── */}
        {seoContent?.featureCards && seoContent.featureCards.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {seoContent.featureCards.map((card, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{card.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{card.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                {card.bullets && (
                  <ul className="mt-2 space-y-1">
                    {card.bullets.map((b, j) => (
                      <li key={j} className="text-xs text-gray-500 flex items-center gap-1.5">
                        <span className="text-green-500">✓</span>{b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── POPULAR ROUTES TABLE ──────────────────────────────── */}
        {seoContent?.popularRoutes && seoContent.popularRoutes.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-6 shadow-sm overflow-x-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Popular US Route Distances</h2>
            <p className="text-xs text-gray-500 mb-4">Commonly searched distances across the USA</p>
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ORIGIN</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">DESTINATION</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">DISTANCE</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">NOTE</th>
                </tr>
              </thead>
              <tbody>
                {seoContent.popularRoutes.map((row, i) => (
                  <tr key={i} className={`border-b border-gray-50 hover:bg-gray-50/50 ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                    <td className="py-2.5 px-3 font-medium text-gray-800">{row.from}</td>
                    <td className="py-2.5 px-3 text-gray-600">{row.to}</td>
                    <td className="py-2.5 px-3 font-semibold text-blue-700">{row.dist}</td>
                    <td className="py-2.5 px-3 text-xs text-gray-400">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── STATS BAR ─────────────────────────────────────────── */}
        {seoContent?.statsTable && seoContent.statsTable.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {seoContent.statsTable.slice(0, 4).map((row, i) => (
              <div key={i} className={`rounded-xl p-4 text-center ${i === 0 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'} shadow-sm`}>
                <div className={`text-xl font-black ${i === 0 ? 'text-white' : 'text-gray-900'}`}>{row.value}</div>
                <div className={`text-xs mt-1 ${i === 0 ? 'text-blue-100' : 'text-gray-500'}`}>{row.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── POPULATION CHART ─────────────────────────────────── */}
        {seoContent?.populationChart && (
          <PopulationBarChart chart={seoContent.populationChart} />
        )}

        {/* ── USE CASES ─────────────────────────────────────────── */}
        {seoContent?.useCases && seoContent.useCases.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-6 shadow-sm">
            <div className="text-center mb-5">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">PRACTICAL UTILITY</span>
              <h2 className="text-xl font-bold text-gray-900 mt-3">Who Benefits from This {title}?</h2>
              <p className="text-sm text-gray-500 mt-1">Beyond simple lookup, our data helps professionals across industries make accurate, location-based decisions.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {seoContent.useCases.map((uc, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                  <div className="text-2xl mb-2">{uc.icon}</div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{uc.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ZIP PREFIX TABLE ──────────────────────────────────── */}
        {seoContent?.prefixTable && seoContent.prefixTable.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-6 shadow-sm overflow-x-auto">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🗂️</span>
              <h2 className="text-base font-bold text-gray-900">Understanding ZIP Code Prefixes (0–9)</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4 ml-7">The first digit of a US ZIP code represents a specific geographic region.</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2 px-3 text-xs font-bold text-gray-700 w-16">PREFIX</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-gray-700">REGION COVERED</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-gray-700">KEY STATES</th>
                </tr>
              </thead>
              <tbody>
                {seoContent.prefixTable.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/30">
                    <td className="py-2 px-3 font-bold text-blue-600">{row.prefix}</td>
                    <td className="py-2 px-3 text-gray-700">{row.region}</td>
                    <td className="py-2 px-3 text-xs text-gray-500">{row.states}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── SUCCESS STORY ─────────────────────────────────────── */}
        {seoContent?.successStory && (
          <div className="rounded-2xl border border-gray-200 bg-white mb-6 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-6 pt-5 pb-3 border-b border-gray-100">
              <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">SUCCESS STORY</span>
              <span className="text-xs text-gray-400">1 min read</span>
            </div>
            <div className="p-6 flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{seoContent.successStory.title}</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">✗</span>
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-0.5">The Problem</div>
                      <p className="text-xs text-gray-600 leading-relaxed">{seoContent.successStory.problem}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-0.5">The Fix</div>
                      <p className="text-xs text-gray-600 leading-relaxed">{seoContent.successStory.fix}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:w-48 rounded-xl border-2 border-blue-100 bg-blue-50 p-4 flex flex-col items-center justify-center text-center">
                <span className="text-4xl mb-2">{seoContent.successStory.icon}</span>
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wide">Resolved with</div>
                <div className="text-sm font-black text-blue-900 mt-1">TOOLTRIO</div>
                <div className="text-xs text-blue-600 mt-1">ZIP Tools</div>
              </div>
            </div>
          </div>
        )}

        {/* ── MAIN SEO BODY ─────────────────────────────────────── */}
        {seoContent?.body && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 mb-6 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display',serif" }}>
              {seoContent.heading}
            </h2>
            {seoContent.tagline && (
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">{seoContent.tagline}</p>
            )}
            <div className="prose-sm max-w-none">{renderBody(seoContent.body)}</div>
          </div>
        )}

        {/* ── DATA SOURCES ──────────────────────────────────────── */}
        {seoContent?.dataSources && seoContent.dataSources.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-1 text-center">Official Data Sources & Resources</h2>
            <p className="text-xs text-gray-500 text-center mb-4">We verify our data against official United States government databases to ensure accuracy.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {seoContent.dataSources.map((ds, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
                  <span className="text-2xl shrink-0">{ds.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{ds.name}</div>
                    <div className="text-xs text-gray-500 leading-relaxed mt-0.5">{ds.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-3 text-center">*This website is a private tool and is not affiliated with the USPS or the US Government. "ZIP Code" is a registered trademark of the USPS.</p>
          </div>
        )}

        {/* ── RELATED TOOLS ─────────────────────────────────────── */}
        {relatedTools && relatedTools.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">🔗 Related ZIP Tools</h3>
              <Link href="/zip" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">View all tools →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {relatedTools.map(t => (
                <Link key={t.href} href={t.href}
                  className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <span className="text-base">{t.icon}</span>
                  <span className="font-medium text-gray-700 group-hover:text-blue-700 text-xs leading-tight">{t.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── FAQ ───────────────────────────────────────────────── */}
        {seoContent?.faqs && seoContent.faqs.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 mb-6 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500 mb-5">Real questions from users — answered with detail and precision.</p>
            <div className="space-y-2">
              {seoContent.faqs.map((faq, i) => (
                <details key={i} className="group rounded-xl border border-gray-100 overflow-hidden bg-gray-50/40 hover:border-blue-200 transition-colors">
                  <summary className="px-5 py-4 cursor-pointer font-semibold text-gray-800 text-sm hover:bg-blue-50/50 list-none flex items-start justify-between gap-3">
                    <span className="leading-snug">{faq.q}</span>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 mt-0.5 text-xs">▼</span>
                  </summary>
                  <div className="px-5 pb-4 pt-1 text-sm text-gray-600 leading-7 border-t border-gray-100/80 bg-white">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* ── TOOLTRIO BRAND FOOTER ─────────────────────────────── */}
        <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 mt-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🧰</span>
            <h3 className="font-black text-gray-900 text-base">TOOLTRIO — Free ZIP Code Tool Suite</h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">
            TOOLTRIO (also searched as <em>Tool Trio</em>, <em>ToolTrio</em>, <em>Trio Tools</em>) is a free suite of 35+ US ZIP code tools. No signup, no rate limits. Every tool is free forever on tooltrio.com.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              ['🔍 ZIP Code Lookup','/zip/zip-code-lookup'],
              ['🏙️ ZIP to City','/zip/zip-to-city'],
              ['📏 ZIP Distance','/zip/zip-code-distance'],
              ['🎯 ZIPs in Radius','/zip/zips-within-radius'],
              ['👥 ZIP Population','/zip/zip-code-population'],
              ['✅ ZIP Validator','/zip/zip-code-validator'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-xs bg-white border border-green-200 text-green-700 hover:bg-green-600 hover:text-white hover:border-green-600 rounded-lg px-3 py-1.5 font-medium transition-all">
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
