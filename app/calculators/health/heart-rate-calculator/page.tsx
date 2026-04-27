import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Heart Rate Calculator — Max HR, Target Zones, Resting HR & VO2max Estimate 2026',
  description: 'Free Heart Rate Calculator 2026 — Calculate your cardiovascular health metrics using American Heart Association standards. Risk assessment with actionable recommendations. No personal data stored.',
  slug: 'heart-rate-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'heart rate calculator 2026',
    'free heart rate calculator',
    'heart rate calculator usa 2026',
    'heart health calculator 2026',
    'blood pressure calculator 2026',
    'cardiovascular risk calculator 2026',
    'maximum heart rate calculator by age',
    'target heart rate zone calculator',
    'heart rate training zones calculator',
    'karvonen formula heart rate reserve',
    'resting heart rate and fitness level',
    'heart rate zones for fat burning',
    'how to calculate max heart rate',
    'heart rate calculator for cardio fitness',
    'zone 2 training heart rate',
    'heart rate and vo2max estimation',
  ],
})

const relatedCalculators = [
  {name:"VO2 Max Calculator",href:"/calculators/health/vo2-max-calculator",icon:"🏃",desc:"Aerobic fitness and cardiovascular capacity"},
  {name:"Running Pace Calculator",href:"/calculators/health/running-pace-calculator",icon:"⏱️",desc:"Pace zones based on heart rate"},
  {name:"HIIT Calculator",href:"/calculators/health/hiit-calculator",icon:"⚡",desc:"High intensity interval training zones"},
  {name:"Calories Burned Calculator",href:"/calculators/health/calories-burned-calculator",icon:"🔥",desc:"Calories from heart-rate based exercise"},
  {name:"BMR Calculator",href:"/calculators/health/bmr-calculator",icon:"❤️",desc:"Resting metabolic rate baseline"},
  {name:"Athletic Performance Calculator",href:"/calculators/health/athletic-performance-calculator",icon:"🏆",desc:"Complete fitness assessment"},
  {name:"Blood Pressure Calculator",href:"/calculators/health/blood-pressure-calculator",icon:"🩺",desc:"Cardiovascular health alongside HR"},
  {name:"Marathon Training Calculator",href:"/calculators/health/marathon-training-calculator",icon:"🏅",desc:"Training zones for long distance running"},
]

