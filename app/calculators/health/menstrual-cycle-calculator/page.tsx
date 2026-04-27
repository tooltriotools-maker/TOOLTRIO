import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Menstrual Cycle Calculator — Period Predictions, Ovulation & Fertile Window 2026',
  description: 'Free Menstrual Cycle Calculator 2026 — Accurate menstrual cycle based on medical standards. Instant results with detailed timeline and guidance. No account required, complete privacy guaranteed.',
  slug: 'menstrual-cycle-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'menstrual cycle calculator 2026',
    'free menstrual cycle calculator',
    'menstrual cycle calculator usa 2026',
    'menstrual cycle calculator free 2026',
    'menstrual cycle calculator',
    'period prediction calculator',
    'ovulation date calculator',
    'fertile window calculator',
    'irregular period calculator',
    'next period date calculator',
    'menstrual cycle tracking',
    'cycle length ovulation calculator',
    'period cycle length calculator',
    'when is my next period',
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
  {question:'What is a normal menstrual cycle length?',answer:`The definition of 'normal' for menstrual cycles is much broader than the classic '28-day cycle' taught in health class. A normal cycle length ranges from 21 to 35 days, measured from the first day of one period to the first day of the next. Only about 12% of women have exactly 28-day cycles. The average is actually 29 days, but individual variation is enormous and entirely normal. Teenagers typically have longer and more variable cycles in the first 1-5 years after menarche as the hormonal axis matures. Women in their 30s and 40s often develop shorter cycles. Cycle length also varies within the same person from month to month — variation of 5-7 days between cycles is common and not a concern. What is concerning: sudden significant changes from your personal baseline, cycles consistently outside the 21-35 day range, or complete absence of menstruation (amenorrhea) for more than 3 months.`},
  {question:'What happens hormonally throughout the menstrual cycle?',answer:`The menstrual cycle is divided into two main phases separated by ovulation. The follicular phase (day 1 of bleeding to ovulation): the pituitary releases FSH (follicle-stimulating hormone), which stimulates several follicles in the ovary to develop. As follicles grow, they produce estradiol, which builds the uterine lining (endometrium) and eventually triggers a surge of LH (luteinizing hormone), which causes ovulation — release of the dominant follicle's egg. Ovulation occurs approximately 12-16 days before the next period (not necessarily day 14 — this varies significantly with cycle length). The luteal phase (ovulation to next period): the ruptured follicle becomes the corpus luteum, producing progesterone. Progesterone matures the endometrium for potential implantation and has calming effects on the nervous system and elevated body temperature. If no implantation occurs, the corpus luteum degrades, progesterone and estrogen fall, and menstruation begins.`},
  {question:'How do I track ovulation accurately?',answer:`Several methods identify ovulation with varying accuracy. Basal body temperature (BBT): temperature rises 0.2-0.5°C after ovulation due to progesterone — this confirms ovulation occurred but detects it retroactively (you've already ovulated when you see the rise). BBT tracks your cycle pattern over months and helps predict future ovulation. LH test strips (OPK — ovulation predictor kits): detect the LH surge that precedes ovulation by 24-36 hours — better for prospective timing. Cervical mucus monitoring: fertile cervical mucus becomes clear, slippery, and stretchy ('egg white' consistency) in the 2-3 days approaching ovulation. Combining BBT and cervical mucus (the Sympto-thermal method) has effectiveness rates approaching oral contraceptives when used correctly. Fertility monitors (Clear Blue Advanced) combine LH and estrogen detection for a wider fertile window identification. Ultrasound monitoring in fertility clinics provides the most accurate ovulation detection but requires clinical visits.`},
  {question:'Why are irregular periods a medical concern?',answer:`Irregular periods — inconsistent cycle lengths, skipped periods, or unpredictable bleeding — indicate underlying hormonal disruption worth investigating. Common causes: polycystic ovary syndrome (PCOS, affecting 5-10% of reproductive-age women), thyroid disorders (both hypothyroidism and hyperthyroidism disrupt the hypothalamic-pituitary-gonadal axis), high prolactin (from a pituitary adenoma or certain medications), premature ovarian insufficiency (early menopause before age 40), stress and significant weight changes (both underweight and rapid weight loss suppress GnRH secretion), excessive exercise (the Female Athlete Triad — insufficient energy availability, suppressed menstruation, and bone loss), and uterine structural abnormalities. Irregular periods also indicate irregular or absent ovulation, which affects fertility. The concerning threshold: cycles shorter than 21 days or longer than 35 days, missing periods for more than 3 months without pregnancy, or significant sudden changes from your established pattern warrant evaluation.`},
  {question:'How does hormonal birth control affect the menstrual cycle?',answer:`Combined oral contraceptives (estrogen + progestin) suppress ovulation by preventing the mid-cycle LH surge. The 'period' that occurs during the pill-free week is actually a withdrawal bleed from the synthetic hormones clearing, not a true menstrual period — ovulation didn't occur and there is no endometrium-progesterone cycle. The pill's withdrawal bleed was designed to be socially palatable (mimicking a natural cycle) rather than medically necessary. Progestin-only pills, hormonal IUDs, and implants work through different mechanisms (thickened cervical mucus, endometrial changes, sometimes ovulation suppression) and often cause lighter periods or no periods at all. After stopping hormonal birth control, return to normal cycle function typically occurs within 1-3 months, though some women experience post-pill amenorrhea lasting longer — usually indicating an underlying cycle irregularity that the pill was masking rather than caused by the pill itself.`},
  {question:'What is PMS and how is it different from PMDD?',answer:`Premenstrual syndrome (PMS) affects up to 75% of menstruating women to some degree. PMS consists of physical and mood symptoms (bloating, breast tenderness, irritability, mood swings, fatigue, food cravings) occurring in the 1-2 weeks before menstruation and resolving within the first few days of bleeding. PMDD (Premenstrual Dysphoric Disorder) is a clinically distinct, more severe condition affecting 3-8% of women: it involves significant depressed mood, anxiety, marked affective lability, anger, or hopelessness severe enough to interfere with daily functioning or relationships. Both PMS and PMDD are not caused by abnormal hormone levels — affected women have normal progesterone and estrogen — but by abnormal neurological sensitivity to normal hormone fluctuations. SEROTONIN sensitivity appears particularly important: SSRIs (selective serotonin reuptake inhibitors) taken specifically during the luteal phase are first-line treatment for PMDD and dramatically reduce symptoms in most affected women within the first cycle.`},
  {question:'Can diet and exercise affect period regularity?',answer:`Yes significantly — both extremes of energy availability affect menstrual function. Functional Hypothalamic Amenorrhea (FHA) is the clinical term for menstrual disruption caused by insufficient energy availability, often from extreme exercise, severe calorie restriction, or low body weight. The hypothalamus reduces GnRH pulsatility when energy availability is below approximately 30 kcal per kg of fat-free mass per day, causing the entire HPG axis to downregulate. This is the mechanism of the Female Athlete Triad (now called Relative Energy Deficiency in Sport, RED-S). Restoration of menstrual function requires increasing energy availability — ideally before bone density loss becomes significant, as estrogen deficiency from menstrual suppression accelerates bone loss comparable to post-menopausal rates. High-inflammation diets (processed foods, excess omega-6, sugar) are associated with more severe PMS symptoms. Omega-3 fatty acids, magnesium, and vitamin B6 all show some evidence for reducing PMS severity in clinical trials.`},
  {question:'At what age should a first period occur and is it starting earlier now?',answer:`Menarche (first menstruation) has a normal range of 10-16 years in the US, with the median at approximately 12.5 years. Research clearly documents secular trend toward earlier puberty in developed countries: the median age at menarche in the US was approximately 14.3 years in 1900 and has declined to 12.4 years by 2010. A similar trend exists in Europe. The causes are debated but likely involve: increased body fat (adipose tissue produces leptin and some estrogens that advance puberty), reduced childhood infections (the 'hygiene hypothesis' variant), and possibly endocrine-disrupting chemical exposure. Early menarche (before age 10) is associated with higher lifetime risks of breast cancer, endometrial cancer, cardiovascular disease, and type 2 diabetes — due to a longer lifetime estrogen exposure. Late menarche (after 16) warrants evaluation for delayed puberty, with common causes including low body weight, intense athletic training, and endocrine disorders.`},
]

