import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Duplicate Line Remover — Remove Duplicate Lines Free Online',
  description: 'Remove duplicate lines from any text. Sort, deduplicate, case-insensitive options. Works for lists, log files, and data cleanup. Runs entirely in your browser.',
  slug: 'duplicate-remover',
  keywords: ['duplicate line remover online free','remove duplicate lines browser','unique lines extractor free','deduplicate text online','remove repeated lines tool'],
})

const faqs = [
  { question: 'How is case sensitivity handled when removing duplicates?', answer: "Case-sensitive mode treats 'Apple' and 'apple' as different lines — both are kept. Case-insensitive mode treats them as duplicates — only one is kept (typically the first occurrence). For code deduplication (class names, function names, URLs) where case matters, use case-sensitive. For general word lists, email lists, and natural language text where case is inconsistent, case-insensitive produces cleaner results. Most log file deduplication should be case-sensitive since log entries with different capitalization may indicate different events or sources." },
  { question: 'What happens to the order of lines after deduplication?', answer: "Removing duplicates while preserving original order: the first occurrence of each line is kept, subsequent duplicates are removed. The relative order of unique lines is unchanged. Removing duplicates with sorting: lines are sorted alphabetically (or numerically) first, then duplicates removed — output is always in sorted order. Sorted deduplication is useful when you need a canonical unique list. Order-preserving deduplication is important when line sequence conveys meaning (like a prioritized list or a sequence of commands)." },
  { question: 'How do I remove duplicate lines in a terminal without this tool?', answer: "On Unix/Linux/Mac: sort file.txt | uniq removes duplicates from a sorted file. uniq only removes adjacent duplicates, so sort first. awk '!seen[$0]++' file.txt removes duplicates while preserving order (no sort needed). For case-insensitive: sort -f file.txt | uniq -i. In Python: lines = list(dict.fromkeys(open('file.txt').readlines())) preserves order. In PowerShell: Get-Content file.txt | Sort-Object -Unique. For large files (millions of lines), the command-line tools are much faster than browser-based tools which are limited by available RAM." },
  { question: 'How do I remove duplicate URLs or emails from a list?', answer: "Paste the list one URL or email per line, then run deduplication with case-insensitive mode enabled (URLs and emails are case-insensitive in practice — example.com/PAGE and example.com/page should be treated as the same URL). For email lists specifically: normalize to lowercase first using the Text Case Converter, then deduplicate. For URLs with tracking parameters (utm_source, fbclid), two URLs with different parameters pointing to the same page will not be caught as duplicates — you would need to strip the parameters first with the Regex Tester before deduplicating." },
  { question: 'How do I count how many duplicates were found?', answer: "The tool shows the original line count and the unique line count after deduplication — the difference is the number of duplicate lines removed. For a more detailed duplicate analysis (which lines appear most often), the command-line tool sort file.txt | uniq -c | sort -rn shows each unique line with its occurrence count, sorted by frequency. This is useful for identifying the most common log messages, the most frequent user actions, or the most repeated entries in any dataset." },
  { question: 'Can I use this to find unique values in a CSV column?', answer: "Not directly — this tool works on full lines. To find unique values in a specific CSV column: either extract the column first (paste only the column values, one per line), then deduplicate here. Or use command-line tools: cut -d',' -f2 file.csv | sort | uniq for column 2. In Python: df['column'].unique() with pandas. For simple lists where each line is a single value (IDs, names, emails), this tool works perfectly. For multi-column CSV deduplication on a specific key, use the CSV to JSON converter first, then filter with the JSONPath Tester." },
  { question: 'What other text manipulation tools are on this site?', answer: "The Line Sorter sorts lines alphabetically, numerically, or randomly — often used before deduplication. The Word Counter gives line counts for before and after comparison. The Text Case Converter normalizes case before case-insensitive deduplication. The Diff Checker shows exactly which lines were removed after deduplication. The Regex Tester can find and remove specific patterns rather than whole-line duplicates. All are in the Dev Tools Text section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Duplicate Line Remover — Remove Duplicate Lines Free Online',
    description: 'Remove duplicate lines from any text. Sort, deduplicate, case-insensitive options. Works for lists, log files, and data cleanup. Runs entirely in your browser.',
    slug: 'duplicate-remover',
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
