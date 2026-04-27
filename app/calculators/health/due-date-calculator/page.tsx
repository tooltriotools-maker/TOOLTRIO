import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Due Date Calculator — Pregnancy Due Date by LMP, Conception & Ultrasound 2026',
  description: 'Free Due Date Calculator 2026 — Accurate due date based on medical standards. Instant results with detailed timeline and guidance. No account required, complete privacy guaranteed.',
  slug: 'due-date-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'due date calculator 2026',
    'free due date calculator',
    'due date calculator usa 2026',
    'due date calculator free 2026',
    'pregnancy due date calculator',
    'due date calculator last menstrual period',
    'estimated due date by conception date',
    'due date from ultrasound calculator',
    'how many weeks pregnant am I',
    'trimester calculator by due date',
    'pregnancy milestone dates',
    'due date calculator by ovulation',
    'naegele rule due date calculator',
    'ivf due date calculator',
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
  {question:'How is a pregnancy due date calculated from the last menstrual period?',answer:`The standard due date calculation uses Naegele's Rule: add one year to your last menstrual period (LMP) start date, subtract three months, and add seven days. This produces a 40-week (280-day) pregnancy duration. The LMP-based calculation is used even though fertilization actually occurs approximately 14 days after LMP — so the embryo is biologically 38 weeks old at the 40-week mark. The 40-week duration became the standard in the early 19th century based on Franz Naegele's observations and has remained in use because population-level accuracy is good, even though only about 4% of babies are born on their exact due date.`},
  {question:'How accurate is an early ultrasound for dating compared to LMP?',answer:`A first-trimester ultrasound (before 14 weeks) is significantly more accurate than LMP-based dating and is used to revise the due date if there's more than a 5-7 day discrepancy. Between 8-12 weeks, crown-rump length (CRL) measurement has an accuracy of plus or minus 5-7 days. After 20 weeks, ultrasound dating becomes progressively less accurate — biometry measurements (head circumference, abdominal circumference, femur length) at 20 weeks have accuracy of plus or minus 10-14 days, and after 28 weeks the error increases to 2-3 weeks. The American College of Obstetricians and Gynecologists recommends using the first-trimester ultrasound when it differs from LMP by more than 7 days.`},
  {question:'What percentage of babies are actually born on their due date?',answer:`Only about 4-5% of babies are born on their precise due date. Approximately 70% of births occur within 10 days of the due date (before or after). The normal range for full-term delivery is considered 39-41 weeks — from 3 weeks before to 1 week after the due date. About 11% of births are preterm (before 37 weeks). After 41 weeks, most obstetricians recommend induction due to increasing placental aging and associated risks. The distribution is slightly skewed — first-time mothers tend to deliver a few days after their due date on average, while women who have given birth before tend to deliver slightly earlier.`},
  {question:'What is the difference between gestational age and fetal age?',answer:`Gestational age is counted from the first day of your last menstrual period and is the standard clinical measure — when your doctor says 'you are 10 weeks pregnant,' they mean 10 gestational weeks. Fetal age (also called embryonic age or developmental age) counts from the moment of fertilization, which typically occurs 14 days after LMP. So at 10 gestational weeks, the fetus is biologically 8 weeks old. The distinction matters most in very early pregnancy discussions and in IVF, where fertilization timing is precisely known. All due date calculators, pregnancy apps, and clinical milestones use gestational age — it's the universal language of obstetrics.`},
  {question:'How does IVF affect due date calculation?',answer:`IVF due date calculation is more precise because the exact fertilization date is known. For a fresh IVF cycle with day-3 embryo transfer, add 263 days to the egg retrieval date. For day-5 blastocyst transfer, add 261 days. For frozen embryo transfer, the calculation is similar but the transfer date is used as the reference. Because IVF dating is more precise than LMP-based dating (which assumes ovulation on day 14 regardless of cycle length), IVF pregnancies rarely need ultrasound date revision. IVF due dates are generally considered more reliable than LMP due dates, though the 4% birth-on-due-date statistic applies equally to natural conception and IVF.`},
  {question:'What does \'estimated due date\' actually mean statistically?',answer:`Your due date is the 50th percentile of expected delivery — the single date where exactly half of pregnancies would be expected to have delivered and half would not yet have delivered, if the population had identical gestational ages. It's a median, not a precise prediction. A more statistically accurate way to communicate due date would be a 'delivery window' — something like 'most likely between 39 and 41 weeks, with 95% probability of delivery between 37 and 42 weeks.' The single-date format is clinically practical but creates unrealistic precision expectations. Obstetricians use 42 weeks as the practical upper limit before intervention, because placental function declines significantly beyond this point.`},
  {question:'Can stress or diet affect when labor begins?',answer:`The timing of spontaneous labor onset is influenced by multiple factors that aren't fully understood. Physical and emotional stress can elevate cortisol and catecholamines, which may affect uterine contractility — though the clinical evidence linking everyday stress to preterm labor is weaker than commonly believed. Extreme fetal growth restriction (from malnutrition or placental insufficiency) is associated with earlier delivery. Dehydration can cause Braxton Hicks contractions that sometimes progress to preterm labor. Sexual activity late in pregnancy may have mild prostaglandin-related effects on cervical ripening in some women. Activities and foods traditionally believed to 'start labor' (spicy food, pineapple, castor oil, long walks) have little to no robust clinical evidence supporting their effectiveness.`},
  {question:'What week is considered full term, and why does it matter?',answer:`The American College of Obstetricians and Gynecologists revised full-term definitions in 2013: early term is 37-38 weeks 6 days; full term is 39-40 weeks 6 days; late term is 41-41 weeks 6 days; postterm is 42 weeks or beyond. The distinction matters because outcomes differ meaningfully even within the 'term' range. Babies born at 37-38 weeks have higher rates of respiratory issues, NICU admission, and feeding difficulties compared to babies born at 39-41 weeks. Elective inductions and c-sections before 39 weeks purely for convenience are now discouraged. The 39-40 week window represents optimal fetal maturation for most outcomes including lung, brain, and metabolic development.`},
]

