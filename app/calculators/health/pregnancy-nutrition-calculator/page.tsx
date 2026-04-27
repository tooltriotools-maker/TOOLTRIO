import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Pregnancy Nutrition Calculator — Calorie, Protein & Nutrient Needs by Trimester 2026',
  description: 'Free Pregnancy Nutrition Calculator 2026 — Accurate pregnancy nutrition based on medical standards. Instant results with detailed timeline and guidance. No account required, complete privacy guaranteed.',
  slug: 'pregnancy-nutrition-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'pregnancy nutrition calculator 2026',
    'free pregnancy nutrition calculator',
    'pregnancy nutrition calculator usa 2026',
    'pregnancy nutrition calculator free 2026',
    'pregnancy nutrition calculator',
    'pregnancy calorie needs by trimester',
    'pregnancy protein requirements',
    'folate folic acid pregnancy calculator',
    'iron needs pregnancy calculator',
    'pregnancy dha omega 3 calculator',
    'calcium pregnancy calculator',
    'pregnancy diet nutritional needs',
    'prenatal nutrition tracker',
    'trimester specific nutrition',
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
  {question:'How many extra calories do pregnant women actually need?',answer:`The common belief that pregnancy requires 'eating for two' dramatically overstates actual caloric needs. Caloric requirements increase modestly and progressively: in the first trimester, no additional calories are needed above pre-pregnancy maintenance (the embryo is tiny and the main metabolic changes don't yet require significant extra energy). In the second trimester, approximately 340 extra calories per day above pre-pregnancy needs. In the third trimester, approximately 450 additional calories per day. For a woman with a maintenance intake of 2,000 calories, this means roughly 2,340 calories in the second trimester and 2,450 in the third — not double the food intake. The quality of those extra calories matters more than quantity: nutrient density is the priority because specific micronutrients (folate, iron, DHA, iodine, calcium, vitamin D) are needed in significantly increased amounts while total caloric increase is modest.`},
  {question:'Why is folic acid so critical in early pregnancy?',answer:`Folate (the natural form) or folic acid (the synthetic supplement form with higher bioavailability) is required for neural tube closure, which occurs 21-28 days after conception — often before a woman knows she's pregnant. Neural tube defects (spina bifida, anencephaly) result from inadequate folate during this critical window. The US Preventive Services Task Force recommends all women capable of becoming pregnant consume 400-800 mcg of folic acid daily, specifically because the critical period precedes confirmed pregnancy. MTHFR gene variants (affecting approximately 40% of people) reduce the ability to convert folic acid to the active form — methylfolate (5-MTHF) in supplements is the bioactive form and may be preferable for those with MTHFR mutations. Once pregnancy is confirmed, prenatal vitamins typically provide 800-1,000 mcg of folic acid. Women with a prior neural tube defect pregnancy or on certain medications may need 4,000 mcg under physician guidance.`},
  {question:'Which foods should pregnant women strictly avoid?',answer:`High-risk foods during pregnancy with specific biological justification: raw or undercooked fish and shellfish (risk of Listeria, Vibrio, and other pathogens particularly harmful to the fetus); raw or undercooked meat, poultry, and eggs (Salmonella, E. coli, Toxoplasma — cats are another Toxoplasma source, avoid changing cat litter); unpasteurized dairy and juice (Listeria, E. coli — Listeria can cross the placenta and cause fetal loss); deli meats and hot dogs unless heated to steaming (Listeria); raw sprouts (Salmonella, E. coli — cannot be washed off safely); high-mercury fish (shark, swordfish, king mackerel, bigeye tuna, tilefish — methylmercury causes fetal neurological damage; limit albacore tuna to 6 oz/week; salmon, sardines, and tilapia are low-mercury and recommended). Alcohol has no established safe level and is strictly avoided. Caffeine should be limited to under 200 mg/day (about one 12 oz cup of coffee) — higher intakes are associated with miscarriage and restricted fetal growth.`},
  {question:'How much protein do pregnant women need?',answer:`Protein requirements increase substantially during pregnancy, particularly in the second and third trimesters when fetal tissue is actively building. The RDA increases from 46 g/day for non-pregnant women to 71 g/day during pregnancy — an increase of approximately 25 g/day. Some research suggests even higher intakes (80-100 g/day) support better birth outcomes, particularly in women who are at risk for low birth weight or gestational diabetes. Protein is critical for placental development, fetal tissue synthesis, amniotic fluid protein components, and maternal blood volume expansion (which requires additional plasma proteins). Complete protein sources providing all essential amino acids are preferable: meat, poultry, fish, eggs, dairy, and for plant-based diets, soy and quinoa are complete; other plant proteins should be combined for completeness. Protein is often the macronutrient most deficient in pregnant women following nausea-driven food aversions in the first trimester.`},
  {question:'What are the most important nutrients for fetal brain development?',answer:`Fetal brain development relies on several specific nutrients with particularly high demand. DHA (docosahexaenoic acid): the brain's primary structural omega-3 fat, accumulated in the fetal brain primarily in the third trimester and first year of life. Maternal DHA status directly affects child cognitive outcomes — an additional 200 mg/day DHA is recommended during pregnancy. Iodine: essential for thyroid hormone production, which is critical for fetal neurological development — even mild iodine deficiency impairs cognitive development. Many prenatal vitamins don't contain iodine; check the label. Choline: increasingly recognized as critical for brain development and epigenetic programming — only about 10% of pregnant women consume the recommended 450 mg/day; eggs are the richest dietary source. Iron: needed for myelination of neural pathways and neurotransmitter synthesis. Zinc and copper are cofactors for numerous neurological enzymes. Folate continues its role in neural development beyond the closure period. The common prenatal vitamin covers most of these except DHA (usually supplemented separately) and sometimes iodine and choline.`},
  {question:'How does gestational diabetes affect the fetus?',answer:`Gestational diabetes mellitus (GDM) affects 6-9% of US pregnancies and has significant consequences for both mother and baby when uncontrolled. The mechanism of fetal harm: maternal glucose crosses the placenta freely; the fetal pancreas responds by producing excess insulin (fetal hyperinsulinemia). Insulin acts as a growth hormone in the fetus, causing macrosomia (LGA, large for gestational age) — babies exceeding 4,000-4,500 grams — which increases birth injury risk, shoulder dystocia, and emergency c-section rates. At birth, the fetus's pancreas is still producing excess insulin but maternal glucose supply suddenly stops, causing neonatal hypoglycemia within hours of birth requiring monitoring and treatment. Long-term consequences for the child include increased lifetime risk of obesity and type 2 diabetes. For the mother: GDM resolves after delivery but 50% of women with GDM develop type 2 diabetes within 5-10 years. Dietary management — lower glycemic index foods, carbohydrate counting, regular moderate exercise — controls blood glucose effectively without medication in 70-80% of GDM cases.`},
  {question:'What prenatal vitamin should I take and does the brand matter?',answer:`The most important prenatal vitamin criteria: contains at least 400 mcg of folic acid (look for methylfolate if you have MTHFR concerns), 27 mg of iron (increased pregnancy requirement), calcium (1,000 mg/day total intake, though large calcium doses in the supplement itself may interfere with iron absorption — consider taking them at different times), vitamin D (600-2,000 IU), iodine (150-220 mcg — check the label as many prenatals omit this), choline (though few prenatals contain adequate amounts), and B12. Beyond these criteria, brand differences for standard micronutrients are modest. DHA should be taken as a separate supplement (200-300 mg/day from algal oil for vegans or fish oil for omnivores) as prenatal vitamins that include DHA often provide suboptimal amounts. Gummy prenatal vitamins are popular for women with nausea but often omit iron (which can cause nausea). Starting prenatal vitamins before conception rather than after a positive test is the most important timing decision.`},
  {question:'What is the link between morning sickness and baby health?',answer:`Morning sickness (nausea and vomiting of pregnancy) affects approximately 70-80% of pregnant women and has significant evolutionary interest: it correlates positively with pregnancy outcomes. Mild to moderate morning sickness is associated with lower rates of miscarriage, preterm birth, and low birth weight — the best current explanation is that the symptoms reflect robust placental function and high hCG (human chorionic gonadotropin) levels, which correlate with healthy pregnancies. The food aversions characteristic of morning sickness (often to meat, eggs, and strong-smelling foods) specifically target foods with higher bacterial contamination risk — suggesting an evolutionary protective mechanism. Severe hyperemesis gravidarum (HG, affecting 0.3-3% of pregnancies) is a different clinical situation: extreme vomiting causing dehydration, weight loss, and electrolyte imbalance requires medical treatment and can harm both mother and fetus if inadequately treated. For typical morning sickness, small frequent meals, ginger (1,000 mg/day has RCT evidence for nausea reduction), vitamin B6 (10-25 mg three times daily — first-line treatment), and cold or room-temperature foods are the most effective management strategies.`},
]

