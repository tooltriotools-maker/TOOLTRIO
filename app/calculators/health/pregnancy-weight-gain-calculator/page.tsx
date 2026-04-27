import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Pregnancy Weight Gain Calculator — Trimester-by-Trimester Targets by Pre-Pregnancy BMI 2026',
  description: 'Free Pregnancy Weight Gain Calculator 2026 — Accurate pregnancy weight gain based on medical standards. Instant results with detailed timeline and guidance. No account required, complete privacy guaranteed.',
  slug: 'pregnancy-weight-gain-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'pregnancy weight gain calculator 2026',
    'free pregnancy weight gain calculator',
    'pregnancy weight gain calculator usa 2026',
    'weight calculator 2026',
    'healthy weight calculator 2026',
    'weight loss calculator 2026',
    'pregnancy weight gain calculator',
    'how much weight should I gain pregnant',
    'pregnancy weight gain by bmi',
    'trimester weight gain calculator',
    'gestational weight gain guidelines',
    'healthy pregnancy weight gain',
    'overweight pregnancy weight gain',
    'underweight pregnancy weight gain',
    'twin pregnancy weight gain',
    'iga weight gain guidelines',
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
  {question:'How much weight should I gain during pregnancy by starting BMI?',answer:`The Institute of Medicine (IOM) guidelines, most recently updated in 2009 and still widely used, recommend different weight gain ranges based on pre-pregnancy BMI. Underweight (BMI under 18.5): 28-40 lbs total, roughly 1 lb/week in second and third trimesters. Normal weight (BMI 18.5-24.9): 25-35 lbs total, approximately 0.8-1 lb/week in second and third trimesters. Overweight (BMI 25-29.9): 15-25 lbs total, approximately 0.5-0.7 lb/week. Obese (BMI 30+): 11-20 lbs total, approximately 0.4-0.6 lb/week. These ranges reflect the clinical evidence that weight gain within these guidelines is associated with optimal maternal and fetal outcomes. Gaining significantly above these ranges increases risk of gestational diabetes, hypertension, macrosomia, cesarean delivery, and postpartum weight retention. Gaining below these ranges is associated with preterm birth, small for gestational age infants, and reduced fetal brain development. For twin pregnancies, ranges are higher: normal weight women with twins gain 37-54 lbs, overweight 31-50 lbs.`},
  {question:'Where does pregnancy weight gain actually go?',answer:`Understanding the composition of pregnancy weight gain demystifies the numbers. At 40 weeks, for a typical 25-35 lb weight gain, the distribution is approximately: baby — 7-8 lbs; placenta — 1.5 lbs; amniotic fluid — 2 lbs; uterus growth — 2 lbs; increased blood volume — 3-4 lbs; breast tissue growth — 1-3 lbs; fluid retention in tissues — 4 lbs; maternal fat stores — 6-8 lbs. The fat stores are physiologically intended to support breastfeeding: pregnancy triggers fat storage for this purpose as a biological priority. In the first trimester, weight gain is typically minimal (0-5 lbs) — the embryo/fetus weighs grams, not pounds. Most weight gain occurs in the second and third trimesters. This breakdown helps explain why postpartum weight loss is gradual: approximately 12-17 lbs are lost immediately at delivery (baby, placenta, amniotic fluid), with the remaining weight from blood volume, fluid retention, and fat stores lost over subsequent months.`},
  {question:'Is it safe to diet or restrict calories during pregnancy?',answer:`Intentional caloric restriction or weight loss dieting is not recommended during pregnancy for women of normal or higher pre-pregnancy weight. The fetus has non-negotiable nutritional requirements — insufficient calories or specific nutrients during critical developmental windows causes permanent consequences. However, 'not dieting' doesn't mean unlimited eating. For overweight or obese women, the IOM guidelines allow for modest weight gain (11-20 lbs for obese women) — this implies caloric intake that is modest but not as high as would be typical for a normal-weight pregnancy. Exercise combined with mindful eating (rather than caloric restriction) is the evidence-based approach for weight management in overweight/obese pregnancies. Gestational diabetes sometimes requires carbohydrate monitoring and portion control — this is medical nutritional therapy with physician guidance, distinct from unsupervised dieting. Very low carbohydrate or ketogenic diets are not recommended during pregnancy because ketosis in the fetus can impair neurological development.`},
  {question:'What causes excessive gestational weight gain?',answer:`Excessive weight gain during pregnancy (above IOM guidelines) has multiple contributing factors. Hormonal changes: progesterone increases appetite and reduces insulin sensitivity; some women experience dramatically increased hunger in the first trimester from nausea-driven carbohydrate cravings; relaxin reduces activity tolerance due to pelvic girdle pain. Psychological factors: pregnancy permission-giving mentality ('I'm eating for two'); reduced exercise due to fatigue, especially in the first trimester; and relief from previous diet vigilance. Medical factors: gestational diabetes dramatically increases weight gain through hyperinsulinemia and fluid retention; pre-eclampsia causes significant fluid retention. Sleep disruption (from discomfort, frequent urination, and anxiety) increases ghrelin and reduces leptin, driving increased appetite. Stress eating is common, particularly for first-time parents. The most effective prevention: maintaining regular moderate exercise throughout pregnancy (walking, swimming, prenatal yoga), eating a nutrient-dense diet without significant calorie restriction, and monitoring weight gain trajectory with an obstetrician.`},
  {question:'How quickly should I lose the baby weight after delivery?',answer:`Postpartum weight loss expectations should be realistic and non-pressuring. The average postpartum weight trajectory: immediate delivery loss of approximately 12-17 lbs (baby, placenta, amniotic fluid). In the first week: additional 5-8 lbs of fluid and blood volume reduction. In weeks 2-8: most of the remaining tissue-bound fluid loss. Beyond 8 weeks: return to pre-pregnancy weight is driven by fat loss, which typically takes 6-12 months for women who gained within guidelines and breastfed. Breastfeeding burns an additional 300-500 calories per day and accelerates postpartum weight loss — most exclusive breastfeeders return to pre-pregnancy weight within 6 months. Women who gained more than the IOM guidelines typically take longer — 12-18 months is common and normal. Cultural pressure for rapid 'snap back' is medically inappropriate and psychologically harmful — the body needs time to recover from the physiological changes of pregnancy. Postpartum depression, sleep deprivation, and new-parent stress all affect weight loss trajectory and should not be ignored in the weight loss conversation.`},
  {question:'How does obesity during pregnancy affect the baby?',answer:`Maternal obesity (BMI 30+ before pregnancy) significantly increases risk for multiple adverse fetal and birth outcomes. Macrosomia and LGA (large for gestational age): excess maternal glucose from insulin resistance promotes fetal overgrowth. Stillbirth risk increases approximately 2-fold compared to normal weight. Neural tube defect risk is higher even with adequate folic acid supplementation, possibly because obesity alters folate metabolism. Fetal programming: children born to obese mothers have higher lifetime rates of obesity, cardiovascular disease, and type 2 diabetes — epigenetic mechanisms appear to program metabolic systems in utero. Preterm birth risk is modestly increased. Structural heart defects and other congenital anomalies occur at higher rates. For the delivery: maternal obesity increases cesarean delivery rates and associated complications. In future pregnancies, women who lose weight to normal BMI before conception substantially reduce these risks — inter-pregnancy weight management is one of the highest-yield public health interventions for infant outcomes. Most of these associations improve significantly with pregnancy weight gain within recommended ranges even for obese women.`},
  {question:'What is the connection between pregnancy weight gain and postpartum depression?',answer:`The relationship between gestational weight gain and postpartum depression (PPD) is bidirectional and mediated by multiple pathways. Women who gain substantially above IOM guidelines are more likely to have negative body image postpartum, which is a risk factor for PPD. Obesity itself is associated with higher inflammatory markers and dysregulation of serotonin and dopamine pathways that overlap with depression biology. Sleep disruption from pregnancy weight-related discomfort (sleep apnea is more common with higher weight gain) independently increases PPD risk through HPA axis dysregulation. However, inadequate weight gain is also associated with worse outcomes: undernourished women show more severe postpartum hormonal disruption. The most important intervention for reducing PPD risk that also relates to weight is physical activity: regular moderate exercise during and after pregnancy reduces PPD risk by approximately 50% in meta-analyses, simultaneously supporting healthy weight gain and postpartum recovery. Weight gain within guidelines, combined with exercise and social support, appears to optimize both obstetric and mental health outcomes.`},
  {question:'Can I exercise throughout pregnancy and will it affect the baby?',answer:`Exercise during uncomplicated pregnancy is not only safe but strongly beneficial. The American College of Obstetricians and Gynecologists recommends at least 150 minutes of moderate-intensity aerobic activity per week throughout pregnancy (in the absence of contraindications). Benefits of prenatal exercise: reduced gestational diabetes risk, lower gestational weight gain, reduced preeclampsia risk, reduced back pain and pelvic girdle pain, improved mood and reduced depression, shorter active labor duration, and faster postpartum recovery. Exercise does not increase miscarriage risk, fetal growth restriction, or preterm labor risk in healthy pregnancies. The fetus tolerates maternal exercise well — normal hemodynamic adaptations maintain placental blood flow during moderate exercise. Exercises to avoid: contact sports, activities with fall risk (horseback riding, skiing), scuba diving, vigorous exercise at altitude if not acclimatized, and — after the first trimester — exercises lying flat on the back (supine hypotension from uterine compression of the vena cava). Running, swimming, walking, cycling, and prenatal yoga are all well-supported throughout pregnancy.`},
]

