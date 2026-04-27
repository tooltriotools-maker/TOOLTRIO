import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Dental Health Risk Calculator — Cavity, Gum Disease & Tooth Loss Risk 2026',
  description: 'Assess your risk for dental caries, periodontal disease, and tooth loss based on diet, oral hygiene habits, saliva flow, fluoride exposure, and medical conditions. Get a personalized dental health action plan. Free online dental health calculator 2026. No signup required.',
  slug: 'dental-health-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'dental health calculator 2026',
    'free dental health calculator',
    'dental health calculator usa 2026',
    'dental health calculator free 2026',
    'dental health risk calculator',
    'cavity risk assessment',
    'gum disease risk calculator',
    'tooth decay risk factors',
    'dental health score quiz',
    'periodontal disease risk assessment',
    'cavity prevention calculator',
    'oral health risk calculator',
    'dental hygiene effectiveness score',
    'fluoride intake calculator',
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
  {question:'How many times a day should I actually brush my teeth?',answer:`The American Dental Association recommends brushing twice daily — once in the morning and once before bed. The bedtime brushing is the more critical of the two because saliva flow decreases during sleep, reducing the mouth's natural self-cleaning mechanism. Without brushing before bed, food debris and bacteria sit against teeth in a low-saliva environment for 6-8 hours, dramatically accelerating acid production and cavity formation. Some people benefit from a third midday brushing, but over-brushing with hard pressure can erode enamel. The technique matters as much as frequency — two minutes of proper brushing beats 30 seconds of vigorous scrubbing.`},
  {question:'Why does flossing matter if I brush thoroughly?',answer:`A toothbrush cannot reach the contact points between teeth — the surfaces where approximately 40% of tooth surfaces live. Dental floss (or interdental brushes) are the only way to remove plaque and food debris from these spaces. Gum disease (periodontal disease) most commonly begins in these interproximal spaces and progresses downward into the gum pocket. Research shows that people who floss daily have significantly lower rates of gum disease, tooth loss, and even cardiovascular disease (since periodontal bacteria can enter the bloodstream). The ADA recommends flossing once daily — the timing matters less than consistency.`},
  {question:'What does the connection between gum disease and heart disease actually mean?',answer:`Multiple large epidemiological studies have found that people with severe periodontal disease have roughly 2-3x higher risk of cardiovascular events. The mechanism appears to involve systemic inflammation: periodontal bacteria (particularly Porphyromonas gingivalis and Fusobacterium nucleatum) can enter the bloodstream through inflamed gum tissue and contribute to arterial inflammation and atherosclerotic plaque formation. Periodontal bacteria DNA has been found in atherosclerotic plaques. Whether treating gum disease reduces cardiovascular risk is still being studied — current evidence suggests improvement in some inflammatory markers but causality isn't fully established.`},
  {question:'How long does enamel erosion take, and can it be reversed?',answer:`Enamel erosion is permanent — unlike bone, enamel cannot regenerate because it contains no living cells. However, the rate of erosion varies dramatically. Regular exposure to acidic beverages (pH below 5.5) dissolves enamel measurably within weeks. A person who drinks three cans of soda daily can lose significant enamel within months. Frequent vomiting (from bulimia or GERD) exposes teeth to stomach acid at pH 1.5-2.0, causing severe erosion within 1-2 years. Early demineralization (before structural loss) can be reversed with fluoride and calcium phosphate treatments. Once the enamel surface is structurally lost, the only restoration is dental work — bonding, veneers, or crowns.`},
  {question:'At what age should children have their first dental visit?',answer:`The American Academy of Pediatric Dentistry recommends a child's first dental visit by age 1, or within 6 months of the first tooth erupting. This early visit establishes a dental home, allows the dentist to assess eruption patterns, identify any early decay (baby bottle caries is common), and counsel parents on feeding practices and oral hygiene. Children who establish regular dental care by age 1-2 have significantly lower rates of dental anxiety as adults. Many parents mistakenly wait until all baby teeth are in or until the child is 3-4 — by this point, significant decay may already be present and untreated.`},
  {question:'What is the relationship between sugar consumption and cavity formation?',answer:`Cavities form not from sugar directly contacting teeth, but from acid produced by oral bacteria (primarily Streptococcus mutans) when they metabolize sugars. The critical factors are frequency of exposure rather than total amount — someone who drinks one large soda in 10 minutes has fewer acid events than someone who sips a soda over 2 hours. Each acid exposure drops mouth pH below 5.5 for approximately 20-30 minutes. Sticky sugars (candy, raisins, gummy vitamins) cause longer acid exposure than liquids. Drinking through a straw with liquid sugars directs them away from teeth. Rinsing with water after sugar exposure helps, as does chewing xylitol gum which inhibits S. mutans growth.`},
  {question:'How often do I really need to see a dentist if I have healthy teeth?',answer:`The traditional 'every 6 months' recommendation has less evidence behind it than most people assume — it originated in 1950s toothpaste advertising, not clinical research. Current evidence suggests that low-risk adults (no gum disease, no active decay, good home care, no dry mouth, non-smokers) may be adequately served by annual cleanings. People with higher risk factors — history of periodontal disease, dry mouth from medications, diabetes, active smoking, or decay-prone teeth — genuinely benefit from 3-4 month intervals. A personalized recall interval based on your specific risk factors is more rational than universal 6-month scheduling.`},
  {question:'What causes bad breath and when should it concern me?',answer:`Approximately 85-90% of bad breath (halitosis) originates in the mouth — primarily from bacterial breakdown of sulfur-containing proteins on the back of the tongue, in gum pockets, and between teeth. The remaining 10-15% comes from systemic sources: GERD (stomach acid), sinus infections (post-nasal drip), kidney disease (ammonia breath), liver disease (sweet-musty breath), or diabetic ketoacidosis (fruity acetone breath). Morning breath is universal — reduced saliva flow overnight allows bacterial activity. Persistent halitosis despite good oral hygiene warrants dental evaluation for periodontal pockets or dry mouth, and potentially medical evaluation for systemic causes.`},
]

