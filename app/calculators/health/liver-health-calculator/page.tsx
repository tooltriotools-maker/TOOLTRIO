import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Liver Health Risk Calculator — Fatty Liver Disease & Liver Function Assessment 2026',
  description: 'Assess your risk for non-alcoholic fatty liver disease (NAFLD) and liver dysfunction based on BMI, alcohol intake, diet quality, medications, and metabolic health markers. Get prioritized liver protection strategies. Free online liver health calculator 2026. No signup required.',
  slug: 'liver-health-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'liver health calculator 2026',
    'free liver health calculator',
    'liver health calculator usa 2026',
    'liver health calculator free 2026',
    'fatty liver disease risk calculator',
    'liver health assessment quiz',
    'nafld risk calculator',
    'liver function risk factors',
    'liver health score',
    'non alcoholic fatty liver risk',
    'alcohol liver damage calculator',
    'liver health diet assessment',
    'liver protection strategies',
    'liver enzyme elevation risk',
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
  {question:'What are the earliest signs of liver disease that most people miss?',answer:`Early liver disease (Stages 1-2 fibrosis) typically produces no symptoms — liver cells have enormous compensatory capacity and the liver continues to function normally even when 50-60% of tissue is damaged. The earliest detectable changes are typically from blood tests rather than symptoms. When early symptoms do appear: fatigue (unexplained tiredness that doesn't respond to rest is the most common early complaint); mild right upper quadrant discomfort (below the ribs on the right side, often described as heaviness or dull aching); and reduced tolerance for alcohol or fatty meals (liver feels 'sluggish'). Spider angiomas (small spider-like blood vessel patterns on the chest or upper arms) and palmar erythema (redness of the palms) are early physical signs of chronic liver disease. Elevated liver enzymes (ALT, AST) on routine bloodwork are often the first indication — many people first learn of liver disease when blood tests ordered for other reasons show enzyme elevation.`},
  {question:'What is fatty liver disease and how common is it?',answer:`Non-alcoholic fatty liver disease (NAFLD — renamed to metabolic dysfunction-associated steatotic liver disease, MASLD, in 2023) affects approximately 25-30% of US adults — roughly 80-100 million people. It's defined by fat accumulation in more than 5% of liver cells without significant alcohol use. The spectrum: simple steatosis (fat accumulation, typically benign, Stage 1) progresses in 20-30% of cases to NASH (non-alcoholic steatohepatitis) — fat plus inflammation and liver cell injury. Of NASH cases, 20-30% progress to cirrhosis over 10-20 years. NAFLD is now the leading cause of cirrhosis and liver transplantation in the US, overtaking alcohol-related liver disease and hepatitis C. It's strongly associated with metabolic syndrome — obesity, insulin resistance, type 2 diabetes, hypertension, and high triglycerides. A lean individual with normal BMI but elevated visceral fat can still develop NAFLD; approximately 10-15% of NAFLD occurs in lean people.`},
  {question:'How much alcohol actually damages the liver?',answer:`The liver processes approximately one standard drink per hour. Regular consumption above certain thresholds causes progressive liver damage. Definitions of 'heavy drinking' from a liver perspective: for men, more than 14 standard drinks per week or more than 4 per occasion; for women, more than 7 per week or more than 3 per occasion (women develop alcoholic liver disease at lower consumption levels due to lower body water, less gastric ADH, and possible hormonal effects). Alcoholic fatty liver — the earliest stage — develops with sustained heavy drinking and fully reverses with abstinence. Alcoholic hepatitis (liver cell inflammation) can be severe and acutely life-threatening. Alcoholic cirrhosis typically requires 10-20 years of heavy drinking but varies dramatically with genetic susceptibility. Binge drinking — defined as reaching BAC 0.08% or above — is more hepatotoxic than the same amount of alcohol spread across days, because peak acetaldehyde concentrations rather than total intake drive cell damage.`},
  {question:'Which common medications are hardest on the liver?',answer:`Acetaminophen (Tylenol) is the leading cause of acute liver failure in the US — not because it's uniquely dangerous at normal doses, but because of its widespread use, combination with alcohol, and frequent overdose (both intentional and unintentional). The safe maximum is 3-4 grams/day in healthy adults, reduced to 2 grams/day for regular alcohol drinkers. Alcohol dramatically increases acetaminophen hepatotoxicity by inducing CYP2E1 (the enzyme that produces the toxic NAPQI metabolite) and depleting glutathione (the liver's primary antioxidant). Statins occasionally cause liver enzyme elevation (1-3% of patients) but rarely cause clinically significant liver disease; routine liver monitoring is no longer recommended for patients on statins. Antibiotics — particularly amoxicillin-clavulanate (Augmentin), ciprofloxacin, and nitrofurantoin — are among the most common causes of drug-induced liver injury. Anti-tuberculosis drugs, particularly isoniazid and rifampin, require liver function monitoring.`},
  {question:'Can the liver regenerate, and how much liver do you need to survive?',answer:`The liver has unique regenerative capacity compared to virtually any other organ. If 70% of liver tissue is removed surgically, the remaining 30% can regenerate back to near-original mass within 4-8 weeks through hepatocyte proliferation — the biological basis for living-donor liver transplantation (where a donor's liver lobe is transplanted and both donor and recipient regenerate functional livers). However, this regenerative capacity requires healthy cells — severely fibrotic or cirrhotic liver has reduced regenerative capacity because the hepatocytes are replaced by scar tissue. You can survive with approximately 30-40% of normal liver function — below this, liver failure symptoms (jaundice, coagulation defects, encephalopathy, fluid retention) appear. Chronic alcohol or toxin exposure can overwhelm regeneration — if damage occurs faster than regeneration, net fibrosis accumulates toward cirrhosis.`},
  {question:'What do elevated liver enzymes (ALT, AST) actually mean?',answer:`ALT (alanine aminotransferase) and AST (aspartate aminotransferase) are enzymes found primarily in liver cells. When liver cells are damaged or dying, they release these enzymes into the bloodstream, causing elevated blood levels. ALT is more liver-specific; AST is found in muscle, heart, and kidneys as well as liver. Normal ranges: ALT 7-56 U/L; AST 10-40 U/L (ranges vary slightly by lab). The magnitude of elevation guides interpretation: mild elevation (1-3x normal) — common, usually caused by fatty liver, mild alcohol effects, or recent muscle injury; moderate elevation (3-10x normal) — more significant, warrants investigation; severe elevation (above 10x normal) — hepatitis (viral, alcoholic, or drug-induced), ischemic hepatitis. An AST:ALT ratio above 2:1 suggests alcoholic liver disease specifically. Elevated enzymes identify liver cell damage but don't diagnose the cause or assess fibrosis level — additional testing (ultrasound, FibroScan, liver biopsy) is needed for cause determination and staging.`},
  {question:'How does obesity specifically damage the liver?',answer:`Obesity damages the liver through several interconnected mechanisms. Visceral adipose tissue releases excess free fatty acids directly into the portal circulation flowing to the liver, overwhelming its normal fat processing capacity and causing fat accumulation (steatosis). Visceral fat also releases pro-inflammatory cytokines (TNF-alpha, IL-6) and has reduced adiponectin production — adiponectin normally reduces liver fat and inflammation. Insulin resistance — invariably present with visceral obesity — causes hepatic insulin resistance, driving excess gluconeogenesis and lipogenesis. The resulting high triglyceride production and reduced fat export from the liver compound the fat accumulation. Gut microbiome changes from obesity increase intestinal permeability, allowing bacterial products to reach the liver through the portal vein and triggering hepatic inflammation. The severity of liver damage correlates better with visceral fat and insulin resistance than with BMI alone — metabolically healthy obese people have less liver disease than metabolically unhealthy obese people.`},
  {question:'What tests assess liver health and when should I get them?',answer:`Basic liver panel: ALT, AST, alkaline phosphatase (ALP), and total bilirubin are typically included in comprehensive metabolic panels (CMP) and provide the first indication of liver cell damage or obstruction. Albumin and prothrombin time (PT/INR) measure synthetic function — how well the liver makes proteins, which declines in significant liver disease. Liver ultrasound can detect fatty liver, cirrhosis (coarse texture, irregular surface), enlargement, and masses. FibroScan (transient elastography) non-invasively estimates liver stiffness, which correlates with fibrosis stage — increasingly used instead of biopsy for fibrosis assessment. Liver biopsy remains the gold standard for definitive diagnosis and staging but is invasive and has a 1 in 500 complication rate. Adults with risk factors for liver disease (obesity, diabetes, heavy alcohol use, family history, prior hepatitis exposure) benefit from periodic AST/ALT testing even without symptoms, as early-stage disease is entirely treatable when detected before cirrhosis develops.`},
]