const seoContent = {
  title: 'Menstrual Cycle Calculator',
  category: 'health' as const,
  intro: `Menstrual cycle tracking has evolved from basic period prediction into a broader window into hormonal health and fertility. The average menstrual cycle is 28 days, but research consistently shows that fewer than 15% of women have precisely 28-day cycles — normal cycles range from 21 to 35 days, and slight variation from cycle to cycle is entirely normal. What matters more than hitting 28 days is your personal regularity.

The cycle has four phases with distinct hormonal profiles: menstruation (days 1-5 on average), follicular phase (estrogen rising, days 1-13), ovulation (LH surge triggering egg release, day 14 on average — but highly variable), and luteal phase (progesterone dominant, days 15-28). Symptoms, energy levels, cognitive patterns, and physical performance all shift predictably across these phases.

Predicting ovulation matters most for those trying to conceive or avoid pregnancy. The fertile window extends from 5 days before ovulation to 1 day after. Basal body temperature rises 0.2-0.5°C after ovulation (confirming it occurred, not predicting it), while cervical mucus becomes clear and stretchy in the days approaching ovulation.

This calculator predicts your next period, estimated ovulation window, and fertile window based on your cycle history, with accuracy improving as you log more cycles.

**Long-tail searches answered here:** menstrual cycle calculator free online usa, period tracker and cycle length calculator free, when is my next period calculator free no signup, irregular period cycle calculator free tool usa, period due date calculator by last period free, ovulation and period calendar calculator usa free, how to predict irregular period dates calculator free, period calculator for irregular cycles by average free, shortest longest period cycle calculator usa free, period tracker without app or account free online, spotting vs period start date calculator free usa, pms symptom predictor by cycle phase calculator free, period calculator for birth control planning free usa, how many days between periods is normal calculator, late period calculator no pregnancy needed usa free`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate menstrual cycle from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `Cycle irregularity has many causes — stress, significant weight change, thyroid dysfunction, PCOS, perimenopause, over-exercising, or undereating can all disrupt the hormonal signaling that regulates cycle timing. A suddenly irregular cycle that wasn't irregular before is worth noting and potentially discussing with a healthcare provider.

Period pain (dysmenorrhea) is common but not something to simply accept if it's severe. Primary dysmenorrhea is very manageable with NSAIDs started 1-2 days before menstruation onset. Secondary dysmenorrhea — severe pain caused by endometriosis, fibroids, or other conditions — requires medical evaluation and is often dramatically undertreated.

Track at least 3-4 cycles before relying on this calculator's ovulation predictions. Use [our Ovulation Calculator](/calculators/health/ovulation-calculator) for more detailed fertility window analysis.`,
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
        generateWebAppStructuredData({ name: 'Menstrual Cycle Calculator', description: 'Predict your next period, ovulation date, and fertile window based on your cycle length and last period date. Track cycle irregularities and understan', url: 'https://tooltrio.com/calculators/health/menstrual-cycle-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Menstrual Cycle Calculator', description: 'Predict your next period, ovulation date, and fertile window based on your cycle length and last period date. Track cycle irregularities and understan', url: 'https://tooltrio.com/calculators/health/menstrual-cycle-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Menstrual Cycle Calculator', url: '/calculators/health/menstrual-cycle-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
