import type { Metadata } from 'next'
import { generateFunToolMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Random Fact Generator | ToolTrio',
  description: 'Generate random interesting facts about science, history, animals, space, food, and more. A new mind-blowing fact every click. Free, ad-free, no login needed.',
  slug: 'random-fact-generator',
  keywords: [
    'random fact generator',
    'interesting random facts online',
    'surprising facts generator free',
    'daily random fact',
    'random fact of the day',
    'mind blowing facts generator',
    'fun facts online free',
    'random science facts generator',
    'tooltrio.com',
  ],
})

const faqs = [
  {
    question: 'How many facts are in the generator?',
    answer: 'Several hundred verified facts across eight categories: science, history, animals, space, food and drink, human body, geography, and pop culture. The generator weights categories to ensure variety — you will not see three animal facts in a row. With the pool size and randomization, most people can click through 30–40 facts before seeing a repeat.'
  },
  {
    question: 'Are the facts actually true and verified?',
    answer: 'Every fact in the database has been checked against reliable sources — peer-reviewed research, major encyclopedias, and established science journalism. We also flag facts that are "technically true but often misunderstood" with context notes. For example, "humans share 50% of DNA with bananas" is true but needs the caveat that this refers to gene function, not genetic similarity in the usual sense.'
  },
  {
    question: 'Can I filter facts by category?',
    answer: 'Yes — use the category buttons to focus on space, history, animals, or whichever topic you are in the mood for. The category filter is especially useful for trivia prep, classroom use, or when you want to go deep on one topic. Teachers often use the science and history categories to generate lesson openers.'
  },
  {
    question: 'What are some examples of facts in the generator?',
    answer: 'A sampling: Oxford University is older than the Aztec Empire. A group of flamingos is called a flamboyance. The total weight of all ants on Earth roughly equals the total weight of all humans. Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid. Honey never spoils — edible honey has been found in 3,000-year-old Egyptian tombs. These are the kinds of facts that make you pause and re-read them.'
  },
  {
    question: 'Is this good for trivia night preparation?',
    answer: 'Great for it. Many people use the generator in the days before a trivia night to load up on unexpected facts across categories. The facts are deliberately chosen for their "wait, really?" quality — the kind that stick in memory because they contradict your prior assumptions. That stickiness also makes them useful as conversation openers.'
  },
  {
    question: 'Can I share a specific fact I liked?',
    answer: 'Yes — each fact has a share button that copies it with a link back to the generator. Sharing random facts on social media tends to get strong engagement when the fact is genuinely surprising. "Did you know..." posts with well-chosen facts consistently outperform most other content types in terms of saves and shares.'
  },
  {
    question: 'Does the generator include facts suitable for kids?',
    answer: 'All facts in the generator are family-friendly. The animal category is particularly popular with younger audiences — facts about weird animal superpowers, unusual animal behaviors, and record-breaking creatures tend to be the most shared facts by parents with their kids.'
  },
]

export default function Page() {
  const _faqSchema = generateFAQStructuredData(faqs)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} />
    </>
  )
}
