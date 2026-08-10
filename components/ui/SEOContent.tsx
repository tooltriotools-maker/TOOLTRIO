import React from 'react'
import Link from 'next/link'
import { cleanHealthGuideText, isGenericHealthBenefit, isGenericHealthUseCase } from '@/lib/content/health-content'
import { HEALTH_SOURCE_PROFILES } from '@/lib/content/health-sources'

export interface SEOContentProps {
  title: string
  /** Optional jurisdiction label for genuinely regional guides. */
  regionLabel?: string
  category: 'health' | 'finance' | 'dev' | 'fun'
  intro: string
  howItWorks: string
  benefits: { title: string; text: string }[]
  useCases?: { title: string; text: string }[]
  scienceSection?: string
  tipsSection?: string
  commonMistakes?: string
  conclusion: string
  didYouKnow?: string[]
  comparisonTable?: { label: string; value: string; note?: string }[]
  caseStudy?: {
    title: string
    scenario: string
    result: string
    takeaway: string
  }
  inlineLinks?: { text: string; href: string; label: string }[]
  keyStats?: { stat: string; source: string }[]
  mistakesDetailed?: { mistake: string; fix: string }[]
  strategySections?: { title: string; steps: string[] }[]
  /** Stable calculator slug used to attach claim-level health sources. */
  healthSourceProfile?: string
}


const GENERIC_MARKETING_TITLES = new Set([
  'Evidence-based clinical formulas',
  'Instant real-time results',
  'Complete data privacy',
  'Health context included',
  'Works on all devices',
  'Completely free',
  '100% Free - No Signup, No Subscription, No Ads',
  'Complete Privacy - Your Data Stays on Your Device',
  'Works Perfectly on All Devices & Browsers',
])

const GENERIC_MARKETING_TEXT_PATTERNS = [
  /no signup, no subscription, no premium features/i,
  /everything runs locally in your browser/i,
  /works flawlessly/i,
  /tested on all major .* browsers/i,
  /every american deserves access/i,
]

function isGenericMarketingBlock(item: { title: string; text: string }): boolean {
  return GENERIC_MARKETING_TITLES.has(item.title.trim()) || GENERIC_MARKETING_TEXT_PATTERNS.some(pattern => pattern.test(item.text))
}

