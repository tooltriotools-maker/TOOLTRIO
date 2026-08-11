import { HEALTH_CANONICAL_SLUGS } from '@/lib/content/health-quality'
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { HealthYMYLPolicy } from './ymyl-policy'

const BASE_URL = 'https://tooltrio.com'
const SITE_NAME = 'tooltrio.com'
const HEALTH_COUNT = HEALTH_CANONICAL_SLUGS.length

export const metadata: Metadata = {
  title: 'Health Calculators 2026 | ToolTrio',
  description: 'Health calculators: BMI calculator (lbs/in), calorie calculator, TDEE, macros, body fat, pregnancy, heart attack risk, cholesterol, sleep cycle.',
  keywords: [
    'health calculators 2026',
    'health calculation tools',
    'BMI calculator',
    'BMI calculator pounds inches',
    'calorie calculator',
    'TDEE calculator',
    'BMR calculator',
    'body fat calculator',
  ],
  alternates: { canonical: `${BASE_URL}/calculators/health` },
  openGraph: {
    title: 'Health Calculators 2026 — BMI, Calories, Heart Risk & More',
    description: 'Health calculators with route-level methodology, limitations and evidence-status disclosures. BMI, TDEE, body fat, pregnancy, heart risk, sleep, macros and more.  required.',
    url: `${BASE_URL}/calculators/health`,
    siteName: SITE_NAME,
    type: 'website',
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Health Calculators 2026' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Calculators 2026',
    description: 'Health calculators with transparent methodology, limitations, evidence-status disclosures and source references.',
  },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── Data ───────────────────────────────────────────────────────────────────

const FEATURED = [
  { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', icon: '⚖️', desc: 'Body Mass Index with lbs/ft or kg/cm. Healthy weight range.', tag: 'Body', searches: 'Popular' },
  { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator', icon: '🔥', desc: 'Daily calories (TDEE) for weight loss, maintenance or gain.', tag: 'Nutrition', searches: 'Popular' },
  { name: 'BMR Calculator', href: '/calculators/health/bmr-calculator', icon: '❤️', desc: 'Basal Metabolic Rate — calories burned at complete rest.', tag: 'Nutrition', searches: 'Popular' },
  { name: 'TDEE Calculator', href: '/calculators/health/tdee-calculator', icon: '📊', desc: 'Total Daily Energy Expenditure by activity level.', tag: 'Nutrition', searches: 'Popular' },
  { name: 'Macro Calculator', href: '/calculators/health/macro-calculator', icon: '🥗', desc: 'Protein, carbs, and fat targets for your goal.', tag: 'Nutrition', searches: 'Popular' },
  { name: 'Body Fat Calculator', href: '/calculators/health/body-fat-calculator', icon: '💪', desc: 'Body fat % using US Navy tape method.', tag: 'Body', searches: 'Popular' },
  { name: 'Calorie Deficit Calculator', href: '/calculators/health/calorie-deficit-calculator', icon: '📉', desc: 'Daily calorie target for fat loss with macro split.', tag: 'Nutrition', searches: 'Popular' },
  { name: 'Sleep Cycle Calculator', href: '/calculators/health/sleep-cycle-calculator', icon: '😴', desc: 'Wake-time estimates based on the selected sleep-cycle assumption.', tag: 'Wellness', searches: 'Popular' },
  { name: 'Pregnancy Calculator', href: '/calculators/health/pregnancy-calculator', icon: '🤰', desc: 'Week-by-week pregnancy milestones from LMP.', tag: "Women's", searches: 'Popular' },
  { name: 'Heart Attack Risk Calculator', href: '/calculators/health/heart-attack-risk-calculator', icon: '❤️‍🔥', desc: '10-year ASCVD risk using AHA Pooled Cohort Equations.', tag: 'Heart', searches: 'Popular' },
  { name: 'Ideal Weight Calculator', href: '/calculators/health/ideal-weight-calculator', icon: '🎯', desc: 'Healthy-weight estimates using documented formulas.', tag: 'Body', searches: 'Popular' },
  { name: 'Protein Intake Calculator', href: '/calculators/health/protein-intake-calculator', icon: '🥩', desc: 'Daily protein grams for muscle building or fat loss.', tag: 'Nutrition', searches: 'Popular' },
]

const CATEGORIES = [
  {
    name: 'Body Composition',
    color: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', dot: 'bg-rose-400', head: 'bg-rose-600' },
    tools: [
      { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', icon: '⚖️', desc: 'lbs/ft-in or kg/cm with healthy range' },
      { name: 'Body Fat Calculator', href: '/calculators/health/body-fat-calculator', icon: '💪', desc: 'Navy circumference method' },
      { name: 'Ideal Weight Calculator', href: '/calculators/health/ideal-weight-calculator', icon: '🎯', desc: '5-formula comparison' },
      { name: 'BMI for Children', href: '/calculators/health/bmi-for-children-calculator', icon: '👦', desc: 'CDC pediatric percentiles ages 2-19' },
      { name: 'Army Body Fat', href: '/calculators/health/army-body-fat-calculator', icon: '🎖️', desc: 'US Army AR 600-9 tape test' },
      { name: 'Lean Body Mass', href: '/calculators/health/lean-body-mass-calculator', icon: '🏋️', desc: 'Fat-free mass by 3 formulas' },
      { name: 'Body Surface Area', href: '/calculators/health/body-surface-area-calculator', icon: '📐', desc: 'Mosteller, DuBois & Haycock' },
      { name: 'Waist-to-Height Ratio', href: '/calculators/health/waist-to-height-ratio-calculator', icon: '📏', desc: 'Better than BMI for metabolic risk' },
      { name: 'Target Weight Calculator', href: '/calculators/health/target-weight-calculator', icon: '🏁', desc: 'Goal weight timeline & calorie needs' },
      { name: 'Body Age Calculator', href: '/calculators/health/body-age-calculator', icon: '🧬', desc: 'Biological vs chronological age' },
      { name: 'Body Recomposition', href: '/calculators/health/body-recomposition-calculator', icon: '🔄', desc: 'Lose fat while building muscle' },
      { name: 'Infant Weight Percentile', href: '/calculators/health/infant-weight-percentile-calculator', icon: '👶', desc: 'WHO 0-24 month growth charts' },
      { name: 'Genetic Height Potential Calculator — Mid-Parental Height', href: '/calculators/health/genetic-height-calculator', icon: '📏', desc: 'Genetic height potential estimate 2026' },
      { name: 'Waist-to-Hip Ratio Calculator — WHR & Cardiovascular Risk', href: '/calculators/health/waist-hip-ratio-calculator', icon: '📏', desc: 'Waist-to-hip ratio (WHR) estimate 2026' },
    ],
  },
  {
    name: 'Calories & Metabolism',
    color: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', dot: 'bg-orange-400', head: 'bg-orange-600' },
    tools: [
      { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator', icon: '🔥', desc: 'TDEE for weight loss, gain or maintain' },
      { name: 'BMR Calculator', href: '/calculators/health/bmr-calculator', icon: '❤️', desc: 'Mifflin-St Jeor & Harris-Benedict' },
      { name: 'TDEE Calculator', href: '/calculators/health/tdee-calculator', icon: '📊', desc: 'Total daily energy by activity level' },
      { name: 'Calorie Deficit Calculator', href: '/calculators/health/calorie-deficit-calculator', icon: '📉', desc: 'Safe deficit for fat loss' },
      { name: 'Fat Loss Rate Calculator', href: '/calculators/health/fat-loss-rate-calculator', icon: '⏱️', desc: 'Realistic weekly fat loss timeline' },
      { name: 'BMI Calculator', href: '/calculators/health/resting-metabolic-rate-calculator', icon: '💤', desc: 'RMR estimates using documented formulas' },
      { name: 'Muscle Gain Calculator', href: '/calculators/health/muscle-gain-calculator', icon: '📈', desc: 'Max natural monthly muscle gain' },
      { name: 'Calories Burned', href: '/calculators/health/calories-burned-calculator', icon: '⚡', desc: '150+ activities via MET values' },
      { name: 'Calories Burned Walking', href: '/calculators/health/calorie-burned-walking-calculator', icon: '🚶', desc: 'By speed, weight & incline' },
      { name: 'Alcohol Calorie Calculator', href: '/calculators/health/alcohol-calorie-calculator', icon: '🍷', desc: 'Calories in beer, wine & spirits' },
      { name: 'Caloric Needs Calculator — Daily Calories by Goal', href: '/calculators/health/caloric-needs-calculator', icon: '🍽️', desc: 'Caloric needs estimate 2026' },
      { name: 'Metabolic Age Calculator — Is Your Body Older Than You Think?', href: '/calculators/health/metabolic-age-calculator', icon: '⚡', desc: 'Metabolic age estimate 2026' },
      { name: 'Yoga Calorie Calculator', href: '/calculators/health/yoga-calories-calculator', icon: '🧘', desc: 'Yoga calorie estimate 2026' },
    ],
  },
  {
    name: 'Macros & Nutrition',
    color: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-400', head: 'bg-emerald-600' },
    tools: [
      { name: 'Macro Calculator', href: '/calculators/health/macro-calculator', icon: '🥗', desc: 'Protein, carbs & fat by goal' },
      { name: 'Protein Intake Calculator', href: '/calculators/health/protein-intake-calculator', icon: '🥩', desc: 'Daily protein grams by goal' },
      { name: 'Keto Macro Calculator', href: '/calculators/health/keto-macro-calculator', icon: '🥑', desc: 'Fat, protein & net carb targets' },
      { name: 'Protein Per Meal', href: '/calculators/health/protein-per-meal-calculator', icon: '🍽️', desc: 'Optimal protein dose per sitting' },
      { name: 'Water Intake Calculator', href: '/calculators/health/water-intake-calculator', icon: '💧', desc: 'Daily hydration goal in oz & liters' },
      { name: 'Fiber Intake Calculator', href: '/calculators/health/fiber-intake-calculator', icon: '🥦', desc: 'Soluble & insoluble fiber needs' },
      { name: 'Glycemic Load Calculator', href: '/calculators/health/glycemic-load-calculator', icon: '🩸', desc: 'GL & GI of foods for blood sugar' },
      { name: 'Sugar Intake Calculator', href: '/calculators/health/sugar-intake-calculator', icon: '🍬', desc: 'Added sugar vs AHA guidelines' },
      { name: 'Sodium Intake Calculator', href: '/calculators/health/sodium-intake-calculator', icon: '🧂', desc: 'Daily sodium limit by health status' },
      { name: 'Vitamin D Calculator', href: '/calculators/health/vitamin-d-calculator', icon: '☀️', desc: 'Deficiency risk & supplement dose' },
      { name: 'Vitamin C Calculator', href: '/calculators/health/vitamin-c-calculator', icon: '🍊', desc: 'Daily needs & immune dosing' },
      { name: 'Magnesium Calculator', href: '/calculators/health/magnesium-calculator', icon: '💊', desc: 'RDA by age, sex & supplement form' },
      { name: 'Calcium Calculator', href: '/calculators/health/calcium-calculator', icon: '🦴', desc: 'Bone health calcium requirements' },
      { name: 'Iron Intake Calculator', href: '/calculators/health/iron-intake-calculator', icon: '💉', desc: 'Iron RDA, deficiency & absorption' },
      { name: 'Omega-3 Calculator', href: '/calculators/health/omega3-calculator', icon: '🐟', desc: 'EPA & DHA dose for heart & brain' },
      { name: 'Zinc Calculator', href: '/calculators/health/zinc-calculator', icon: '⚗️', desc: 'Daily zinc for immune & skin health' },
      { name: 'Creatine Dosage', href: '/calculators/health/creatine-dosage-calculator', icon: '💪', desc: 'Loading & maintenance by weight' },
      { name: 'Diet Quality Score Calculator — HEI-Style Diet Rating', href: '/calculators/health/diet-quality-score-calculator', icon: '🥗', desc: 'Free diet quality score calculator 2026' },
      { name: 'Dietary Inflammatory Index (DII) Calculator', href: '/calculators/health/dietary-inflammatory-index-calculator', icon: '🔬', desc: 'Free Dietary Inflammatory Index calculator 2026' },
      { name: 'Food Sensitivity Load Calculator', href: '/calculators/health/food-sensitivity-calculator', icon: '🌾', desc: 'Free food sensitivity load calculator 2026' },
      { name: 'Meal Timing Calculator', href: '/calculators/health/meal-timing-calculator', icon: '🕐', desc: 'Calculate optimal meal timing around your workout schedule' },
      { name: 'Nutrition Timing Calculator — Circadian Eating Windows', href: '/calculators/health/nutrition-timing-calculator', icon: '⏱️', desc: 'Free nutrition timing calculator 2026' },
      { name: 'Nutritional Deficiency Risk Calculator', href: '/calculators/health/nutritional-deficiency-risk-calculator', icon: '🥗', desc: 'Free nutritional deficiency risk calculator 2026' },
      { name: 'Protein Synthesis Optimizer — MPS Calculator', href: '/calculators/health/protein-synthesis-calculator', icon: '💪', desc: 'Free muscle protein synthesis optimizer 2026' },
      { name: 'Vitamin D Status Calculator — Deficiency Risk', href: '/calculators/health/vitamin-d-status-calculator', icon: '☀️', desc: 'Free vitamin D status calculator 2026' },
    ],
  },
  {
    name: 'Fitness & Exercise',
    color: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-400', head: 'bg-blue-600' },
    tools: [
      { name: 'Heart Rate Calculator', href: '/calculators/health/heart-rate-calculator', icon: '💓', desc: 'Max HR, fat burn & training zones' },
      { name: 'VO2 Max Calculator', href: '/calculators/health/vo2-max-calculator', icon: '🫁', desc: 'From Cooper test or resting HR' },
      { name: 'One Rep Max Calculator', href: '/calculators/health/one-rep-max-calculator', icon: '🏋️', desc: 'Epley, Brzycki & Lander formulas' },
      { name: 'HIIT Calculator', href: '/calculators/health/hiit-calculator', icon: '⚡', desc: 'Tabata, 30-20-10 & custom intervals' },
      { name: 'Running Pace Calculator', href: '/calculators/health/running-pace-calculator', icon: '🏃', desc: 'Pace, speed & race time predictions' },
      { name: 'Pace Calculator', href: '/calculators/health/pace-calculator', icon: '⏱️', desc: '5K, 10K, half & full marathon' },
      { name: 'Marathon Training', href: '/calculators/health/marathon-training-calculator', icon: '🏅', desc: 'Race pace & weekly mileage plan' },
      { name: 'Squat Calculator', href: '/calculators/health/squat-calculator', icon: '🦵', desc: 'Strength standards & percentages' },
      { name: 'Push-Up Calculator', href: '/calculators/health/pushup-calculator', icon: '💪', desc: 'Fitness norms by age & sex' },
      { name: 'Pull-Up Calculator', href: '/calculators/health/pull-up-calculator', icon: '🙌', desc: 'Standards & training progression' },
      { name: 'Plank Time Calculator', href: '/calculators/health/plank-time-calculator', icon: '🧱', desc: 'Core endurance norms & program' },
      { name: 'Steps Calculator', href: '/calculators/health/steps-calculator', icon: '👣', desc: 'Steps to distance, calories & activity' },
      { name: 'Steps to Calories', href: '/calculators/health/steps-to-calories-calculator', icon: '🔢', desc: 'Accurate by weight & pace' },
      { name: 'Cycling Calories', href: '/calculators/health/cycling-calories-calculator', icon: '🚴', desc: 'Indoor & outdoor by speed & terrain' },
      { name: 'Swimming Calories', href: '/calculators/health/swimming-calories-calculator', icon: '🏊', desc: 'By stroke, pace & body weight' },
      { name: 'Grip Strength Calculator', href: '/calculators/health/grip-strength-calculator', icon: '✊', desc: 'Longevity & health percentile' },
      { name: 'Athletic Performance', href: '/calculators/health/athletic-performance-calculator', icon: '🏆', desc: 'Strength, speed & endurance score' },
      { name: 'Sprint Calculator', href: '/calculators/health/sprint-calculator', icon: '💨', desc: 'Sprint training paces & zones' },
      { name: 'Injury Recovery', href: '/calculators/health/injury-recovery-calculator', icon: '🩹', desc: 'Return-to-sport timeline' },
      { name: 'Flexibility Calculator', href: '/calculators/health/flexibility-calculator', icon: '🤸', desc: 'Range of motion norms by age' },
      { name: 'Sit and Reach', href: '/calculators/health/sit-and-reach-calculator', icon: '📏', desc: 'Hamstring flexibility scoring' },
      { name: 'Grip Strength Calculator — Age Percentile & Mortality Risk', href: '/calculators/health/grip-strength-age-calculator', icon: '✊', desc: 'Free grip strength calculator 2026' },
      { name: 'Muscle Recovery Time Calculator — How Long to Rest After Workout?', href: '/calculators/health/muscle-recovery-time-calculator', icon: '💪', desc: 'Free muscle recovery time calculator 2026' },
      { name: 'Workout Volume Calculator — Sets, Reps, Tonnage & MEV/MRV', href: '/calculators/health/workout-volume-calculator', icon: '🏋️', desc: 'Free workout volume load calculator 2026' },
    ],
  },
  {
    name: 'Heart & Cardiovascular',
    color: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-400', head: 'bg-red-600' },
    tools: [
      { name: 'Heart Attack Risk', href: '/calculators/health/heart-attack-risk-calculator', icon: '❤️‍🔥', desc: '10-yr ASCVD Pooled Cohort Equations' },
      { name: 'Blood Pressure Calculator', href: '/calculators/health/blood-pressure-calculator', icon: '🩺', desc: 'AHA 2017 hypertension categories' },
      { name: 'Cholesterol Calculator', href: '/calculators/health/cholesterol-calculator', icon: '💊', desc: 'LDL, HDL ratio & cardiovascular risk' },
      { name: 'Heart Age Calculator', href: '/calculators/health/heart-age-calculator', icon: '💗', desc: 'Cardiovascular age vs chronological' },
      { name: 'Stroke Risk Calculator', href: '/calculators/health/stroke-risk-calculator', icon: '🧠', desc: 'Framingham + CHA2DS2-VASc' },
      { name: 'Diabetes Risk Calculator', href: '/calculators/health/diabetes-risk-calculator', icon: '🩸', desc: 'FINDRISC 10-year type 2 risk' },
      { name: 'BAC Calculator', href: '/calculators/health/bac-calculator', icon: '🍺', desc: 'Blood alcohol by weight & drinks' },
      { name: 'Kidney Function', href: '/calculators/health/creatinine-clearance-calculator', icon: '🫘', desc: 'eGFR with CKD-EPI & Cockcroft-Gault' },
      { name: 'Liver Health Calculator', href: '/calculators/health/liver-health-calculator', icon: '🫀', desc: 'NAFLD risk assessment' },
      { name: 'Thyroid Calculator', href: '/calculators/health/thyroid-calculator', icon: '🦋', desc: 'Hypo & hyperthyroid risk' },
      { name: 'Inflammation Risk', href: '/calculators/health/inflammation-risk-calculator', icon: '🔴', desc: 'Dietary Inflammatory Index' },
      { name: 'Ankle-Brachial Index (ABI) Calculator — PAD Risk', href: '/calculators/health/ankle-brachial-index-calculator', icon: '🦵', desc: 'Free ABI calculator 2026' },
      { name: 'Heart Rate Zone Calculator — Karvonen Method', href: '/calculators/health/athlete-heart-rate-calculator', icon: '❤️', desc: 'Free heart rate zone calculator 2026' },
      { name: 'Cardiac Output Calculator — Heart Function', href: '/calculators/health/cardiac-output-calculator', icon: '🫀', desc: 'Free cardiac output calculator 2026' },
      { name: 'HRV Calculator — Heart Rate Variability Score & Recovery', href: '/calculators/health/heart-rate-variability-calculator', icon: '💓', desc: 'Free HRV calculator 2026' },
      { name: 'Lung Capacity Calculator — FVC, FEV1 & Spirometry', href: '/calculators/health/lung-capacity-calculator', icon: '🫁', desc: 'Free lung capacity calculator 2026' },
      { name: 'Respiratory Rate Calculator — Normal vs Abnormal Breathing Rate', href: '/calculators/health/respiratory-rate-calculator', icon: '🌬️', desc: 'Free respiratory rate calculator 2026' },
      { name: 'SpO2 Calculator — Oxygen Saturation Risk Level', href: '/calculators/health/spo2-risk-calculator', icon: '💨', desc: 'Free SpO2 (blood oxygen saturation) risk calculator 2026' },
    ],
  },
  {
    name: "Women's Health",
    color: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', dot: 'bg-pink-400', head: 'bg-pink-600' },
    tools: [
      { name: 'Pregnancy Calculator', href: '/calculators/health/pregnancy-calculator', icon: '🤰', desc: 'Week-by-week milestones from LMP' },
      { name: 'Due Date Calculator', href: '/calculators/health/due-date-calculator', icon: '📅', desc: 'EDD from LMP, conception or IVF' },
      { name: 'Ovulation Calculator', href: '/calculators/health/ovulation-calculator', icon: '🌸', desc: '5-day fertile window from cycle length' },
      { name: 'Menstrual Cycle Calculator', href: '/calculators/health/menstrual-cycle-calculator', icon: '🩷', desc: 'Period, ovulation & PMS dates' },
      { name: 'Pregnancy Weight Gain', href: '/calculators/health/pregnancy-weight-gain-calculator', icon: '⚖️', desc: 'IOM guidelines by pre-pregnancy BMI' },
      { name: 'Pregnancy Nutrition', href: '/calculators/health/pregnancy-nutrition-calculator', icon: '🥗', desc: 'Calories & nutrients by trimester' },
      { name: 'Pregnancy Conception', href: '/calculators/health/pregnancy-conception-calculator', icon: '🔍', desc: 'Estimate conception date from due date' },
      { name: 'Breastfeeding Calories', href: '/calculators/health/breastfeeding-calorie-calculator', icon: '🍼', desc: 'Extra calorie needs while nursing' },
      { name: 'Menopause Symptoms', href: '/calculators/health/menopause-symptom-calculator', icon: '🌡️', desc: 'Greene Climacteric Scale scoring' },
    ],
  },
  {
    name: 'Sleep & Wellness',
    color: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', dot: 'bg-violet-400', head: 'bg-violet-600' },
    tools: [
      { name: 'Sleep Cycle Calculator', href: '/calculators/health/sleep-cycle-calculator', icon: '😴', desc: 'Best wake time via 90-min cycles' },
      { name: 'Sleep Need Calculator', href: '/calculators/health/sleep-need-calculator', icon: '🌙', desc: 'Sleep requirement by age & activity' },
      { name: 'Caffeine Half-Life', href: '/calculators/health/caffeine-half-life-calculator', icon: '☕', desc: 'When caffeine clears for better sleep' },
      { name: 'Blue Light Exposure', href: '/calculators/health/blue-light-exposure-calculator', icon: '📱', desc: 'Screen time & melatonin impact' },
      { name: 'Stress Level Calculator', href: '/calculators/health/stress-level-calculator', icon: '🧘', desc: 'PSS-10 & Holmes-Rahe stress score' },
      { name: 'Cortisol Stress Calculator', href: '/calculators/health/cortisol-stress-calculator', icon: '🧠', desc: 'Lifestyle impact on stress hormones' },
      { name: 'Meditation Benefits', href: '/calculators/health/meditation-benefits-calculator', icon: '🕉️', desc: 'Health impact of daily practice' },
      { name: 'Mental Health Score', href: '/calculators/health/mental-health-score-calculator', icon: '💆', desc: 'PHQ-9 & GAD-7 wellness screening' },
      { name: 'Longevity Calculator', href: '/calculators/health/longevity-calculator', icon: '♾️', desc: 'Life expectancy by lifestyle factors' },
      { name: 'Body Age Calculator', href: '/calculators/health/body-age-calculator', icon: '🧬', desc: 'Biological vs chronological age' },
      { name: 'Age Calculator', href: '/calculators/health/age-calculator', icon: '🎂', desc: 'Exact age in years, months, days' },
      { name: 'Intermittent Fasting', href: '/calculators/health/intermittent-fasting-calculator', icon: '⏰', desc: '16:8, 18:6, OMAD & 5:2 protocols' },
      { name: 'Fasting Window', href: '/calculators/health/fasting-window-calculator', icon: '🕐', desc: 'Eating window start & end times' },
      { name: 'Gut Health Calculator', href: '/calculators/health/gut-health-calculator', icon: '🦠', desc: 'Microbiome health assessment' },
      { name: 'Immune Health', href: '/calculators/health/immune-health-calculator', icon: '🛡️', desc: 'Immune system strength score' },
      { name: 'Breathing Exercise Calculator', href: '/calculators/health/breathing-exercise-calculator', icon: '🫁', desc: 'Calculate personalized timing for breathing exercises including box br' },
      { name: 'Jet Lag Calculator', href: '/calculators/health/jet-lag-calculator', icon: '✈️', desc: 'Calculate your predicted jet lag severity based on number of time zone' },
      { name: 'Night Shift Health Calculator — Circadian Risk', href: '/calculators/health/night-shift-health-calculator', icon: '🌙', desc: 'Free night shift health calculator 2026' },
      { name: 'Shift Work Health Calculator', href: '/calculators/health/shift-work-health-calculator', icon: '🌙', desc: 'Assess the cumulative health risk of shift work including night shifts' },
      { name: 'Sleep Debt Calculator — How Much Sleep Are You Owed?', href: '/calculators/health/sleep-debt-calculator', icon: '😴', desc: 'Free sleep debt calculator 2026' },
    ],
  },
  {
    name: 'Hydration & Environment',
    color: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', dot: 'bg-cyan-400', head: 'bg-cyan-600' },
    tools: [
      { name: 'Water Intake Calculator', href: '/calculators/health/water-intake-calculator', icon: '💧', desc: 'Daily water goal in oz & liters' },
      { name: 'Hydration Calculator', href: '/calculators/health/hydration-calculator', icon: '🥤', desc: 'Exercise fluid needs & strategy' },
      { name: 'Dehydration Calculator', href: '/calculators/health/dehydration-calculator', icon: '🌡️', desc: 'Fluid deficit & rehydration guide' },
      { name: 'Sweat Rate Calculator', href: '/calculators/health/sweat-rate-calculator', icon: '💦', desc: 'Personalized exercise sweat loss' },
      { name: 'UV Exposure Calculator', href: '/calculators/health/uv-exposure-calculator', icon: '☀️', desc: 'Safe sun time & vitamin D synthesis' },
      { name: 'Air Quality Health', href: '/calculators/health/air-quality-health-calculator', icon: '🌬️', desc: 'AQI health risk by activity' },
      { name: 'Sauna Benefits', href: '/calculators/health/sauna-benefits-calculator', icon: '🔥', desc: 'Health impact by frequency & temp' },
      { name: 'Cold Exposure', href: '/calculators/health/cold-exposure-calculator', icon: '🧊', desc: 'Safe cold plunge duration & temp' },
      { name: 'Cold Shower Benefits', href: '/calculators/health/cold-shower-benefits-calculator', icon: '🚿', desc: 'Mood, energy & recovery impact' },
      { name: 'Dehydration Status Calculator — Exercise Fluid Loss', href: '/calculators/health/dehydration-status-calculator', icon: '💧', desc: 'Free dehydration calculator 2026' },
      { name: 'EMF Exposure Calculator — Relative RF Exposure Score', href: '/calculators/health/emf-exposure-calculator', icon: '📶', desc: 'Free EMF (electromagnetic field) exposure calculator 2026' },
      { name: 'Hydration for Exercise Calculator — Pre/During/Post Workout', href: '/calculators/health/hydration-exercise-calculator', icon: '🏃', desc: 'Free exercise hydration calculator 2026' },
      { name: 'Mold Exposure Health Calculator', href: '/calculators/health/mold-exposure-calculator', icon: '🍄', desc: 'Assess your health risk from mold exposure based on symptom frequency' },
      { name: 'Sauna Health Calculator — Frequency, Temperature & CVD Benefits', href: '/calculators/health/sauna-health-calculator', icon: '🔥', desc: 'Free sauna health calculator 2026' },
    ],
  },
  {
    name: 'Substance & Recovery',
    color: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-400', head: 'bg-amber-600' },
    tools: [
      { name: 'BAC Calculator', href: '/calculators/health/bac-calculator', icon: '🍺', desc: 'Blood alcohol by weight & drinks' },
      { name: 'Alcohol Metabolism', href: '/calculators/health/alcohol-metabolism-calculator', icon: '⏱️', desc: 'How long until sober calculator' },
      { name: 'Alcohol Calorie Calculator', href: '/calculators/health/alcohol-calorie-calculator', icon: '🍷', desc: 'Calories in beer, wine & cocktails' },
      { name: 'Hangover Recovery', href: '/calculators/health/hangover-recovery-calculator', icon: '💊', desc: 'Recovery time & evidence-based tips' },
      { name: 'Caffeine Half-Life', href: '/calculators/health/caffeine-half-life-calculator', icon: '☕', desc: 'Caffeine clearance & sleep cutoff' },
      { name: 'Nicotine Withdrawal', href: '/calculators/health/nicotine-withdrawal-calculator', icon: '🚭', desc: 'Symptom timeline & cessation tips' },
    ],
  },
  {
    name: 'Ergonomics & Posture',
    color: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', dot: 'bg-teal-400', head: 'bg-teal-600' },
    tools: [
      { name: 'Ergonomics Score', href: '/calculators/health/ergonomics-score-calculator', icon: '🖥️', desc: 'Workstation RSI & back pain risk' },
      { name: 'Standing Desk Calculator', href: '/calculators/health/standing-desk-calculator', icon: '🪑', desc: 'Optimal sit-stand ratio & height' },
      { name: 'Posture Calculator', href: '/calculators/health/posture-calculator', icon: '🧍', desc: 'Postural deviation & correction plan' },
      { name: 'Eye Health Calculator', href: '/calculators/health/eye-health-calculator', icon: '👁️', desc: 'Digital eye strain & dry eye risk' },
      { name: 'Hearing Age Calculator', href: '/calculators/health/hearing-age-calculator', icon: '👂', desc: 'Audiological age from noise exposure' },
      { name: 'Altitude Sickness', href: '/calculators/health/altitude-sickness-calculator', icon: '🏔️', desc: 'AMS risk for hikers & climbers' },
      { name: 'Joint Mobility Calculator — Range of Motion Score', href: '/calculators/health/joint-mobility-calculator', icon: '🤸', desc: 'Free joint mobility calculator 2026' },
      { name: 'Posture Assessment Calculator — Postural Deviation Score', href: '/calculators/health/posture-assessment-calculator', icon: '🧍', desc: 'Free posture assessment calculator 2026' },
    ],
  },
  {
    name: 'Chronic Disease & Risk Screening',
    color: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-400', head: 'bg-amber-600' },
    tools: [
      { name: 'Bone Density Risk Calculator — Osteoporosis Risk', href: '/calculators/health/bone-density-risk-calculator', icon: '🦴', desc: 'Free osteoporosis and bone density risk calculator 2026' },
      { name: 'DEXA T-Score Calculator — Osteoporosis Risk', href: '/calculators/health/bone-mineral-density-calculator', icon: '🦴', desc: 'Free DEXA T-score and Z-score calculator 2026' },
      { name: 'CKD Progression Calculator — Kidney Disease Timeline', href: '/calculators/health/ckd-progression-calculator', icon: '🫘', desc: 'Free CKD progression calculator 2026' },
      { name: 'Dental Health Calculator', href: '/calculators/health/dental-health-calculator', icon: '🦷', desc: 'Assess your risk for dental caries, periodontal disease, and tooth los' },
      { name: 'Erectile Dysfunction Risk Calculator — ED Risk Factors', href: '/calculators/health/erectile-dysfunction-risk-calculator', icon: '⚕️', desc: 'Free erectile dysfunction (ED) risk calculator 2026' },
      { name: 'Exercise Addiction Risk Calculator — EAI Score', href: '/calculators/health/exercise-addiction-calculator', icon: '🏋️', desc: 'Free exercise addiction risk calculator based on validated EAI criteri' },
      { name: 'Frailty Index Calculator — Fried Frailty Criteria', href: '/calculators/health/frailty-index-calculator', icon: '🧓', desc: 'Free frailty index calculator using Fried Frailty Phenotype criteria 2' },
      { name: 'eGFR Calculator — Kidney Function & CKD Stage', href: '/calculators/health/gfr-egfr-calculator', icon: '🫘', desc: 'Free eGFR (estimated GFR) kidney function calculator 2026' },
      { name: 'Immune Strength Calculator — Lifestyle Immune Score', href: '/calculators/health/immune-strength-calculator', icon: '🛡️', desc: 'Free immune strength calculator 2026' },
      { name: 'Kidney Function Calculator', href: '/calculators/health/kidney-function-calculator', icon: '🫘', desc: 'Estimate kidney function from blood creatinine level using CKD-EPI and' },
      { name: 'Longevity Risk Calculator — Projected Lifespan', href: '/calculators/health/longevity-risk-calculator', icon: '♾️', desc: 'Free longevity calculator 2026' },
      { name: 'Migraine Risk Calculator — Triggers & Prevention Score', href: '/calculators/health/migraine-risk-calculator', icon: '🤕', desc: 'Free migraine risk and burden calculator 2026' },
      { name: 'Obesity Comorbidity Risk Calculator — Metabolic Syndrome', href: '/calculators/health/obesity-comorbidity-calculator', icon: '⚖️', desc: 'Free obesity comorbidity calculator 2026' },
      { name: 'Oral Health Risk Calculator — Dental & Systemic Risk', href: '/calculators/health/oral-health-risk-calculator', icon: '🦷', desc: 'Free oral health risk calculator 2026' },
      { name: 'Pain Score Calculator — Chronic Pain Assessment', href: '/calculators/health/pain-score-calculator', icon: '🩹', desc: 'Free pain score and chronic pain assessment calculator 2026' },
      { name: 'Skin Aging Calculator — Photoaging & Biological Skin Age', href: '/calculators/health/skin-aging-calculator', icon: '✨', desc: 'Free skin aging risk calculator 2026' },
      { name: 'Skin Health Calculator', href: '/calculators/health/skin-health-calculator', icon: '✨', desc: 'Free Skin Health Calculator 2026' },
      { name: 'Visual Acuity & Eye Health Risk Calculator', href: '/calculators/health/visual-acuity-risk-calculator', icon: '👁️', desc: 'Free eye health and visual acuity risk calculator 2026' },
      { name: 'Wound Healing Time Estimator', href: '/calculators/health/wound-healing-calculator', icon: '🩹', desc: 'Free wound healing calculator 2026' },
    ],
  },
  {
    name: 'Mental & Cognitive Health',
    color: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', dot: 'bg-indigo-400', head: 'bg-indigo-600' },
    tools: [
      { name: 'Cognitive Load Calculator — Mental Bandwidth Score', href: '/calculators/health/cognitive-load-calculator', icon: '🧩', desc: 'Free cognitive load calculator 2026' },
      { name: 'Gratitude Health Impact Calculator', href: '/calculators/health/gratitude-health-calculator', icon: '🙏', desc: 'Calculate the estimated health benefits of a consistent gratitude prac' },
      { name: 'Loneliness Health Calculator', href: '/calculators/health/loneliness-health-calculator', icon: '🤝', desc: 'Calculate the estimated health impact of chronic loneliness and social' },
      { name: 'Mental Fatigue Calculator — Burnout & Cognitive Load Score', href: '/calculators/health/mental-fatigue-calculator', icon: '🧠', desc: 'Free mental fatigue and burnout risk calculator 2026' },
    ],
  },
  {
    name: 'Reproductive & Hormonal Health',
    color: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', dot: 'bg-pink-400', head: 'bg-pink-600' },
    tools: [
      { name: 'Menstrual Health Score Calculator — Cycle Analysis', href: '/calculators/health/menstrual-health-calculator', icon: '🌙', desc: 'Free menstrual health score calculator 2026' },
      { name: 'PCOS Risk Calculator — Symptom Score & Investigations', href: '/calculators/health/pcos-risk-calculator', icon: '🌀', desc: 'Free PCOS risk score calculator 2026' },
      { name: 'Pregnancy Due Date Calculator', href: '/calculators/health/pregnancy-calculator', icon: '🤱', desc: 'Pregnancy due-date estimate 2026' },
      { name: 'Testosterone Calculator', href: '/calculators/health/testosterone-age-calculator', icon: '⚡', desc: 'Free Testosterone Age Calculator 2026 — Calculate testosterone age ins' },
    ],
  },
]

// Structured data
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Health Calculators 2026',
  description: 'Health calculator directory with route-level methodology, limitations, evidence status and source references where available.',
  url: `${BASE_URL}/calculators/health`,
  numberOfItems: HEALTH_CANONICAL_SLUGS.length,
  itemListElement: FEATURED.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    url: `${BASE_URL}${t.href}`,
    description: t.desc,
  })),
}

const medicalOrgSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Health Calculators — ToolTrio',
  description: 'Health calculators with route-level methodology, evidence-status disclosures, limitations, and source references where available.',
  url: `${BASE_URL}/calculators/health`,
  author: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
  publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
  isAccessibleForFree: 'True',
  inLanguage: 'en-US',
  about: [
    { '@type': 'MedicalCondition', name: 'Body Mass Index Assessment' },
    { '@type': 'MedicalCondition', name: 'Cardiovascular Disease Prevention' },
    { '@type': 'MedicalCondition', name: 'Nutritional Assessment' },
    { '@type': 'MedicalCondition', name: 'Fitness Assessment' },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Health Calculators', item: `${BASE_URL}/calculators/health` },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Are these health calculators free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The public calculator pages are available without signup or payment. Review the individual page for its methodology, limitations, evidence status, and privacy details.' } },
    { '@type': 'Question', name: 'Do these calculators use US standard units?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Most calculators default to US customary units where appropriate; individual pages document supported units and conversions.' } },
    { '@type': 'Question', name: 'Which health formulas are used?', acceptedAnswer: { '@type': 'Answer', text: 'Each calculator documents its own method and evidence status. Some use established equations or published reference standards; others are simplified estimates. Review the individual calculator page for its sources and limitations.' } },
    { '@type': 'Question', name: 'How accurate are the health calculators?', acceptedAnswer: { '@type': 'Answer', text: 'Each calculator has its own method and evidence status. Some are standard mathematical or screening calculations, while others are simplified estimates that require clinical context. Always consult a qualified healthcare professional for medical decisions.' } },
  ],
}

