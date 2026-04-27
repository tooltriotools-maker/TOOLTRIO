import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Calories Burned Calculator — 100+ Activities with MET Values 2026',
  description: 'Free Calories Burned Calculator 2026 — Calculate calories burned during exercise based on weight, duration, and intensity. Real examples for common activities. MET-based formula used by fitness professionals.',
  slug: 'calories-burned-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'calories burned calculator 2026',
    'free calories burned calculator',
    'calories burned calculator usa 2026',
    'calorie calculator 2026',
    'daily calorie calculator 2026',
    'calorie needs calculator usa 2026',
    'calories burned calculator by activity',
    'exercise calorie burn calculator',
    'met values exercise calculator',
    'how many calories burned running',
    'calories burned cycling per hour',
    'swimming calories burned calculator',
    'strength training calorie burn',
    'yoga calories burned calculator',
    'sports calorie burn by weight',
    'activity calorie counter',
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
  {question:'How do you calculate calories burned during exercise?',answer:'Calorie burn during exercise is calculated using MET (Metabolic Equivalent of Task) values. The formula is: Calories = MET × body weight (kg) × duration (hours). MET represents the ratio of activity metabolic rate to resting metabolic rate — a MET of 1.0 equals resting, 3.5 is moderate walking, 8.0 is vigorous running. MET values for hundreds of activities are published in the Compendium of Physical Activities (Ainsworth et al., 2011), derived from direct oxygen consumption measurements during activities. This method is accurate within 10-20% for moderate-intensity activities but less reliable for high-intensity intervals.',},
  {question:'What activities burn the most calories per hour?',answer:'Highest-calorie activities (per hour for 150 lb person): vigorous rowing machine (~600-700 kcal/hour); cross-country skiing at race pace (~700 kcal/hour); vigorous swimming (~550-650 kcal/hour); running at 7 mph (8.5 min/mile, ~680 kcal/hour); vigorous cycling (~600-700 kcal/hour); HIIT workouts (~400-600 kcal/hour); boxing workout (~500-600 kcal/hour); basketball game (~500 kcal/hour); moderate running at 5 mph (~480 kcal/hour). Calorie burn scales directly with body weight — a 200 lb person burns approximately 33% more than a 150 lb person at the same activity.',},
  {question:'Why is calorie tracking inaccurate on fitness trackers?',answer:'Consumer fitness trackers (Fitbit, Apple Watch, Garmin) overestimate calorie burn by an average of 20-80% across different activities in independent validation studies. The Stanford study published in JLMS (2017) tested 7 fitness trackers and found calorie errors of 27-93%. Reasons for inaccuracy: heart rate algorithms have difficulty distinguishing fitness level, age, and metabolic efficiency differences; wrist-based optical heart rate measurement is unreliable during activities with wrist movement; calorie algorithms use population averages that may not reflect individual metabolism; and the devices add resting metabolic rate to activity burn (which may be double-counted with dietary logs).',},
  {question:'Does muscle mass affect how many calories you burn exercising?',answer:'Yes — people with higher muscle mass burn more calories during the same exercise at the same absolute intensity because muscle tissue has higher metabolic activity and is the primary tissue consuming oxygen during aerobic exercise. However the practical effect is smaller than most people think — a very muscular person may burn 5-10% more calories than an average-composition person of the same weight during moderate aerobic exercise, not 20-30% more. Muscle mass has a much larger effect on RESTING metabolic rate (approximately 6-10 kcal/lb/day for muscle versus 1-2 kcal/lb/day for fat) than on exercise calorie burn per se.',},
  {question:'What is EPOC and how much extra calorie burn does it provide?',answer:'EPOC (Excess Post-exercise Oxygen Consumption) is the elevated metabolic rate that persists after exercise as the body restores oxygen levels, clears lactate, repairs muscle protein, and replenishes ATP stores. After moderate aerobic exercise, EPOC adds approximately 3-7% of total exercise calorie expenditure. After high-intensity exercise (HIIT, heavy resistance training), EPOC can add 6-15% above the exercise calorie burn itself — lasting up to 24-48 hours for very intense sessions. While real, the absolute magnitude of EPOC is often overstated in fitness marketing — a 45-minute HIIT session might burn 400 calories during exercise and 40-60 additional calories from EPOC, not hundreds more.',},
  {question:'How does the same exercise burn different calories for different people?',answer:'Exercise calorie burn varies by: body weight (heavier people do more mechanical work moving their mass, burning more calories); fitness level (trained individuals are more metabolically efficient at the same absolute speed, burning slightly fewer calories per mile); body composition (higher lean mass = slightly higher calorie burn at the same activity); age (metabolism decreases ~1-2% per decade from 20-60); sex (men burn slightly more calories than women at same weight due to average composition differences); and exercise economy (running form, cycling efficiency all affect metabolic cost at the same speed).',},
  {question:'Do I need to exercise every day to burn significant calories?',answer:'Consistency over time matters more than daily frequency. Research shows that 3-5 sessions per week of moderate-to-vigorous exercise produces most of the cardiovascular, metabolic, and body composition benefits associated with regular exercise. Daily activity (walking, taking stairs, standing vs sitting) often contributes as many calories as formal exercise sessions for sedentary people. A 2009 study published in PLoS ONE found that non-exercise activity thermogenesis (NEAT — all movement that is not formal exercise) accounts for 15-50% of total daily energy expenditure in active people and significantly predicts weight management outcomes.',},
]