// Renders text with [Link Label](/url) patterns as actual clickable links
function RichText({ content, category }: { content: string; category?: SEOContentProps['category'] }) {
  const safeContent = category === 'health' ? cleanHealthGuideText(content) : content
  const parts = safeContent.split(/(\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((part, i) => {
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (linkMatch) {
          return (
            <Link key={i} href={linkMatch[2]}
              className="text-green-700 font-semibold underline underline-offset-2 hover:text-green-800 transition-all">
              {linkMatch[1]}
            </Link>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

// Render paragraphs with rich text links
function RichParagraphs({ text, category }: { text: string; category: SEOContentProps['category'] }) {
  return (
    <div className="space-y-3">
      {text.split('\n\n').map(p => category === 'health' ? cleanHealthGuideText(p) : p).filter(p => p.trim()).map((para, i) => (
        <p key={i} className="text-gray-600 leading-relaxed text-base">
          <RichText content={para.trim()} />
        </p>
      ))}
    </div>
  )
}

export function SEOContent({
  title, regionLabel, category, intro, howItWorks, benefits, useCases = [],
  scienceSection, tipsSection = '', commonMistakes, conclusion,
  didYouKnow, comparisonTable, caseStudy, inlineLinks,
  keyStats, mistakesDetailed, strategySections, healthSourceProfile,
}: SEOContentProps) {
  const healthProfile = category === 'health' && healthSourceProfile ? HEALTH_SOURCE_PROFILES[healthSourceProfile] : undefined

  const c = {
    health:  { border: 'border-rose-100',   bg: 'bg-rose-50',   text: 'text-rose-700',   badge: 'bg-rose-100 text-rose-700',   head: 'bg-rose-600',   accent: '#e11d48' },
    finance: { border: 'border-green-100',  bg: 'bg-green-50',  text: 'text-green-700',  badge: 'bg-green-100 text-green-700',  head: 'bg-green-600',  accent: '#16a34a' },
    dev:     { border: 'border-blue-100',   bg: 'bg-blue-50',   text: 'text-blue-700',   badge: 'bg-blue-100 text-blue-700',   head: 'bg-blue-600',   accent: '#2563eb' },
    fun:     { border: 'border-purple-100', bg: 'bg-purple-50', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700', head: 'bg-purple-600', accent: '#7c3aed' },
  }[category]

  return (
    <div className="mt-12 space-y-10 max-w-4xl mx-auto">
      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">Calculator Guide</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      {/* Key Stats Bar */}
      {keyStats && keyStats.length > 0 && (
        <div className={`rounded-2xl p-5 ${c.bg} border ${c.border}`}>
          <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${c.text}`}>📊 Key Data Points</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {keyStats.map((ks, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-gray-100">
                <p className={`text-lg font-black ${c.text}`}>{ks.stat}</p>
                <p className="text-xs text-gray-500 mt-0.5">{ks.source}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Introduction */}
      <section aria-labelledby="seo-intro">
        <h2 id="seo-intro" className="text-2xl font-black text-gray-900 mb-5" style={{fontFamily:"'Inter', system-ui, sans-serif"}}>
          {title}{regionLabel ? ` — ${regionLabel}` : ''} Guide
        </h2>
        <RichParagraphs text={intro} category={category} />
      </section>

      {/* Case Study */}
      {caseStudy && (
        <section className="border-l-4 border-green-400 bg-green-50 rounded-r-2xl p-6">
          <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">📋 Real-World Case Study</p>
          <h3 className="text-lg font-black text-gray-900 mb-3">{caseStudy.title}</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-semibold">Scenario:</span> <RichText content={caseStudy.scenario} category={category} /></p>
            <p><span className="font-semibold">Result:</span> <RichText content={caseStudy.result} category={category} /></p>
            <p className={`font-bold ${c.text} mt-3`}>💡 Takeaway: <RichText content={caseStudy.takeaway} category={category} /></p>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section aria-labelledby="how-it-works" className={`rounded-2xl p-6 border ${c.border} ${c.bg}`}>
        <h2 id="how-it-works" className={`text-xl font-black mb-4 ${c.text}`}>🔬 How This Calculator Works</h2>
        <RichParagraphs text={howItWorks} category={category} />
      </section>

      {/* Comparison Table */}
      {comparisonTable && comparisonTable.length > 0 && (
        <section aria-labelledby="comparison-table">
          <h2 id="comparison-table" className="text-xl font-black text-gray-900 mb-4">📊 Side-by-Side Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className={`${c.bg} border-b ${c.border}`}>
                  <th className={`px-5 py-3 text-left font-bold ${c.text} text-xs uppercase tracking-wider`}>Scenario</th>
                  <th className={`px-5 py-3 text-left font-bold ${c.text} text-xs uppercase tracking-wider`}>Result</th>
                  <th className={`px-5 py-3 text-left font-bold ${c.text} text-xs uppercase tracking-wider`}>Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonTable.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-all">
                    <td className="px-5 py-3 font-semibold text-gray-800">{row.label}</td>
                    <td className={`px-5 py-3 font-black ${c.text}`}>{row.value}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Benefits */}
      <section aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="text-xl font-black text-gray-900 mb-5">✅ What This Calculator Calculates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.filter(b => !isGenericMarketingBlock(b) && (category !== 'health' || !isGenericHealthBenefit(b.title))).map((b, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <h3 className={`font-black text-sm mb-2 ${c.text}`}>{b.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                <RichText content={b.text} category={category} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Mistakes Section */}
      {mistakesDetailed && mistakesDetailed.length > 0 && (
        <section aria-labelledby="mistakes-heading">
          <h2 id="mistakes-heading" className="text-xl font-black text-gray-900 mb-5">⚠️ Common Mistakes & How to Avoid Them</h2>
          <div className="space-y-3">
            {mistakesDetailed.map((m, i) => (
              <div key={i} className="border border-red-100 rounded-xl overflow-hidden">
                <div className="bg-red-50 px-4 py-2.5 flex items-start gap-2">
                  <span className="text-red-500 font-black text-sm flex-shrink-0">✗</span>
                  <p className="text-sm font-semibold text-red-700">{m.mistake}</p>
                </div>
                <div className="bg-green-50 px-4 py-2.5 flex items-start gap-2">
                  <span className="text-green-500 font-black text-sm flex-shrink-0">v</span>
                  <p className="text-sm text-green-800">
                    <RichText content={m.fix} category={category} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Use Cases */}
      {useCases.length > 0 && (
      <section aria-labelledby="use-cases-heading">
        <h2 id="use-cases-heading" className="text-xl font-black text-gray-900 mb-5">🎯 When to Use {title}</h2>
        <div className="space-y-5">
          {useCases.filter(uc => !isGenericMarketingBlock(uc) && (category !== 'health' || !isGenericHealthUseCase(uc.title))).map((uc, i) => (
            <div key={i} className="border-l-4 border-gray-200 pl-5">
              <h3 className="font-black text-gray-900 mb-1.5">{uc.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                <RichText content={uc.text} category={category} />
              </p>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Strategy Sections */}
      {strategySections && strategySections.length > 0 && (
        <section aria-labelledby="strategy-heading">
          <h2 id="strategy-heading" className="text-xl font-black text-gray-900 mb-5">🎯 Step-by-Step Strategy</h2>
          {strategySections.map((s, i) => (
            <div key={i} className="mb-6">
              <h3 className={`font-black ${c.text} mb-3`}>{s.title}</h3>
              <ol className="space-y-2">
                {s.steps.map((step, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-full ${c.badge} flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5`}>{j+1}</span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <RichText content={step} category={category} />
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
      )}

      {/* Tips */}
      {tipsSection.trim() && (
      <section aria-labelledby="tips-heading" className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <h2 id="tips-heading" className="text-xl font-black text-amber-800 mb-4">💡 {title}: Tips for Accurate Results</h2>
        <RichParagraphs text={tipsSection} category={category} />
      </section>
      )}

      {/* Common Mistakes (text form) */}
      {commonMistakes && !mistakesDetailed && (
        <section aria-labelledby="mistakes-text-heading" className="bg-red-50 border border-red-100 rounded-2xl p-6">
          <h2 id="mistakes-text-heading" className="text-xl font-black text-red-700 mb-4">⚠️ Common Mistakes to Avoid</h2>
          <RichParagraphs text={commonMistakes} category={category} />
        </section>
      )}

      {/* Science */}
      {scienceSection && (
        <section aria-labelledby="science-heading" className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <h2 id="science-heading" className="text-xl font-black text-gray-800 mb-4">🔢 Data Sources & Methodology</h2>
          <RichParagraphs text={scienceSection} category={category} />
        </section>
      )}

      {/* Health methodology, sources and limitations */}
      {healthProfile && (
        <section aria-labelledby="health-sources-heading" className={`rounded-2xl p-6 border ${c.border} ${c.bg}`}>
          <h2 id="health-sources-heading" className={`text-xl font-black mb-4 ${c.text}`}>📚 Methodology, Sources & Limitations</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">{healthProfile.methodology}</p>
          <div className="mb-5">
            <h3 className="font-black text-gray-900 mb-2">Important limitations</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
              {healthProfile.limitations.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-black text-gray-900 mb-2">Sources</h3>
            <ul className="space-y-2 text-sm">
              {healthProfile.sources.length > 0 ? healthProfile.sources.map((source, i) => (
                <li key={i}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-rose-700 font-semibold underline underline-offset-2">{source.label}</a>
                  {source.sourceDate && <span className="text-gray-500"> — {source.sourceDateType === 'updated' ? 'updated' : 'published'} {source.sourceDate}</span>}
                </li>
              )) : <li className="text-amber-800">No authoritative source assigned yet; manual review is required before publishing a validation claim.</li>}
            </ul>
          </div>
          {healthProfile.status === 'needs_manual_review' && (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">This calculator requires formula/claim review before its result is described as clinically validated.</p>
          )}
        </section>
      )}

      {/* Did You Know */}
      {didYouKnow && didYouKnow.length > 0 && (
        <section aria-labelledby="facts-heading">
          <h2 id="facts-heading" className="text-xl font-black text-gray-900 mb-4">📌 Did You Know?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {didYouKnow.map((fact, i) => (
              <div key={i} className={`rounded-xl p-4 ${c.bg} border ${c.border}`}>
                <p className={`text-xs font-bold uppercase tracking-wider ${c.text} mb-1`}>Fact #{i+1}</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  <RichText content={fact} category={category} />
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Inline Related Calculators */}
      {inlineLinks && inlineLinks.length > 0 && (
        <section className={`rounded-2xl p-6 border ${c.border} ${c.bg}`}>
          <p className={`text-xs font-bold uppercase tracking-wider ${c.text} mb-4`}>🔗 Use These Together</p>
          <div className="flex flex-wrap gap-2">
            {inlineLinks.map((link, i) => (
              <Link key={i} href={link.href}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border ${c.border} text-sm font-semibold ${c.text} hover:shadow-sm transition-all`}>
                {link.text}
              <span className="text-gray-400 text-xs">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Conclusion */}
      <section aria-labelledby="conclusion-heading" className={`rounded-2xl p-6 border-2 ${c.border}`}>
        <h2 id="conclusion-heading" className="text-xl font-black text-gray-900 mb-4">🏁 {title}: Key Takeaways</h2>
        <RichParagraphs text={conclusion} category={category} />
      </section>
    </div>
  )
}
