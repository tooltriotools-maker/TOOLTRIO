import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Pregnancy Due Date Calculator — EDD by LMP, IVF Transfer & Ultrasound 2026',
  description: 'Free Pregnancy Due Date Calculator 2026. Calculate your accurate pregnancy due date using Naegele\'s Rule and Mittendorf-Williams standards. Includes trimester timeline and weekly milestones.',
  slug: 'pregnancy-due-date-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'pregnancy due date calculator 2026',
    'free pregnancy due date calculator',
    'pregnancy due date calculator usa 2026',
    'pregnancy due date calculator free 2026',
    'pregnancy due date calculator by lmp',
    'ivf due date calculator',
    'due date from ultrasound calculator',
    'naegele rule due date',
    'how accurate is due date calculator',
    'due date calculator weeks pregnant',
    'earliest ultrasound due date',
    'due date probability calendar',
    '40 weeks from lmp calculator',
    'edd calculation methods',
  ],
})

const relatedCalculators = [

  {name:"BMI Calculator",href:"/calculators/health/bmi-calculator",icon:"⚖️",desc:"Body mass index assessment"},
  {name:"Calorie Calculator",href:"/calculators/health/calorie-calculator",icon:"🍎",desc:"Daily calorie needs"},
  {name:"TDEE Calculator",href:"/calculators/health/tdee-calculator",icon:"⚡",desc:"Total energy expenditure"},
  {name:"Body Fat Calculator",href:"/calculators/health/body-fat-calculator",icon:"💪",desc:"Body composition analysis"},
  {name:"Protein Intake Calculator",href:"/calculators/health/protein-intake-calculator",icon:"🥩",desc:"Optimal protein targets"},
  {name:"Water Intake Calculator",href:"/calculators/health/water-intake-calculator",icon:"💧",desc:"Daily hydration needs"},
  {name:"Heart Rate Calculator",href:"/calculators/health/heart-rate-calculator",icon:"❤️",desc:"Cardiovascular zones"},
  {name:"Macro Calculator",href:"/calculators/health/macro-calculator",icon:"🥗",desc:"Macronutrient targets"}

]

