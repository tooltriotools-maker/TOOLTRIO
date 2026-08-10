'use client'
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────
type Tool = { n: string; p: string; c: string; k: string; d: string }
type Tab = 'chat' | 'search' | 'related'
interface Message { role: 'user' | 'assistant'; content: string; widget?: CalcWidget }
interface CalcWidget { type: string; title: string }
interface SpeechRecognitionEventLike { results: ArrayLike<ArrayLike<{ transcript: string }>> }
interface SpeechRecognitionLike {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  continuous: boolean
  onstart: (() => void) | null
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}
type SpeechRecognitionConstructorLike = new () => SpeechRecognitionLike

// ─── Category config (FIXED: correct hrefs for zip/commodities) ───────────────
const CAT: Record<string, { emoji: string; label: string; color: string; href: string }> = {
  finance:     { emoji: '💰', label: 'Finance',     color: '#16a34a', href: '/calculators/finance' },
  health:      { emoji: '❤️', label: 'Health',      color: '#dc2626', href: '/calculators/health' },
  dev:         { emoji: '⚙️', label: 'Dev Tools',   color: '#7c3aed', href: '/calculators/dev' },
  fun:         { emoji: '🎉', label: 'Fun',          color: '#ea580c', href: '/calculators/fun' },
  zip:         { emoji: '📮', label: 'ZIP Tools',    color: '#0284c7', href: '/zip' },
  commodities: { emoji: '📈', label: 'Commodities', color: '#ca8a04', href: '/commodities' },
}

// ─── Finance sub-categories for drill-down ────────────────────────────────────
const FINANCE_SUBS: { emoji: string; label: string; keywords: string[] }[] = [
  { emoji: '🏠', label: 'Mortgage & Loans', keywords: ['mortgage', 'home loan', 'emi', 'auto loan', 'student loan', 'down payment'] },
  { emoji: '🏛️', label: 'Retirement', keywords: ['401k', 'roth ira', 'retirement', 'nps', 'ppf', 'fire', 'pension'] },
  { emoji: '📈', label: 'Investing', keywords: ['sip', 'compound', 'lumpsum', 'dividend', 'stock', 'swp', 'cagr', 'crypto'] },
  { emoji: '📊', label: 'Tax & Budget', keywords: ['gst', 'income tax', 'hra', 'budget', 'gratuity', 'salary', 'uk income'] },
  { emoji: '💳', label: 'Debt & Credit', keywords: ['credit card', 'debt payoff', 'break even', 'savings goal', 'emergency fund'] },
  { emoji: '💱', label: 'Currency & More', keywords: ['currency', 'gold', 'tip', 'roi', 'net worth', 'inflation'] },
]

