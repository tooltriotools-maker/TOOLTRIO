import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Air Quality & Health Impact Calculator — AQI to Health Risk Assessment 2026',
  description: 'Convert Air Quality Index (AQI) readings to personal health risk based on your age and existing conditions. Calculate safe outdoor exposure times at current AQI levels for exercise and daily activity. Free online air quality health calculator 2026. No signup required.',
  slug: 'air-quality-health-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'air quality health calculator 2026',
    'free air quality health calculator',
    'air quality health calculator usa 2026',
    'air quality health calculator free 2026',
    'air quality index health risk calculator',
    'aqi safe levels for exercise',
    'pm2.5 health effects calculator',
    'air quality calculator for asthma',
    'how long can I exercise in bad air quality',
    'aqi by zip code health impact',
    'wildfire smoke health risk calculator',
    'air quality and lung health',
    'pm2.5 to aqi calculator',
    'outdoor exercise air quality guidelines',
  ],
})

const relatedCalculators = [
  {name:"Breathing Exercise Calculator",href:"/calculators/health/breathing-exercise-calculator",icon:"💨",desc:"Lung function exercises"},
  {name:"Asthma BMI",href:"/calculators/health/bmi-calculator",icon:"⚖️",desc:"Weight and respiratory health"},
  {name:"Heart Age Calculator",href:"/calculators/health/heart-age-calculator",icon:"❤️",desc:"Cardiovascular air quality impact"},
  {name:"Stress Level Calculator",href:"/calculators/health/stress-level-calculator",icon:"🧠",desc:"Pollution and stress connection"},
  {name:"Sleep Quality",href:"/calculators/health/sleep-need-calculator",icon:"😴",desc:"Air quality and sleep"},
  {name:"Inflammation Risk",href:"/calculators/health/inflammation-risk-calculator",icon:"🔥",desc:"PM2.5 and systemic inflammation"},
  {name:"Running Pace Calculator",href:"/calculators/health/pace-calculator",icon:"🏃",desc:"Pace adjustment in poor air"},
  {name:"Vitamin D Calculator",href:"/calculators/health/vitamin-d-calculator",icon:"☀️",desc:"Balancing sun vs air quality exposure"}
]

const faqs = [
  {question:'What AQI level is safe for outdoor exercise?',answer:'AQI 0-50 (Good) is safe for all outdoor activity. AQI 51-100 (Moderate) — sensitive groups (asthma, heart disease, children, elderly) should reduce prolonged outdoor exertion. AQI 101-150 (Unhealthy for Sensitive Groups) — sensitive groups should avoid outdoor exercise; healthy adults can participate with reduced duration and intensity. AQI 151-200 (Unhealthy) — all groups should avoid prolonged outdoor exertion; sensitive groups should avoid all outdoor activity. Above 200, all outdoor exercise should be avoided.',},
  {question:'What is PM2.5 and why is it dangerous?',answer:'PM2.5 refers to particulate matter under 2.5 micrometers in diameter — fine particles small enough to penetrate deep into the lungs and cross into the bloodstream. Sources include vehicle exhaust, industrial emissions, wildfire smoke, and secondary atmospheric reactions. PM2.5 causes inflammation in the lungs and systemically, and long-term exposure is associated with increased risk of heart disease, stroke, lung cancer, and COPD. Even short-term high exposures cause acute respiratory symptoms and can trigger cardiac events in vulnerable individuals.',},
  {question:'How does wildfire smoke affect health differently from regular air pollution?',answer:'Wildfire smoke is particularly harmful because it contains a complex mixture of PM2.5, gases (carbon monoxide, nitrogen oxides), volatile organic compounds, and combustion byproducts from burning structures that release heavy metals and flame retardants. AQI measurements underestimate wildfire smoke\'s health impact because they measure PM2.5 mass but not chemical toxicity. During wildfires, health authorities recommend wearing N95 respirators outdoors when AQI exceeds 100, staying indoors with windows closed, and using air purifiers with HEPA filters.',},
  {question:'How long does it take for air pollution to affect health?',answer:'Acute effects occur within hours of exposure to high PM2.5 concentrations: respiratory symptoms (coughing, wheezing, shortness of breath), eye irritation, headaches, and cardiovascular strain. Studies show increased emergency room visits for asthma and cardiac events within 24-48 hours of air quality spikes. Chronic effects from years of exposure to even moderate PM2.5 levels (above 12 μg/m³ annually) include accelerated cardiovascular disease, reduced lung function, and increased cancer risk.',},
  {question:'Who is most vulnerable to air pollution health effects?',answer:'Highest-risk groups: people with asthma, COPD, or other respiratory conditions (effects begin at lower AQI levels); people with heart disease or hypertension; older adults (reduced lung reserve and cardiovascular flexibility); children (lungs still developing — exposure during childhood causes lasting lung function deficits); pregnant women (associated with preterm birth and low birth weight); outdoor workers; and people who exercise intensely outdoors (higher breathing rate delivers more pollutants deeper into lungs).',},
  {question:'What can I do to protect myself on high AQI days?',answer:'Stay indoors with windows closed. Run air conditioning or a HEPA air purifier. If you must go outdoors, wear an N95 or KN95 respirator (surgical masks and cloth masks do not filter PM2.5 effectively). Exercise in the early morning when pollution is typically lowest and before traffic peaks. Check AirNow.gov for real-time AQI data by zip code. Avoid exercising near busy roads, construction sites, or industrial areas even on moderate AQI days.',},
  {question:'Does air pollution exposure affect sleep quality?',answer:'Yes — research shows that air pollution, particularly PM2.5, is associated with worse sleep quality. A Harvard study of 1,863 adults found that higher long-term PM2.5 exposure was associated with higher odds of sleep-disordered breathing. Short-term high PM2.5 exposure causes airway inflammation and increased nasal resistance that worsens snoring and sleep apnea. Indoor air quality during sleep is particularly important — bedroom HEPA purifiers are one of the most effective interventions for people in high-pollution areas.',},
]