const faqs = [
  {question:'How is a due date calculated?',answer:`The standard due date is calculated using Naegele's Rule: take the first day of your last menstrual period (LMP), add one year, subtract three months, and add seven days — producing a date 40 weeks (280 days) from LMP. This assumes a 28-day cycle with ovulation on day 14. Most apps and clinics simply add 280 days to the LMP date, yielding identical results. This date represents the median expected delivery — only about 4% of babies are born on it exactly. The meaningful frame is the full-term window of 39-41 weeks, within which approximately 70% of spontaneous deliveries occur.`},
  {question:'How accurate is LMP-based due dating?',answer:`LMP-based due dates are reasonably accurate for women with regular 28-day cycles but become progressively less reliable with irregular or longer/shorter cycles. A woman with a 35-day cycle likely ovulates 7 days later than assumed, making true gestational age 7 days less than the LMP calculation suggests. First-trimester ultrasound crown-rump length (CRL) is significantly more accurate and is used to revise the due date when it differs from LMP by more than 5-7 days before 10 weeks, or 7-10 days between 10-14 weeks. Clinical guidelines recommend accepting ultrasound dating over LMP when the two disagree beyond these thresholds.`},
  {question:'What percentage of babies are born on their due date?',answer:`Only about 4-5% of babies are born on their precise due date. Approximately 50% of spontaneous deliveries occur within ±5 days of the calculated date, 70% within ±10 days, and 90% within ±20 days. First-time mothers tend to deliver slightly later on average — approximately 2-4 days after the due date. Current ACOG definitions: early term (37-38 weeks 6 days), full term (39-40 weeks 6 days), late term (41-41 weeks 6 days), postterm (42+ weeks). These refined categories explain why ob-gyns discourage elective deliveries before 39 weeks without medical indication.`},
  {question:'What happens if you go past your due date?',answer:`Most post-dates pregnancies proceed without complication, but risks increase beyond 41-42 weeks. Placental aging after approximately 40-42 weeks can impair oxygen and nutrient delivery. Post-dates fetuses are more likely to pass meconium into the amniotic fluid, risking meconium aspiration syndrome at birth. Macrosomia (large baby) from continued fetal growth increases shoulder dystocia risk. Stillbirth risk increases modestly after 41 weeks and more significantly after 42 weeks. Most obstetricians recommend induction between 41 and 42 weeks, with many recommending at 41 weeks based on risk-benefit evidence.`},
  {question:'How does IVF affect due date calculation?',answer:`IVF provides the most precise due date because fertilization timing is exactly known. For a 5-day blastocyst transfer: add 261 days to the transfer date. For a 3-day embryo transfer: add 263 days. These IVF due dates are highly accurate and rarely need ultrasound revision. Gestational age in IVF pregnancies is counted from 14 days before egg retrieval — standardizing with LMP-based dating so clinical guidance applies equally. This means an IVF patient is technically 2 weeks 'pregnant' at egg retrieval by gestational dating, even though no LMP occurred.`},
  {question:'What is the Bishop score and why does it matter?',answer:`The Bishop score is a clinical assessment of cervical readiness for labor, evaluating dilation, effacement, consistency, position, and fetal station. Scores range 0-13; scores of 8+ suggest a favorable cervix for induction with good expected success rates; scores below 6 suggest cervical ripening (with prostaglandins or a balloon catheter) will be needed before oxytocin induction. The Bishop score is routinely assessed near the due date when discussing induction timing and method. A woman at 41 weeks with a Bishop score of 9 faces a very different induction process than one with a score of 3.`},
  {question:'Can you predict when labor will start?',answer:`Predicting spontaneous labor onset remains beyond current clinical capability. Signs indicating labor is approaching — cervical dilation and effacement, fetal descent, increased Braxton Hicks, loss of the mucous plug — are unreliable for precise timing. The mucous plug may be lost days to weeks before labor begins. The Bishop score predicts induction success but not spontaneous onset. The exact hormonal trigger for labor initiation in humans is incompletely understood, appearing to involve fetal signaling to the maternal system combined with progressive uterine oxytocin sensitization as term approaches.`},
  {question:'What is considered early term versus full term?',answer:`ACOG revised term definitions in 2013 because outcomes differ meaningfully across the 37-42 week range. Early term (37-38 weeks 6 days): babies have higher rates of respiratory issues, NICU admission, and feeding difficulties than at full term. Full term (39-40 weeks 6 days): the optimal delivery window for best neonatal outcomes. Late term (41-41 weeks 6 days). Postterm (42+ weeks). Elective inductions and cesareans before 39 weeks purely for convenience are now strongly discouraged because even one or two weeks of additional gestation meaningfully improves lung, brain, and metabolic development.`},
]

