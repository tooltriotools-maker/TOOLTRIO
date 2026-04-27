import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Age Calculator — Exact Age in Years, Months, Days & Hours 2026',
  description: 'Free Age Calculator 2026 — Calculate age instantly with precise results. Evidence-based tool used by health professionals. No signup, no data stored, complete privacy.',
  slug: 'age-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'age calculator 2026',
    'free age calculator',
    'age calculator usa 2026',
    'age calculator free 2026',
    'exact age calculator in days',
    'how many days old am I calculator',
    'age calculator from date of birth',
    'days until my birthday calculator',
    'age difference between two dates',
    'generational cohort calculator millennial gen z',
    'how old will I be in years calculator',
    'age calculator weeks and months',
    'life lived percentage calculator',
    'age calculator for retirement planning',
  ],
})

const relatedCalculators = [
  {name:"Due Date Calculator",href:"/calculators/health/due-date-calculator",icon:"🤰",desc:"Pregnancy age tracking"},
  {name:"Longevity Calculator",href:"/calculators/health/longevity-calculator",icon:"⏳",desc:"Estimated life expectancy"},
  {name:"BMI Calculator",href:"/calculators/health/bmi-calculator",icon:"⚖️",desc:"BMI by age context"},
  {name:"Body Age Calculator",href:"/calculators/health/body-age-calculator",icon:"🧬",desc:"Biological vs chronological age"},
  {name:"Menstrual Cycle Calculator",href:"/calculators/health/menstrual-cycle-calculator",icon:"📅",desc:"Cycle age and tracking"},
  {name:"Sleep Need Calculator",href:"/calculators/health/sleep-need-calculator",icon:"😴",desc:"Sleep needs change with age"},
  {name:"Heart Age Calculator",href:"/calculators/health/heart-age-calculator",icon:"❤️",desc:"Cardiovascular age assessment"},
  {name:"Testosterone Age Calculator",href:"/calculators/health/testosterone-age-calculator",icon:"💪",desc:"Testosterone decline with age"}
]

const faqs = [
  {question:'What is the difference between chronological age and biological age?',answer:`Chronological age is simply the number of years since your birth — the number on your birthday cake. Biological age is how old your body functions relative to population averages. A 50-year-old who exercises regularly, sleeps well, doesn't smoke, and eats a nutritious diet may have a biological age of 38. A 50-year-old who is sedentary, obese, and sleeps poorly may function more like a 62-year-old. Your chronological age never changes — your biological age is always negotiable.`},
  {question:'How does the calculator account for leap years?',answer:`Every 4 years, February gets an extra day — except for century years not divisible by 400 (so 1900 was not a leap year, but 2000 was). The calculator accounts for every leap year between your birth date and today, which is why an exact day count may surprise you. Between 1950 and 2026, for example, there are 19 leap years. Over a lifetime, these extra days add up to roughly 18-19 additional days of life compared to a naive 365-days-per-year calculation.`},
  {question:'At what age does biological aging accelerate most significantly?',answer:`Research published in Nature Medicine in 2021 identified two major inflection points where aging accelerates: around age 44 and again around age 60. The 44-year shift involves changes in lipid metabolism, cardiovascular markers, and alcohol processing. The 60-year shift involves immune function decline, changes in carbohydrate metabolism, and musculoskeletal markers. Between these points, aging is relatively gradual for most people. This is why interventions like exercise and diet often show more dramatic measurable benefit in people in their 40s than in their 30s.`},
  {question:'Why do women statistically live longer than men in most countries?',answer:`The female longevity advantage — roughly 4-6 years in the US — has multiple contributing factors. Biologically, estrogen has protective cardiovascular effects, women have two X chromosomes (a backup if one has a deleterious mutation), and women tend to have stronger immune systems. Behaviorally, men die at higher rates from accidents, suicide, violence, and are less likely to seek preventive medical care. Occupational exposure to hazards has historically been higher for men. The gap has been narrowing as women's lifestyle patterns have shifted — smoking rates, for example, converged significantly in the second half of the 20th century.`},
  {question:'How accurate are age calculators that estimate biological or health age?',answer:`The accuracy varies enormously by what the calculator measures. A calculator based purely on lifestyle questionnaire responses (sleep, exercise, diet, stress) has meaningful population-level validity but wide individual error — perhaps plus or minus 5-10 years for any specific person. Calculators based on actual biomarkers (telomere length, epigenetic methylation clocks like GrimAge or DunedinPACE) are significantly more accurate at the individual level, but require blood tests. The most validated biological age clocks — the Horvath clock and its successors — use DNA methylation patterns and can predict mortality risk more accurately than chronological age alone.`},
  {question:'Can I realistically reduce my biological age?',answer:`Yes — this is one of the more exciting areas of current longevity research. Exercise is the most consistently documented intervention: a 2022 meta-analysis found that regular aerobic and resistance training can reduce biological age markers by 3-10 years. Caloric restriction and time-restricted eating show promise in multiple studies. Smoking cessation shows rapid biological age improvement within 1-2 years of quitting. Adequate sleep (7-9 hours) is associated with slower epigenetic aging. Some pharmaceutical interventions (metformin, rapamycin) are currently in clinical trials specifically targeting biological age reduction. The bad news: no supplement currently has robust evidence matching lifestyle interventions.`},
  {question:'What milestones should I know about when tracking age in days?',answer:`A few satisfying milestones worth knowing: you hit 10,000 days at roughly age 27 years and 4.5 months. 20,000 days arrives at about age 54 years and 9 months. The average American life expectancy of 76.4 years corresponds to approximately 27,920 days. Many people celebrate their 5,000-day, 10,000-day, and 15,000-day birthdays as more meaningful personal milestones than standard birthdays. Your 1-billion-second mark arrives at approximately age 31 years and 8.5 months — another oddly satisfying number to know.`},
  {question:'How does the day count differ from simply multiplying age by 365?',answer:`The difference between exact day counting and multiplying years by 365 grows with age due to leap years and partial years. At age 30, the exact calculation differs from 30 × 365 = 10,950 by roughly 7-8 days (from leap years). At age 50, the difference is about 12-13 days. At age 70, the difference is approximately 17-18 days. The month and day of your birth relative to today's date adds an additional partial-year correction. A person who just celebrated their birthday is about 365 days ahead of someone with the same birth year whose birthday is tomorrow — this creates up to a full year of difference within any birth cohort.`},
]

