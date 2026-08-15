import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Sparkles } from 'lucide-react'
import { INSULT_TOOLS_WITH_LIBRARY } from '../data'
import { InsultGeneratorClient } from '../InsultGeneratorClient'
import { getArticleSections, getFAQs } from '../content'
import { generateBreadcrumbStructuredData, generateWebApplicationStructuredData } from '@/lib/seo/structured-data'

const BASE = 'https://tooltrio.com'

export function generateStaticParams() {
  return INSULT_TOOLS_WITH_LIBRARY.map(tool => ({ slug: tool.slug }))
}

export const dynamicParams = false

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const tool = INSULT_TOOLS_WITH_LIBRARY.find(item => item.slug === slug)
  if (!tool) return {}
  const description = `${tool.shortDescription} Free, instant, no signup required.`
  const url = `${BASE}/fun/insult-generator/${tool.slug}`
  return {
    title: `${tool.title} | Free Online Tool`,
    description,
    keywords: [...tool.keywords, 'free insult generator', 'fun generator', 'ToolTrio'],
    alternates: { canonical: url },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
    openGraph: {
      type: 'website',
      url,
      title: `${tool.title} | ToolTrio`,
      description,
      siteName: 'ToolTrio',
      images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: tool.title }],
    },
    twitter: { card: 'summary_large_image', title: `${tool.title} | ToolTrio`, description, images: [`${BASE}/og-image.png`] },
  }
}

export default async function InsultGeneratorPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const tool = INSULT_TOOLS_WITH_LIBRARY.find(item => item.slug === slug)
  if (!tool) notFound()

  const sections = getArticleSections(tool)
  const faqs = getFAQs(tool)
  const url = `${BASE}/fun/insult-generator/${tool.slug}`

  const applicationSchema = generateWebApplicationStructuredData({
    name: tool.title,
    description: tool.shortDescription,
    url,
    applicationCategory: 'EntertainmentApplication',
  })
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: 'Home', url: BASE },
    { name: 'Fun Tools', url: `${BASE}/fun` },
    { name: 'Insult Generators', url: `${BASE}/fun/insult-generator` },
    { name: tool.title, url },
  ])
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#faf5ff,_white_42%,_#fff7ed)]">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/fun" className="hover:text-gray-900">Fun Tools</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/fun/insult-generator" className="hover:text-gray-900">Insult Generators</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900">{tool.title}</span>
          </nav>

          <header className="mx-auto mb-9 max-w-4xl text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-white bg-white text-4xl shadow-xl shadow-purple-200/50">
              {tool.icon}
            </div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-purple-700">
              <Sparkles className="h-3.5 w-3.5" /> Free fun generator
            </div>
            <h1 className="text-4xl font-black tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              {tool.title}
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              {tool.shortDescription}
            </p>
          </header>

          <InsultGeneratorClient tool={tool} />

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="rounded-[2rem] border border-gray-200 bg-white/90 p-6 shadow-xl shadow-gray-200/30 sm:p-9">
              <div className="mb-8 border-b border-gray-100 pb-6">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-purple-600">The complete guide</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">How to use this generator well</h2>
                <p className="mt-3 leading-7 text-gray-600">
                  Explore the generator first, then use the guide below for ideas, context, and practical ways to turn a quick result into better humor or creative writing.
                </p>
              </div>

              <div className="space-y-10">
                {sections.map(section => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-black tracking-tight text-gray-900">{section.heading}</h2>
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={index} className="mt-4 leading-8 text-gray-700">{paragraph}</p>
                    ))}
                  </section>
                ))}
              </div>
            </div>

            <section className="mt-10 rounded-[2rem] border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 sm:p-9">
              <h2 className="text-3xl font-black text-gray-950">Frequently asked questions</h2>
              <div className="mt-6 divide-y divide-purple-100">
                {faqs.map(faq => (
                  <details key={faq.question} className="group py-5">
                    <summary className="cursor-pointer list-none pr-8 text-base font-extrabold text-gray-900 marker:hidden">
                      <span className="group-open:text-purple-700">{faq.question}</span>
                    </summary>
                    <p className="mt-3 leading-7 text-gray-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-[2rem] border border-gray-200 bg-white p-6 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-gray-500">Explore more</p>
                  <h2 className="mt-1 text-2xl font-black text-gray-950">Try another insult style</h2>
                </div>
                <Link href="/fun/insult-generator" className="rounded-2xl bg-gray-900 px-5 py-3 text-sm font-extrabold text-white hover:bg-gray-800">
                  View all 18 generators →
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
