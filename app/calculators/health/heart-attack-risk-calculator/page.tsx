import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Heart Attack Risk Calculator — 10-Year ASCVD Risk Score (ACC/AHA) 2026',
  description: 'Free Heart Attack Risk Calculator 2026 — Calculate your cardiovascular health metrics using American Heart Association standards. Risk assessment with actionable recommendations. No personal data stored.',
  slug: 'heart-attack-risk-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'heart attack risk calculator 2026',
    'free heart attack risk calculator',
    'heart attack risk calculator usa 2026',
    'heart health calculator 2026',
    'blood pressure calculator 2026',
    'cardiovascular risk calculator 2026',
    'heart attack risk calculator',
    '10 year cardiovascular risk calculator',
    'ascvd risk score calculator',
    'pooled cohort equation calculator',
    'acc aha cardiovascular risk',
    'heart attack probability calculator',
    'cardiovascular risk assessment',
    'heart disease risk calculator',
    'statin decision calculator',
    'pcsk9 eligibility risk score',
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
  {question:'How is 10-year cardiovascular event risk calculated?',answer:'The ACC/AHA Pooled Cohort Equations (2013) estimate 10-year risk of first atherosclerotic cardiovascular disease (ASCVD) event — fatal or non-fatal myocardial infarction or fatal stroke. Inputs: age (40-79), sex, race (White/Black/Other), total cholesterol, HDL cholesterol, systolic blood pressure, blood pressure treatment status, diabetes, and smoking status. Risk categories: low <5%, borderline 5-7.5%, intermediate 7.5-20%, high ≥20%. These equations are the basis for ACC/AHA statin therapy recommendations. The equations are validated primarily in US White and Black adults and may overestimate risk in South Asians and underestimate in some other groups.',},
  {question:'What is a heart attack and how does it happen?',answer:'A heart attack (myocardial infarction, MI) occurs when blood flow to a section of heart muscle is blocked long enough that the muscle begins to die. Most MIs result from rupture of an unstable atherosclerotic plaque in a coronary artery, triggering a blood clot (thrombus) that occludes the vessel. The plaque develops over decades from cholesterol deposition, inflammatory cell infiltration, and fibrous cap formation — a process accelerated by high LDL cholesterol, hypertension, diabetes, smoking, and inflammation. The size of the myocardial infarction depends on which artery is blocked, how far from the heart the blockage occurs, and how quickly treatment is received.',},
  {question:'What are warning signs of a heart attack?',answer:'Classic MI symptoms: crushing, squeezing, or pressure-like chest pain (often described as \'elephant on my chest\') radiating to left arm, jaw, or back; shortness of breath; diaphoresis (cold sweat); nausea or vomiting; and lightheadedness. Women are more likely to present with atypical symptoms: unusual fatigue, shortness of breath, back or jaw pain, and nausea without classic chest pain. Anyone experiencing symptoms suggestive of MI should call 911 immediately — time to treatment is the most critical determinant of outcome. Chewing aspirin (325 mg) while waiting for emergency services reduces clot propagation.',},
  {question:'What lifestyle changes most reduce heart attack risk?',answer:'Highest-impact modifiable risk factor interventions: smoking cessation (most powerful single intervention — halves cardiovascular risk within 1 year); blood pressure management (each 10 mmHg reduction in systolic BP reduces MI risk by 25% and stroke by 35%); LDL cholesterol reduction (each 39 mg/dL LDL reduction reduces major cardiovascular events by 22%); regular aerobic exercise (150+ minutes/week reduces cardiovascular mortality by 35%); diabetes management (HbA1c control reduces microvascular complications significantly); and healthy weight maintenance. Combination of all these factors can reduce lifetime cardiovascular risk by 50-80%.',},
  {question:'At what cholesterol level should I consider a statin?',answer:'Current ACC/AHA guidelines recommend statin therapy for: patients with clinical ASCVD (prior MI, stroke, peripheral arterial disease); patients with LDL ≥190 mg/dL (familial hypercholesterolemia); patients with diabetes age 40-75 with LDL 70-189 mg/dL; and patients age 40-75 without ASCVD or diabetes with LDL 70-189 mg/dL and estimated 10-year ASCVD risk ≥7.5%. For patients with borderline risk (5-7.5%), risk-enhancing factors (family history, hs-CRP ≥2 mg/L, ABI <0.9, metabolic syndrome) or coronary artery calcium score can help guide shared decision-making. Lifestyle modification should be attempted first in lower-risk patients.',},
  {question:'How do I reduce heart attack risk if I can\'t exercise much?',answer:'For people with physical limitations: even light physical activity (slow walking, standing instead of sitting) provides cardiovascular benefit compared to complete sedentary behavior — research shows breaking sitting with 2-minute light activity bouts every 30 minutes improves glycemic and cardiovascular markers; dietary interventions (Mediterranean diet, reduced sodium, increased fiber) reduce cardiovascular risk independent of activity level; smoking cessation and blood pressure and cholesterol management are pharmacological options that do not require physical activity; and stress management (which reduces cortisol and blood pressure) can be practiced regardless of mobility. Multiple small risk factor improvements combine multiplicatively.',},
  {question:'What is the JUPITER trial and what did it find?',answer:'The JUPITER (Justification for the Use of Statins in Prevention: an Intervention Trial Evaluating Rosuvastatin) trial was a landmark 2008 RCT of 17,802 apparently healthy adults with normal LDL but elevated hs-CRP (≥2 mg/L). Rosuvastatin 20 mg reduced LDL by 50% and hs-CRP by 37%, and reduced the combined endpoint of MI, stroke, arterial revascularization, hospitalization, and death from cardiovascular causes by 44% compared to placebo. The trial was stopped early due to clear benefit. JUPITER established the clinical role of inflammatory biomarkers in cardiovascular risk stratification and confirmed the benefit of statins in primary prevention for elevated-hs-CRP patients.',},
]

