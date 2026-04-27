import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Bitwise Calculator — AND, OR, XOR, NOT Operations Free',
  description: 'Perform AND, OR, XOR, NOT, and shift operations on binary values. Shows binary, decimal, and hex output. Runs in your browser.',
  slug: 'bitwise-calculator',
  keywords: ['bitwise calculator online free','and or xor not bit operations','bitwise operator calculator browser','binary bitwise operations free','bit manipulation tool online'],
})

const faqs = [
  { question: 'Does this tool send my data to a server?', answer: 'No — all processing happens entirely in your browser using JavaScript on your device. Nothing is transmitted to any server. Your data is cleared when you close the tab.' },
  { question: 'What is the most common mistake when using this tool?', answer: 'The most frequent issue is incorrect input format — this tool follows the standard specification for its data type. If you get unexpected results, verify your input is well-formed and matches the expected format shown in the placeholder.' },
  { question: 'Does this work on mobile devices?', answer: 'Yes — this tool is fully responsive and works on modern mobile browsers including Safari on iOS and Chrome on Android. For tools involving large text input, a desktop browser provides a better experience.' },
  { question: 'Can I use the output in production?', answer: 'Yes — the output follows standard specifications and conventions. Always test in your specific context before deploying to production, especially for security-sensitive tools.' },
  { question: 'Is there a file size or input length limit?', answer: 'No hard limit is imposed. Processing happens in your browser using your device memory. Very large inputs may slow performance on lower-powered devices.' },
  { question: 'What browsers are supported?', answer: 'All modern browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. No extensions, plugins, or installs required.' },
  { question: 'What other tools complement this one?', answer: 'The JSON Formatter, Diff Checker, and Regex Tester are frequently used alongside this tool for complete development workflows. All are in the Dev Tools section.' },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Bitwise Calculator — AND, OR, XOR, NOT Operations Free',
    description: 'Perform AND, OR, XOR, NOT, and shift operations on binary values. Shows binary, decimal, and hex output. Runs in your browser.',
    slug: 'bitwise-calculator',
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