const seoContent = {
  title: 'Calories Burned Calculator',
  category: 'health' as const,
  intro: `Every physical activity has a metabolic cost — a rate of energy expenditure above your resting baseline that depends on the activity's intensity, your body weight, and how long you do it. The framework for quantifying this is METs (metabolic equivalents of task): a 1 MET equals your resting metabolic rate (roughly 1 kcal/kg/hour), and every activity is assigned a MET value based on oxygen consumption measurements in research settings. Walking at 3.5 mph is about 3.5 METs. Running at 6 mph is about 10 METs. Compendium MET values for hundreds of activities have been validated and published by the ACSM.

The most common mistake people make is overestimating how many calories exercise burns. A 45-minute moderate gym session burns 300-500 calories for most people — meaningful, but not enough to outrun a poor diet. Fitness trackers and cardio equipment consistently overestimate by 10-40% because they use simplified algorithms that don't account for fitness level, actual sustained pace, or individual metabolic variation.

This calculator applies validated MET values to your specific weight and duration to give you a calorie burn estimate that's both more accurate than most trackers and honest about its limitations. It covers over 40 activity types across cardio, strength training, sports, and daily activities.

Understanding your actual caloric expenditure from exercise gives you the information to make better decisions about nutrition — not to earn unhealthy foods, but to ensure you're fueling recovery and not inadvertently eating back your entire exercise deficit.

**Long-tail searches answered here:** calories burned exercise calculator free online usa, how many calories burned doing different activities, total daily calorie burn calculator by activity free, exercise calorie burn estimator no signup usa, calories burned per hour by activity type calculator, free calories burned during workout calculator 2026, mets based calorie burn calculator by activity usa free, how many calories does 30 minutes of activity burn free, calories burned household chores calculator usa free, calories burned gardening per hour calculator usa, calories burned playing with kids calculator free online, calorie burn difference by fitness level calculator usa, calories burned standing vs sitting all day calculator free, leisure activity calorie burn estimator usa free online, weekly total calorie burn from all activities calculator`,
  howItWorks: `Calorie burn for each activity is calculated using MET (Metabolic Equivalent of Task) values from the Compendium of Physical Activities (Ainsworth et al., 2011, updated 2016): Calories = MET × body weight (kg) × duration (hours). MET represents oxygen consumption relative to resting (1 MET = 3.5 mL O₂/kg/min). Light walking = MET 2.5; brisk walking = MET 3.5; jogging 5 mph = MET 8.3; running 8 mph = MET 11.5; vigorous cycling = MET 12; swimming laps = MET 8.0; yoga = MET 2.9; strength training = MET 3.5-5.0.

Total calorie burn adds resting metabolic rate (1 MET) to activity-specific METs, since the body continues burning baseline calories during activity.`,
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
  tipsSection: `Use heart rate to verify calorie burn for high-intensity work. MET-based calculations are most accurate for steady-state aerobic exercise at moderate intensity. For HIIT, heavy strength training, and activities with large between-person variation, heart rate-based calorie monitoring (available on most fitness devices) gives more personalized estimates.

Intermittent activities (team sports, recreational sports with active and passive periods) have variable MET values — the compendium values represent averages that may not match your specific playing style or position.

Remember that calorie burn from exercise is typically 15-30% of total daily energy expenditure for most active people — nutrition management contributes more to weight goals than exercise calorie burn alone for most non-elite athletes.`,
  scienceSection: `The Compendium of Physical Activities was first published by Barbara Ainsworth and colleagues in 1993, originally compiling MET values for 477 activities. Updated in 2000 and 2011, the current compendium includes over 800 activities. MET values were originally determined through expired gas analysis (measuring oxygen consumption) during standardized performance of each activity — the most accurate method for quantifying energy expenditure.`,
  conclusion: `The number from this calculator is most useful as a planning tool and reality check, not as a precise measurement. True calorie expenditure varies based on your fitness level, temperature, individual metabolic variation, and the exact pace and effort you actually maintained throughout the activity.

For weight management math, a practical approach: use this calculator to estimate weekly exercise calorie expenditure, add it to your resting metabolic rate from [our TDEE Calculator](/calculators/health/tdee-calculator), and compare the total against your actual calorie intake. The gap between those numbers — sustained consistently — drives weight change.

Use [our Running Pace Calculator](/calculators/health/running-pace-calculator) for running-specific calorie and performance metrics, or [our HIIT Calculator](/calculators/health/hiit-calculator) if your training involves high-intensity interval work.`,
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
        generateWebAppStructuredData({ name: 'Calories Burned Calculator', description: 'Calculate calories burned during any exercise or physical activity using validated MET (Metabolic Equivalent of Task) values. Covers running, cycling,', url: 'https://tooltrio.com/calculators/health/calories-burned-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Calories Burned Calculator', description: 'Calculate calories burned during any exercise or physical activity using validated MET (Metabolic Equivalent of Task) values. Covers running, cycling,', url: 'https://tooltrio.com/calculators/health/calories-burned-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Calories Burned Calculator', url: '/calculators/health/calories-burned-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