const faqs = [
  {question:'What is the most accurate formula for calculating maximum heart rate?',answer:'The commonly cited formula 220 minus age has a standard deviation of approximately 12 beats per minute — meaning for a 40-year-old with a predicted max HR of 180, the actual value is likely between 156 and 204. More accurate formulas include: Tanaka formula (208 − 0.7 × age), developed from 351 studies and over 18,000 subjects and found to be more accurate than 220-age, particularly for older adults; Fox formula (220 − age, original source); and Gellish formula (207 − 0.7 × age) for general populations. For athletes and very active individuals, direct measurement via maximal exercise test remains the gold standard as trained individuals often have higher max HR than predicted.'},
  {question:'What is the Karvonen method and why is it better for calculating training zones?',answer:'The Karvonen method (heart rate reserve method) calculates training zones using both maximum heart rate AND resting heart rate, rather than just max HR. It uses Heart Rate Reserve (HRR = Max HR − Resting HR) as the basis for percentage calculations. Formula: Target HR = Resting HR + (HRR × intensity%). For example, a 40-year-old with max HR 180 and resting HR 65 has HRR = 115. At 70% intensity: Target HR = 65 + (115 × 0.70) = 65 + 80.5 = 145.5 bpm. This is more individualized than simple max HR percentage because resting HR reflects cardiovascular fitness — a very fit person with resting HR 45 gets different zones than a sedentary person with resting HR 75 even at the same max HR.'},
  {question:'What are the 5 heart rate training zones?',answer:'Zone 1 (50-60% max HR): Recovery zone — very light, sustainable for hours, primarily fat metabolism. Zone 2 (60-70% max HR): Aerobic base zone — \'conversational pace,\' primarily fat oxidation, key for endurance foundation and metabolic efficiency. Zone 3 (70-80% max HR): Aerobic threshold — moderate intensity, mix of fat and carbohydrate fuel, typical moderate exercise. Zone 4 (80-90% max HR): Lactate threshold — challenging pace approaching race pace, heavy carbohydrate dependence, significant cardiovascular training stimulus. Zone 5 (90-100% max HR): Maximum effort — sprint intervals, extremely high carbohydrate use, very brief sustainable duration. Zone 2 is considered the most important for metabolic health, fat adaptation, and long-term aerobic development.'},
  {question:'What does resting heart rate tell you about fitness?',answer:'Resting heart rate (RHR) is one of the best single-number indicators of cardiovascular fitness. Well-trained endurance athletes typically have RHR of 40-50 bpm; average adults fall in the 60-80 bpm range; RHR above 90 bpm correlates with significantly increased cardiovascular disease risk. Each stroke of a trained heart delivers more blood (higher stroke volume), so fewer beats per minute are needed to maintain cardiac output. Regular aerobic exercise consistently lowers RHR by 5-15 bpm within weeks to months of training. Research shows that elevated RHR (above 80 bpm) is an independent predictor of all-cause mortality, cardiovascular disease, and diabetes — even after controlling for other risk factors.'},
  {question:'What heart rate indicates you are in the fat burning zone?',answer:'The so-called \'fat burning zone\' is typically 55-65% of maximum heart rate, corresponding to Zone 1-2 training. At this intensity, fat contributes approximately 50-65% of fuel. However the \'fat burning zone\' concept is frequently misapplied — while fat oxidation rate per minute is highest at moderate intensities, total calories burned per session is lower than at higher intensities. A 45-minute Zone 4 run burns more total fat than 45 minutes in Zone 2, despite a lower fat percentage of fuel, simply because total energy expenditure is much higher. Zone 2 training is valuable for long-term metabolic flexibility and aerobic base development but not necessarily superior for fat loss compared to higher-intensity training.'},
  {question:'How can I estimate my VO2max from my heart rate?',answer:'VO2max can be estimated from resting heart rate alone using the formula: VO2max ≈ 15 × (Max HR / Resting HR), derived by Uth et al. This gives a rough estimate with error of approximately ±10-15%. More accurate non-exercise estimations use the Rockport Walk Test (1-mile walk time + heart rate at completion) or the 12-minute Cooper Run. Submaximal exercise test methods used by exercise physiologists — measuring HR response to standardized workloads on a treadmill or bike — can estimate VO2max to within 5-10% of laboratory-measured values. Laboratory VO2max testing requires a maximal exercise test with breath-by-breath gas analysis.'},
  {question:'What heart rate should I target during cardio for heart health?',answer:'For cardiovascular health benefits, the American Heart Association recommends 150 minutes per week of moderate-intensity exercise at 50-70% of max HR, or 75 minutes of vigorous exercise at 70-85% of max HR. Moderate intensity corresponds to Zone 2-3 training (conversational pace — you can speak in short sentences but not sing). Vigorous intensity is Zone 4 (can say a few words only). Research consistently shows that any amount of moderate to vigorous physical activity above sedentary is beneficial — even 11 minutes per day of vigorous exercise reduces all-cause mortality risk by 18% (BMJ study, 2021). The cardiovascular benefits plateau and then decrease at extremely high training volumes in some studies.'},
  {question:'Why does heart rate increase with dehydration?',answer:'Dehydration reduces plasma blood volume, which directly decreases the amount of blood available for each heartbeat (stroke volume). The cardiovascular system compensates by increasing heart rate to maintain adequate cardiac output (Cardiac Output = Heart Rate × Stroke Volume). Research shows that 2% body weight dehydration increases heart rate by approximately 7-8 beats per minute during exercise at the same workload — meaning you hit your zone thresholds at lower exercise intensities than when well-hydrated. This is why heart rate zones calculated when dehydrated will misrepresent your actual training intensity. Always ensure adequate hydration before zone-based training sessions for accurate data.'},
]

