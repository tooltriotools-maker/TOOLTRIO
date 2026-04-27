import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Pizza Calculator – How Many Pizzas Do I Need for My Group?',
  description: 'Calculate exactly how many pizzas to order for any group size, appetite level, and pizza size. Never over- or under-order again. Free pizza party calculator online.',
  slug: 'pizza-calculator',
  keywords: [
    'how many pizzas do I need calculator',
    'pizza calculator for group',
    'pizza order calculator',
    'how many pizzas for a party',
    'pizza slices per person calculator',
    'pizza party calculator free',
    'how many pizzas for 10 people',
    'how many pizzas for 20 people',
    'how many pizzas for 30 people',
    'pizza calculator by group size',
    'large pizza slices calculator',
    'medium vs large pizza calculator',
    'pizza per person calculator',
    'how many slices in a pizza',
    'pizza ordering guide online',
    'pizza hunger level calculator',
    'how much pizza to order',
    'best pizza calculator 2026',
    'pizza size comparison calculator',
    'pizza cost per slice calculator',
    'party pizza planning tool',
    'pizza calculator kids vs adults',
    'how many boxes of pizza calculator',
    'pizza calculator no signup',
    'pizza order estimate free',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'How many slices does a large pizza have?',
    answer: 'A standard large pizza (14 inches) typically comes with 8 slices. An extra-large (16–18 inches) usually has 8–10 slices. Medium pizzas (12 inches) generally have 6–8 slices. However, this varies by pizzeria — some cut large pizzas into 10 slices, others into 6. The calculator uses 8 slices for large as the default but lets you adjust.'
  },
  {
    question: 'How many pizza slices does the average person eat?',
    answer: 'The standard rule of thumb is 2–3 slices per adult for a regular meal. Teenagers and very hungry adults might eat 3–4 slices. Children typically eat 1–2 slices. The calculator accounts for appetite levels (light, normal, hungry, very hungry) and adjusts based on group composition. A crowd of teenage boys requires significantly more pizza than a work lunch meeting.'
  },
  {
    question: 'Is it better to order fewer large pizzas or more medium ones?',
    answer: 'Almost always order large. The math heavily favors large pizzas. A 14-inch pizza has about 154 square inches of pizza. Two 10-inch mediums give you only 157 square inches — roughly the same amount — but at almost always a higher combined price. The large pizza is typically 30–40% more pizza per dollar than mediums. The calculator factors this in when estimating cost.'
  },
  {
    question: 'Does the calculator account for dietary restrictions?',
    answer: 'Yes — you can indicate how many guests are vegetarian, vegan, or have other dietary needs. This helps you split the order intelligently rather than getting 5 pepperoni pizzas for a group with 3 vegetarians. The tool outputs a recommended order breakdown by type.'
  },
  {
    question: 'How do I calculate pizza for a mix of kids and adults?',
    answer: 'Enter your headcount, then use the age mix slider to indicate the proportion of children. Kids roughly eat half the pizza of an adult, so a party of 10 adults and 5 kids is equivalent to about 12–13 adult servings in pizza terms. The calculator handles this automatically so you do not have to do the arithmetic yourself.'
  },
  {
    question: 'What if people are also having sides, appetizers, or it is not the main meal?',
    answer: 'Reduce your pizza count by about 25–30% if you are serving significant sides (salads, bread, wings). If pizza is a snack at a party rather than the main meal, plan on 1–1.5 slices per person. The calculator has a "meal type" option — main meal vs snack vs buffet-style — that adjusts quantities accordingly.'
  },
  {
    question: 'Can I calculate the cost per person?',
    answer: 'Yes — enter the price per pizza (or per slice) and the calculator outputs total cost and cost per person. Useful for splitting bills fairly or budgeting an event. It also shows the price difference between ordering large vs medium pizzas so you can make the value-optimized choice.'
  },
  {
    question: 'Is this calculator free?',
    answer: 'Completely free. No account needed. Use it every time you order pizza for a group and never again end up with either three leftover boxes or a crowd staring at empty trays wondering if more is coming.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