// ─── All tools with descriptions ──────────────────────────────────────────────
const TOOLS: Tool[] = [
  // FINANCE
  {n:"SIP Calculator",p:"/calculators/finance/sip-calculator",c:"finance",k:"sip systematic investment mutual fund",d:"Calculate returns on monthly SIP investments with expected annual rate."},
  {n:"EMI Calculator",p:"/calculators/finance/emi-calculator",c:"finance",k:"emi loan installment equated",d:"Find monthly EMI for any loan — home, car or personal."},
  {n:"Compound Interest",p:"/calculators/finance/compound-interest-calculator",c:"finance",k:"compound interest compounding grow investment",d:"See how money grows with compound interest over time."},
  {n:"Mortgage Calculator",p:"/calculators/finance/mortgage-calculator",c:"finance",k:"mortgage home loan house payment piti",d:"Calculate US mortgage monthly payment including taxes and insurance."},
  {n:"401k Calculator",p:"/calculators/finance/401k-calculator",c:"finance",k:"401k retirement employer match usa",d:"Project your 401k balance at retirement with employer match."},
  {n:"Roth IRA Calculator",p:"/calculators/finance/roth-ira-calculator",c:"finance",k:"roth ira retirement tax free usa",d:"Calculate tax-free Roth IRA growth and retirement balance."},
  {n:"Retirement Calculator",p:"/calculators/finance/retirement-calculator",c:"finance",k:"retirement retire pension nest egg savings",d:"How much do you need to retire? Find out in seconds."},
  {n:"Income Tax Calculator",p:"/calculators/finance/income-tax-calculator",c:"finance",k:"income tax bracket federal usa",d:"Estimate your US federal income tax and effective tax rate."},
  {n:"Budget Planner",p:"/calculators/finance/budget-planner-calculator",c:"finance",k:"budget monthly expenses planner 50 30 20",d:"Plan monthly budget using the 50/30/20 rule."},
  {n:"FD Calculator",p:"/calculators/finance/fd-calculator",c:"finance",k:"fd fixed deposit bank interest india",d:"Calculate fixed deposit maturity amount and interest earned."},
  {n:"PPF Calculator",p:"/calculators/finance/ppf-calculator",c:"finance",k:"ppf public provident fund india",d:"Calculate PPF maturity value with yearly contributions."},
  {n:"NPS Calculator",p:"/calculators/finance/nps-calculator",c:"finance",k:"nps national pension system india",d:"Estimate NPS corpus and monthly pension at retirement."},
  {n:"CAGR Calculator",p:"/calculators/finance/cagr-calculator",c:"finance",k:"cagr compound annual growth rate investment",d:"Find the CAGR of any investment between two dates."},
  {n:"SWP Calculator",p:"/calculators/finance/swp-calculator",c:"finance",k:"swp systematic withdrawal monthly income",d:"Calculate SWP monthly withdrawals and remaining corpus."},
  {n:"Lumpsum Calculator",p:"/calculators/finance/lumpsum-calculator",c:"finance",k:"lumpsum one time investment mutual fund",d:"Calculate returns on a one-time lumpsum investment."},
  {n:"Currency Converter",p:"/calculators/finance/currency-converter",c:"finance",k:"currency convert exchange rate usd inr",d:"Convert between 150+ currencies with live-like rates."},
  {n:"Net Worth Calculator",p:"/calculators/finance/net-worth-calculator",c:"finance",k:"net worth assets liabilities wealth",d:"Calculate your total net worth by listing assets and liabilities."},
  {n:"FIRE Calculator",p:"/calculators/finance/fire-calculator",c:"finance",k:"fire financial independence retire early",d:"Find your FIRE number and years to financial independence."},
  {n:"Inflation Calculator",p:"/calculators/finance/inflation-calculator",c:"finance",k:"inflation purchasing power cost living",d:"See how inflation erodes your purchasing power over time."},
  {n:"Dividend Calculator",p:"/calculators/finance/dividend-calculator",c:"finance",k:"dividend yield stock income",d:"Calculate dividend income from stock holdings."},
  {n:"Auto Loan Calculator",p:"/calculators/finance/auto-loan-calculator",c:"finance",k:"auto loan car vehicle payment",d:"Calculate car loan monthly payment with tax and fees."},
  {n:"Student Loan",p:"/calculators/finance/student-loan-calculator",c:"finance",k:"student loan education college debt",d:"Estimate student loan monthly payment and total interest."},
  {n:"Crypto Profit",p:"/calculators/finance/crypto-profit-calculator",c:"finance",k:"crypto bitcoin profit loss",d:"Calculate profit or loss on any cryptocurrency trade."},
  {n:"GST Calculator",p:"/calculators/finance/gst-calculator",c:"finance",k:"gst goods services tax india",d:"Add or remove GST at any slab rate — 5%, 12%, 18%, 28%."},
  {n:"Salary Calculator",p:"/calculators/finance/salary-calculator",c:"finance",k:"salary take home net gross",d:"Calculate take-home salary after tax and deductions."},
  {n:"HRA Calculator",p:"/calculators/finance/hra-calculator",c:"finance",k:"hra house rent allowance india",d:"Calculate HRA exemption under Indian income tax rules."},
  {n:"Gratuity Calculator",p:"/calculators/finance/gratuity-calculator",c:"finance",k:"gratuity end service benefit",d:"Calculate gratuity amount based on salary and years of service."},
  {n:"ROI Calculator",p:"/calculators/finance/roi-calculator",c:"finance",k:"roi return on investment profit",d:"Calculate return on investment and annualised ROI."},
  {n:"Savings Goal",p:"/calculators/finance/savings-goal-calculator",c:"finance",k:"savings goal target save money",d:"How much to save monthly to reach your goal?"},
  {n:"Debt Payoff",p:"/calculators/finance/debt-payoff-calculator",c:"finance",k:"debt payoff snowball avalanche free",d:"Pay off debt faster with snowball or avalanche method."},
  {n:"Credit Card Payoff",p:"/calculators/finance/credit-card-payoff-calculator",c:"finance",k:"credit card payoff interest",d:"Find out how long to pay off credit card debt."},
  {n:"Emergency Fund",p:"/calculators/finance/emergency-fund-calculator",c:"finance",k:"emergency fund months expenses",d:"Calculate how big your emergency fund should be."},
  {n:"Home Loan Calculator",p:"/calculators/finance/home-loan-calculator",c:"finance",k:"home loan housing india emi",d:"Calculate home loan EMI and total interest payable."},
  {n:"Down Payment",p:"/calculators/finance/down-payment-calculator",c:"finance",k:"down payment house save",d:"Compare 5%, 10%, 20% down payment options."},
  {n:"Rent vs Buy",p:"/calculators/finance/rent-vs-buy-calculator",c:"finance",k:"rent vs buy home comparison",d:"Should you rent or buy? Compare the financial difference."},
  {n:"Tip Calculator",p:"/calculators/finance/tip-calculator",c:"finance",k:"tip restaurant server bill split",d:"Split restaurant bill and calculate tip per person."},
  {n:"Simple Interest",p:"/calculators/finance/simple-interest-calculator",c:"finance",k:"simple interest si basic",d:"Calculate simple interest on principal over any period."},
  {n:"Stock Profit",p:"/calculators/finance/stock-profit-calculator",c:"finance",k:"stock profit loss shares buy sell",d:"Calculate profit or loss on stock trades."},
  {n:"Break Even",p:"/calculators/finance/break-even-calculator",c:"finance",k:"break even point profit loss",d:"Find the break-even point for any business or product."},
  {n:"Weekly Budget",p:"/calculators/finance/weekly-budget-calculator",c:"finance",k:"weekly budget plan week",d:"Plan and track your weekly spending budget."},
  {n:"UK Income Tax",p:"/calculators/finance/uk-income-tax-calculator",c:"finance",k:"uk income tax paye take home pay",d:"Calculate UK take-home pay after PAYE, NI and pension."},
  {n:"Savings Rate",p:"/calculators/finance/savings-rate-calculator",c:"finance",k:"savings rate fire years financial independence",d:"Calculate your savings rate and years to financial independence."},
  {n:"Wealth Calculator",p:"/calculators/finance/wealth-calculator",c:"finance",k:"wealth net worth projection grow",d:"Project your net worth growth with income and savings rate."},
  {n:"Payoff Date",p:"/calculators/finance/payoff-date-calculator",c:"finance",k:"payoff date debt free when",d:"Find the exact date you will be completely debt-free."},
  {n:"Annual Income",p:"/calculators/finance/annual-income-calculator",c:"finance",k:"annual income hourly to yearly salary",d:"Convert hourly, daily or weekly pay to annual income."},
  // HEALTH
  {n:"BMI Calculator",p:"/calculators/health/bmi-calculator",c:"health",k:"bmi body mass index weight height",d:"Calculate body mass index and see if you are in a healthy range."},
  {n:"BMR Calculator",p:"/calculators/health/bmr-calculator",c:"health",k:"bmr basal metabolic rate metabolism",d:"Calculate how many calories your body burns at rest."},
  {n:"TDEE Calculator",p:"/calculators/health/tdee-calculator",c:"health",k:"tdee total daily energy maintenance",d:"Find your total daily calorie burn including activity level."},
  {n:"Calorie Calculator",p:"/calculators/health/calorie-calculator",c:"health",k:"calorie daily needs intake lose weight",d:"Calculate daily calorie needs for weight loss, gain or maintenance."},
  {n:"Calorie Deficit",p:"/calculators/health/calorie-deficit-calculator",c:"health",k:"calorie deficit lose weight fat",d:"Calculate the calorie deficit needed to lose weight at your target rate."},
  {n:"Calories Burned",p:"/calculators/health/calories-burned-calculator",c:"health",k:"calories burned exercise activity",d:"Find calories burned for 100+ exercises and activities."},
  {n:"Body Fat Calculator",p:"/calculators/health/body-fat-calculator",c:"health",k:"body fat percentage composition navy",d:"Estimate body fat percentage using the US Navy method."},
  {n:"Ideal Weight",p:"/calculators/health/ideal-weight-calculator",c:"health",k:"ideal weight healthy target",d:"See your ideal weight range across 4 different formulas."},
  {n:"Water Intake",p:"/calculators/health/water-intake-calculator",c:"health",k:"water intake hydration daily",d:"Calculate how much water you should drink daily."},
  {n:"Protein Intake",p:"/calculators/health/protein-intake-calculator",c:"health",k:"protein intake daily gram muscle",d:"Find your daily protein requirement based on weight and activity."},
  {n:"Macro Calculator",p:"/calculators/health/macro-calculator",c:"health",k:"macro carbs protein fat diet",d:"Calculate daily macros — protein, carbs and fat — for your goal."},
  {n:"Keto Macro",p:"/calculators/health/keto-macro-calculator",c:"health",k:"keto macro ketogenic diet",d:"Calculate keto macros for a ketogenic diet."},
  {n:"Sleep Cycle",p:"/calculators/health/sleep-cycle-calculator",c:"health",k:"sleep cycle rem wake time",d:"Find the best time to wake up based on sleep cycles."},
  {n:"Heart Rate",p:"/calculators/health/heart-rate-calculator",c:"health",k:"heart rate zone target bpm cardio",d:"Calculate your max heart rate and cardio training zones."},
  {n:"Pregnancy Calculator",p:"/calculators/health/pregnancy-calculator",c:"health",k:"pregnancy due date weeks trimester",d:"Calculate your due date and week-by-week pregnancy timeline."},
  {n:"Ovulation Calculator",p:"/calculators/health/ovulation-calculator",c:"health",k:"ovulation fertile days cycle",d:"Find your most fertile days based on your cycle."},
  {n:"Age Calculator",p:"/calculators/health/age-calculator",c:"health",k:"age birthday years old date of birth",d:"Calculate your exact age in years, months and days."},
  {n:"Blood Pressure",p:"/calculators/health/blood-pressure-calculator",c:"health",k:"blood pressure bp systolic diastolic",d:"Check if your blood pressure is in a healthy range."},
  {n:"Cholesterol",p:"/calculators/health/cholesterol-calculator",c:"health",k:"cholesterol hdl ldl triglycerides",d:"Understand your cholesterol levels and cardiovascular risk."},
  {n:"Diabetes Risk",p:"/calculators/health/diabetes-risk-calculator",c:"health",k:"diabetes risk blood sugar",d:"Assess your risk of developing type 2 diabetes."},
  {n:"Heart Attack Risk",p:"/calculators/health/heart-attack-risk-calculator",c:"health",k:"heart attack risk cardiac",d:"Estimate your 10-year risk of a cardiovascular event."},
  {n:"VO2 Max",p:"/calculators/health/vo2-max-calculator",c:"health",k:"vo2 max aerobic fitness oxygen",d:"Estimate your VO2 max aerobic capacity and fitness level."},
  {n:"Longevity Calculator",p:"/calculators/health/longevity-calculator",c:"health",k:"longevity life expectancy live",d:"Estimate your life expectancy based on lifestyle factors."},
  {n:"Intermittent Fasting",p:"/calculators/health/intermittent-fasting-calculator",c:"health",k:"intermittent fasting 16 8 window",d:"Get your 16:8 eating window and fasting schedule."},
  {n:"BAC Calculator",p:"/calculators/health/bac-calculator",c:"health",k:"bac blood alcohol content drunk",d:"Estimate blood alcohol content based on drinks and weight."},
  {n:"Creatine Dosage",p:"/calculators/health/creatine-dosage-calculator",c:"health",k:"creatine dosage supplement loading",d:"Find your optimal creatine loading and maintenance dose."},
  {n:"Caffeine Half-Life",p:"/calculators/health/caffeine-half-life-calculator",c:"health",k:"caffeine half life coffee sleep",d:"See when caffeine clears your system to improve sleep."},
  {n:"Running Pace",p:"/calculators/health/running-pace-calculator",c:"health",k:"running pace mile km speed",d:"Calculate running pace, finish time or distance."},
  {n:"One Rep Max",p:"/calculators/health/one-rep-max-calculator",c:"health",k:"one rep max 1rm strength lift",d:"Calculate your one-rep max for any lift."},
  {n:"Lean Body Mass",p:"/calculators/health/lean-body-mass-calculator",c:"health",k:"lean body mass muscle fat free",d:"Calculate lean body mass and fat-free mass."},
  {n:"Body Recomposition",p:"/calculators/health/body-recomposition-calculator",c:"health",k:"body recomposition lose fat gain muscle",d:"Calculate calories for simultaneous fat loss and muscle gain."},
  {n:"Stress Level",p:"/calculators/health/stress-level-calculator",c:"health",k:"stress level mental health anxiety",d:"Assess your current stress level with a guided quiz."},
  // DEV
  {n:"JSON Formatter",p:"/calculators/dev/json-formatter",c:"dev",k:"json format beautify validate",d:"Format, beautify and validate JSON instantly."},
  {n:"Password Generator",p:"/calculators/dev/password-generator",c:"dev",k:"password generate secure random",d:"Generate strong, secure passwords with custom rules."},
  {n:"Color Converter",p:"/calculators/dev/color-converter",c:"dev",k:"color hex rgb hsl convert",d:"Convert between HEX, RGB, HSL and other color formats."},
  {n:"Regex Tester",p:"/calculators/dev/regex-tester",c:"dev",k:"regex regular expression test",d:"Test and debug regular expressions in real time."},
  {n:"Base64 Encoder",p:"/calculators/dev/base64-encoder",c:"dev",k:"base64 encode decode string",d:"Encode or decode any string to/from Base64."},
  {n:"UUID Generator",p:"/calculators/dev/uuid-generator",c:"dev",k:"uuid guid unique id generate",d:"Generate v4 UUIDs instantly."},
  {n:"Word Counter",p:"/calculators/dev/word-counter",c:"dev",k:"word count character text length",d:"Count words, characters and reading time for any text."},
  {n:"JWT Decoder",p:"/calculators/dev/jwt-decoder",c:"dev",k:"jwt json web token decode",d:"Decode and inspect JWT tokens without a server."},
  {n:"Hash Generator",p:"/calculators/dev/hash-generator",c:"dev",k:"hash md5 sha256 checksum",d:"Generate MD5, SHA-1 and SHA-256 hashes."},
  {n:"CSS Gradient",p:"/calculators/dev/css-gradient-generator",c:"dev",k:"css gradient background color",d:"Create beautiful CSS gradients visually."},
  {n:"Markdown Preview",p:"/calculators/dev/markdown-preview",c:"dev",k:"markdown preview render html",d:"Preview Markdown as rendered HTML in real time."},
  {n:"Diff Checker",p:"/calculators/dev/diff-checker",c:"dev",k:"diff compare text difference",d:"Compare two text blocks and highlight differences."},
  {n:"Cron Expression",p:"/calculators/dev/cron-expression",c:"dev",k:"cron expression schedule job",d:"Build and explain cron job expressions."},
  {n:"Lorem Ipsum",p:"/calculators/dev/lorem-ipsum-generator",c:"dev",k:"lorem ipsum placeholder dummy text",d:"Generate lorem ipsum placeholder text of any length."},
  // ZIP — FIXED: correct /zip/ prefix
  {n:"ZIP Code Lookup",p:"/zip/zip-code-lookup",c:"zip",k:"zip code lookup city state county",d:"Look up city, state and county for any US ZIP code."},
  {n:"ZIP Distance",p:"/zip/zip-code-distance",c:"zip",k:"zip distance miles between codes",d:"Calculate distance in miles between two ZIP codes."},
  {n:"City to ZIP",p:"/zip/city-to-zip",c:"zip",k:"city to zip code find postal",d:"Find all ZIP codes for any US city."},
  {n:"ZIPs in Radius",p:"/zip/zips-within-radius",c:"zip",k:"zip radius nearby codes miles",d:"Find all ZIP codes within a given radius."},
  {n:"ZIP to Timezone",p:"/zip/zip-to-timezone",c:"zip",k:"zip timezone time zone utc",d:"Find the timezone for any US ZIP code."},
  {n:"ZIP to County",p:"/zip/zip-to-county",c:"zip",k:"zip county region fips",d:"Find which county a ZIP code belongs to."},
  {n:"ZIP Validator",p:"/zip/zip-code-validator",c:"zip",k:"zip valid check verify exists",d:"Check if a US ZIP code is valid and get its details."},
  {n:"ZIP Population",p:"/zip/zip-code-population",c:"zip",k:"zip population people count area",d:"Find population data for any US ZIP code."},
  // COMMODITIES — FIXED: correct /commodities/ prefix
  {n:"Gold Price",p:"/commodities/gold-price-calculator",c:"commodities",k:"gold price gram ounce karat value",d:"Calculate the value of gold by weight and karat."},
  {n:"Silver Price",p:"/commodities/silver-price-calculator",c:"commodities",k:"silver price gram ounce troy",d:"Calculate the value of silver by weight."},
  {n:"Gold Loan",p:"/commodities/gold-loan-calculator",c:"commodities",k:"gold loan against collateral",d:"Calculate how much loan you can get against your gold."},
  {n:"Precious Metals Profit",p:"/commodities/precious-metals-profit-calculator",c:"commodities",k:"precious metals profit gold silver",d:"Calculate profit or loss on precious metal trades."},
  {n:"Crude Oil",p:"/commodities/crude-oil-calculator",c:"commodities",k:"crude oil wti price barrel",d:"Calculate crude oil value by barrels or litres."},
  // FUN
  {n:"Age in Days",p:"/calculators/fun/age-in-days",c:"fun",k:"age days old how many days",d:"Find out exactly how many days old you are."},
  {n:"Birthday Countdown",p:"/calculators/fun/birthday-countdown",c:"fun",k:"birthday countdown days until",d:"Count down the exact days until your next birthday."},
  {n:"Pizza Calculator",p:"/calculators/fun/pizza-calculator",c:"fun",k:"pizza slices people party",d:"Figure out how many pizzas to order for your group."},
  {n:"Love Compatibility",p:"/calculators/fun/love-compatibility",c:"fun",k:"love compatibility name match couple",d:"Find your love compatibility score by name."},
  {n:"Lucky Number",p:"/calculators/fun/lucky-number",c:"fun",k:"lucky number numerology",d:"Find your lucky number using numerology."},
  {n:"Zodiac Calculator",p:"/calculators/fun/zodiac-calculator",c:"fun",k:"zodiac sign astrology horoscope",d:"Find your zodiac sign from your date of birth."},
  {n:"Superhero Name",p:"/calculators/fun/superhero-name",c:"fun",k:"superhero name generator alter ego",d:"Generate your superhero name and alter ego."},
  {n:"Fortune Cookie",p:"/calculators/fun/fortune-cookie",c:"fun",k:"fortune cookie wisdom quote random",d:"Get a random fortune cookie wisdom message."},
  {n:"Trivia Quiz",p:"/calculators/fun/trivia-quiz",c:"fun",k:"trivia quiz questions game",d:"Test your general knowledge with fun trivia questions."},
  {n:"How Rich Am I",p:"/calculators/fun/how-rich-am-i",c:"fun",k:"how rich wealth global comparison",d:"See how your wealth compares to the rest of the world."},
  {n:"Sleep Debt",p:"/calculators/fun/sleep-debt-calculator",c:"fun",k:"sleep debt owe tired",d:"Calculate how much sleep debt you have built up."},
  {n:"Social Media Addiction",p:"/calculators/fun/social-media-addiction",c:"fun",k:"social media addiction score",d:"Find your social media addiction score with a quick quiz."},
]

