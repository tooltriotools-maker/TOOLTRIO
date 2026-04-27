import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Cold Exposure Calculator — Cold Plunge Temperature, Duration & Adaptation 2026',
  description: 'Calculate safe cold water immersion parameters based on your adaptation level, water temperature, and health status. Find beginner to advanced cold plunge protocols, safety thresholds, and recovery timing. Free online cold exposure calculator 2026. No signup required.',
  slug: 'cold-exposure-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'cold exposure calculator 2026',
    'free cold exposure calculator',
    'cold exposure calculator usa 2026',
    'cold exposure calculator free 2026',
    'cold plunge calculator',
    'cold water immersion duration calculator',
    'cold exposure temperature time calculator',
    'safe cold plunge time by water temperature',
    'wim hof cold exposure protocol',
    'cold therapy health benefits calculator',
    'cold shower vs cold plunge benefits',
    'cold water immersion hypothermia risk',
    'cold exposure adaptation calculator',
    'cold plunge for inflammation',
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
  {question:'What temperature water should a cold plunge be?',answer:'Research on cold water immersion therapy uses various temperature ranges: for recovery and inflammation reduction, 10-15°C (50-59°F) for 10-15 minutes is the most studied and evidenced protocol; for the Wim Hof method and cardiovascular adaptation, 10-15°C is standard; for beginners, starting at 15-18°C (59-64°F) is safer while still providing benefits. Ice baths used by athletes typically range from 10-15°C. Below 10°C (50°F) increases hypothermia risk significantly, especially for immersion durations over 10 minutes, and is generally not recommended without experience.',},
  {question:'How long should a cold plunge last?',answer:'Evidence-based cold water immersion protocols: for athletic recovery from intense exercise, 10-15 minutes at 10-15°C is supported by multiple meta-analyses showing reduced muscle soreness and perceived fatigue. For general health and adaptation benefits, 2-5 minutes is sufficient for most people to achieve significant cardiovascular and hormonal responses. The diminishing returns curve is steep — the largest cardiovascular and norepinephrine responses occur in the first 2 minutes. Longer than 20 minutes at cold temperatures significantly increases hypothermia risk, particularly in lean individuals and for water temperatures below 10°C.',},
  {question:'What are the proven health benefits of cold exposure?',answer:'Research-supported benefits: significant norepinephrine increase (200-300% increase with cold water immersion at 14°C, published in European Journal of Applied Physiology) — norepinephrine reduces pain, improves mood and focus; reduced post-exercise muscle soreness (meta-analysis shows meaningful reduction in delayed onset muscle soreness when compared to passive recovery); improved cold adaptation with repeated exposure; possible brown adipose tissue activation for cold thermogenesis; and some evidence for improved insulin sensitivity. Claims about cold exposure improving immunity, longevity, or acting as a powerful anti-inflammatory beyond DOMS reduction are less well supported by current RCT evidence.',},
  {question:'Can cold exposure help with depression or anxiety?',answer:'Preliminary evidence is promising but not conclusive. A case study by Shevchuk (2008) proposed cold showers as treatment for depression based on autonomic nervous system theory. A 2020 RCT in JMIR Mental Health found that wild swimming in cold water significantly reduced depression symptoms in people who had not responded to antidepressants. Physiologically, cold exposure releases beta-endorphins and norepinephrine, which are relevant to mood regulation. However large, rigorous RCTs are lacking. Most evidence is preliminary, mechanistic, or based on self-report surveys. Cold exposure should be considered complementary to, not a replacement for, evidence-based depression treatments.',},
  {question:'Is cold plunging safe for everyone?',answer:'Cold plunging carries real risks for certain populations: cardiovascular disease (cold water triggers rapid heart rate and blood pressure spike that can be dangerous with pre-existing arrhythmias, coronary disease, or heart failure — always consult a cardiologist); Raynaud\'s disease or peripheral vascular disease (cold triggers vasospasm, potentially dangerous); hypertension (cold acutely raises blood pressure significantly); pregnancy (avoid cold extremes); certain medications (beta-blockers, vasodilators); and hypothermia risk for anyone with very low body fat in very cold water. Otherwise healthy adults generally tolerate properly supervised cold exposure well.',},
  {question:'Does cold exposure burn significant calories?',answer:'Cold exposure does increase calorie burn through thermogenesis (the body generating heat to maintain core temperature), but the magnitude is often overstated. Studies show that cold water immersion at 14-15°C increases metabolic rate by approximately 350% during immersion — but a 10-minute plunge increases total calorie expenditure by only 25-50 kcal beyond resting, not hundreds. Brown adipose tissue (BAT) activation from chronic cold exposure can increase resting metabolic rate by 3-5% in people with significant BAT, but most adults have limited BAT volume. Cold exposure is beneficial for many reasons but dramatic fat loss is not one of them.',},
  {question:'What should I do after a cold plunge to recover?',answer:'Post-cold plunge recovery: dry off completely as soon as possible — evaporative cooling from wet skin continues even after leaving the water; warm up gradually through movement rather than immediately jumping into hot water (rapid rewarming can cause after-drop, where core temperature continues declining briefly as cold peripheral blood returns to core); eat a small carbohydrate-protein snack if training recovery is the goal (supports glycogen replenishment); and allow 2-4 hours before sleep as the post-cold thermal rebound (body temperature rising) can temporarily increase alertness — many practitioners find morning cold exposure works better than evening for this reason.',},
]

