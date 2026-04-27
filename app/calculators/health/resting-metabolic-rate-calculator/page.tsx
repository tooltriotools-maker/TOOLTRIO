import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Resting Metabolic Rate Calculator — Measured RMR vs Predicted BMR 2026',
  description: 'Calculate Resting Metabolic Rate (RMR) using Mifflin-St Jeor and Harris-Benedict equations. Understand the difference between measured RMR and calculated BMR, and what low or high RMR means for weight management. Free online resting metabolic rate calculator 2026. No signup required.',
  slug: 'resting-metabolic-rate-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'resting metabolic rate calculator 2026',
    'free resting metabolic rate calculator',
    'resting metabolic rate calculator usa 2026',
    'resting metabolic rate calculator free 2026',
    'resting metabolic rate calculator',
    'rmr calculator',
    'resting metabolism calculator',
    'resting metabolic rate vs bmr',
    'measured rmr online estimate',
    'how to calculate resting metabolic rate',
    'low rmr and weight gain',
    'rmr by age',
    'rmr testing vs estimation',
    'resting energy expenditure',
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
  {question:'Why do some people have a higher metabolism than others?',answer:`Resting metabolic rate varies among individuals primarily due to body composition. The dominant factor: lean body mass (muscle, organs, bone) burns far more energy at rest than fat mass. A pound of muscle burns approximately 6-10 calories per day at rest; a pound of fat burns about 2-3. This means a 160-pound person with 30% body fat has a substantially lower RMR than a 160-pound person with 15% body fat. Beyond body composition: organ size matters — the brain (consuming approximately 20% of RMR), liver (21%), and kidneys together account for more than 50% of RMR despite being only about 5% of body weight. Genetics account for approximately 40% of variation in metabolic rate in twin studies. Thyroid hormone levels profoundly affect metabolic rate — hypothyroidism can reduce RMR by 20-40%. Age, sex (men have 5-10% higher RMR than women at equal body composition), and current hormonal status (pregnancy, menstrual phase) all contribute.`},
  {question:'What is the most accurate formula for calculating RMR?',answer:`The Mifflin-St Jeor equation (1990) is currently the most validated formula for estimating RMR in adults across a range of body compositions. It uses weight (kg), height (cm), age (years), and sex: Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5. Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161. Validation studies find it predicts measured RMR within 10% for approximately 80% of individuals — reasonably accurate for a formula-based approach. The Harris-Benedict equation (1919, revised 1984) is also widely used and slightly less accurate. The Katch-McArdle formula uses lean body mass (if known) rather than total weight and can be more accurate for very lean or very obese individuals. For clinical precision, actual RMR measurement via indirect calorimetry (measuring oxygen consumption and carbon dioxide production) is required — this is done in research settings and some clinical obesity programs. Formula estimates have individual error of plus or minus 10-15%.`},
  {question:'Does eating breakfast \'boost metabolism\' as people claim?',answer:`The claim that breakfast boosts metabolism is mostly inaccurate as commonly stated. The thermic effect of food (TEF) — the energy used to digest and absorb a meal — does temporarily elevate metabolic rate after eating any meal, including breakfast. But this effect is proportional to the meal's caloric content and macronutrient composition, not specific to breakfast timing. Skipping breakfast does not 'slow your metabolism' in any meaningful sustained way — studies of short-term fasting find no reduction in RMR within 24-48 hours. In fact, RMR actually increases slightly during short-term fasting (up to 72 hours) as norepinephrine increases to mobilize energy. The specific breakfast-metabolism claim likely originates from the observation that breakfast eaters tend to have healthier weights and metabolisms than breakfast skippers in epidemiological studies — but this is likely due to confounding (people with healthier overall habits tend to eat breakfast), not a direct metabolic effect of breakfast itself.`},
  {question:'What happens to RMR during and after a diet?',answer:`Caloric restriction reduces resting metabolic rate through a process called adaptive thermogenesis — the body's downregulation of energy expenditure in response to reduced energy availability. The reduction exceeds what can be explained by lost body mass alone: studies find RMR decreases by 10-15% beyond the amount predicted by body composition changes after 8-12 weeks of deficit dieting. The mechanisms: reduced thyroid hormone output (T3 decreases with caloric restriction); reduced sympathetic nervous system activity; and potentially reduced mitochondrial uncoupling (the heat-generating aspect of metabolism). This adaptation is at least partially persistent — research including follow-up from the 'Biggest Loser' study found significantly suppressed RMR in participants years after the show, even in those who regained weight. The implications: RMR calculations should be recalibrated after significant weight loss, as the formula predictions become less accurate. Strategies to minimize metabolic adaptation: adequate protein (prevents muscle loss, which would further reduce RMR), resistance training throughout the diet, and periodic diet breaks (2-week periods at maintenance calories have evidence for partial metabolic adaptation reversal).`},
  {question:'How does muscle mass affect resting metabolic rate?',answer:`Skeletal muscle is a metabolically expensive tissue — it accounts for approximately 20-25% of resting metabolic rate despite being only about 40% of body mass. Each pound of muscle burns approximately 6-10 calories per day at rest (various estimates range from 5-14 calories per pound). While these numbers are modest per pound, the cumulative effect is significant: a person with 10 more pounds of muscle (achievable through 1-2 years of consistent resistance training) has a resting metabolism approximately 60-100 calories per day higher than their lower-muscle counterpart. More importantly, muscle mass is the primary determinant of NEAT (non-exercise activity thermogenesis) capacity — muscular individuals tend to move more throughout the day, have higher capacity for exercise-induced calorie burn, and have higher peak metabolic rates during activity. The age-related decline in RMR (approximately 1-2% per decade after age 30) is largely driven by sarcopenia (age-related muscle loss) and is substantially preventable through regular resistance training.`},
  {question:'Does cold exposure significantly increase resting metabolic rate?',answer:`Cold exposure activates thermogenesis — heat generation to maintain core body temperature — which meaningfully increases metabolic rate. Shivering thermogenesis (muscle contraction to generate heat) can increase metabolic rate by 2-4 fold during acute cold exposure. Non-shivering thermogenesis from brown adipose tissue (BAT) — a special fat tissue found primarily in the upper back and neck that generates heat — increases metabolic rate more modestly. Adults have small but variable amounts of BAT: individuals with more BAT (often leaner, more cold-accustomed people) show higher metabolic increases from cold exposure. Research on cold plunge and cold shower protocols finds acute metabolic increases of 10-25% during exposure, returning to baseline within 60-90 minutes. Whether repeated cold exposure causes sustained BAT activation and chronically elevated RMR is still being researched — early evidence suggests regular cold exposure increases BAT mass and non-shivering thermogenesis capacity over weeks, but the magnitude of effect on daily total calorie expenditure is modest (perhaps 50-100 calories per day in those who develop significant BAT activity).`},
  {question:'How much does RMR decline with age?',answer:`Resting metabolic rate declines at approximately 1-2% per decade after age 30, though the decline is not uniform. A landmark 2021 study in Science using doubly labeled water measurements in 6,421 people across 95 countries found a more nuanced picture: RMR actually increases from birth to age 1, then steadily declines through childhood while activity is high. From age 20-60, RMR is surprisingly stable after adjusting for body composition — the perceived 'middle-age metabolism slowdown' appears largely attributable to muscle loss and reduced activity rather than aging metabolism per se. After age 60, there is genuine metabolic decline even after controlling for body composition — approximately 0.7% per year. The practical implication: the metabolism-slowing of aging that most people experience is substantially, though not entirely, preventable through maintaining muscle mass with resistance training and avoiding sedentary lifestyle. Someone who maintains their muscle mass and activity levels from age 30 to 60 will have much less metabolic decline than population averages suggest.`},
  {question:'Can eating small frequent meals speed up metabolism?',answer:`The claim that eating 5-6 small meals per day increases metabolism compared to 2-3 larger meals is not supported by controlled research. Multiple clinical trials comparing identical calorie and macronutrient intake at different meal frequencies find no significant difference in 24-hour total energy expenditure, RMR, or fat oxidation. The thermic effect of food (approximately 10% of ingested calories) is the same whether the calories arrive in 2 large doses or 6 small ones — the total daily TEF is identical because it is proportional to total food intake, not meal frequency. The frequent meal proponents pointed to studies suggesting glucose and insulin fluctuations differ between feeding patterns, but these differences don't translate to meaningful metabolic rate differences. Meal frequency should be determined by hunger, schedule, and personal preference — both traditional three-meal patterns and higher-frequency eating can support healthy metabolism when total calorie and protein intake are appropriate.`},
]

