import type { Metadata } from 'next'
import { generateFunToolMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import { generateFunToolStructuredData } from '@/lib/seo/structured-data'
import { getInsultGeneratorBySlug, INSULT_GENERATORS } from '@/lib/fun/insult-generators'
import { buildInsultFaqs } from '@/lib/fun/insultFaqs'
import InsultGeneratorClient from './InsultGeneratorClient'

const SLUG = 'sarcastic-comeback-generator'
const generator = getInsultGeneratorBySlug(SLUG)!

export const metadata: Metadata = generateFunToolMetadata({
  title: `${generator.name} | ToolTrio`,
  description: generator.metaDescription,
  slug: `insult-generator/${generator.slug}`,
  keywords: generator.keywords,
})

const faqs = buildInsultFaqs(generator)

// Full library, every other generator — cross-linking every insult/roast/comeback
// generator from every individual generator page (not just a random sample).
const related = INSULT_GENERATORS
  .filter(g => g.slug !== generator.slug)
  .map(g => ({ slug: g.slug, name: g.name, icon: g.icon }))

const structuredData = generateFunToolStructuredData({
  name: generator.name,
  description: generator.metaDescription,
  slug: `insult-generator/${generator.slug}`,
})
const faqStructuredData = generateFAQStructuredData(faqs)

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <InsultGeneratorClient generator={generator} related={related} faqs={faqs} />
    </>
  )
}
