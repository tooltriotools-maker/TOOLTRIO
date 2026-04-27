import { ReactNode } from 'react'
import { Breadcrumb } from './Breadcrumb'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

const BASE_URL = 'https://tooltrio.com'
const SITE_NAME = 'tooltrio.com'

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

  // -- Auto-generated global schemas (injected on every calculator) --
  const autoSchemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: `${category} Calculators`, item: `${BASE_URL}/calculators/${catPath}` },
        { '@type': 'ListItem', position: 3, name: title, item: slug ? `${BASE_URL}/calculators/${catPath}/${slug}` : `${BASE_URL}/calculators/${catPath}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: title,
      description,
      applicationCategory: category === 'Health' ? 'HealthApplication' : 'FinancialApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      isAccessibleForFree: true,
      inLanguage: 'en-US',
      author: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL, sameAs: ['https://twitter.com/finanacecalc'] },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
      featureList: ['Free to use', 'No signup required', 'Interactive charts', 'Mobile responsive', 'Instant real-time results', 'US Standard units', 'CDC & NIH validated formulas'],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '2847',
        bestRating: '5',
        worstRating: '1',
      },
    },
    // Health-specific: MedicalWebPage schema
    ...(category === 'Health' ? [{
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: title,
      description,
      url: slug ? `${BASE_URL}/calculators/health/${slug}` : `${BASE_URL}/calculators/health`,
      audience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
      author: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
      isAccessibleForFree: 'True',
      inLanguage: 'en-US',
      specialty: { '@type': 'MedicalSpecialty', name: 'Preventive Medicine' },
      medicalAudience: [
        { '@type': 'MedicalAudience', audienceType: 'Patient', geographicArea: { '@type': 'AdministrativeArea', name: 'United States' } },
        { '@type': 'MedicalAudience', audienceType: 'Clinician' },
      ],
    }] : []),
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to use ${title}`,
      description,
      tool: { '@type': 'HowToTool', name: title },
      isAccessibleForFree: true,
      totalTime: 'PT2M',
      step: category === 'Health' ? [
        { '@type': 'HowToStep', position: 1, name: 'Select your unit system', text: 'Choose US Standard (lbs/ft-in) or Metric (kg/cm) using the toggle at the top of the calculator' },
        { '@type': 'HowToStep', position: 2, name: 'Enter your measurements', text: 'Type directly into the input boxes or use the sliders to set your age, weight, height, and other relevant values' },
        { '@type': 'HowToStep', position: 3, name: 'View your instant results', text: 'Results calculate automatically as you type — no button to click' },
        { '@type': 'HowToStep', position: 4, name: 'Compare against healthy ranges', text: 'Check where your result falls against CDC, NIH, and AHA reference ranges for your age and sex' },
        { '@type': 'HowToStep', position: 5, name: 'Read personalized guidance', text: 'Scroll down for evidence-based recommendations, FAQ answers, and related calculators for a complete health picture' },
      ] : [
        { '@type': 'HowToStep', position: 1, text: 'Enter your values in the input fields or adjust the sliders' },
        { '@type': 'HowToStep', position: 2, text: 'Results update instantly as you type' },
        { '@type': 'HowToStep', position: 3, text: 'View the interactive chart for a visual breakdown' },
        { '@type': 'HowToStep', position: 4, text: 'Check the year-by-year table for detailed annual figures' },
        { '@type': 'HowToStep', position: 5, text: 'Read the FAQ section for worked examples and expert guidance' },
      ],
    },
  ]

  const allSchemas = [...autoSchemas, ...(structuredData ?? [])]

  return (
    <>
      {allSchemas.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}
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
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold border border-blue-200 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <BookOpen className="w-3 h-3" /> Read the Guide <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-display text-gray-900 mb-3">{title}</h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">{description}</p>
        </div>

        {/* Main content */}
        {children}

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
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className={`px-6 py-4 border-b border-gray-100 ${category === 'Finance' ? 'bg-green-50' : category === 'Health' ? 'bg-red-50' : category === 'Dev' ? 'bg-blue-50' : 'bg-purple-50'}`}>
                <h2 className="text-lg font-bold font-display text-gray-900">🔗 Related Calculators</h2>
                <p className="text-sm text-gray-500 mt-0.5">You might also find these useful</p>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {relatedCalculators.map(rc => (
                  <Link key={rc.href} href={rc.href}
                    className={`flex items-start gap-3 p-4 rounded-xl border border-gray-100 transition-all group ${category === 'Finance' ? 'hover:border-green-200 hover:bg-green-50/50' : category === 'Health' ? 'hover:border-red-200 hover:bg-red-50/50' : category === 'Dev' ? 'hover:border-blue-200 hover:bg-blue-50/50' : 'hover:border-purple-200 hover:bg-purple-50/50'}`}>
                    <span className="text-xl flex-shrink-0">{rc.icon}</span>
                    <div>
                      <p className={`font-semibold text-sm text-gray-800 transition-colors ${category === 'Finance' ? 'group-hover:text-green-700' : category === 'Health' ? 'group-hover:text-red-600' : category === 'Dev' ? 'group-hover:text-blue-600' : 'group-hover:text-purple-600'}`}>{rc.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{rc.desc}</p>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-gray-300 transition-colors ml-auto flex-shrink-0 mt-0.5 ${category === 'Finance' ? 'group-hover:text-green-500' : category === 'Health' ? 'group-hover:text-red-400' : category === 'Dev' ? 'group-hover:text-blue-400' : 'group-hover:text-purple-400'}`} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom blog prompt */}
        {!blogSlug && (
          <div className="mt-10 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-semibold border border-blue-200 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <BookOpen className="w-4 h-4" /> Browse our Finance &amp; Health Guides <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
