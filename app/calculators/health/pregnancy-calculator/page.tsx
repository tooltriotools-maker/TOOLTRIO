import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Pregnancy Calculator — Due Date, Week-by-Week Guide & Trimester Milestones 2026',
  description: 'Free Pregnancy Calculator 2026 — Accurate pregnancy based on medical standards. Instant results with detailed timeline and guidance. No account required, complete privacy guaranteed.',
  slug: 'pregnancy-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'pregnancy calculator 2026',
    'free pregnancy calculator',
    'pregnancy calculator usa 2026',
    'pregnancy calculator free 2026',
    'pregnancy calculator',
    'how many weeks pregnant',
    'pregnancy week by week calculator',
    'pregnancy milestone dates',
    'trimester dates calculator',
    'fetal development week by week',
    'pregnancy appointment schedule',
    'gestational age calculator',
    'pregnancy test timing',
    'pregnancy symptoms by week',
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
  {question:'How are pregnancy weeks counted?',answer:`Pregnancy weeks are counted from the first day of your last menstrual period (LMP), not from conception. Conception typically occurs around day 14, so week 1-2 technically occur before fertilization. When a pregnancy test turns positive at 4-5 gestational weeks, the embryo is biologically only 2-3 weeks old. Gestational age (from LMP) is the universal clinical standard — the number used in all pregnancy tracking, ultrasounds, and medical care. Embryonic age (from conception) is approximately 2 weeks less, but rarely used outside specific research contexts.`},
  {question:'What happens in each trimester?',answer:`First trimester (weeks 1-13): All major organ systems form — heart, brain, spinal cord, limbs, facial features. Miscarriage risk is highest. Morning sickness peaks around weeks 8-10 and usually resolves by week 14. Second trimester (weeks 14-27): Often the most comfortable — energy improves, the bump becomes visible. Fetal movement first felt at 16-25 weeks. Anatomy scan at approximately week 20. Third trimester (weeks 28-40+): Fetus gains most of its birth weight. Lungs mature. Braxton Hicks contractions increase. Discomfort escalates as the uterus presses on surrounding organs.`},
  {question:'What prenatal tests are done and when?',answer:`First trimester (weeks 10-13): Combined screening (blood test + nuchal translucency ultrasound) with 80-90% detection of chromosomal abnormalities. Cell-free fetal DNA (NIPT) from week 10 provides 99%+ accuracy for Down syndrome. Second trimester (weeks 15-20): Anatomy ultrasound at week 20 examines all fetal structures. Quadruple marker screening for Down syndrome and neural tube defects. Third trimester (weeks 35-37): Group B Streptococcus swab. In high-risk pregnancies, biophysical profiles and non-stress tests monitor fetal wellbeing throughout the third trimester.`},
  {question:'What is considered viable gestation?',answer:`Viability refers to the gestational age at which survival outside the womb is possible with intensive medical support. The current threshold at major medical centers is approximately 22-23 weeks, though survival rates are 5-25% with high complication rates. At 24 weeks, survival reaches approximately 50-60% at leading centers. At 28 weeks, survival exceeds 90%. At 32 weeks, outcomes approach those of full-term infants. Each additional week of gestation below 34 weeks meaningfully improves outcomes, which is why preventing preterm birth is a major focus of prenatal care.`},
  {question:'How reliable is a home pregnancy test?',answer:`Modern home pregnancy tests detect hCG starting shortly after implantation. Sensitivity varies: most detect at 20-25 mIU/mL; the most sensitive brands detect as low as 6-12 mIU/mL, allowing detection 4-5 days before a missed period. Accuracy when used correctly on or after the expected period date: 97-99% sensitivity. False positives are rare (<1%) but occur with certain medications and very early miscarriage (chemical pregnancy). The most common reason for false negatives is testing too early — hCG may not yet be detectable. Morning urine provides highest concentration for early testing.`},
  {question:'What lifestyle factors are critical in early pregnancy?',answer:`The first trimester is maximally sensitive to environmental exposures. Critical actions: folic acid 400-800 mcg daily starting before conception reduces neural tube defect risk by 70%. Complete alcohol abstinence — no safe level has been established. Smoking cessation — increases miscarriage, stillbirth, and preterm birth risk. Avoiding listeria risk foods (deli meats, raw fish, unpasteurized dairy, raw sprouts). Caffeine limitation to under 200 mg/day. Avoiding NSAIDs, which are contraindicated in the first trimester and can affect fetal kidney development and ductus arteriosus closure in later pregnancy.`},
  {question:'What is the risk of miscarriage?',answer:`Among clinically recognized pregnancies, approximately 10-15% end in miscarriage. The risk decreases significantly by gestational week: at 4-5 weeks (positive test), risk is approximately 10-15%; after seeing a heartbeat at 6-8 weeks, it drops to 3-5%; after week 12, it falls below 1-2%. Most miscarriages (50-70%) are caused by chromosomal abnormalities in the embryo — random cell division errors unrelated to anything the mother did. Advanced maternal age is the strongest risk factor, with rates rising from 8-9% at age 20-24 to 30%+ at age 40-44.`},
  {question:'What symptoms warrant immediate medical attention?',answer:`Emergency symptoms during pregnancy: heavy vaginal bleeding beyond spotting (risk of ectopic pregnancy or miscarriage), one-sided severe pelvic pain in the first trimester (possible ectopic pregnancy — a life-threatening emergency), preeclampsia signs in the second-third trimester (severe headache, visual disturbances, upper right abdominal pain, sudden significant swelling), decreased fetal movement after week 28 (fewer than 10 kicks in 2 hours), high fever above 38.3°C especially with back pain (potential kidney infection), and contractions or membrane rupture before 37 weeks (preterm labor). None of these are 'wait and see' situations.`},
]