const seoContent = {
  title: 'Due Date Calculator',
  category: 'health' as const,
  intro: `Pregnancy due dates are estimates, not deadlines. Naegele's rule — the standard calculation used by obstetricians for 200 years — adds 280 days (40 weeks) to the first day of your last menstrual period. This assumes a 28-day cycle with ovulation on day 14. Only about 4% of babies are born on their exact due date; roughly 80% arrive within two weeks on either side. The date is a clinical reference point for monitoring development and timing decisions, not a predictive certainty.

Due date accuracy depends on how precisely you know your conception date or last period, and how accurately your cycle matches the 28-day assumption. Early ultrasound (before 12 weeks) is the most accurate dating method — measuring the crown-rump length of the embryo gives a gestational age estimate accurate to ±5-7 days.

This calculator gives you your estimated due date using multiple methods: Naegele's rule from LMP, conception date calculation if you know it, and cycle-length adjusted calculation for those with irregular cycles. It also shows your current gestational age in weeks and days, your trimester, and key pregnancy milestone weeks.

The weeks of pregnancy count from your last menstrual period, not from conception — so at 4 weeks pregnant, conception typically happened 2 weeks prior.

**Long-tail searches answered here:** pregnancy due date calculator free online usa, when will my baby be born calculator, due date calculator by last menstrual period free, pregnancy week calculator from conception date, ivf due date calculator free no signup, how to calculate my due date online free usa 2026, due date calculator using cycle length and lmp free, frozen embryo transfer due date calculator usa free, natural conception due date calculator free online, how accurate is due date from lmp calculator free, due date adjustment for irregular cycles calculator, due date calculator with 28 vs 30 day cycle free, c section scheduled date from due date calculator free, how many weeks until my due date counter free usa, first ultrasound due date accuracy calculator free`,
  howItWorks: `The standard estimated due date (EDD) calculation uses Naegele's Rule: EDD = first day of LMP + 280 days (40 weeks). This assumes a 28-day cycle with ovulation at day 14 — the rule adds 7 days to LMP then counts forward 9 months. For cycles different from 28 days, the EDD is adjusted: add (cycle length - 28) days.

For IVF pregnancies: fresh day-5 blastocyst transfer: EDD = transfer date + 261 days (37 weeks); day-3 transfer: EDD = transfer date + 263 days; frozen-thawed blastocyst: EDD = transfer date + 261 days (adjusted to calendar date of natural cycle ovulation for non-synchronized FET).

Ultrasound EDD is calculated from crown-rump length (CRL) measured at 8-14 weeks using Hadlock's formula: GA (days) = 42.859 + 1.599 × CRL(mm) − 0.00041 × CRL(mm)². Ultrasound EDD is more accurate than LMP-based dating when measured before 14 weeks.`,
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
  tipsSection: `If your ultrasound due date differs from your LMP due date by more than 5-7 days (before 14 weeks), most OBs will adjust the due date to the ultrasound estimate — ultrasound crown-rump length before 14 weeks is the most accurate dating method available.

Due dates are estimates with a wide confidence interval — only 5% of babies are born on their exact due date. The normal range is 38-42 weeks (10 days before to 2 weeks after the EDD). Full-term delivery is 39-40 weeks; early term is 37-38 weeks; late term is 41 weeks; post-term is 42+ weeks.

Planning: use the trimester breakdown and milestone dates for scheduling key appointments. First trimester screening (nuchal translucency ultrasound + bloodwork) should be scheduled between 11-14 weeks; anatomy scan at 18-22 weeks; glucose tolerance test at 24-28 weeks.`,
  scienceSection: `The Naegele's Rule is named after German obstetrician Franz Karl Naegele who described it in 1812 — making it over 200 years old and still the primary due date calculation method in clinical practice. The 40-week gestational period was originally observed empirically and has been validated by large cohort studies. A 2013 study by Jukic et al. (Human Reproduction) analyzed 125 natural conceptions with precisely known fertilization dates and found mean duration from ovulation to delivery was 268 days, with enormous individual variation (228-298 days) — confirming that due dates have wide uncertainty regardless of calculation method.`,
  conclusion: `Use this due date as a planning anchor, not a fixed event. Arrange prenatal care around the first trimester window (initial appointment ideally before 10 weeks), schedule the anatomy ultrasound for 18-20 weeks, and plan your work and personal arrangements around a window of 37-42 weeks rather than a single date.

Post-dates pregnancy (past 42 weeks) is associated with increased risk, and most providers discuss induction if labor hasn't started by 41-42 weeks. But the vast majority of healthy pregnancies deliver without intervention between 39-41 weeks.

Consider using [our Pregnancy Weight Gain Calculator](/calculators/health/pregnancy-weight-gain-calculator) and [our Pregnancy Nutrition Calculator](/calculators/health/pregnancy-nutrition-calculator) alongside this to track the physical and nutritional aspects of your pregnancy progression.`,
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
        generateWebAppStructuredData({ name: 'Due Date Calculator', description: 'Calculate your estimated due date (EDD) using last menstrual period (LMP), known conception date, or ultrasound measurements. Includes pregnancy week ', url: 'https://tooltrio.com/calculators/health/due-date-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Due Date Calculator', description: 'Calculate your estimated due date (EDD) using last menstrual period (LMP), known conception date, or ultrasound measurements. Includes pregnancy week ', url: 'https://tooltrio.com/calculators/health/due-date-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Due Date Calculator', url: '/calculators/health/due-date-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
