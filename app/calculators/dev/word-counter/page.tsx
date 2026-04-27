import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Word Counter — Words, Characters, Sentences, Reading Time',
  description: 'Count words, characters, sentences, paragraphs, and estimate reading time. Works for blog posts, tweets, meta descriptions, and API response strings. Runs in your browser.',
  slug: 'word-counter',
  keywords: ['word counter online free','character count tool browser','word count text online','count words characters sentences','word frequency counter free'],
})

const faqs = [
  { question: "How is reading time estimated?", answer: `The industry standard for reading time estimation is 200-250 words per minute for adult readers in English. This tool uses 200 WPM as a conservative baseline, rounding up to the nearest half-minute. A 1,000-word article = approximately 5 minutes read time. Medium.com popularized reading time estimates and uses a similar calculation. For technical documentation with code samples, actual reading time is typically longer than the word-count estimate since readers slow down on code and reference material.` },
  { question: "How does the word counter handle hyphenated words and contractions?", answer: `Hyphenated words (well-known, state-of-the-art) are counted as one word — the hyphen connects them into a compound modifier. This matches how most style guides define a word. Contractions (don't, it's, we're) are counted as one word each, not split into component parts. Apostrophes within a word do not create word boundaries. Different word processors handle this slightly differently, which is why word counts can vary by 1-3% between tools for the same text.` },
  { question: "What are the character limits for various platforms?", answer: `Common limits: Twitter/X posts: 280 characters (URLs count as 23 regardless of actual length). SMS messages: 160 characters per segment. Meta description: 150-160 characters. Meta title: 50-60 characters. LinkedIn posts: 3,000 characters. Email subject lines: under 60 characters for full display in most clients. Alt text for images: under 125 characters. Push notifications: 50 characters for title, 100 for body.` },
  { question: "How do I use the word counter for SEO content optimization?", answer: `For on-page SEO: most top-ranking content for competitive keywords runs 1,500-2,500 words — long enough to cover the topic thoroughly. For meta descriptions: aim for 140-155 characters. For article headings (H2s): 40-60 characters. For alt text: 80-125 characters. For title tags: 50-60 characters. The counter also helps identify keyword density — if you paste your draft, you can estimate if a target keyword appears at 0.5-2% frequency (the generally recommended range).` },
  { question: "Why does my word count differ between this tool and Microsoft Word?", answer: `Word processors implement word counting slightly differently. Microsoft Word counts hyphenated compound words as two words; most other tools count them as one. URLs are often split at slashes and dots by Word, inflating the count. Numbers with decimal points may be counted differently. Footnotes and headers are included in Word's count but might not be if you copy only the body. A 1-5% variance is normal and insignificant for most purposes.` },
  { question: "Can I count characters in a string for programming purposes?", answer: `Yes — paste any string and the character count includes every character including spaces, punctuation, and special characters. Note: character count and byte count differ for non-ASCII text. 'hello' is 5 characters and 5 bytes in UTF-8. '東京' is 2 characters but 6 bytes in UTF-8 (each CJK character is 3 bytes). If you are checking string length for a database VARCHAR column (which counts characters) vs a VARBINARY column (which counts bytes), or for an API that limits by bytes rather than characters, this distinction matters.` },
  { question: "What other text tools are on this site?", answer: `The Text Case Converter handles transforming text to camelCase, snake_case, UPPER_CASE, and other formats. The Duplicate Remover strips repeated lines. The Regex Tester can find and count specific patterns. The HTML to Markdown converter strips HTML tags before counting. The Diff Checker shows what was added or removed between two versions. All are in the Dev Tools Text section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Word Counter — Words, Characters, Sentences, Reading Time',
    description: 'Count words, characters, sentences, paragraphs, and estimate reading time. Works for blog posts, tweets, meta descriptions, and API response strings. Runs in your browser.',
    slug: 'word-counter',
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