const seoContent = {
  title: 'Heart Attack Risk Calculator',
  category: 'health' as const,
  intro: `Heart attacks don't happen randomly. They are the end result of decades of gradual arterial change — atherosclerotic plaque building up in coronary artery walls, eventually rupturing and triggering the blood clot that blocks blood flow to heart muscle. Most major cardiovascular events in people under 65 are preventable, and the risk factors that drive them are measurable, trackable, and largely modifiable starting decades before an event would occur.

The Framingham Risk Score and ACC/AHA Pooled Cohort equations estimate 10-year risk of a major cardiovascular event (heart attack, stroke, or cardiovascular death) from a handful of inputs: age, sex, blood pressure, cholesterol levels, diabetes status, and smoking. These models have been validated in populations of millions and are the basis for clinical guidelines on when to initiate statin therapy, blood pressure medication, and aspirin.

Risk calculators don't predict the future — they estimate probability. A 15% 10-year risk means roughly 15 out of 100 people with your profile will have a cardiovascular event in the next decade. But it gives you a number to take seriously and discuss with your physician.

This calculator uses the ACC/AHA Pooled Cohort equations — the current clinical standard — to assess your risk and identify which inputs are contributing most to your result.

**Long-tail searches answered here:** heart attack risk calculator free online usa, 10 year heart attack risk calculator free tool, framingham risk score calculator usa free no signup, ascvd risk calculator free online 2026, cardiovascular event risk calculator for adults usa, am i at high risk for heart attack calculator free, 10 year myocardial infarction risk by cholesterol age calculator, lifestyle factors heart attack prevention score calculator, family history impact on heart attack risk calculator usa, smoking cessation heart attack risk reduction calculator, statin eligibility calculator from heart attack risk score, blood pressure control on heart attack risk calculator free, weight loss impact on cardiovascular risk calculator usa, atrial fibrillation heart attack risk calculator free, race and ethnicity adjusted heart attack risk calculator usa`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate heart attack risk from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `A risk calculator is a starting point for a conversation, not a medical diagnosis or prescription. If your result shows high 10-year risk (above 10-15%), the appropriate next step is discussing it with your physician — they can order calcium scoring, review your lab values, and make personalized recommendations.

The most effective interventions for risk reduction, in order of evidence strength: statin therapy for elevated LDL (reduces cardiovascular events by 25-35% in high-risk individuals), blood pressure control (each 10 mmHg reduction in systolic BP reduces major cardiovascular events by about 20%), smoking cessation, and sustained regular aerobic exercise.

Use [our Heart Age Calculator](/calculators/health/heart-age-calculator) to translate your risk into an age-based frame, or [our Blood Pressure Calculator](/calculators/health/blood-pressure-calculator) to understand how blood pressure management specifically affects your cardiovascular risk trajectory.`,
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
        generateWebAppStructuredData({ name: 'Heart Attack Risk Calculator', description: 'Calculate your 10-year atherosclerotic cardiovascular disease (ASCVD) event risk using the ACC/AHA Pooled Cohort Equations. Based on age, sex, race, c', url: 'https://tooltrio.com/calculators/health/heart-attack-risk-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Heart Attack Risk Calculator', description: 'Calculate your 10-year atherosclerotic cardiovascular disease (ASCVD) event risk using the ACC/AHA Pooled Cohort Equations. Based on age, sex, race, c', url: 'https://tooltrio.com/calculators/health/heart-attack-risk-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Heart Attack Risk Calculator', url: '/calculators/health/heart-attack-risk-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