const seoContent = {
  title: 'Age Calculator',
  category: 'health' as const,
  intro: `Your exact age sounds like a simple number — but there is surprising depth in what it actually tells you. This calculator goes beyond a simple year count to give you your age in every unit: years, months, weeks, days, hours, and even minutes if you know your birth time. It also tells you how many days until your next birthday, which generation you belong to based on research-based cohort definitions, and what percentage of a statistical average lifespan you have lived.

These numbers have practical uses beyond trivia: insurance policies, retirement accounts, Medicare eligibility, legal contracts, and medical screening recommendations all use specific age thresholds. Knowing your precise age in each unit ensures you never miss a deadline or qualification by failing to account for exactly where you are in the calendar year.

The calculator also shows age differences between two dates — useful for comparing ages between family members, calculating relationship age gaps, or determining how long ago a specific event occurred.

For a deeper analysis of how your biological age may differ from your chronological age, try [our Body Age Calculator](/calculators/health/body-age-calculator) and [our Heart Age Calculator](/calculators/health/heart-age-calculator).

**Long-tail searches answered here:** free age calculator in years months days usa, how old am i in days calculator, exact age calculator from date of birth online free, age calculator for passport renewal usa, chronological age calculator no signup, how to calculate exact age without a calculator, age calculator that shows months weeks and days free, how many months old is my baby calculator free usa, age calculator for retirement eligibility free online, how old will i be in 10 years calculator free usa, age in different time zones calculator free online, age calculator for school enrollment cutoff usa free, how to calculate age from social security number guide, age at a specific future date calculator free usa, age difference between two people calculator free online`,
  howItWorks: `Age in years is calculated by subtracting the birth year from the current year, then adjusting backward by 1 if today's date falls before the birthday in the current year. The remaining months and days are calculated from the last birthday date to today's date using standard calendar arithmetic accounting for variable month lengths and leap years.

Total age in days counts every calendar day from birth date to today, adding one day for every February 29 that falls within the range. The birthday countdown counts forward from today to the next occurrence of the birth month and day, wrapping across the year boundary when necessary.

Generational cohort assignment uses Pew Research Center birth year boundaries and returns both the generation name and a brief cultural description of that cohort.`,
  benefits: [
        {title:"Six-unit age breakdown",text:"See your age in years, months, weeks, days, hours, and minutes simultaneously — useful for understanding exactly how old you are relative to age-specific milestones, deadlines, and thresholds.",},
        {title:"Days until next birthday",text:"Real-time countdown to your next birthday, including the day of the week it will fall on — useful for planning and for those who track milestone birthdays.",},
        {title:"Two-date age difference",text:"Calculate the exact age difference between any two people or any two dates — supporting relationship, insurance, and eligibility calculations.",},
        {title:"Generational cohort identification",text:"Instant assignment to your generational cohort (Boomer, Gen X, Millennial, Gen Z, Alpha) based on Pew Research definitions — useful for sociological context and demographic research.",},
        {title:"Life percentage elapsed",text:"Shows what percentage of the average US life expectancy your current age represents, with sex-specific life expectancy data from the most recent CDC mortality statistics.",},
        {title:"Historical date calculator",text:"Enter any past or future date as the 'current' date to calculate how old you would be at that point — useful for historical research and future planning.",},
  ],
  useCases: [
        {title:"Eligibility for age-gated benefits",text:"Verify exact age for Medicare eligibility (65), Social Security full retirement age (66-67 depending on birth year), early withdrawal rules (59½ for retirement accounts), or voting eligibility to understand precisely when benefits become available.",},
        {title:"Medical screening timing",text:"Many health screenings have specific age triggers: colonoscopy at 45, mammograms at 40-50, PSA test at 50. Knowing your exact age in months ensures you schedule screenings at the right time.",},
        {title:"Legal and contractual age verification",text:"Contracts, insurance policies, and legal documents often have age clauses that depend on your age on a specific date. The exact date-based calculation ensures precision.",},
        {title:"Birthday celebration planning",text:"Know exactly how many days until a milestone birthday to plan the appropriate celebration window.",},
  ],
  tipsSection: `Remember that legal age (for benefits, contracts, healthcare) is always based on calendar year birthdays — not exact days or months. Your official age changes on your birthday, not on any other date in the year, regardless of what the exact day count shows.

For medical screening purposes, many age thresholds are actually ranges (e.g., 'between 45 and 75 years old for colorectal cancer screening') rather than exact year requirements. Check with your healthcare provider or insurance plan for the specific criteria that apply to your situation.

Birthday countdown is calculated from today's date — if your birthday has already occurred this calendar year, the countdown shows days until next year's birthday.`,
  scienceSection: `Calendar age calculation has been standardized through international coordination of the Gregorian calendar (established 1582 and now universally used for civil purposes). The calculation of age in days requires accounting for the irregular lengths of months (28-31 days) and the leap year rule (year divisible by 4, except century years not divisible by 400).

Generational cohort research has been led by demographers and social scientists including those at Pew Research Center, which publishes the most widely cited birth year boundaries for generational cohorts in the US context. The boundaries reflect shared formative experiences rather than biological or legal criteria.`,
  conclusion: `Your age in years is one number; your age in all its dimensions — days, percentage of lifespan, generation, days to your next birthday — tells a richer story about where you are in life's arc. Use these numbers to stay ahead of important age-based milestones, whether health screenings, financial thresholds, or personal reflection on how you want to spend the time you have.

For health-specific age perspectives, explore [our Body Age Calculator](/calculators/health/body-age-calculator), [our Heart Age Calculator](/calculators/health/heart-age-calculator), and [our Longevity Calculator](/calculators/health/longevity-calculator).`,
  comparisonTable: [        {label:"US Average Life Expectancy",value:"76.4 years (CDC 2021)",note:"73.5 for men, 79.3 for women",},
        {label:"Days per year (average)",value:"365.25 days",note:"Accounts for one leap year every 4 years",},
        {label:"Generational span (average)",value:"~15-17 years",note:"Per Pew Research cohort definitions",},
        {label:"US Centenarians",value:"~90,000",note:"Americans currently over age 100, per US Census",},],
  didYouKnow: [        'Research shows that people who feel subjectively younger than their chronological age have significantly better health outcomes and lower mortality risk — a phenomenon researchers call \'subjective age.\'',
        'The oldest verified person (Jeanne Calment) lived 44,724 days — more than 3.8 million minutes of documented human life.',],
  keyStats: [        {stat:"76.4 years",source:"US average life expectancy at birth, 2021 (CDC)",},
        {stat:"122 years, 164 days",source:"Longest verified human lifespan (Jeanne Calment, France)",},
        {stat:"~90,000",source:"Estimated US centenarians (age 100+)",},
        {stat:"1/5,000",source:"Odds that a 100-year-old will reach 110",},],
  mistakesDetailed: [],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Age Calculator', description: 'Calculate your exact age in years, months, weeks, days, hours, and minutes from your date of birth. Also calculate age between any two dates, days unt', url: 'https://tooltrio.com/calculators/health/age-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Age Calculator', description: 'Calculate your exact age in years, months, weeks, days, hours, and minutes from your date of birth. Also calculate age between any two dates, days unt', url: 'https://tooltrio.com/calculators/health/age-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Age Calculator', url: '/calculators/health/age-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