function searchTools(q: string, limit = 5) {
  const words = q.toLowerCase().split(/\s+/).filter(w => w.length > 1)
  return TOOLS.map(t => {
    let s = 0; const tl = t.n.toLowerCase(), kl = t.k
    for (const w of words) {
      if (tl === w) s += 12; else if (tl.startsWith(w)) s += 8; else if (tl.includes(w)) s += 6
      if (kl.includes(w)) s += 3; if (t.c === w) s += 2
    }
    return { t, s }
  }).filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, limit).map(x => x.t)
}

// ─── Related tab: same-category tools + back navigation ──────────────────────
function getRelated(pathname: string) {
  const cat = Object.keys(CAT).find(c => {
    if (c === 'zip') return pathname.startsWith('/zip')
    if (c === 'commodities') return pathname.startsWith('/commodities')
    return pathname.includes(`/${c}`)
  }) || null
  if (!cat) return { cat: null, tools: [] }
  const cur = pathname.replace(/\/$/, '')
  return { cat, tools: TOOLS.filter(t => t.c === cat && t.p !== cur).slice(0, 8) }
}

function getPersonalized() {
  if (typeof window === 'undefined') return TOOLS.slice(0, 6)
  try {
    const h = JSON.parse(localStorage.getItem('trio_history') || '[]') as string[]
    if (!h.length) return TOOLS.slice(0, 6)
    const cc: Record<string, number> = {}
    for (const c of h) cc[c] = (cc[c] || 0) + 1
    const top = Object.entries(cc).sort((a, b) => b[1] - a[1])[0]?.[0]
    return top ? TOOLS.filter(t => t.c === top).slice(0, 6) : TOOLS.slice(0, 6)
  } catch { return TOOLS.slice(0, 6) }
}

