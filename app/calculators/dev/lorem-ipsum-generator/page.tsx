import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Lorem Ipsum Generator — Placeholder Text Free Online',
  description: 'Generate Lorem Ipsum placeholder text in words, sentences, or paragraphs. Classic and randomized variants. Used for design mockups and layout testing.',
  slug: 'lorem-ipsum-generator',
  keywords: ['lorem ipsum generator online free','placeholder text generator browser','dummy text generator free','lorem ipsum paragraphs words online','generate filler text free','lipsum generator browser'],
})

const faqs = [
  { question: 'What is Lorem Ipsum text and where does it come from?', answer: `Lorem Ipsum is placeholder text derived from a 1st century BC work by Cicero, "de Finibus Bonorum et Malorum." The passage starting with "Lorem ipsum dolor sit amet..." is a scrambled excerpt from section 1.10.32. It has been used as placeholder text since the 1960s when Letraset introduced it on dry-transfer sheets, becoming ubiquitous in desktop publishing and now the universal standard for layout placeholder content.` },
  { question: 'Why use Lorem Ipsum instead of actual content for mockups?', answer: "Three reasons: (1) Meaningful text distracts — clients and stakeholders read actual words and comment on content rather than design layout and visual hierarchy. Nonsense text keeps focus on visual decisions. (2) Lorem Ipsum has realistic character distribution and word lengths for Latin-based languages. (3) It is immediately recognizable as a placeholder — it signals content will be replaced, preventing clients from treating dummy text as a real mistake that needs correction." },
  { question: 'What are good alternatives to Lorem Ipsum for specific contexts?', answer: "Industry-specific generators: Cupcake Ipsum (food-themed), Corporate Lorem (business jargon), Cat Ipsum. For testing international layouts: use actual target-language text — Chinese/Japanese characters are wider than Latin, affecting layout significantly. For edge case testing: extremely long words, short words, accented characters (ü, ñ, é), and mixed LTR/RTL text. For realistic simulation: use the Fake Data Generator on this site for names, addresses, and realistic sentences in form fields." },
  { question: 'How much Lorem Ipsum should I use for different content areas?', answer: "Typical content lengths to simulate: button label: 1-4 words. Card title: 3-7 words. Card description: 20-50 words. Blog post excerpt: 50-100 words. Article paragraph: 75-150 words. Full blog post: 800-2000 words. Email body: 150-400 words. Product description: 50-200 words. Always fill every content area in mockups — areas left empty do not reveal layout issues that only appear with realistic content lengths." },
  { question: 'Can Lorem Ipsum text accidentally appear in production?', answer: `Yes — this is a significant quality control failure. Published Lorem Ipsum signals an incomplete page to visitors, harms SEO (thin content), and can cause client or brand issues. Prevention: add a pre-deployment check grepping for "Lorem ipsum" in production builds. CI/CD pipelines can fail the build if found. Include a "no Lorem ipsum in production" requirement as a quality gate in your design-to-development handoff process.` },
  { question: 'Does Lorem Ipsum affect performance testing of a page?', answer: "Not significantly for typical web performance — text compresses extremely well with gzip/brotli. The difference between 500 words of Lorem Ipsum and 500 words of actual content is negligible for load time. Where content matters for performance testing: images (placeholder vs real product photos have vastly different file sizes), video, and API response sizes. For Lighthouse and Core Web Vitals testing, use production-realistic images for accurate LCP measurements." },
  { question: 'What other content generation tools are on this site?', answer: "The Fake Data Generator produces realistic names, emails, and addresses for form testing. The Markdown Preview lets you see how real written content renders. The Word Counter measures word counts against content length targets. The Markdown Table Generator builds placeholder data tables. The Text Case Converter formats placeholder headings. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Lorem Ipsum Generator — Placeholder Text Free Online',
    description: 'Generate Lorem Ipsum placeholder text in words, sentences, or paragraphs. Classic and randomized variants. Used for design mockups and layout testing.',
    slug: 'lorem-ipsum-generator',
    faqs,
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
      {jsonLd.faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }} />
      )}
      <CalculatorClient faqs={faqs} />
    </>
  )
}