const seoContent = {
  title: 'Dental Health Risk Calculator',
  category: 'health' as const,
  intro: `Oral health is more connected to systemic health than most people realize. The mouth isn't isolated from the rest of your body — it's the entry point to your digestive and respiratory systems, and the bacteria and inflammation in your gums have direct pathways to your bloodstream. Periodontal disease is independently associated with increased cardiovascular risk, diabetes complications, adverse pregnancy outcomes, and respiratory infections.

The most prevalent preventable diseases in the US are dental. Cavities form when oral bacteria metabolize sugars and produce acid that demineralizes tooth enamel. Gum disease progresses from gingivitis (reversible inflammation) to periodontitis (irreversible bone and tissue destruction) when bacterial plaque isn't regularly disrupted by brushing and flossing. Both are almost entirely preventable with consistent hygiene.

This calculator assesses your dental health risk across cavity risk, gum disease risk, and overall oral health score based on your hygiene habits, diet patterns, saliva flow, and dental visit frequency. It identifies your highest-priority areas and gives specific behavioral recommendations calibrated to your risk level.

**Long-tail searches answered here:** dental health risk calculator free online usa, how healthy are my teeth calculator free tool, oral health score calculator no signup, cavities and gum disease risk calculator usa free, dental hygiene health impact calculator, how often should i see a dentist calculator free, daily oral hygiene habit score calculator usa free, flossing brushing mouthwash benefit calculator free, sugar intake and cavity risk calculator usa free, gum disease progression risk calculator free online, tooth sensitivity risk factor calculator free usa, dental health impact on heart health calculator free, fluoride toothpaste vs non fluoride benefit calculator, whitening treatment safety score calculator usa free, oral cancer risk factor calculator free online usa`,
  howItWorks: `Dental caries risk is estimated from the primary etiological factors established by the Keyes Circles model: susceptible host (enamel quality, saliva quantity/quality), cariogenic bacteria (Streptococcus mutans load, which correlates with frequency of sugar exposure), fermentable substrate (sugar frequency), and time (duration of acid exposure). Each factor is assessed from behavioral and history questions and combined into an overall risk score.

Periodontal disease risk additionally incorporates: plaque control (brushing/flossing frequency), smoking status (3× risk amplifier), diabetes status (bidirectional relationship with periodontitis), and genetic susceptibility markers. Total risk score translates to low, moderate, or high caries and periodontal risk with specific preventive recommendations.`,
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
  tipsSection: `Frequency of sugar exposure matters more than total sugar amount for cavity risk. Sipping a sweet drink over 2 hours produces 120 minutes of acid attack; drinking the same beverage in 5 minutes produces only 30 minutes of acid attack — even though the total sugar is identical. This is why frequency, not amount, is the key behavioral variable in decay prevention.

Saliva is the primary natural cavity defense — it buffers acid, remineralizes enamel, and contains antibacterial proteins. Conditions that reduce salivary flow (certain medications, mouth breathing, Sjögren's syndrome, radiation to head/neck) dramatically increase cavity risk. If you take medications causing dry mouth, discuss preventive strategies with your dentist.

Fluoride toothpaste is the single most evidence-based cavity prevention intervention available over the counter. Using fluoride toothpaste twice daily reduces caries by 24-30% compared to placebo in RCTs — don't rinse after brushing, since leaving fluoride on enamel extends remineralization time.`,
  scienceSection: `The etiology of dental caries was definitively established by W.D. Miller in 1890 (Chemo-Parasitic Theory) and refined to the Keyes Circles model by Philip Keyes in 1960. The landmark Vipeholm Study (1954) established the relationship between sugar frequency and caries development in a study of mental institution residents given different forms and frequencies of sugar — a study that would not pass modern ethical review but established foundational preventive dentistry principles. Subsequent community water fluoridation studies in the US (beginning with Grand Rapids, Michigan in 1945) demonstrated 50-65% caries reduction from optimal fluoride concentration.`,
  conclusion: `The most impactful dental habits in order of evidence strength: brushing twice daily with fluoride toothpaste for at least two minutes, flossing or using interdental brushes once daily, limiting between-meal sugar frequency (frequency matters more than total amount), staying hydrated to maintain saliva flow, and seeing a dentist every 6-12 months for professional cleaning and early detection.

Fluoride is the single most effective cavity prevention tool available — it remineralizes early enamel erosion and makes teeth more resistant to future acid attack. Toothpaste concentration matters: 1,000-1,450 ppm fluoride is standard for adults.

If this assessment flagged bleeding gums, don't stop flossing because it bleeds — the bleeding is the disease, and regular disruption of bacteria is the treatment. Consistent daily flossing typically resolves mild gum inflammation within 2-4 weeks.`,
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
        generateWebAppStructuredData({ name: 'Dental Health Risk Calculator', description: 'Assess your risk for dental caries, periodontal disease, and tooth loss based on diet, oral hygiene habits, saliva flow, fluoride exposure, and medica', url: 'https://tooltrio.com/calculators/health/dental-health-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Dental Health Risk Calculator', description: 'Assess your risk for dental caries, periodontal disease, and tooth loss based on diet, oral hygiene habits, saliva flow, fluoride exposure, and medica', url: 'https://tooltrio.com/calculators/health/dental-health-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Dental Health Risk Calculator', url: '/calculators/health/dental-health-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