const seoContent = {
  title: 'Pregnancy Due Date Calculator',
  category: 'health' as const,
  intro: `The due date is one of the first and most anticipated numbers in a pregnancy — and one of the most frequently misunderstood. An estimated due date (EDD) is exactly that: an estimate based on statistical probabilities, not a prediction of the actual delivery date. Fewer than 5% of babies are born on their due date; roughly 80% arrive within two weeks on either side.

Naegele's rule — adding 280 days to the first day of the last menstrual period — has been the clinical standard for over 200 years. It assumes a 28-day cycle with ovulation on day 14, which describes fewer than 15% of women. For cycles that are regularly longer (e.g., 35 days), the due date should be shifted forward by the number of days the cycle exceeds 28.

Early ultrasound (before 12 weeks) provides the most accurate gestational dating — crown-rump length measurement gives an age estimate accurate to ±5-7 days. When LMP-based dating and ultrasound dating disagree by more than a week, ultrasound dating is preferred for clinical decisions.

This calculator provides your due date using multiple methods, along with current gestational age, trimester, and key milestone weeks.

**Long-tail searches answered here:** pregnancy due date calculator free online usa 2026, when is my baby due date calculator free tool, due date calculator from last period date free, ivf embryo transfer due date calculator usa free, how many weeks until my due date calculator no signup, naegele rule due date calculator free online, due date calculator with irregular cycle adjustment free, ivf fresh vs frozen cycle due date calculator usa, when is my due date from positive test date calculator, gestational age from due date calculator usa free, how accurate is lmp based due date calculator free, third trimester start date from due date calculator, early anatomy scan due date adjustment calculator free, postdate pregnancy how overdue calculator usa free, due date estimator with multiple calculation methods free`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate pregnancy due date from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

Results are calibrated against population reference data from major US health surveys including NHANES (National Health and Nutrition Examination Survey), giving your result meaningful context relative to real Americans of your age and sex.

All calculations run locally in your browser. No data is transmitted anywhere. Results appear instantly as you adjust inputs.`,
  benefits: [
        {title:"Evidence-based clinical formulas",text:"Uses peer-reviewed, validated formulas from major health organizations — the same calculations trusted by healthcare professionals in clinical and research settings."},
        {title:"Instant real-time results",text:"Results update as you type — no button to click. Explore multiple scenarios in seconds to understand how changes affect your result."},
        {title:"Complete data privacy",text:"All calculations run entirely in your browser. No personal health data is transmitted, stored, or shared anywhere — ever."},
        {title:"Health context included",text:"Beyond a raw number, results include reference ranges, health category classification, and guidance from major health organizations on what your result means."},
        {title:"Works on all devices",text:"Fully responsive design works perfectly on phone, tablet, and desktop. No app download required — just open in your browser."},
        {title:"Completely free",text:"No signup, no subscription, no premium features. Every calculation and all health context is permanently free for every user."},
  ],
  useCases: [
        {title:"Annual health monitoring",text:"Calculate and record key health metrics annually to build a personal health history that reveals meaningful trends and supports proactive health decisions over time."},
        {title:"Doctor appointment preparation",text:"Arrive at medical appointments with your own calculations already done, enabling more focused and productive conversations about your health with your healthcare provider."},
        {title:"Wellness program participation",text:"Track progress in employer wellness programs or personal health initiatives with objective, calculated metrics that are meaningful and evidence-based."},
        {title:"Health education and research",text:"Students, educators, and researchers in health and nutrition fields use these tools to apply classroom formulas to real-world calculations and develop genuine health literacy."},
  ],
  tipsSection: `Take measurements consistently under the same conditions for meaningful trend comparisons. Use the same time of day, same equipment, and same protocol each time you recalculate to minimize measurement variability.

Track trends over months rather than reacting to any single measurement. Health metrics fluctuate naturally based on hydration, food intake, sleep, and stress — patterns over 3-6 months are far more meaningful than individual data points.

Bring your results to your healthcare provider for professional interpretation in the context of your full health history, especially if results fall significantly outside the healthy reference ranges shown.`,
  scienceSection: `The formulas underlying this calculator are derived from peer-reviewed research published in major medical and scientific journals. Reference ranges are drawn from NHANES population survey data — the CDC's nationally representative survey of American adults — ensuring your result is compared against real, current population data.

As with all health calculations, individual results differ from population-average predictions based on genetic factors, medications, health conditions, and lifestyle variables. These calculations are educational tools, not diagnostic instruments. Always consult qualified healthcare professionals for medical decisions.`,
  conclusion: `Plan your professional and personal arrangements around a 37-42 week delivery window rather than a single date. For work leave planning, 38-40 weeks is reasonable; for childcare arrangements, having some flexibility for 2-3 weeks on either side is realistic.

Medically, term pregnancy is now classified as early term (37-38 weeks), full term (39-40 weeks), late term (41 weeks), and post-term (42+ weeks). Outcomes are best for babies born at full term — even early term babies have slightly higher rates of NICU admission and respiratory issues.

Use [our Pregnancy Calculator](/calculators/health/pregnancy-calculator) for a full week-by-week milestone guide, [our Pregnancy Weight Gain Calculator](/calculators/health/pregnancy-weight-gain-calculator) to track appropriate weight gain by trimester.`,
  comparisonTable: [],
  didYouKnow: [],
  keyStats: [],
  mistakesDetailed: [],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Pregnancy Due Date Calculator', description: 'Calculate your estimated due date from your last menstrual period (LMP), IVF embryo transfer date, or earliest ultrasound crown-rump length. Includes ', url: 'https://tooltrio.com/calculators/health/pregnancy-due-date-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Pregnancy Due Date Calculator', description: 'Calculate your estimated due date from your last menstrual period (LMP), IVF embryo transfer date, or earliest ultrasound crown-rump length. Includes ', url: 'https://tooltrio.com/calculators/health/pregnancy-due-date-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Pregnancy Due Date Calculator', url: '/calculators/health/pregnancy-due-date-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