const seoContent = {
  title: 'Cold Exposure Calculator',
  category: 'health' as const,
  intro: `Cold exposure has moved from fringe biohacking into legitimate clinical and sports science research over the past decade. Cold water immersion, cryotherapy, and cold showers produce real physiological responses — activation of brown adipose tissue (BAT), norepinephrine release, improved circulation, and reduced inflammatory markers — though the magnitude of benefit varies widely based on temperature, duration, and frequency, and much of the popular literature overstates the effects dramatically.

The science that's well-established: cold water immersion at 10-15°C (50-59°F) for 5-15 minutes reduces delayed onset muscle soreness and accelerates perceived recovery between training sessions. A 2022 meta-analysis of 21 studies found cold water immersion significantly reduced DOMS at 24 and 48 hours post-exercise compared to passive recovery. Less certain: claims about fat loss, immune enhancement, and longevity benefits require more evidence.

Brown adipose tissue activation is real — cold exposure does increase BAT activity and thermogenesis — but the caloric contribution is modest for most adults (~100-200 extra calories per hour of significant cold exposure), and BAT volume varies enormously between individuals.

This calculator estimates your physiological response to cold exposure — caloric cost of thermogenesis, estimated core temperature change, optimal protocol for your goal — based on water temperature, duration, and your body composition.

**Long-tail searches answered here:** cold exposure benefits calculator free online usa, how long should i do cold plunge calculator, cold water immersion time calculator by temperature, cold exposure protocol calculator free no signup, safe cold water exposure duration calculator, ice bath temperature duration calculator usa free, cold plunge time calculator by water temperature free, beginner cold exposure protocol calculator usa free, cold shower to ice bath progression calculator free, brown fat activation from cold exposure calculator, cold exposure frequency per week calculator usa free, metabolic boost from cold thermogenesis calculator free, cold water immersion stress response calculator free usa, safe cold plunge temperature for beginners calculator, wim hof cold exposure protocol duration calculator free`,
  howItWorks: `Safe cold water immersion parameters depend on water temperature and individual adaptation level. Heat loss in water is approximately 25× faster than in air at the same temperature. Hypothermia onset time estimates: 10°C (50°F) water — untrained: cold incapacitation within 5-15 min, hypothermia in 1-3 hours; 15°C (59°F) — cold incapacitation within 30-60 min, hypothermia in 4-6 hours; 20°C (68°F) — extended exposure possible but hypothermia risk after 2+ hours.

Cold shock response (first 3 minutes) is the immediate danger — gasping, hyperventilation, and possible cardiac arrhythmia. After cold shock adaptation, swimming failure (30 min range at extreme temperatures), then hypothermia, then circumpolar incapacitation represent successive hazards with increasing immersion duration.`,
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
  tipsSection: `Never cold plunge alone — always have someone nearby who can help if you experience unexpected cold shock or cardiac symptoms. Cold shock response peaks in the first 30-60 seconds and can cause involuntary gasping that leads to water inhalation.

Build exposure gradually over 4-6 weeks: start with 30-60 seconds at your comfortable cold shower temperature, then progressively lower temperature or increase duration. The physiological adaptations (attenuated cold shock response, improved brown adipose tissue thermogenesis) take 3-6 sessions to begin appearing.

Exercise immediately before cold immersion warms the core, extends safe immersion time, and amplifies the contrast therapy effect on inflammation and recovery. Avoid cold immersion immediately after heavy resistance training sessions if muscle growth is your primary goal — some research suggests cold water immersion blunts muscle protein synthesis for 24-48 hours.`,
  scienceSection: `James Vanek and colleagues' pioneering research on cold water survival established the primary hazard sequence in accidental cold water immersion: cold shock (minutes), swimming failure (minutes to tens of minutes), hypothermia (tens of minutes to hours), and post-rescue collapse. This framework is now standard in maritime rescue and safety training. The therapeutic use of cold water immersion for athletic recovery was formalized by sports medicine research in the 1990s-2000s, with meta-analyses consistently showing significant benefit for muscle soreness reduction at 10-15°C immersion.`,
  conclusion: `If you're using cold exposure for athletic recovery, the evidence is clearest for post-exercise immersion: 11-15 minutes at 11-15°C reduces muscle soreness without significantly impairing long-term training adaptation. Timing your cold exposure away from strength training sessions — or using it primarily on rest days — is a reasonable middle ground.

For general cold exposure as a health practice, the key variable is consistency over intensity. Regular, moderate cold exposure adapted to over weeks appears to produce more durable autonomic and metabolic benefits than occasional intense cold stress.

Safety note: never engage in cold water immersion alone, particularly in natural open water. Cold shock response (gasp reflex and involuntary hyperventilation) peaks in the first 30-90 seconds and is responsible for most cold water drownings. Start with showers before progressing to immersion.`,
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
        generateWebAppStructuredData({ name: 'Cold Exposure Calculator', description: 'Calculate safe cold water immersion parameters based on your adaptation level, water temperature, and health status. Find beginner to advanced cold pl', url: 'https://tooltrio.com/calculators/health/cold-exposure-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Cold Exposure Calculator', description: 'Calculate safe cold water immersion parameters based on your adaptation level, water temperature, and health status. Find beginner to advanced cold pl', url: 'https://tooltrio.com/calculators/health/cold-exposure-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Cold Exposure Calculator', url: '/calculators/health/cold-exposure-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
