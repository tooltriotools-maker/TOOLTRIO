import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})
export const metadata: Metadata = generateCalculatorMetadata({
  title: 'College ROI Calculator USA 2026 — Is a Degree Worth It? | ToolTrio',
  description: 'Calculate the financial return on college education: net present value, payback period, lifetime salary premium, and loan vs no-degree comparison.',
  slug: 'college-roi-calculator',
  category: 'finance',
  region: 'usa',
  keywords: ['college ROI calculator', 'is college worth it calculator USA 2026', 'degree value calculator', 'college salary premium calculator', 'college NPV calculator USA'],
})
const faqs = [
  {
    question: 'How do you calculate the ROI of a college degree?',
    answer: 'ROI = (Lifetime salary premium - Total investment) / Total investment × 100. Total investment includes tuition/fees/room AND the opportunity cost of 4 years of lost wages. A $120,000 degree at $42,000 opportunity cost = $288,000 total investment. If salary premium is $33,000/year for 40 years = $1,320,000 lifetime premium, ROI is about 358%.',
  },
  {
    question: 'Is college worth it financially in 2026?',
    answer: "On average, yes — BLS data shows bachelor's degree holders earn $28,000/year more than high school graduates over their careers. But averages hide enormous variation: a CS degree from a state school ($80,000 cost) vs a liberal arts degree from a private school ($280,000 cost) have dramatically different NPVs. Major and school choice matter more than the degree itself in most ROI calculations.",
  },
  {
    question: 'What majors have the highest financial ROI?',
    answer: "Highest ROI majors: Computer Science, Electrical Engineering, Chemical Engineering, Nursing, Accounting, Finance. Lowest ROI: Fine Arts, Music, Social Work, Philosophy, Education (in many states). Georgetown Center on Education and the Workforce data shows median earnings 10 years post-graduation vary from $38,000 (Early Childhood Education) to $95,000+ (Computer Engineering). Research your specific major's earning outcomes before committing.",
  }
]
const relatedCalculators = [
  { name: 'Student Loan Forgiveness', href: '/calculators/finance/student-loan-forgiveness-calculator', icon: '📚', desc: 'Student Loan Forgiveness' },
  { name: 'College Savings 529', href: '/calculators/finance/college-savings-529-calculator', icon: '🎓', desc: 'College Savings 529' },
  { name: 'Scholarship & Aid', href: '/calculators/finance/scholarship-financial-aid-calculator', icon: '🏫', desc: 'Scholarship & Aid' },
  { name: 'Student Loan Calculator', href: '/calculators/finance/student-loan-calculator', icon: '💰', desc: 'Student Loan Calculator' }
]
const structuredData = [generateFAQStructuredData(faqs)]
export default function Page() {
  return <>
    {structuredData.map((s,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />)}
    <CalculatorClient faqs={faqs} relatedCalculators={relatedCalculators} />
  </>
}