function trackVisit(pathname: string) {
  if (typeof window === 'undefined') return
  try {
    const cat = Object.keys(CAT).find(c => {
      if (c === 'zip') return pathname.startsWith('/zip')
      if (c === 'commodities') return pathname.startsWith('/commodities')
      return pathname.includes(`/${c}`)
    })
    if (!cat) return
    const h = JSON.parse(localStorage.getItem('trio_history') || '[]') as string[]
    localStorage.setItem('trio_history', JSON.stringify([cat, ...h].slice(0, 50)))
  } catch {}
}

function parseMsg(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const rx = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0, m, k = 0
  while ((m = rx.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(<Link key={k++} href={m[2]} style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '2px' }}>{m[1]}</Link>)
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function speakText(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const clean = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_#`→•|]/g, '').replace(/\n+/g, '. ').replace(/\s+/g, ' ').trim().slice(0, 600)
  const utter = new SpeechSynthesisUtterance(clean)
  utter.rate = 1.12; utter.pitch = 1.08; utter.volume = 1.0
  const pickVoice = () => {
    const voices = window.speechSynthesis.getVoices()
    if (!voices.length) return null
    const PRIORITY = ['Microsoft Aria Online (Natural)', 'Microsoft Jenny Online (Natural)', 'Microsoft Ana Online (Natural)', 'Microsoft Zira Desktop', 'Google US English', 'Samantha', 'en-US-AriaNeural']
    for (const name of PRIORITY) { const v = voices.find(v => v.name.includes(name) && v.lang.startsWith('en')); if (v) return v }
    return voices.find(v => v.lang.startsWith('en-US')) || voices.find(v => v.lang.startsWith('en')) || null
  }
  const trySpeak = () => { const voice = pickVoice(); if (voice) utter.voice = voice; window.speechSynthesis.speak(utter) }
  const voices = window.speechSynthesis.getVoices()
  if (voices.length > 0) trySpeak()
  else { window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.onvoiceschanged = null; trySpeak() } }
}

function useSpeechRecognition(onResult: (text: string) => void, onError?: (msg: string) => void) {
  const recRef = useRef<SpeechRecognitionLike | null>(null)
  const [listening, setListening] = useState(false)
  const onResultRef = useRef(onResult)
  const onErrorRef = useRef(onError)
  useEffect(() => { onResultRef.current = onResult }, [onResult])
  useEffect(() => { onErrorRef.current = onError }, [onError])

  const start = useCallback(() => {
    if (typeof window === 'undefined') return
    // Check for API support
    const SR = (window as unknown as { SpeechRecognition?: SpeechRecognitionConstructorLike; webkitSpeechRecognition?: SpeechRecognitionConstructorLike }).SpeechRecognition
      || (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructorLike }).webkitSpeechRecognition
    if (!SR) {
      onErrorRef.current?.('Voice not supported — use Chrome or Edge')
      return
    }
    // Stop any existing session
    recRef.current?.stop()
    const rec = new SR()
    rec.lang = 'en-US'
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.continuous = false
    rec.onstart = () => setListening(true)
    rec.onresult = (e) => {
      const transcript = e.results[0]?.[0]?.transcript || ''
      if (transcript) onResultRef.current(transcript)
      setListening(false)
    }
    rec.onerror = (e) => {
      setListening(false)
      if (e.error === 'not-allowed' || e.error === 'permission-denied') {
        onErrorRef.current?.('Mic blocked — allow microphone in browser settings')
      } else if (e.error === 'no-speech') {
        onErrorRef.current?.('No speech detected — try again')
      } else if (e.error === 'network') {
        onErrorRef.current?.('Network error — check your connection')
      } else {
        onErrorRef.current?.(`Voice error: ${e.error}`)
      }
    }
    rec.onend = () => setListening(false)
    recRef.current = rec
    try {
      rec.start()
    } catch {
      setListening(false)
      onErrorRef.current?.('Could not start microphone')
    }
  }, [])

  const stop = useCallback(() => {
    recRef.current?.stop()
    setListening(false)
  }, [])

  return { listening, start, stop }
}

function detectCalcWidget(msg: string): string | null {
  const m = msg.toLowerCase()
  if (/(age|how old|date of birth|dob|birthday)/.test(m)) return 'age'
  if (/(bmi|body mass|weight.*height|height.*weight)/.test(m)) return 'bmi'
  if (/(emi|loan.*monthly|monthly.*loan|equated monthly)/.test(m)) return 'emi'
  if (/(tip|restaurant bill|split bill)/.test(m)) return 'tip'
  if (/(gst|goods.*service.*tax|include.*tax|exclude.*tax)/.test(m)) return 'gst'
  if (/(sip|systematic invest|monthly invest)/.test(m)) return 'sip'
  if (/(compound interest|compounding)/.test(m)) return 'compound'
  if (/(simple interest|si formula)/.test(m)) return 'simple'
  if (/(percentage|percent of|what.*%|%.*of)/.test(m)) return 'percentage'
  if (/(bac|blood alcohol|how drunk|alcohol.*drink)/.test(m)) return 'bac'
  if (/(bmr|basal metabolic|resting calorie)/.test(m)) return 'bmr'
  return null
}