const seoContent = {
  title: 'Heart Rate Calculator',
  category: 'health' as const,
  intro: `Your heart rate is the most accessible real-time window into how hard your cardiovascular system is working — and using that information intelligently can transform how you exercise. Instead of training by feel (too easy some days, too hard others), heart rate zones let you apply a precise, physiologically grounded intensity framework to every workout.

This calculator computes your maximum heart rate using multiple age-based formulas, then uses your resting heart rate and the Karvonen Heart Rate Reserve method to generate personalized training zones that are calibrated to your actual fitness level — not just your age.

Whether you are training for endurance, trying to improve metabolic health, building an aerobic base, or doing HIIT workouts, having accurate heart rate zones ensures you are training at the right intensity for your specific goal. Zone 2 builds aerobic capacity; Zone 4 raises lactate threshold; Zone 5 builds peak power. Each zone produces different physiological adaptations and requires different recovery time.

Combine your zones with [our VO2 Max Calculator](/calculators/health/vo2-max-calculator) for a complete cardiovascular fitness picture.

**Long-tail searches answered here:** target heart rate calculator free online usa, max heart rate calculator by age formula free, heart rate zones calculator for cardio training, what heart rate is too high during exercise calculator, resting heart rate healthy range calculator usa free, heart rate zone calculator for fat burning no signup, maximum heart rate formula 220 minus age calculator free, heart rate for zone 2 training calculator usa free, fat burning heart rate zone for 45 year old free, dangerous heart rate during exercise calculator usa, heart rate zone 4 vs zone 5 cardio calculator free, how long in each heart rate zone calculator free online, heart rate zones for 50 year old woman calculator free, recovery heart rate after exercise calculator usa free, heart rate zone calculator for weight loss cardio free`,
  howItWorks: `Max HR calculation uses the Tanaka formula (most accurate for most adults): Max HR = 208 − (0.7 × age). Heart Rate Reserve (HRR) = Max HR − Resting HR.

Karvonen zones: Target HR = Resting HR + (HRR × zone percentage). Zone 1 (50-60% HRR), Zone 2 (60-70% HRR), Zone 3 (70-80% HRR), Zone 4 (80-90% HRR), Zone 5 (90-100% HRR).

VO2max estimate from resting HR: VO2max ≈ 15 × (Max HR / Resting HR) — Uth et al. formula. This gives a relative fitness comparison but should not be used for clinical or competitive purposes where laboratory testing is available.

All heart rate zones are displayed as ranges in bpm so you can directly read them off a heart rate monitor, watch, or chest strap during exercise.`,
  benefits: [
    {title:"Karvonen personalized zones",text:"Unlike calculators that give zones based only on max HR, this tool uses your resting heart rate to apply the Karvonen Heart Rate Reserve method — producing zones personalized to your cardiovascular fitness level, not just your age."},
    {title:"Multiple max HR formulas",text:"See maximum heart rate estimates from three different validated formulas (220-age, Tanaka, Gellish) side by side, so you can understand the range of uncertainty and choose the most appropriate basis for your zones."},
    {title:"Zone-by-zone training guide",text:"Each zone is accompanied by a physiological description — what fuel source dominates, what adaptation it produces, how long you can sustain it, and what types of workouts are typically performed in that zone."},
    {title:"VO2max estimate",text:"An estimated VO2max is calculated from max HR and resting HR — giving a cardiovascular fitness comparison to population percentiles by age and sex, and tracking fitness improvements as resting heart rate decreases with training."},
    {title:"Resting HR interpretation",text:"Your resting heart rate is placed in a fitness category (excellent, good, average, below average) based on ACE and AHA reference ranges by age and sex, contextualizing what your RHR reveals about your cardiovascular fitness."},
    {title:"Polar and Garmin zone comparison",text:"The calculator shows how your personalized zones compare to the default zones used by common heart rate monitor brands, which often use simple max HR percentages. Understanding the difference helps you get more accurate zone data from your device."},
  ],
  useCases: [
    {title:"Starting a structured cardio program",text:"Calculate your zones before beginning a structured training plan like Couch to 5K or marathon training. Understanding where Zone 2 starts and ends prevents the most common beginner mistake: training too hard every session (which leads to overtraining, burnout, and inadequate recovery) instead of building an aerobic base with appropriate easy running."},
    {title:"Optimizing HIIT workouts",text:"Use Zone 4-5 heart rate targets to ensure your high-intensity intervals are actually high enough intensity to produce the cardiovascular adaptations targeted. Many people who think they are doing HIIT are actually working in Zone 3, which produces different and generally lesser adaptations than true Zone 4-5 work."},
    {title:"Monitoring overtraining and recovery",text:"A resting heart rate that is 5-10 bpm higher than your normal baseline is a reliable indicator of incomplete recovery, illness onset, or overtraining. Tracking RHR daily (immediately upon waking, before getting out of bed) creates an early warning system for when to back off training."},
    {title:"Maximizing fat oxidation for endurance",text:"Zone 2 training (60-70% HRR) at high volume maximizes mitochondrial density and fat oxidation capacity — the physiological foundation of endurance sports. Athletes building an aerobic base spend 70-80% of training volume in Zone 2, using heart rate zones to ensure they stay in the right intensity band on easy days."},
  ],
  tipsSection: `Measure resting heart rate correctly for accurate zone calculations: measure heart rate for 60 full seconds immediately upon waking, before getting out of bed or looking at your phone. Heart rate begins rising within 1-2 minutes of morning activity. Use an automatic blood pressure monitor, a pulse oximeter, or count manually at the radial pulse (wrist) or carotid (neck). Take the average of 3-5 consecutive morning measurements for your baseline.

If you have been trained for several months, your zones from 6 months ago are no longer accurate — a lower resting heart rate from improved fitness means your Karvonen zones shift. Recalculate quarterly or whenever you notice a significant change in your resting heart rate.

For the most accurate training zones, consider a lactate threshold test with an exercise physiologist — this directly measures the actual heart rate at which blood lactate begins to accumulate, providing zones grounded in individual physiology rather than age-based predictions.`,
  scienceSection: `Heart rate zone training has physiological roots in the classic work of exercise physiologists including Mader, Heck, and Kindermann who established the relationship between exercise intensity, blood lactate accumulation, and cardiovascular adaptation in the 1970s-80s.

The Karvonen formula was published by Finnish physiologist Martti Karvonen in 1957. Its advantage over simple max HR percentages was recognized in subsequent research showing that individuals with lower resting heart rates (higher fitness) have a wider range of functional heart rates and need differently calibrated zones.

The Tanaka formula was derived from a 2001 meta-analysis of 351 studies involving 18,712 subjects, finding that the 220-age formula systematically overestimates max HR in young adults and underestimates it in older adults. The formula 208 − 0.7 × age better fit the pooled data across all age groups tested.`,
  conclusion: `Accurate heart rate zones are the foundation of effective cardiovascular training at any fitness level. Whether you are a beginner building aerobic capacity or a competitive athlete fine-tuning race-pace training, training in the right zones for the right duration produces specific, predictable physiological adaptations — while training in the wrong zones produces fatigue without proportional benefit.

Track your resting heart rate trend over the coming months of training. A declining resting heart rate is one of the clearest, most objective indicators that your cardiovascular fitness is improving. From 75 to 60 bpm represents a meaningful improvement in cardiac efficiency that will be reflected in better endurance, faster recovery, and improved Zone 2 pace.

Combine your zones with [our VO2 Max Calculator](/calculators/health/vo2-max-calculator), [our Running Pace Calculator](/calculators/health/running-pace-calculator), and [our HIIT Calculator](/calculators/health/hiit-calculator) for a complete cardiovascular training toolkit.`,
  comparisonTable: [
    {label:"Zone 1 (Recovery)",value:"50-60% HRR",note:"Very light; fat primary fuel; recovery, warm-up"},
    {label:"Zone 2 (Aerobic base)",value:"60-70% HRR",note:"Conversational; fat primary fuel; mitochondrial development"},
    {label:"Zone 3 (Aerobic threshold)",value:"70-80% HRR",note:"Moderately hard; mixed fat/carb fuel; aerobic capacity"},
    {label:"Zone 4 (Lactate threshold)",value:"80-90% HRR",note:"Hard; carb primary fuel; raises lactate threshold"},
    {label:"Zone 5 (Maximum)",value:"90-100% HRR",note:"Maximal effort; pure carb; brief intervals only"},
    {label:"Max HR formula accuracy (220-age)",value:"±12 bpm SD",note:"Large individual variation; Tanaka formula is more accurate"},
    {label:"Athletic resting heart rate",value:"40-55 bpm",note:"Elite endurance athletes; reflects high stroke volume"},
    {label:"Elevated RHR mortality risk",value:">80 bpm",note:"Independent predictor of cardiovascular mortality (multiple large cohort studies)"},
  ],
  keyStats: [
    {stat:"±12 bpm",source:"Standard deviation of 220-age max HR formula"},
    {stat:"208 - 0.7×age",source:"Tanaka formula — more accurate across age groups (2001 meta-analysis)"},
    {stat:"60-70% HRR",source:"Zone 2 heart rate range using Karvonen method"},
    {stat:"<60 bpm",source:"Resting HR associated with elite cardiovascular fitness"},
  ],
  mistakesDetailed: [

  ],
  didYouKnow: [
    'Elite cyclist Lance Armstrong reportedly had a resting heart rate of 32 bpm during his competitive years — roughly half the normal adult resting rate, reflecting exceptional stroke volume from years of endurance training.',
    'The SA (sinoatrial) node — the heart\'s natural pacemaker — fires automatically 60-100 times per minute in the absence of any neural input. The vagus nerve (parasympathetic nervous system), which is stronger in fit individuals, slows this natural rate, producing the lower resting heart rates seen in trained athletes.',
    'Heart rate variability (HRV) — the variation in time between heartbeats — is increasingly used as a recovery and readiness metric by athletes. High HRV indicates parasympathetic dominance and good recovery; low HRV suggests sympathetic activation from stress, illness, or overtraining.',
  ],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Heart Rate Calculator', description: 'Calculate maximum heart rate, target training zones (fat burn, cardio, peak), and estimated VO2max from resting heart rate. Uses age-predicted formulas and Karv', url: 'https://tooltrio.com/calculators/health/heart-rate-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Heart Rate Calculator', description: 'Calculate maximum heart rate, target training zones (fat burn, cardio, peak), and estimated VO2max from resting heart rate. Uses age-predicted formulas and Karv', url: 'https://tooltrio.com/calculators/health/heart-rate-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Heart Rate Calculator', url: '/calculators/health/heart-rate-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
