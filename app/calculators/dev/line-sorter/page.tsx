import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Line Sorter — Sort, Reverse, and Shuffle Lines Free Online',
  description: 'Sort lines alphabetically, numerically, by length, or reverse. Shuffle randomly. Trim whitespace and remove empty lines. Runs entirely in your browser.',
  slug: 'line-sorter',
  keywords: ['line sorter online free','sort lines alphabetically browser','sort text lines free','reverse sort lines online','line sorter no duplicates'],
})

const faqs = [
  { question: 'What sorting options are available beyond alphabetical?', answer: 'Alphabetical (A-Z or Z-A): standard dictionary sort, case-sensitive or insensitive. Numeric: sorts by value — 10 comes after 9, unlike alphabetical where 10 comes before 2. By length (shortest to longest or reverse): useful for revealing structure or optimizing CSS selector ordering. Random shuffle: Fisher-Yates algorithm for uniform random order. Reverse current order: flips existing order without re-sorting. Remove empty lines: cleans up lists with blank lines. Trim whitespace: removes leading/trailing spaces from each line before sorting.' },
  { question: 'When is numeric sort different from alphabetical sort?', answer: 'Critical difference: alphabetical treats everything as text — "10" sorts before "2" because "1" comes before "2" in ASCII. A list sorted alphabetically: 1, 10, 100, 2, 20, 3. The same list numerically: 1, 2, 3, 10, 20, 100. For pure number lists always use numeric sort. For file names with embedded numbers (file10.txt, file2.txt), natural sort handles this correctly — pad numbers (file002.txt) to make alphabetical match natural order when natural sort is unavailable.' },
  { question: 'How do I sort lines and remove duplicates simultaneously?', answer: 'Use the Line Sorter to sort alphabetically, then pass the result to the Duplicate Remover on this site. Or in a terminal: sort -u file.txt sorts and deduplicates in one step. For case-insensitive sort and dedup: sort -f -u file.txt. The -u flag removes exact duplicates after applying the sort comparison, so sort -f -u applies case-insensitive deduplication after case-insensitive sorting.' },
  { question: 'What is the Fisher-Yates shuffle for random ordering?', answer: 'Fisher-Yates (also Knuth shuffle) generates a uniformly random permutation. It iterates from end to beginning, swapping each element with a random element at or before its position. This produces a perfectly uniform random permutation — every possible ordering is equally likely. Naive approaches (sorting with Math.random() as comparator) produce biased distributions. Use Fisher-Yates for randomizing test data ordering, quiz questions, playlist shuffles, and A/B test conditions.' },
  { question: 'How do I sort a list of URLs by domain?', answer: 'URLs sorted alphabetically group by protocol first (http:// before https://). To sort by domain: extract the domain with a Regex Tester pattern ((?:https?://)?([^/]+)), sort the extracted domains, then reconstruct. Alternatively use sort -t/ -k3 in a terminal to sort by the third slash-delimited field (the domain). The Line Sorter sorts full lines — for field-based sorting, preprocess with regex or command-line tools first.' },
  { question: 'When would I sort lines by length?', answer: 'Sort by length is useful for: CSS optimization (shorter selectors are faster to parse), building longest-match rule lists (route patterns, URL patterns), analyzing word frequency distribution, ordering enum values by string length for display, and finding the longest/shortest lines in log output. Sorting by ascending length naturally puts single-word items first and multi-word or long strings last — useful for quick visual scanning of a list structure.' },
  { question: 'What other text tools are on this site?', answer: 'The Duplicate Remover removes repeated lines — often used after sorting. The Word Counter counts lines before and after to verify the sort did not drop content. The Text Case Converter normalizes case before case-insensitive sorting. The Regex Tester can extract specific fields from lines for field-based sorting. The Diff Checker shows what changed between original and sorted output. All are in the Dev Tools Text section.' },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Line Sorter — Sort, Reverse, and Shuffle Lines Free Online',
    description: 'Sort lines alphabetically, numerically, by length, or reverse. Shuffle randomly. Trim whitespace and remove empty lines. Runs entirely in your browser.',
    slug: 'line-sorter',
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