// ─── Mini Calc Widget (unchanged from v28) ────────────────────────────────────
interface MiniCalcProps { type: string; onClose: () => void }
function MiniCalc({ type, onClose }: MiniCalcProps) {
  const [vals, setVals] = useState<Record<string, string>>({})
  const [result, setResult] = useState<string | null>(null)
  const set = (k: string, v: string) => setVals(prev => ({ ...prev, [k]: v }))
  const n = (k: string, fallback = 0) => parseFloat(vals[k] || '') || fallback
  const BOT = '#2563eb'
  const inputStyle: React.CSSProperties = { width: '100%', padding: '6px 9px', borderRadius: '8px', fontSize: '12px', border: '1.5px solid #e2e8f0', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }
  const labelStyle: React.CSSProperties = { fontSize: '11px', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '3px' }
  const btnStyle: React.CSSProperties = { width: '100%', padding: '7px', borderRadius: '8px', border: 'none', background: BOT, color: 'white', fontWeight: 700, fontSize: '12px', cursor: 'pointer', marginTop: '8px' }
  const resultBox: React.CSSProperties = { marginTop: '10px', padding: '10px 12px', background: '#eff6ff', borderRadius: '10px', border: '1.5px solid #bfdbfe', fontSize: '13px', fontWeight: 700, color: '#1d4ed8', textAlign: 'center' }
  const configs: Record<string, { title: string; icon: string; fields: React.ReactNode; calc: () => void; link: string }> = {
    age: { title: 'Age Calculator', icon: '🎂', link: '/calculators/health/age-calculator', fields: (<><label style={labelStyle}>Date of Birth</label><input type="date" style={inputStyle} value={vals.dob || ''} onChange={e => set('dob', e.target.value)} max={new Date().toISOString().split('T')[0]} /></>), calc: () => { if (!vals.dob) return setResult('Please enter your date of birth.'); const birth = new Date(vals.dob), today = new Date(); if (birth > today) return setResult('Cannot be in the future.'); let y = today.getFullYear() - birth.getFullYear(), mo = today.getMonth() - birth.getMonth(), d = today.getDate() - birth.getDate(); if (d < 0) { mo--; d += new Date(today.getFullYear(), today.getMonth(), 0).getDate() } if (mo < 0) { y--; mo += 12 } const days = Math.floor((today.getTime() - birth.getTime()) / 86400000); setResult(`🎂 ${y} years, ${mo} months & ${d} days\n📅 ${days.toLocaleString()} days lived`) } },
    bmi: { title: 'BMI Calculator', icon: '⚖️', link: '/calculators/health/bmi-calculator', fields: (<><label style={labelStyle}>Weight (kg)</label><input type="number" placeholder="e.g. 70" style={inputStyle} value={vals.w || ''} onChange={e => set('w', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Height (cm)</label><input type="number" placeholder="e.g. 175" style={inputStyle} value={vals.h || ''} onChange={e => set('h', e.target.value)} /></>), calc: () => { const w = n('w'), h = n('h') / 100; if (!w || !h) return setResult('Please enter weight and height.'); const bmi = w / (h * h); setResult(`BMI: ${bmi.toFixed(1)} — ${bmi < 18.5 ? 'Underweight 🟡' : bmi < 25 ? 'Normal ✅' : bmi < 30 ? 'Overweight 🟠' : 'Obese 🔴'}`) } },
    emi: { title: 'EMI Calculator', icon: '🏦', link: '/calculators/finance/emi-calculator', fields: (<><label style={labelStyle}>Loan Amount</label><input type="number" placeholder="e.g. 500000" style={inputStyle} value={vals.p || ''} onChange={e => set('p', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Annual Interest Rate (%)</label><input type="number" placeholder="e.g. 10" style={inputStyle} value={vals.r || ''} onChange={e => set('r', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Tenure (months)</label><input type="number" placeholder="e.g. 60" style={inputStyle} value={vals.t || ''} onChange={e => set('t', e.target.value)} /></>), calc: () => { const p = n('p'), r = n('r') / (12 * 100), t = n('t'); if (!p || !r || !t) return setResult('Please fill all fields.'); const emi = p * r * Math.pow(1 + r, t) / (Math.pow(1 + r, t) - 1), total = emi * t; setResult(`Monthly EMI: ₹${Math.round(emi).toLocaleString()}\nTotal: ₹${Math.round(total).toLocaleString()}\nInterest: ₹${Math.round(total - p).toLocaleString()}`) } },
    tip: { title: 'Tip Calculator', icon: '🍽️', link: '/calculators/finance/tip-calculator', fields: (<><label style={labelStyle}>Bill Amount</label><input type="number" placeholder="e.g. 1200" style={inputStyle} value={vals.bill || ''} onChange={e => set('bill', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Tip %</label><input type="number" placeholder="e.g. 15" style={inputStyle} value={vals.tip || ''} onChange={e => set('tip', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>People</label><input type="number" placeholder="e.g. 4" style={inputStyle} value={vals.split || ''} onChange={e => set('split', e.target.value)} /></>), calc: () => { const bill = n('bill'), tip = n('tip', 15), split = n('split', 1) || 1; if (!bill) return setResult('Please enter bill amount.'); const tipAmt = bill * tip / 100, total = bill + tipAmt; setResult(`Tip: ₹${tipAmt.toFixed(2)}\nTotal: ₹${total.toFixed(2)}\nPer Person: ₹${(total / split).toFixed(2)}`) } },
    gst: { title: 'GST Calculator', icon: '🧾', link: '/calculators/finance/gst-calculator', fields: (<><label style={labelStyle}>Amount (₹)</label><input type="number" placeholder="e.g. 10000" style={inputStyle} value={vals.amt || ''} onChange={e => set('amt', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>GST Rate</label><select style={{ ...inputStyle, background: 'white' }} value={vals.gst || '18'} onChange={e => set('gst', e.target.value)}>{['0', '5', '12', '18', '28'].map(g => <option key={g} value={g}>{g}%</option>)}</select><label style={{ ...labelStyle, marginTop: '6px' }}>Type</label><select style={{ ...inputStyle, background: 'white' }} value={vals.type || 'add'} onChange={e => set('type', e.target.value)}><option value="add">Add GST</option><option value="remove">Remove GST</option></select></>), calc: () => { const amt = n('amt'), rate = n('gst', 18); if (!amt) return setResult('Please enter an amount.'); if (vals.type === 'remove') { const base = amt / (1 + rate / 100); setResult(`Base: ₹${base.toFixed(2)}\nGST (${rate}%): ₹${(amt - base).toFixed(2)}\nTotal: ₹${amt.toFixed(2)}`) } else { const gstAmt = amt * rate / 100; setResult(`Base: ₹${amt.toFixed(2)}\nGST (${rate}%): ₹${gstAmt.toFixed(2)}\nFinal: ₹${(amt + gstAmt).toFixed(2)}`) } } },
    sip: { title: 'SIP Calculator', icon: '📈', link: '/calculators/finance/sip-calculator', fields: (<><label style={labelStyle}>Monthly Investment (₹)</label><input type="number" placeholder="e.g. 5000" style={inputStyle} value={vals.monthly || ''} onChange={e => set('monthly', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Annual Return (%)</label><input type="number" placeholder="e.g. 12" style={inputStyle} value={vals.rate || ''} onChange={e => set('rate', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Duration (years)</label><input type="number" placeholder="e.g. 10" style={inputStyle} value={vals.years || ''} onChange={e => set('years', e.target.value)} /></>), calc: () => { const p = n('monthly'), r = n('rate', 12) / (12 * 100), t = n('years') * 12; if (!p || !t) return setResult('Please fill all fields.'); const maturity = p * ((Math.pow(1 + r, t) - 1) / r) * (1 + r), invested = p * t; setResult(`Invested: ₹${Math.round(invested).toLocaleString()}\nMaturity: ₹${Math.round(maturity).toLocaleString()}\nGains: ₹${Math.round(maturity - invested).toLocaleString()}`) } },
    compound: { title: 'Compound Interest', icon: '💹', link: '/calculators/finance/compound-interest-calculator', fields: (<><label style={labelStyle}>Principal</label><input type="number" placeholder="e.g. 100000" style={inputStyle} value={vals.p || ''} onChange={e => set('p', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Annual Rate (%)</label><input type="number" placeholder="e.g. 8" style={inputStyle} value={vals.r || ''} onChange={e => set('r', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Time (years)</label><input type="number" placeholder="e.g. 5" style={inputStyle} value={vals.t || ''} onChange={e => set('t', e.target.value)} /></>), calc: () => { const p = n('p'), r = n('r') / 100, t = n('t'); if (!p || !r || !t) return setResult('Please fill all fields.'); const amount = p * Math.pow(1 + r, t); setResult(`Final: ₹${Math.round(amount).toLocaleString()}\nInterest: ₹${Math.round(amount - p).toLocaleString()}\nReturn: ${((amount - p) / p * 100).toFixed(1)}%`) } },
    simple: { title: 'Simple Interest', icon: '🧮', link: '/calculators/finance/simple-interest-calculator', fields: (<><label style={labelStyle}>Principal</label><input type="number" placeholder="e.g. 50000" style={inputStyle} value={vals.p || ''} onChange={e => set('p', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Rate per year (%)</label><input type="number" placeholder="e.g. 7" style={inputStyle} value={vals.r || ''} onChange={e => set('r', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Time (years)</label><input type="number" placeholder="e.g. 3" style={inputStyle} value={vals.t || ''} onChange={e => set('t', e.target.value)} /></>), calc: () => { const p = n('p'), r = n('r'), t = n('t'); if (!p || !r || !t) return setResult('Please fill all fields.'); const si = p * r * t / 100; setResult(`SI: ₹${si.toLocaleString()}\nTotal: ₹${(p + si).toLocaleString()}`) } },
    percentage: { title: 'Percentage Calc', icon: '%', link: '/calculators/finance/roi-calculator', fields: (<><label style={labelStyle}>Value</label><input type="number" placeholder="e.g. 200" style={inputStyle} value={vals.val || ''} onChange={e => set('val', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Percentage (%)</label><input type="number" placeholder="e.g. 15" style={inputStyle} value={vals.pct || ''} onChange={e => set('pct', e.target.value)} /></>), calc: () => { const v = n('val'), p = n('pct'); if (!v || !p) return setResult('Please fill both fields.'); const res = v * p / 100; setResult(`${p}% of ${v} = ${res.toFixed(2)}\n${v} + ${p}% = ${(v + res).toFixed(2)}\n${v} - ${p}% = ${(v - res).toFixed(2)}`) } },
    bac: { title: 'BAC Calculator', icon: '🍺', link: '/calculators/health/bac-calculator', fields: (<><label style={labelStyle}>Weight (kg)</label><input type="number" placeholder="e.g. 70" style={inputStyle} value={vals.w || ''} onChange={e => set('w', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Drinks consumed</label><input type="number" placeholder="e.g. 3" style={inputStyle} value={vals.drinks || ''} onChange={e => set('drinks', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Hours since first drink</label><input type="number" placeholder="e.g. 2" style={inputStyle} value={vals.hrs || ''} onChange={e => set('hrs', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Gender</label><select style={{ ...inputStyle, background: 'white' }} value={vals.gender || 'm'} onChange={e => set('gender', e.target.value)}><option value="m">Male</option><option value="f">Female</option></select></>), calc: () => { const w = n('w'), drinks = n('drinks'), hrs = n('hrs'), r = vals.gender === 'f' ? 0.55 : 0.68; if (!w || !drinks) return setResult('Please fill weight and drinks.'); const bac = Math.max(0, (drinks * 14) / (w * r * 10) - 0.015 * hrs); setResult(`BAC: ${bac.toFixed(3)}%\n${bac < 0.04 ? '✅ Sober' : bac < 0.08 ? '⚠️ Impaired — do not drive' : '🚫 Over legal limit'}`) } },
    bmr: { title: 'BMR Calculator', icon: '🔥', link: '/calculators/health/bmr-calculator', fields: (<><label style={labelStyle}>Weight (kg)</label><input type="number" placeholder="e.g. 75" style={inputStyle} value={vals.w || ''} onChange={e => set('w', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Height (cm)</label><input type="number" placeholder="e.g. 178" style={inputStyle} value={vals.h || ''} onChange={e => set('h', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Age</label><input type="number" placeholder="e.g. 30" style={inputStyle} value={vals.age || ''} onChange={e => set('age', e.target.value)} /><label style={{ ...labelStyle, marginTop: '6px' }}>Gender</label><select style={{ ...inputStyle, background: 'white' }} value={vals.gender || 'm'} onChange={e => set('gender', e.target.value)}><option value="m">Male</option><option value="f">Female</option></select></>), calc: () => { const w = n('w'), h = n('h'), age = n('age'); if (!w || !h || !age) return setResult('Please fill all fields.'); const bmr = vals.gender === 'f' ? 10 * w + 6.25 * h - 5 * age - 161 : 10 * w + 6.25 * h - 5 * age + 5; setResult(`BMR: ${Math.round(bmr)} cal/day\nSedentary TDEE: ${Math.round(bmr * 1.2)}\nModerate: ${Math.round(bmr * 1.55)}\nVery Active: ${Math.round(bmr * 1.725)}`) } },
  }
  const cfg = configs[type]
  if (!cfg) return null
  return (
    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '12px', marginTop: '6px', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b' }}>{cfg.icon} {cfg.title}</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '14px', padding: '0 2px' }}>✕</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>{cfg.fields}</div>
      <button style={btnStyle} onClick={() => { setResult(null); cfg.calc() }}>Calculate →</button>
      {result && <div style={resultBox}>{result.split('\n').map((line, i) => <div key={i}>{line}</div>)}</div>}
      <Link href={cfg.link} style={{ display: 'block', textAlign: 'center', fontSize: '11px', color: '#2563eb', marginTop: '8px', textDecoration: 'underline', fontWeight: 600 }}>Open full calculator →</Link>
    </div>
  )
}

// ─── Tool row: shows name + short description + category badge ────────────────
function ToolRow({ tool, onClick }: { tool: Tool; onClick: () => void; key?: React.Key }) {
  const meta = CAT[tool.c] || { emoji: '🔧', label: tool.c, color: '#64748b', href: '/' }
  return (
    <Link href={tool.p} onClick={onClick}
      style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '8px 10px', borderRadius: '10px', textDecoration: 'none', color: '#1e293b', marginBottom: '4px', background: '#f8fafc', border: '1px solid #f1f5f9', transition: 'background 0.12s' }}
      onMouseEnter={e => (e.currentTarget.style.background = `${meta.color}0f`)}
      onMouseLeave={e => (e.currentTarget.style.background = '#f8fafc')}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontSize: '14px', flexShrink: 0 }}>{meta.emoji}</span>
        <span style={{ flex: 1, fontSize: '12px', fontWeight: 700, lineHeight: 1.3 }}>{tool.n}</span>
        <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 5px', borderRadius: '4px', background: `${meta.color}18`, color: meta.color, flexShrink: 0, textTransform: 'uppercase' }}>{meta.label}</span>
      </div>
      <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: 1.4, paddingLeft: '20px' }}>{tool.d}</p>
    </Link>
  )
}

// ─── Related tab with back button and finance sub-drill ───────────────────────
type RelatedView = 'home' | 'category' | 'sub'
function RelatedPanel({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const { cat, tools } = useMemo(() => getRelated(pathname), [pathname])
  const [view, setView] = useState<RelatedView>(cat ? 'category' : 'home')
  const [activeSub, setActiveSub] = useState<string | null>(null)

  const catMeta = cat ? CAT[cat] : null

  // Home view: all categories
  if (view === 'home') {
    return (
      <div style={{ padding: '12px', maxHeight: '360px', overflowY: 'auto' }}>
        <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 8px', fontWeight: 600 }}>Browse all categories:</p>
        {Object.entries(CAT).map(([catKey, meta]) => (
          <button key={catKey}
            onClick={() => { setView('category'); }}
            style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '8px', padding: '9px 10px', borderRadius: '10px', textDecoration: 'none', color: '#1e293b', background: '#f8fafc', marginBottom: '4px', fontSize: '13px', fontWeight: 600, border: '1px solid #f1f5f9', cursor: 'pointer', textAlign: 'left' }}>
            <span>{meta.emoji}</span>
            <span style={{ flex: 1 }}>{meta.label} Calculators</span>
            <Link href={meta.href} onClick={onClose} style={{ fontSize: '10px', color: meta.color, fontWeight: 700, textDecoration: 'none', padding: '2px 6px', background: `${meta.color}15`, borderRadius: '6px' }}>
              View all →
            </Link>
          </button>
        ))}
      </div>
    )
  }

  // Finance sub-category drill-down
  if (view === 'sub' && activeSub) {
    const subTools = TOOLS.filter(t => t.c === 'finance' && FINANCE_SUBS.find(s => s.label === activeSub)?.keywords.some(kw => t.k.includes(kw) || t.n.toLowerCase().includes(kw)))
    return (
      <div style={{ padding: '12px', maxHeight: '360px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <button onClick={() => setView('category')} style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ← Back
          </button>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{activeSub}</span>
        </div>
        {subTools.length === 0
          ? <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>No tools found</p>
          : subTools.map(t => <ToolRow key={t.p} tool={t} onClick={onClose} />)
        }
        <Link href="/calculators/finance" onClick={onClose} style={{ display: 'block', textAlign: 'center', fontSize: '11px', color: '#16a34a', marginTop: '8px', textDecoration: 'underline', fontWeight: 600 }}>
          View all finance calculators →
        </Link>
      </div>
    )
  }

  // Category view: related tools for current page's category
  return (
    <div style={{ padding: '12px', maxHeight: '360px', overflowY: 'auto' }}>
      {/* Back button (only shown if we navigated here from home) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <button onClick={() => setView('home')} style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
          ← All categories
        </button>
        {catMeta && (
          <Link href={catMeta.href} onClick={onClose} style={{ fontSize: '11px', color: catMeta.color, fontWeight: 700, textDecoration: 'none' }}>
            View all {catMeta.label} →
          </Link>
        )}
      </div>

      {/* Finance sub-categories */}
      {cat === 'finance' && (
        <>
          <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 6px', fontWeight: 600 }}>Browse by topic:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
            {FINANCE_SUBS.map(sub => (
              <button key={sub.label} onClick={() => { setActiveSub(sub.label); setView('sub') }}
                style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '8px', border: '1px solid #d1fae5', background: '#f0fdf4', color: '#16a34a', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                {sub.emoji} {sub.label}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 6px', fontWeight: 600 }}>Related tools on this page:</p>
        </>
      )}

      {tools.length > 0
        ? tools.map(t => <ToolRow key={t.p} tool={t} onClick={onClose} />)
        : <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '16px' }}>Browse a category above</p>
      }
    </div>
  )
}

// ─── Main TrioBot Component ───────────────────────────────────────────────────
export function TrioBot() {
  const [pathname, setPathname] = useState('')
  useEffect(() => { setPathname(window.location.pathname) }, [])

  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [tab, setTab] = useState<Tab>('chat')
  const [query, setQuery] = useState('')
  const [blink, setBlink] = useState(false)
  const [bounce, setBounce] = useState(false)
  const [personalized, setPersonalized] = useState<Tool[]>([])
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [speaking, setSpeaking] = useState(false)
  const [activeWidget, setActiveWidget] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! 👋 I'm TrioBot — your AI guide to 450+ free tools. Type anything or tap 🎤 to speak!" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [voiceError, setVoiceError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  // Ref so voice callback always has latest sendMessageDirect without stale closure
  const sendRef = useRef<(text: string) => Promise<void>>(async () => {})

  const handleVoiceResult = useCallback((text: string) => {
    setVoiceError(null)
    setInput(text)
    setTimeout(() => sendRef.current(text), 100)
  }, [])

  const handleVoiceError = useCallback((err: string) => {
    setVoiceError(err)
    setTimeout(() => setVoiceError(null), 4000)
  }, [])

  const { listening, start: startListening, stop: stopListening } = useSpeechRecognition(handleVoiceResult, handleVoiceError)

  useEffect(() => { trackVisit(pathname) }, [pathname])
  useEffect(() => { if (open) setPersonalized(getPersonalized()) }, [open])
  useEffect(() => { if (open && tab === 'chat') setTimeout(() => inputRef.current?.focus(), 100) }, [open, tab])
  useEffect(() => { if (open && tab === 'search') setTimeout(() => searchRef.current?.focus(), 100) }, [open, tab])
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  useEffect(() => {
    const t1 = setTimeout(() => {
      setVisible(true)
      const t2 = setTimeout(() => { setOpen(true); const t3 = setTimeout(() => setOpen(false), 7000); return () => clearTimeout(t3) }, 1200)
      return () => clearTimeout(t2)
    }, 2000)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    const i = setInterval(() => { setBlink(true); setTimeout(() => setBlink(false), 120) }, 3000 + Math.random() * 2000)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const load = () => window.speechSynthesis.getVoices()
    load(); window.speechSynthesis.onvoiceschanged = load
    return () => { window.speechSynthesis.onvoiceschanged = null }
  }, [])

  const speak = useCallback((text: string) => {
    if (!voiceEnabled) return
    setSpeaking(true); speakText(text)
    setTimeout(() => setSpeaking(false), Math.min(text.length * 60, 8000))
  }, [voiceEnabled])

  const stopSpeaking = useCallback(() => { window.speechSynthesis?.cancel(); setSpeaking(false) }, [])

  const sendMessageDirect = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    const userMsg: Message = { role: 'user', content: trimmed }
    const widgetType = detectCalcWidget(trimmed)
    setActiveWidget(null)
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const allMsgs = [...messages, userMsg]
      const res = await fetch('/api/triobot', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMsgs.map(m => ({ role: m.role, content: m.content })) })
      })
      const data = await res.json()
      const reply = data.reply || 'Sorry, something went wrong!'
      const finalWidget = data.widget || widgetType || null
      const assistantMsg: Message = { role: 'assistant', content: reply, widget: finalWidget ? { type: finalWidget, title: finalWidget } : undefined }
      setMessages(prev => [...prev, assistantMsg])
      if (finalWidget) setActiveWidget(finalWidget)
      speak(reply)
    } catch { setMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Please try again.' }]) }
    finally { setLoading(false) }
  }, [messages, loading, speak])

  // Keep ref in sync so voice callback always has latest version
  useEffect(() => { sendRef.current = sendMessageDirect }, [sendMessageDirect])

  const sendMessage = useCallback(async (overrideText?: string) => {
    await sendMessageDirect((overrideText || input).trim())
  }, [input, sendMessageDirect])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const handleToggle = useCallback(() => { setOpen(o => !o); setBounce(true); setTimeout(() => setBounce(false), 400); setQuery('') }, [])

  const BOT = '#2563eb'
  const searchResults = useMemo(() => searchTools(query), [query])

  if (!visible) return null

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      {/* ── TrioBot panel ── */}
      {open && (
        <div style={{
          width: 'min(345px, calc(100vw - 24px))',
          background: 'white', borderRadius: '20px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          border: '1.5px solid #e2e8f0', overflow: 'hidden',
          animation: 'trioPanelIn 0.25s cubic-bezier(.34,1.56,.64,1)',
          display: 'flex', flexDirection: 'column'
        }}>

          {/* Header */}
          <div style={{ background: `linear-gradient(135deg,${BOT},#1d4ed8)`, padding: '12px 14px 10px', color: 'white', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '18px' }}>🤖</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '13px', letterSpacing: '0.04em' }}>TrioBot AI</div>
                <div style={{ fontSize: '10px', opacity: 0.85 }}>Ask anything • Voice enabled 🎤</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px', alignItems: 'center' }}>
                <button onClick={() => { setVoiceEnabled(v => !v); if (speaking) stopSpeaking() }} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {voiceEnabled ? '🔊' : '🔇'}
                </button>
                {speaking && <button onClick={stopSpeaking} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'trioPulse 1s infinite' }}>⏹</button>}
                <button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {(['chat', 'search', 'related'] as Tab[]).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '5px 0', border: 'none', cursor: 'pointer', borderRadius: '8px', fontSize: '11px', fontWeight: tab === t ? 800 : 600, background: tab === t ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)', color: 'white', transition: 'all 0.15s' }}>
                  {t === 'chat' ? '💬 Ask AI' : t === 'search' ? '🔍 Search' : '🔗 Related'}
                </button>
              ))}
            </div>
          </div>

          {/* CHAT TAB */}
          {tab === 'chat' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '400px' }}>
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-start', gap: '6px' }}>
                    {msg.role === 'assistant' && <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '4px' }}>🤖</span>}
                    <div style={{ maxWidth: '86%' }}>
                      <div style={{ padding: '8px 12px', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: msg.role === 'user' ? BOT : '#f1f5f9', color: msg.role === 'user' ? 'white' : '#1e293b', fontSize: '12.5px', lineHeight: 1.5, wordBreak: 'break-word' }}>
                        {msg.role === 'assistant' ? parseMsg(msg.content) : msg.content}
                      </div>
                      {msg.role === 'assistant' && msg.widget && activeWidget === msg.widget.type && i === messages.length - 1 && (
                        <MiniCalc type={msg.widget.type} onClose={() => setActiveWidget(null)} />
                      )}
                    </div>
                    {msg.role === 'assistant' && (
                      <button onClick={() => speak(msg.content)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', opacity: 0.5, flexShrink: 0, marginTop: '4px', padding: '2px' }}>🔊</button>
                    )}
                  </div>
                ))}
                {loading && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '16px' }}>🤖</span>
                    <div style={{ padding: '8px 14px', background: '#f1f5f9', borderRadius: '16px 16px 16px 4px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                      {[0, 1, 2].map(n => <span key={n} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94a3b8', display: 'inline-block', animation: `trioDot 1.2s ${n * 0.2}s infinite ease-in-out` }} />)}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              {voiceError && (
                <div style={{ margin: '0 12px 6px', padding: '7px 10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '11px', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🎤</span> {voiceError}
                </div>
              )}
              {listening && (
                <div style={{ margin: '0 12px 4px', padding: '7px 10px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', fontSize: '11px', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ animation: 'trioPulse 0.8s infinite' }}>🔴</span> Listening... speak now
                </div>
              )}
              <div style={{ padding: '10px 12px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
                <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                  placeholder={listening ? 'Listening...' : 'Ask anything or tap 🎤'}
                  disabled={loading}
                  style={{ flex: 1, padding: '9px 12px', borderRadius: '12px', fontSize: '12.5px', border: `2px solid ${listening ? '#3b82f6' : '#e2e8f0'}`, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border 0.15s', background: listening ? '#eff6ff' : 'white' }}
                  onFocus={e => { if (!listening) e.target.style.borderColor = BOT }} onBlur={e => { if (!listening) e.target.style.borderColor = '#e2e8f0' }} />
                <button
                  onClick={listening ? stopListening : startListening}
                  title={listening ? 'Stop listening' : 'Tap to speak'}
                  style={{
                    width: '36px', height: '36px', borderRadius: '10px', border: listening ? '2px solid #ef4444' : 'none',
                    background: listening ? '#fff' : BOT,
                    color: listening ? '#ef4444' : 'white',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', flexShrink: 0,
                    boxShadow: listening ? '0 0 0 3px rgba(239,68,68,0.2)' : '0 2px 6px rgba(37,99,235,0.3)',
                    animation: listening ? 'trioPulse 0.8s infinite' : 'none',
                    transition: 'all 0.2s'
                  }}>
                  {listening ? '⏹' : '🎤'}
                </button>
                <button onClick={() => sendMessage()} disabled={loading || !input.trim()}
                  style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: loading || !input.trim() ? '#e2e8f0' : BOT, color: loading || !input.trim() ? '#94a3b8' : 'white', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, transition: 'all 0.15s' }}>
                  {loading ? '⏳' : '➤'}
                </button>
              </div>
              <div style={{ padding: '0 10px 8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {['401k calculator', 'Calculate my BMI', 'SIP returns?', 'Calculate EMI'].map(q => (
                  <button key={q} onClick={() => sendMessage(q)}
                    style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '10px', border: `1px solid ${BOT}22`, background: `${BOT}0a`, color: BOT, cursor: 'pointer', fontWeight: 600 }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SEARCH TAB — shows name + description + link */}
          {tab === 'search' && (
            <div style={{ padding: '12px', maxHeight: '400px', overflowY: 'auto' }}>
              <input ref={searchRef} value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search calculators... e.g. 401k, bmi, mortgage"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', fontSize: '13px', border: '2px solid #e2e8f0', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                onFocus={e => e.target.style.borderColor = BOT} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              <div style={{ marginTop: '8px' }}>
                {query && searchResults.length === 0 && <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '16px' }}>No results for "{query}" 🤔</p>}
                {(query ? searchResults : personalized).map(t => <ToolRow key={t.p} tool={t} onClick={() => setOpen(false)} />)}
                {!query && <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '8px' }}>✨ Based on your recent tools</p>}
              </div>
            </div>
          )}

          {/* RELATED TAB — with back + finance sub-nav */}
          {tab === 'related' && <RelatedPanel pathname={pathname} onClose={() => setOpen(false)} />}
        </div>
      )}

      {/* Robot button */}
      <button onClick={handleToggle} aria-label="TrioBot AI" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, outline: 'none', transform: bounce ? 'scale(1.15) translateY(-4px)' : 'scale(1)', transition: 'transform 0.3s cubic-bezier(.34,1.56,.64,1)', filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.2))' }}>
        <svg width="58" height="70" viewBox="0 0 60 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="2" x2="30" y2="10" stroke={BOT} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="30" cy="2" r="3" fill={BOT} />
          <rect x="10" y="10" width="40" height="30" rx="10" fill={BOT} />
          <rect x="13" y="13" width="34" height="20" rx="6" fill="#0f172a" />
          <circle cx="21" cy="23" r={blink ? 1 : 4} fill="#38bdf8" style={{ transition: 'r 0.08s' }} />
          <circle cx="39" cy="23" r={blink ? 1 : 4} fill="#38bdf8" style={{ transition: 'r 0.08s' }} />
          {!blink && <><circle cx="23" cy="21" r="1.2" fill="white" opacity="0.8" /><circle cx="41" cy="21" r="1.2" fill="white" opacity="0.8" /></>}
          <rect x="18" y="29" width="24" height="3" rx="1.5" fill="#0f172a" />
          <rect x="22" y="29" width="4" height="3" rx="1" fill="#38bdf8" opacity="0.7" />
          <rect x="30" y="29" width="4" height="3" rx="1" fill="#38bdf8" opacity="0.7" />
          <rect x="26" y="40" width="8" height="4" rx="2" fill={BOT} opacity="0.7" />
          <rect x="8" y="44" width="44" height="26" rx="10" fill={BOT} />
          <rect x="15" y="50" width="30" height="14" rx="5" fill="#0f172a" opacity="0.3" />
          <circle cx="22" cy="57" r="3" fill="#4ade80" />
          <circle cx="30" cy="57" r="3" fill="#38bdf8" />
          <circle cx="38" cy="57" r="3" fill="#f87171" />
          <rect x="0" y="46" width="9" height="18" rx="4.5" fill={BOT} />
          <circle cx="4.5" cy="65" r="4" fill={BOT} opacity="0.8" />
          <rect x="51" y="46" width="9" height="18" rx="4.5" fill={BOT} />
          <circle cx="55.5" cy="65" r="4" fill={BOT} opacity="0.8" />
          <rect x="12" y="68" width="14" height="4" rx="2" fill={BOT} opacity="0.8" />
          <rect x="34" y="68" width="14" height="4" rx="2" fill={BOT} opacity="0.8" />
        </svg>
      </button>
      <div style={{ textAlign: 'center', fontSize: '10px', fontWeight: 800, color: BOT, letterSpacing: '0.08em', marginTop: '-4px', textTransform: 'uppercase' }}>TrioBot</div>

      <style>{`
        @keyframes trioPanelIn { from{opacity:0;transform:scale(0.85) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes trioDot { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
        @keyframes trioPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>
    </div>
  )
}