const seoContent = {
  title: 'Liver Health Risk Calculator',
  category: 'health' as const,
  intro: `The liver performs over 500 distinct functions — detoxification, protein synthesis, bile production, glucose regulation, fat metabolism, storage of vitamins and minerals, and immune surveillance — yet it receives far less preventive health attention than the heart or brain. Early liver disease is almost entirely asymptomatic. Non-alcoholic fatty liver disease (NAFLD), now affecting an estimated 25% of American adults, produces no symptoms until it progresses to more advanced stages.

NAFLD is directly driven by metabolic factors: insulin resistance, visceral obesity, and excessive fructose consumption (particularly from sugar-sweetened beverages) are the primary drivers. Despite the name, you don't need to drink alcohol to develop fatty liver — the metabolic pathway from excess dietary sugar to hepatic fat accumulation is well-established.

Liver enzymes (ALT, AST, GGT) in blood tests provide an early warning of liver stress — they leak into the bloodstream when liver cells are damaged. But they're not sensitive enough to detect early NAFLD, which is why imaging (ultrasound, FibroScan) or biopsy is needed to evaluate severity.

This calculator assesses your lifestyle-based liver health risk factors — alcohol consumption, dietary patterns, metabolic risk indicators, medication use — and gives you a composite risk score and the most impactful changes to protect your liver.

**Long-tail searches answered here:** liver health score calculator free online usa, am i damaging my liver calculator free tool, liver disease risk calculator by lifestyle factors, fatty liver risk calculator free no account usa, alcohol liver damage risk calculator free online, liver health assessment calculator usa free 2026, nafld nonalcoholic fatty liver risk score calculator, how alcohol units per week affects liver calculator free, liver function test results interpretation calculator usa, acetaminophen liver damage threshold calculator free, liver health recovery from alcohol cessation calculator, hepatitis risk factor score calculator usa free, liver enzyme elevation risk calculator free online, liver health impact of high fructose diet calculator usa, liver cirrhosis risk progression calculator free`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate liver health from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `The most powerful interventions for liver health are also the most basic: achieve and maintain a healthy weight (even 5-10% weight loss significantly reduces liver fat in NAFLD), eliminate or substantially reduce alcohol intake, replace sugar-sweetened beverages with water or unsweetened alternatives, and exercise regularly (aerobic exercise reduces liver fat independent of weight loss).

Coffee — surprisingly — has strong and consistent evidence of liver protection: multiple studies find that 2-4 cups per day is associated with reduced risk of liver fibrosis, cirrhosis, and hepatocellular carcinoma. The mechanism likely involves polyphenols and caffeine reducing inflammation and oxidative stress in the liver.

Get liver function tests (ALT, AST, GGT) at your annual physical if you have any risk factors — metabolic syndrome, heavy alcohol use, obesity, or type 2 diabetes.`,
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
        generateWebAppStructuredData({ name: 'Liver Health Risk Calculator', description: 'Assess your risk for non-alcoholic fatty liver disease (NAFLD) and liver dysfunction based on BMI, alcohol intake, diet quality, medications, and meta', url: 'https://tooltrio.com/calculators/health/liver-health-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Liver Health Risk Calculator', description: 'Assess your risk for non-alcoholic fatty liver disease (NAFLD) and liver dysfunction based on BMI, alcohol intake, diet quality, medications, and meta', url: 'https://tooltrio.com/calculators/health/liver-health-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Liver Health Risk Calculator', url: '/calculators/health/liver-health-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