const seoContent = {
  title: 'Resting Metabolic Rate Calculator',
  category: 'health' as const,
  intro: `Your resting metabolic rate (RMR) is the number of calories your body burns just to maintain its basic functions at rest — breathing, circulating blood, maintaining body temperature, running organ systems, and synthesizing proteins. It accounts for roughly 60-75% of total daily calorie expenditure for sedentary individuals, which is why it's the most important number in any nutrition or weight management equation.

The most accurate way to measure RMR clinically is indirect calorimetry. Prediction equations offer reasonable estimates using height, weight, age, and sex, with Mifflin-St Jeor being the most validated for the general population. Harris-Benedict remains widely used. Katch-McArdle provides more accurate estimates when body fat percentage is known.

The equations typically agree within 5-10% for most people, but meaningful outliers exist. Highly muscular individuals are underestimated because muscle is more metabolically active than fat. Individuals with hypothyroidism have lower RMR than predicted — sometimes significantly.

This calculator provides your estimated RMR from multiple equations for comparison, plus your TDEE (total daily energy expenditure) across activity levels.

**Long-tail searches answered here:** resting metabolic rate calculator free online usa, how many calories do i burn just breathing calculator, rmr vs bmr calculator free no account, resting calorie burn calculator by weight and age, daily calorie burn at rest calculator free tool usa, resting metabolism calculator no signup 2026, rmr suppression from chronic dieting calculator free, how does muscle mass affect resting metabolic rate, rmr decline with age by decade calculator usa free, rmr calculation for underweight individuals usa free, calorie burn comparison sleep vs sitting vs standing, rmr adaptation from calorie restriction calculator free, rmr for sedentary vs very active person same weight, measuring rmr accuracy of formulas comparison calculator, rmr and body composition relationship calculator free usa`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate resting metabolic rate from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `RMR is not static — it changes with body composition, age, chronic dieting history, and metabolic health. The most significant changes: gaining lean muscle mass increases RMR (each pound of muscle burns approximately 6-10 additional calories per day at rest); chronic calorie restriction causes metabolic adaptation that reduces RMR below predicted values; and RMR declines gradually with age, roughly 1-2% per decade after 30 in the absence of muscle mass maintenance.

For weight management math: multiply your RMR by the appropriate activity multiplier to get TDEE, then set calorie intake 300-500 calories below TDEE for fat loss, or 200-350 above TDEE for muscle gain.

Don't over-rely on any single equation. If you're meticulously tracking food intake and your weight isn't changing in the expected direction, your true RMR likely differs from the estimate. Adjust your calorie target based on actual outcomes.`,
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
        generateWebAppStructuredData({ name: 'Resting Metabolic Rate Calculator', description: 'Calculate Resting Metabolic Rate (RMR) using Mifflin-St Jeor and Harris-Benedict equations. Understand the difference between measured RMR and calcula', url: 'https://tooltrio.com/calculators/health/resting-metabolic-rate-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Resting Metabolic Rate Calculator', description: 'Calculate Resting Metabolic Rate (RMR) using Mifflin-St Jeor and Harris-Benedict equations. Understand the difference between measured RMR and calcula', url: 'https://tooltrio.com/calculators/health/resting-metabolic-rate-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Resting Metabolic Rate Calculator', url: '/calculators/health/resting-metabolic-rate-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