const seoContent = {
  title: 'Pregnancy Nutrition Calculator',
  category: 'health' as const,
  intro: `Pregnancy increases nutrient needs substantially — but calorie needs increase much less than most people expect. The old eating for two framing is physiologically inaccurate: in the first trimester, additional calorie needs are approximately zero. In the second trimester, roughly 340 extra calories per day are needed. In the third trimester, about 450 extra calories.

What does increase significantly is specific nutrient need. Folate requirements nearly double (from 400mcg to 600mcg daily), iron needs increase by 50% (from 18mg to 27mg), iodine needs increase significantly (to 220mcg), and choline requirements rise substantially — a nutrient that receives less attention than folate but is equally critical for fetal brain development. Most prenatal vitamins contain inadequate choline.

DHA is structurally essential for fetal brain and retinal development during the third trimester. The recommended intake during pregnancy is 200-300mg DHA daily; most prenatal vitamins contain insufficient DHA, and regular fatty fish consumption (2-3 servings per week of low-mercury options) is the most reliable way to meet this need.

This calculator generates your trimester-specific nutrient targets based on your pre-pregnancy weight, current gestational week, activity level, and whether you're carrying multiples — with specific food sources for the most critical nutrients.

**Long-tail searches answered here:** pregnancy nutrition calculator free online usa, how much to eat while pregnant calculator, pregnancy calorie needs by trimester calculator free, prenatal nutrition requirements calculator no account, what nutrients do i need in pregnancy calculator usa, pregnancy vitamin and mineral needs calculator free, additional calorie needs first vs second vs third trimester, folate vs folic acid needs pregnancy calculator free usa, iron needs increase during pregnancy calculator free, dha requirement for fetal brain development calculator usa, calcium needs during pregnancy without dairy calculator, pregnancy nutrition for vegetarian or vegan calculator usa free, hyperemesis nausea calorie minimums calculator free, gestational diabetes nutrition calculator usa free, weight gain trajectory with pregnancy nutrition calculator`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate pregnancy nutrition from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `Food safety during pregnancy is as important as nutrient adequacy. The foods most important to avoid: raw or undercooked meat, poultry, and seafood, high-mercury fish, unpasteurized dairy and soft cheeses, deli meats and hot dogs unless heated to steaming, and raw sprouts. These restrictions carry real risk and warrant strict adherence.

Nausea in the first trimester can make meeting nutritional targets difficult. The priority during this phase is caloric adequacy — eating whatever doesn't provoke nausea, rather than achieving perfect nutrient distribution. Supplementing with prenatal vitamins, particularly folate, is essential during periods when vegetable intake is low due to nausea.

Use [our Pregnancy Weight Gain Calculator](/calculators/health/pregnancy-weight-gain-calculator) to track weight gain by trimester, and [our Hydration Calculator](/calculators/health/hydration-calculator) for pregnancy-specific fluid targets.`,
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
        generateWebAppStructuredData({ name: 'Pregnancy Nutrition Calculator', description: 'Calculate your additional calorie, protein, iron, folate, calcium, and DHA needs for each trimester of pregnancy. Get trimester-specific nutritional g', url: 'https://tooltrio.com/calculators/health/pregnancy-nutrition-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Pregnancy Nutrition Calculator', description: 'Calculate your additional calorie, protein, iron, folate, calcium, and DHA needs for each trimester of pregnancy. Get trimester-specific nutritional g', url: 'https://tooltrio.com/calculators/health/pregnancy-nutrition-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Pregnancy Nutrition Calculator', url: '/calculators/health/pregnancy-nutrition-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