const seoContent = {
  title: 'Air Quality & Health Impact Calculator',
  category: 'health' as const,
  intro: `Your local air quality index (AQI) number tells you how polluted the air is — but translating that number into personal health risk requires knowing your individual sensitivity, what activities you plan to do, and how long you will be outdoors. This calculator does exactly that conversion.

Enter today's AQI (available from AirNow.gov or your weather app), your age and any respiratory or cardiovascular conditions, and your planned outdoor activity. The calculator returns: your personal risk classification, the maximum recommended outdoor exposure time, whether you should modify or cancel your planned exercise, and what protective measures are appropriate.

Air quality varies significantly by time of day and season. Pollution from traffic peaks in morning and evening rush hours. Wildfire smoke creates acute spikes. Ozone is highest in summer afternoons. Understanding both the general AQI and the specific pollutant driving it helps you make better exposure decisions.

For respiratory health management, combine this with [our Breathing Exercise Calculator](/calculators/health/breathing-exercise-calculator) and [our Inflammation Risk Calculator](/calculators/health/inflammation-risk-calculator).

**Long-tail searches answered here:** air quality health impact calculator usa free, how does aqi affect breathing free tool online, air quality index health risk calculator for seniors, what aqi level is unsafe for outdoor exercise, pm2.5 exposure health effects calculator, free air pollution health risk calculator no account needed, aqi 100 vs 150 health risk difference calculator free, when should i stay indoors due to air quality calculator, air quality health effects for asthma patients calculator, wildfire smoke aqi health risk calculator free usa, outdoor exercise safety by aqi level calculator free, long term air pollution exposure health calculator usa, children air quality sensitivity calculator free online, indoor vs outdoor air quality health comparison tool, air quality headache fatigue risk calculator usa free`,
  howItWorks: `AQI is calculated from measured concentrations of up to six pollutants: PM2.5, PM10, ozone (O3), carbon monoxide (CO), sulfur dioxide (SO2), and nitrogen dioxide (NO2). The highest individual pollutant AQI becomes the overall AQI reported.

Personal health risk is adjusted from the standard AQI categories using multipliers for: age (children and elderly +1 risk category at each level), asthma/COPD/heart disease (+2 categories), exercise intensity (moderate exercise doubles breathing rate, high-intensity triples it, increasing pollutant delivery proportionally), and outdoor exposure duration.

The calculator outputs the EPA's recommended activity modifications for your specific combination of AQI and personal risk factors.`,
  benefits: [
        {title:"Personalized risk assessment",text:"Adjusts standard AQI categories for your specific risk factors — age, respiratory conditions, and cardiovascular disease. A moderately unhealthy AQI for a healthy adult may be in the very unhealthy range for a child with asthma.",},
        {title:"Exercise adjustment guidance",text:"Calculates how your planned activity intensity modifies your pollutant exposure and adjusts safe outdoor duration recommendations accordingly — critical since high-intensity exercise multiplies the pollutant dose delivered to lungs.",},
        {title:"Pollutant-specific guidance",text:"Different pollutants require different precautions. PM2.5 from wildfire smoke versus ozone from traffic require different timing, protective measures, and indoor behavior.",},
        {title:"AQI trend integration",text:"Shows whether today's AQI is improving or worsening based on trend data and time of day, helping you decide whether to move planned outdoor activity earlier or later in the day.",},
        {title:"Indoor air quality estimation",text:"Estimates indoor PM2.5 levels from outdoor AQI with and without air purifiers — showing whether staying indoors with windows open actually helps or makes things worse.",},
        {title:"Historical AQI context",text:"Compares today's AQI against your city's historical average and EPA annual standard, placing current conditions in a meaningful long-term health context.",},
  ],
  useCases: [
        {title:"Planning outdoor exercise on elevated AQI days",text:"Use the calculator before each outdoor workout on days when AQI is above 50. Get a specific recommendation on whether to proceed, modify intensity, shorten duration, or move the workout indoors.",},
        {title:"Managing respiratory conditions during air quality events",text:"People with asthma or COPD can use personalized risk calculations to be more proactive about starting inhalers earlier, contacting their doctor, and knowing when hospitalizations may be needed if caught in high-AQI conditions.",},
        {title:"Child and school outdoor activity planning",text:"Parents and school administrators can use the calculator to make data-driven decisions about recess, outdoor PE classes, and sports practice cancellations on poor air quality days.",},
        {title:"Wildfire smoke season preparation",text:"In wildfire-prone regions, establishing personal AQI thresholds for different activities before wildfire season allows for automatic, objective responses to air quality alerts rather than case-by-case judgment.",},
  ],
  tipsSection: `Check AQI before any outdoor workout over 30 minutes, not just on obviously smoky days. PM2.5 can reach unhealthy levels with no visible smoke or haze — the air can look clear and still be significantly polluted.

Exercise earlier in the day on high-ozone days (summer afternoons). Ozone is a photochemical pollutant that peaks in the afternoon (1-6pm) when sunlight is strongest. Morning exercise before 9am typically occurs at significantly lower ozone levels.

For wildfire smoke events, N95 respirators are genuinely effective at reducing PM2.5 inhalation by 95%+ when properly fitted. Surgical masks reduce exposure by only 10-40%. Cloth masks provide minimal protection against PM2.5.`,
  scienceSection: `The EPA's AQI was established under the Clean Air Act and uses the National Ambient Air Quality Standards (NAAQS) to define the breakpoints for each AQI category. The PM2.5 NAAQS annual standard was lowered from 12 μg/m³ to 9 μg/m³ in February 2024 — the first update since 2012 — reflecting mounting evidence that lower chronic exposures cause significant health harms.

The health effects research on PM2.5 is among the most robust in environmental health science. The Harvard Six Cities Study (1993) and the American Cancer Society study (1995) established the causal relationship between long-term PM2.5 exposure and cardiovascular and respiratory mortality, surviving multiple independent validations and reanalyses.`,
  conclusion: `Air quality is a daily health variable most people never account for in their activity planning — yet the difference between exercising in AQI 50 versus AQI 150 represents a dramatically different pollutant dose to your lungs and cardiovascular system. This calculator brings objective, personalized risk assessment to a factor that is invisible but consequential.

Check AQI before outdoor activities, modify plans when personal risk is elevated, and build indoor exercise alternatives into your routine for high-pollution days. Your lungs and cardiovascular system accumulate the effects of decades of air quality exposure — making daily smart decisions is a long-term health investment.

For respiratory health, combine air quality awareness with [our Breathing Exercise Calculator](/calculators/health/breathing-exercise-calculator) and [our Inflammation Risk Calculator](/calculators/health/inflammation-risk-calculator).`,
  comparisonTable: [        {label:"Good",value:"AQI 0-50",note:"Safe for all outdoor activity including intense exercise",},
        {label:"Moderate",value:"AQI 51-100",note:"Unusually sensitive people should limit prolonged outdoor exertion",},
        {label:"Unhealthy for Sensitive Groups",value:"AQI 101-150",note:"Sensitive groups should reduce or avoid outdoor exercise",},
        {label:"Unhealthy",value:"AQI 151-200",note:"All groups should avoid prolonged outdoor exertion",},
        {label:"Very Unhealthy",value:"AQI 201-300",note:"Avoid all outdoor activity; use N95 if outdoors essential",},
        {label:"Hazardous",value:"AQI 301-500",note:"Health emergency — remain indoors; air purifier essential",},],
  didYouKnow: [        'The WHO estimates that air pollution causes approximately 7 million premature deaths per year globally — more than malaria, tuberculosis, and HIV/AIDS combined.',
        'PM2.5 particles are approximately 1/30th the diameter of a human hair — small enough to travel deep into the lung alveoli and pass into the bloodstream, where they trigger systemic inflammation.',],
  keyStats: [        {stat:"7 million",source:"WHO estimated annual deaths from air pollution globally",},
        {stat:"9 μg/m³",source:"New EPA PM2.5 annual standard as of February 2024 (reduced from 12 μg/m³)",},
        {stat:"2×-3×",source:"Factor by which moderate-to-high intensity exercise increases pollutant delivery to lungs",},],
  mistakesDetailed: [],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Air Quality & Health Impact Calculator', description: 'Convert Air Quality Index (AQI) readings to personal health risk based on your age and existing conditions. Calculate safe outdoor exposure times at c', url: 'https://tooltrio.com/calculators/health/air-quality-health-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Air Quality & Health Impact Calculator', description: 'Convert Air Quality Index (AQI) readings to personal health risk based on your age and existing conditions. Calculate safe outdoor exposure times at c', url: 'https://tooltrio.com/calculators/health/air-quality-health-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Air Quality & Health Impact Calculator', url: '/calculators/health/air-quality-health-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