export default function HealthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-white">
      {/* Structured Data */}
      <Script id="health-hub-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([itemListSchema, medicalOrgSchema, breadcrumbSchema, faqSchema]) }} />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-rose-600 transition-all">Home</Link>
          <span>/</span>
          <span className="text-gray-700 font-semibold">Health Calculators</span>
        </nav>

        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-red-600 to-pink-600 rounded-3xl p-8 md:p-10 mb-10 text-white shadow-xl">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-xs font-bold mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {HEALTH_COUNT} Tools — Methodology and evidence status shown per page
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3 leading-tight">
              Health Calculators<br />
              <span className="text-rose-200">Evidence & Formula Reviewed</span>
            </h1>
            <p className="text-rose-100 max-w-2xl text-base md:text-lg leading-relaxed mb-5">
              {HEALTH_COUNT} health calculators — BMI, calories, TDEE, macros, heart risk, pregnancy, sleep, fitness, and more.
              All free. . US standard units (lbs & ft-in) by default.
            </p>
            <div className="flex flex-wrap gap-2">
              {['🇺🇸 lbs & ft-in default', '📚 Source-linked methods', '⚡ Instant results', '🔒 100% private', '📱 Mobile ready', '🆓 No account required'].map(b => (
                <span key={b} className="text-xs font-semibold bg-white/15 border border-white/25 rounded-full px-3 py-1.5">{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured / Most Popular (merged from V7) */}
        <section aria-labelledby="popular-heading" className="mb-12">
          <h2 id="popular-heading" className="text-2xl font-black text-gray-900 mb-1 flex items-center gap-2">
            ⭐ Most Popular Health Calculators
          </h2>
          <p className="text-gray-500 text-sm mb-5">The calculators Americans search for most — publicly available; methodology and limitations are shown per page.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {FEATURED.map(tool => (
              <Link key={tool.href} href={tool.href}
                className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col">
                <span className="flex items-start gap-3 mb-3 block">
                  <span className="text-3xl">{tool.icon}</span>
                  <span className="flex-1 min-w-0 block">
                    <h3 className="font-black text-gray-900 text-sm leading-tight group-hover:text-rose-600 transition-all">{tool.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-snug">{tool.desc}</p>
                  </span>
                </span>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400">{tool.tag}</span>
                  <span className="text-xs font-black text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">Open →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Category Sections */}
        {CATEGORIES.map(cat => (
          <section key={cat.name} aria-labelledby={`cat-${cat.name.replace(/\W/g, '-')}`} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${cat.color.dot}`} />
              <h2 id={`cat-${cat.name.replace(/\W/g, '-')}`} className={`text-xl font-black ${cat.color.text}`}>
                {cat.name}
              </h2>
              <div className={`h-px flex-1 ${cat.color.border.replace('border', 'bg')}`} />
              <span className="text-xs text-gray-400 font-medium">{cat.tools.length} tools</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {cat.tools.map(tool => (
                <Link key={tool.href} href={tool.href}
                  className={`${cat.color.bg} border ${cat.color.border} rounded-xl p-3.5 hover:shadow-md hover:-translate-y-0.5 transition-all group`}>
                  <div className="flex items-start gap-2.5">
                    <span className="text-xl flex-shrink-0 mt-0.5">{tool.icon}</span>
                    <div className="min-w-0">
                      <h3 className={`font-bold text-sm ${cat.color.text} group-hover:underline`}>{tool.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5 leading-snug">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* SEO text block — E-E-A-T signals */}
        <section className="mt-12 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-black text-gray-900 mb-4">About Our Health Calculators</h2>
          <div className="prose prose-sm max-w-none text-gray-600 space-y-3">
            <p>
              ToolTrio publishes health calculators with route-level evidence and methodology profiles. Some tools use published equations or guidance; others are explicitly labeled as educational estimates. Each calculator page states its limitations and, where available, links to the underlying reference sources.
              Every tool defaults to <strong>US standard units</strong> — pounds for weight, feet and inches for height —
              with a metric toggle available on supported calculators.
            </p>
            <p>
              Our <Link href="/calculators/health/bmi-calculator" className="text-rose-600 hover:underline font-semibold">BMI Calculator</Link> uses
              the CDC standard formula with separate categories for adults and children.
              The <Link href="/calculators/health/calorie-calculator" className="text-rose-600 hover:underline font-semibold">Calorie Calculator</Link> uses
              the Mifflin-St Jeor equation as one commonly used predictive equation; the individual page explains its assumptions and limitations.
              The <Link href="/calculators/health/heart-attack-risk-calculator" className="text-rose-600 hover:underline font-semibold">Heart Attack Risk Calculator</Link> has a route-specific quality profile; check that page's methodology and source section before interpreting its result.
            </p>
            <p>
              Where a calculator operates entirely in the browser, its page explains that behavior and the relevant privacy boundary. Do not enter sensitive information unless it is necessary for the calculation. Results are educational estimates and should not replace professional medical advice.
            </p>
          </div>

          {/* Quick FAQ */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: 'What units do these calculators use?', a: 'Many calculators support US customary units, and supported units/conversions are documented on each individual page.' },
              { q: 'Are these calculators medically accurate?', a: 'Accuracy depends on the individual calculator, its formula, population assumptions and evidence status. Review the methodology, limitations and sources shown on the individual page; do not treat an estimate as a diagnosis.' },
              { q: 'Do I need to create an account?', a: ', registration, or payment is required to use the public calculator pages.' },
              { q: 'Do these calculators work on iPhone?', a: 'The calculator interface is designed to be responsive across common mobile and desktop layouts; device-specific behavior can vary.' },
            ].map(faq => (
              <div key={faq.q} className="bg-gray-50 rounded-xl p-4">
                <p className="font-bold text-gray-900 text-sm mb-1">{faq.q}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <HealthYMYLPolicy />

        {/* Footer disclaimer */}
        <p className="mt-8 text-center text-xs text-gray-400 leading-relaxed max-w-3xl mx-auto">
          Health calculators use tool-specific formulas and evidence profiles; some are simplified estimates and some require manual clinical review.
          Results are educational estimates and should not replace professional medical advice.
          Always consult a licensed healthcare provider before making health decisions.
        </p>

      </div>
    </div>
  )
}