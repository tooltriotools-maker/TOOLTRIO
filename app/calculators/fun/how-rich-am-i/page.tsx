import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'How Rich Am I? – Global Wealth Percentile Calculator',
  description: 'Find out where your income ranks globally. Are you in the top 1%? Enter your annual income and see your wealth percentile compared to 8 billion people worldwide. Free.',
  slug: 'how-rich-am-i',
  keywords: [
    'how rich am I calculator',
    'global wealth percentile calculator',
    'am I rich compared to the world',
    'income percentile calculator global',
    'world income ranking calculator',
    'top 1 percent income calculator',
    'how does my income compare globally',
    'global income comparison tool',
    'how wealthy am I compared to others',
    'rich or poor calculator',
    'world wealth calculator',
    'income percentile by country',
    'am I in the top 10 percent',
    'global income rank free',
    'how much do I earn compared to the world',
    'wealth comparison calculator 2026',
    'richest people calculator',
    'income inequality calculator',
    'how rich am I compared to Jeff Bezos',
    'how many people earn less than me',
    'global median income comparison',
    'developing world income comparison',
    'income percentile USA calculator',
    'income percentile UK calculator',
    'how rich am I India',
    'tooltrio.com',
    'free calculator no signup',
    'instant calculator results',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'What income makes you rich globally vs in the US?',
    answer: 'This is where the numbers get humbling. The global median income is around $2,500 per year. Someone earning $35,000 in the US — considered lower-middle class domestically — sits in approximately the top 3–4% of all earners on Earth. An income of $50,000 puts you comfortably in the global top 1% by most calculations. The calculator shows you your real global rank.'
  },
  {
    question: 'How is the global wealth percentile calculated?',
    answer: 'The tool uses purchasing-power-adjusted income data from sources including the World Bank and Global Rich List datasets. It compares your annual income against the distribution of incomes across ~8 billion people in 180+ countries. Because living costs vary enormously, raw income comparisons without PPP adjustment can be misleading — the calculator accounts for this.'
  },
  {
    question: 'Does the calculator adjust for cost of living?',
    answer: 'Yes and no — the default view shows your raw global rank by income. An optional view adjusts for purchasing power parity (PPP), which gives a more "real" comparison of what your money actually buys. Both views are illuminating in different ways. The raw comparison tends to be the more emotionally impactful number.'
  },
  {
    question: 'How does my income compare to Jeff Bezos or Elon Musk?',
    answer: 'The calculator includes a fun comparison showing how long it would take someone at your income to earn what the world\'s wealthiest billionaires earn in a single day. Spoiler: the numbers are absurd in a way that makes the inequality very tangible. It is a useful perspective anchor, not a source of envy (hopefully).'
  },
  {
    question: 'Can I enter household income or just personal income?',
    answer: 'You can enter either — the tool has options for individual and household income. Household income is useful if you want to understand your family\'s position. Individual income is better for comparing your personal earnings to global norms. Both produce interesting results, just measuring different things.'
  },
  {
    question: 'Is this tool accurate or just a rough estimate?',
    answer: 'It is a solid estimate based on real global income distribution data, updated periodically. It should not be cited in an academic paper, but it is accurate enough to give you a genuine sense of your global economic position. The broad conclusion — that most people in wealthy countries are globally affluent — is well-supported by economic research.'
  },
  {
    question: 'Does this make people feel guilty or just curious?',
    answer: 'Both, honestly. Many users find it motivating for charitable giving — seeing that $20/month to an effective charity represents a meaningful proportion of the global median income changes how people think about giving. Others find it humbling in a healthy way. Some people are just curious and end up sharing the result because it surprises them.'
  },
  {
    question: 'Is my income data stored or shared?',
    answer: 'No. The calculation runs entirely in your browser. You can type in your actual salary or a completely made-up number — either way, nothing leaves your device. No data is ever transmitted to any server.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