const seoContent = {
  title: 'Pregnancy Weight Gain Calculator',
  category: 'health' as const,
  intro: `Appropriate weight gain during pregnancy is one of the most clinically significant modifiable factors for both maternal and infant outcomes. Gaining too little is associated with intrauterine growth restriction and preterm birth; gaining too much is associated with gestational diabetes, cesarean delivery, and difficulty losing weight postpartum. The optimal range depends primarily on pre-pregnancy BMI.

The Institute of Medicine (IOM) guidelines establish the following ranges: underweight (BMI <18.5): 28-40 lbs; normal weight (BMI 18.5-24.9): 25-35 lbs; overweight (BMI 25-29.9): 15-25 lbs; obese (BMI ≥30): 11-20 lbs. These ranges are medically derived recommendations based on outcome data from tens of thousands of pregnancies.

Weight gain distribution by trimester matters as much as the total. Minimal weight gain occurs in the first trimester. The majority of appropriate weight gain occurs in the second and third trimesters — roughly 1 pound per week in each for normal-weight women.

This calculator shows where your total gain should be for each trimester based on your pre-pregnancy BMI, flags if you're gaining significantly faster or slower than guideline pace, and clarifies where the weight goes (fetus, placenta, blood volume, fluid, breast tissue, fat stores).

**Long-tail searches answered here:** pregnancy weight gain calculator free online usa, how much weight should i gain during pregnancy calculator, healthy pregnancy weight gain by bmi calculator free, gestational weight gain chart calculator no signup, am i gaining too much weight in pregnancy calculator, pregnancy weight gain by week calculator usa free, underweight starting bmi pregnancy weight gain goal, overweight pregnancy recommended weight gain calculator usa, twin pregnancy weight gain guidelines calculator free, third trimester weight gain acceleration calculator usa free, pregnancy weight gain tracking by week calculator free, how to stay in healthy weight gain range during pregnancy, postpartum weight retention predictor from gain calculator, gestational diabetes and weight gain limits calculator usa, breastfeeding weight loss after pregnancy calculator free`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate pregnancy weight gain from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `Weight management during pregnancy is not about staying thin — it's about gaining the right amount for your starting point to optimize outcomes for you and your baby. Women who enter pregnancy with overweight or obesity are often not counseled adequately about their lower gestational weight gain targets.

Dieting during pregnancy is not appropriate, but eating quality calories within your energy needs is. Replacing high-calorie, low-nutrient foods with nutrient-dense alternatives doesn't require counting calories — it means prioritizing protein, vegetables, whole grains, and dairy while keeping processed foods and sugary beverages minimal.

Postpartum weight loss typically occurs gradually over 6-12 months. Aggressive calorie restriction postpartum, particularly while breastfeeding, is counterproductive and can affect milk supply. Use [our Breastfeeding Calorie Calculator](/calculators/health/breastfeeding-calorie-calculator) for postpartum calorie targets if you're nursing.`,
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
        generateWebAppStructuredData({ name: 'Pregnancy Weight Gain Calculator', description: 'Calculate recommended pregnancy weight gain based on your pre-pregnancy BMI. See trimester-specific weight gain targets, weekly gain patterns, and und', url: 'https://tooltrio.com/calculators/health/pregnancy-weight-gain-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Pregnancy Weight Gain Calculator', description: 'Calculate recommended pregnancy weight gain based on your pre-pregnancy BMI. See trimester-specific weight gain targets, weekly gain patterns, and und', url: 'https://tooltrio.com/calculators/health/pregnancy-weight-gain-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Pregnancy Weight Gain Calculator', url: '/calculators/health/pregnancy-weight-gain-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