const seoContent = {
  title: 'Pregnancy Calculator',
  category: 'health' as const,
  intro: `Pregnancy involves a sequence of well-defined biological milestones that follow remarkably consistent timing across the roughly 40 weeks from last menstrual period to due date. Understanding these milestones — what's developing when, which weeks are most critical, when certain symptoms are expected to resolve, and when specific monitoring is appropriate — helps expectant parents navigate the enormous amount of information they'll encounter.

The first trimester (weeks 1-12) is the period of organogenesis — when all major organ systems are established. Neural tube closure occurs by week 6; cardiac chambers form by week 8; external genitalia differentiate by week 12. This is why early prenatal care and folic acid supplementation (ideally started before conception) are most critical.

The second trimester (weeks 13-26) is often called the honeymoon trimester — nausea typically resolves, energy returns, and the fetus grows rapidly. The anatomy ultrasound at 18-20 weeks checks for structural abnormalities.

The third trimester (weeks 27-40) involves rapid fetal weight gain and preparation for labor. Monitoring for preeclampsia, gestational diabetes management, and birth plan preparation all occur in this period.

This calculator provides a week-by-week milestone guide based on your due date or last menstrual period.

**Long-tail searches answered here:** pregnancy calculator free online usa 2026, how many weeks pregnant am i calculator free, pregnancy milestone calculator by due date free tool, am i pregnant how far along calculator no signup, pregnancy trimester calculator usa free online, first trimester end date calculator free no account, pregnancy weeks and days calculator from lmp free, how far along am i in my pregnancy calculator usa, trimester start and end dates calculator free online, pregnancy due date by conception date calculator free, how big is my baby by pregnancy week calculator free, pregnancy calendar week by week calculator usa free, second trimester start calculator from due date free, total pregnancy duration calculator free online usa, pregnancy viability week calculator free no account`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate pregnancy from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `Prenatal care scheduling matters most in the first trimester and last month. The optimal window for first-trimester screening (combined nuchal translucency ultrasound and blood tests) is between weeks 11-13; missing this window limits screening options.

Throughout pregnancy, the habits with the strongest evidence for reducing adverse outcomes: folic acid (400-800mcg daily, ideally starting 3 months before conception), avoidance of alcohol, adequate iron and calcium intake, moderate exercise unless contraindicated, and management of any pre-existing conditions.

Use [our Pregnancy Due Date Calculator](/calculators/health/pregnancy-due-date-calculator), [our Pregnancy Weight Gain Calculator](/calculators/health/pregnancy-weight-gain-calculator), and [our Pregnancy Nutrition Calculator](/calculators/health/pregnancy-nutrition-calculator) for detailed guidance on each specific aspect of your pregnancy journey.`,
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
        generateWebAppStructuredData({ name: 'Pregnancy Calculator', description: 'Calculate your due date and current pregnancy week. See developmental milestones week by week, trimester breakdowns, and key medical appointment timin', url: 'https://tooltrio.com/calculators/health/pregnancy-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Pregnancy Calculator', description: 'Calculate your due date and current pregnancy week. See developmental milestones week by week, trimester breakdowns, and key medical appointment timin', url: 'https://tooltrio.com/calculators/health/pregnancy-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Pregnancy Calculator', url: '/calculators/health/pregnancy-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
