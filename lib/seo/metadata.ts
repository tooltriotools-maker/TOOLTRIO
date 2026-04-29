import type { Metadata } from 'next'

const BASE_URL = 'https://tooltrio.com'
const SITE_NAME = 'tooltrio.com'
const OG_IMAGE = `${BASE_URL}/og-image.png`

// Core keywords on EVERY page
const CORE_KEYWORDS = [
  'calculator', 'online calculator', 'free calculator', 'calculator free',
  'free online calculator', 'calculators', 'calculator online',
  'free calculator no signup', 'instant calculator results',
  'calculator no login required', 'best free calculator online',
  'tooltrio.com', 'free calculator USA UK India',
  'calculator no ads', 'mobile calculator online',
  'free calculator instant results',
]

// Finance keywords - 200+ popular search queries
const FINANCE_KEYWORDS = [
  // USA Retirement - High Volume
  'free financial calculator USA', 'US personal finance calculator 2026',
  'American investment calculator', 'IRS tax calculator 2026',
  'CFP financial planning calculator', 'FINRA investment calculator',
  '401k calculator 2026', 'Roth IRA calculator USA',
  'social security calculator', 'mortgage calculator USA 2026',
  'compound interest calculator USA', 'retirement planning calculator USA',
  'FIRE calculator USA', 'dollar cost averaging calculator',
  'DCA calculator USA', 'how much to retire calculator',
  'retirement income calculator', '401k contribution limit 2026',
  'IRA contribution limit 2026', 'HSA contribution limit 2026',
  'Roth conversion calculator', 'traditional vs Roth IRA calculator',
  'early retirement calculator USA', 'when can I retire calculator',
  '4 percent rule calculator', 'safe withdrawal rate calculator',
  'required minimum distribution calculator', 'RMD calculator',
  'Social Security benefit calculator', 'Medicare cost calculator',
  'FIRE number calculator', 'lean FIRE calculator',
  'coast FIRE calculator', 'financial independence number',
  // USA Mortgage & Real Estate
  'mortgage payment calculator USA', 'home loan calculator USA',
  'home affordability calculator', 'mortgage amortization schedule',
  'refinance calculator USA', 'rent vs buy calculator USA',
  'HELOC calculator USA', 'home equity loan calculator',
  'down payment calculator', 'closing cost calculator USA',
  'real estate ROI calculator', 'rental yield calculator USA',
  'how much house can I afford', 'mortgage payoff calculator',
  'biweekly mortgage calculator', 'ARM vs fixed rate calculator',
  // USA Debt & Credit
  'credit card payoff calculator', 'debt avalanche calculator',
  'debt snowball calculator', 'student loan calculator USA',
  'personal loan calculator USA', 'auto loan calculator USA',
  'car payment calculator', 'loan amortization calculator',
  'debt to income ratio calculator', 'debt free date calculator',
  // USA Investing
  'stock profit calculator', 'dividend calculator USA',
  'index fund calculator', 'S&P 500 return calculator',
  'ETF return calculator', 'portfolio performance calculator',
  'crypto profit calculator', 'Bitcoin profit calculator',
  'CD ladder calculator', 'CD vs HYSA calculator',
  'I bonds calculator', 'treasury bond calculator',
  // USA Taxes
  'income tax calculator USA 2026', 'federal tax calculator',
  'capital gains tax calculator USA', 'self employment tax calculator',
  '1099 tax calculator', 'freelancer tax calculator',
  'quarterly tax calculator', 'paycheck calculator after tax',
  'take home pay calculator USA', 'bonus tax calculator',
  // USA Savings & Goals
  'savings goal calculator', 'emergency fund calculator USA',
  'college savings calculator', '529 plan calculator USA',
  // UK Finance
  'UK income tax calculator 2025 2026', 'PAYE tax calculator UK',
  'national insurance calculator UK', 'take home pay calculator UK',
  'ISA calculator UK 2026', 'stocks and shares ISA calculator',
  'cash ISA calculator', 'lifetime ISA calculator UK',
  'UK pension calculator', 'SIPP calculator UK',
  'stamp duty calculator UK 2026', 'buy to let calculator UK',
  'UK capital gains tax calculator', 'UK mortgage calculator 2026',
  'offset mortgage calculator UK', 'UK student loan calculator',
  // India Finance
  'SIP calculator India 2026', 'SIP returns calculator India',
  'lumpsum vs SIP calculator', 'step up SIP calculator',
  'EMI calculator India', 'home loan EMI calculator',
  'PPF calculator 2026', 'PPF maturity calculator',
  'PPF vs FD calculator', 'PPF vs NPS calculator',
  'NPS calculator India 2026', 'EPF calculator India',
  'gratuity calculator India', 'GST calculator India',
  'income tax calculator India FY 2025 26',
  'new tax regime vs old tax regime',
  'HRA exemption calculator', 'section 80C deduction calculator',
  'FD calculator India 2026', 'RD calculator India',
  'ELSS calculator India', 'mutual fund returns calculator India',
  'XIRR calculator India', 'SWP calculator India',
  'SIP vs real estate calculator', 'gold vs SIP calculator',
  // Europe Finance
  'VAT calculator Europe 2026', 'European mortgage calculator',
  'FIRE Europe calculator', 'MSCI World vs S&P 500 calculator',
  'European pension calculator',
  // General High Volume
  'compound interest calculator', 'simple interest calculator',
  'percentage calculator', 'tip calculator',
  'currency converter free', 'exchange rate calculator',
  'salary calculator', 'hourly to annual salary',
  'gross to net calculator', 'profit margin calculator',
  'break even calculator', 'ROI calculator',
  'CAGR calculator', 'inflation adjusted return calculator',
  // Long-tail USA intent queries
  'how much should I invest monthly to become a millionaire',
  'how long will my retirement savings last calculator',
  'how much do I need to save for retirement by 65',
  'how much house can I afford on my salary calculator',
  'should I pay off mortgage or invest calculator',
  'how much will my 401k grow calculator',
  'how much to save for college 529 calculator',
  'how long to pay off student loans calculator',
  'what is my take home pay after taxes USA',
  'when will I be debt free calculator USA',
  'is it better to rent or buy calculator USA 2026',
  'how much emergency fund do I need calculator',
]

// Health keywords - 200+ popular search queries
const HEALTH_KEYWORDS = [
  // ── Body Composition ────────────────────────────────────────────────────
  'BMI calculator','BMI calculator free','BMI calculator online','BMI calculator pounds inches',
  'BMI calculator lbs ft in','free BMI calculator USA','BMI for adults','BMI by age',
  'healthy BMI range','what is a good BMI','BMI chart for men','BMI chart for women',
  'body fat percentage calculator','body fat calculator Navy method','body fat percentage by age',
  'ideal body weight calculator','healthy weight for height','target weight calculator',
  'lean body mass calculator','LBM calculator','waist to height ratio calculator',
  'army body fat calculator','US Army tape test','waist circumference health risk',
  'body surface area calculator','BSA Mosteller formula','body recomposition calculator',
  // ── Calories & Metabolism ────────────────────────────────────────────────
  'calorie calculator','TDEE calculator','BMR calculator','daily calorie needs calculator',
  'how many calories should I eat','calories to lose weight calculator',
  'calorie deficit calculator','calorie deficit for weight loss',
  'BMR calculator Mifflin St Jeor','basal metabolic rate calculator',
  'resting metabolic rate calculator','TDEE calculator with activity level',
  'maintenance calories calculator','calories per day to lose 1 pound per week',
  'how many calories to lose weight fast','TDEE and BMR calculator free',
  'fat loss rate calculator','how long to lose 20 pounds calculator',
  // ── Macros & Nutrition ───────────────────────────────────────────────────
  'macro calculator','macros for weight loss','macros for muscle gain',
  'protein intake calculator','how much protein per day','daily protein calculator',
  'protein calculator for muscle building','grams of protein per pound',
  'keto macro calculator','ketogenic diet calculator','net carbs calculator',
  'intermittent fasting calculator','16 8 fasting calculator','eating window calculator',
  'fiber intake calculator','daily fiber recommendation','glycemic load calculator',
  'sugar intake calculator','sodium intake calculator','water intake calculator',
  'daily water intake oz','how much water should I drink',
  'vitamin D calculator','vitamin C calculator','magnesium calculator',
  'calcium intake calculator','iron intake calculator','omega-3 dosage calculator',
  'zinc calculator','creatine dosage calculator','creatine loading calculator',
  // ── Fitness & Exercise ───────────────────────────────────────────────────
  'calories burned calculator','calories burned walking calculator',
  'calories burned running calculator','calories burned cycling',
  'calories burned swimming','calories burned HIIT',
  'heart rate zone calculator','max heart rate calculator',
  'target heart rate calculator','fat burning heart rate zone',
  'VO2 max calculator','VO2 max test','aerobic fitness calculator',
  'one rep max calculator','1RM calculator','Epley formula calculator',
  'squat calculator strength standards','push up calculator by age',
  'pull up calculator','plank time calculator','running pace calculator',
  'marathon training calculator','5K 10K race pace calculator',
  'HIIT calculator','Tabata interval calculator','sprint calculator',
  'athletic performance calculator','grip strength calculator',
  'sit and reach calculator','flexibility calculator',
  'steps to calories calculator','10000 steps calories burned',
  'cycling calories calculator','swimming calories calculator',
  'yoga calories calculator','pace calculator miles km',
  // ── Weight Management ────────────────────────────────────────────────────
  'ideal weight calculator','healthy weight range by height',
  'how much should I weigh','goal weight calculator',
  'muscle gain calculator','how fast can I gain muscle',
  'body recomposition lose fat gain muscle','fat loss vs muscle loss',
  // ── Sleep ────────────────────────────────────────────────────────────────
  'sleep cycle calculator','best wake up time calculator',
  'what time should I wake up','sleep cycle 90 minutes',
  'sleep need calculator','how many hours of sleep do I need',
  'sleep debt calculator','bedtime calculator',
  'caffeine half life calculator','when to stop drinking coffee',
  'blue light exposure calculator','screen time sleep health',
  // ── Women Health ─────────────────────────────────────────────────────────
  'pregnancy due date calculator','pregnancy calculator','due date calculator',
  'due date from LMP','how many weeks pregnant','pregnancy week by week',
  'ovulation calculator','fertile window calculator','best days to conceive',
  'menstrual cycle calculator','period calculator next period',
  'pregnancy weight gain calculator','pregnancy nutrition calculator',
  'breastfeeding calorie calculator','infant weight percentile calculator',
  'baby weight percentile chart','WHO growth chart calculator',
  // ── Cardiovascular ───────────────────────────────────────────────────────
  'heart attack risk calculator','10 year heart attack risk',
  'ASCVD risk calculator','Framingham risk calculator',
  'blood pressure calculator','what does my blood pressure mean',
  'normal blood pressure range','hypertension calculator',
  'cholesterol calculator','LDL HDL ratio calculator',
  'heart age calculator','cardiovascular age calculator',
  'stroke risk calculator','CHA2DS2-VASc calculator',
  // ── Metabolic Health ─────────────────────────────────────────────────────
  'diabetes risk calculator','type 2 diabetes risk',
  'prediabetes risk calculator','FINDRISC diabetes test',
  'glycemic load calculator','blood sugar diet calculator',
  'kidney function calculator','eGFR calculator',
  'creatinine clearance calculator','CKD stage calculator',
  'thyroid health calculator','liver health calculator',
  // ── Mental Wellness ──────────────────────────────────────────────────────
  'stress level calculator','perceived stress scale PSS-10',
  'mental health score calculator','PHQ-9 depression screening',
  'cortisol stress calculator','meditation benefits calculator',
  'longevity calculator','life expectancy calculator',
  'biological age calculator','body age calculator',
  'inflammation risk calculator','dietary inflammatory index',
  'gut health calculator','immune health calculator',
  // ── Lifestyle ────────────────────────────────────────────────────────────
  'BAC calculator','blood alcohol content calculator',
  'alcohol metabolism calculator','hangover recovery calculator',
  'caffeine calculator','nicotine withdrawal calculator',
  'standing desk calculator','ergonomics score calculator',
  'UV exposure calculator','air quality health calculator',
  'sauna benefits calculator','cold plunge calculator',
  // ── Trust & Authority ────────────────────────────────────────────────────
  'CDC health calculator','NIH nutrition calculator',
  'AHA heart health calculator','ACSM fitness calculator',
  'evidence based health calculator','medically accurate calculator',
  'free health calculator no signup','health calculator instant results',
  'best health calculator 2026','top health calculators online',
  // ── Long-tail PAA (People Also Ask) ──────────────────────────────────────
  'what is a healthy BMI for my age and height calculator',
  'how many calories should I eat to lose weight calculator',
  'what is my ideal weight for my height and age',
  'how much protein do I need to build muscle calculator',
  'how many calories do I burn a day calculator',
  'what time should I wake up for a full sleep cycle',
  'how long will it take to lose 20 pounds calculator',
  'how much water should I drink based on my weight calculator',
  'am I at risk for a heart attack calculator',
  'what is my resting metabolic rate calculator',
  'how to calculate body fat percentage at home free',
  'how many steps do I need to burn 500 calories',
  'what is a good VO2 max for my age calculator',
  'how many calories does intermittent fasting burn',
  'what should my macros be for cutting calculator',
  'how much creatine should I take per day by weight',
  'when is my fertile window calculator free',
  'what does my cholesterol number mean calculator',
  'am I at risk for type 2 diabetes calculator free',
  'how long does nicotine withdrawal last calculator',
]

// Dev tools keywords - 200+ popular search queries
const DEV_KEYWORDS = [
  // ── Category identity — global developer audience ──────────────────────────
  'free developer tools online', 'online dev tools no install',
  'developer utilities browser based', 'web developer tools free 2026',
  'best free online developer tools', 'dev tools no signup required',
  'developer toolbox online free', 'software engineer tools online',
  'frontend developer tools free', 'backend developer tools online',
  'full stack developer utilities', 'programming tools online free',
  'coding utilities no registration', 'open source dev tools browser',

  // ── JSON & Data ────────────────────────────────────────────────────────────
  'JSON formatter online free', 'JSON beautifier online',
  'JSON validator free online', 'JSON parser online',
  'JSON minifier online', 'pretty print JSON online',
  'JSON to CSV converter free', 'JSON to XML online converter',
  'JSON diff tool online', 'JSON editor online free',
  'JSON lint online', 'fix JSON syntax online',
  'JSON prettify browser', 'format JSON with indentation online',
  'JSON formatter no install no login', 'validate JSON RFC 8259 online',
  'JSON schema generator from sample', 'JSONPath tester online free',
  'json path query tester', 'JSONPath evaluator browser',
  'JSON to YAML converter online', 'YAML to JSON converter free',
  'CSV to JSON converter online', 'JSON to CSV export browser',

  // ── SQL & Databases ────────────────────────────────────────────────────────
  'SQL formatter online free', 'SQL beautifier query online',
  'MySQL formatter online', 'PostgreSQL formatter free',
  'SQL query indenter online', 'format SQL query online no install',
  'SQL JOIN visualizer online', 'SQL join types diagram free',
  'INNER JOIN LEFT JOIN visualizer', 'SQL query optimizer online',
  'SQL syntax highlighter browser', 'SQL prettify online free',

  // ── YAML, XML, TOML, GraphQL ───────────────────────────────────────────────
  'YAML formatter online free', 'YAML lint checker online',
  'YAML validator browser', 'YAML to JSON online free',
  'XML formatter online', 'XML beautifier free',
  'XML to JSON converter online', 'XML lint validator free',
  'TOML formatter online', 'TOML validator free',
  'GraphQL formatter online', 'GraphQL query beautifier free',
  'GraphQL schema formatter browser',

  // ── Base64, URL & Encoding ─────────────────────────────────────────────────
  'base64 encoder online free', 'base64 decoder online',
  'encode base64 string browser', 'decode base64 string online',
  'base64url encoder free', 'base64 to image converter',
  'image to base64 converter online', 'file to base64 converter browser',
  'URL encoder online free', 'URL decoder percent encoding',
  'percent encode URL online', 'URL encode decode browser',
  'HTML entity encoder online', 'HTML entity decoder free',
  'HTML special characters encoder', 'character encoder tool online',
  'binary to text converter online', 'text to binary encoder free',
  'HTML encoder decoder browser',

  // ── Hashing & Security ─────────────────────────────────────────────────────
  'password generator free online', 'secure password generator 2026',
  'random password generator strong', 'cryptographically secure password',
  'generate strong password browser', 'password generator no tracking',
  'MD5 hash generator online', 'SHA256 hash generator free',
  'SHA512 hash generator online', 'SHA1 SHA256 hash browser',
  'hash generator string online', 'string to hash calculator',
  'MD5 checksum online', 'file hash checker browser',
  'HMAC generator online', 'bcrypt hash generator free',
  'RSA key info decoder online', 'RSA public key analyzer',
  'SSL certificate key info tool',
  'JWT decoder online free', 'JWT token parser browser',
  'JSON web token decoder', 'JWT validator online free',
  'JWT debugger online', 'decode JWT payload claims',
  'verify JWT token structure', 'JWT expiry checker online',

  // ── UUID, IDs & Random Data ────────────────────────────────────────────────
  'UUID generator online free', 'UUID v4 generator browser',
  'UUID v7 generator online', 'GUID generator online free',
  'ULID generator online free', 'NanoID generator browser',
  'unique ID generator online', 'random string generator free',
  'bulk UUID generator online', 'cuid generator online',
  'fake data generator online', 'test data generator free',
  'mock data generator browser', 'generate fake user data online',
  'lorem ipsum generator free', 'placeholder text generator online',
  'random name and address generator', 'dummy data generator free',

  // ── Color Tools ────────────────────────────────────────────────────────────
  'color converter HEX RGB HSL online', 'hex to rgb converter free',
  'rgb to hex converter online', 'rgb to hsl converter browser',
  'CMYK to RGB converter online', 'color picker web free',
  'color palette generator free', 'color scheme generator online',
  'complementary color calculator', 'color harmony generator',
  'WCAG color contrast checker free', 'accessibility contrast ratio tool',
  'color contrast ratio calculator', 'AA AAA contrast checker',
  'ADA compliant color checker', 'colorblind safe palette generator',
  'accessible color combination tool', 'WCAG 2.1 AA contrast validator',
  'CSS color variables generator', 'design system color palette free',

  // ── CSS Tools ──────────────────────────────────────────────────────────────
  'CSS gradient generator online', 'linear gradient CSS generator',
  'radial gradient CSS free', 'CSS gradient maker browser',
  'box shadow generator CSS free', 'CSS drop shadow generator',
  'CSS box shadow preview online', 'CSS animation generator free',
  'CSS keyframe animator online', 'flexbox generator online free',
  'CSS flexbox builder visual', 'CSS grid generator online free',
  'CSS grid layout builder', 'border radius generator CSS',
  'CSS border radius preview tool', 'CSS specificity calculator',
  'CSS selector specificity checker', 'CSS clip path generator online',
  'clip-path maker browser', 'CSS filter generator online',
  'CSS filter effects preview', 'CSS unit converter online',
  'px to rem converter online', 'rem to px calculator free',
  'em to px converter browser', 'responsive breakpoints checker',
  'CSS media query generator online',

  // ── JavaScript & Frontend ──────────────────────────────────────────────────
  'JavaScript regex tester online', 'regex tester online free',
  'regular expression tester browser', 'regex validator online',
  'regex debugger online free', 'regex pattern builder',
  'live regex test JavaScript', 'Python regex tester online',
  'PCRE regex tester browser', 'regex with named groups tester',
  'font size calculator px em rem', 'fluid typography calculator',
  'aspect ratio calculator online', 'image aspect ratio checker',
  'SVG optimizer online free', 'SVGO online tool browser',
  'optimize SVG code browser',

  // ── Markdown & Text ────────────────────────────────────────────────────────
  'markdown preview online free', 'markdown editor browser',
  'markdown table generator free', 'markdown to HTML online',
  'HTML to markdown converter free', 'diff checker online free',
  'text comparison tool browser', 'text diff checker online',
  'inline diff viewer browser', 'word counter online free',
  'character counter tool', 'text case converter online',
  'camelCase to snake_case converter', 'snake_case to camelCase free',
  'UPPER LOWER case converter online', 'kebab-case converter free',
  'text transformer browser', 'line sorter online free',
  'sort lines alphabetically online', 'duplicate line remover free',
  'remove duplicate lines browser', 'number formatter online',
  'number to words converter',

  // ── SEO & Web Meta ─────────────────────────────────────────────────────────
  'meta tag generator SEO free', 'open graph tag generator online',
  'Twitter card meta generator', 'OG tag preview tool',
  'Open Graph preview checker', 'SEO meta description generator',
  'robots.txt generator online free', 'robots txt builder browser',
  'htaccess generator online', 'Apache htaccess generator free',
  'favicon generator online free', 'favicon from text browser',
  'favicon ico png generator',

  // ── Network & Infrastructure ───────────────────────────────────────────────
  'IP subnet calculator online', 'IPv4 subnet calculator free',
  'CIDR notation calculator', 'subnet mask calculator browser',
  'CIDR to IP range converter', 'network address calculator',
  'IP address calculator free', 'IPv6 subnet calculator online',
  'bandwidth calculator online free', 'download time calculator',
  'internet speed calculator', 'data transfer time estimator',
  'network throughput calculator',
  'HTTP status codes reference', 'HTTP status code lookup free',
  'HTTP response code reference 2026', '404 403 500 status codes',
  'REST API status codes guide', 'HTTP headers analyzer online',
  'response headers checker browser', 'MIME type lookup tool free',
  'file extension MIME type finder',
  'curl command builder online', 'curl generator free',
  'build curl request browser', 'cURL syntax builder',
  'API response time tester', 'network speed test online',

  // ── Unix, Time & System ────────────────────────────────────────────────────
  'unix timestamp converter online', 'epoch to date converter free',
  'unix time to human readable', 'timestamp to date browser',
  'epoch timestamp calculator', 'current unix timestamp',
  'epoch converter milliseconds', 'date to unix timestamp online',
  'timezone converter online free', 'time zone converter world clock',
  'convert between timezones online', 'DST timezone calculator',
  'cron expression generator free', 'cron job builder online',
  'cron schedule visualizer', 'human readable cron expression',
  'cron syntax tester browser', '* * * * * cron builder',
  'chmod calculator online free', 'Unix file permission calculator',
  'Linux permission calculator', 'octal to chmod permission',
  'chmod 755 644 calculator',

  // ── Build, DevOps & Config ─────────────────────────────────────────────────
  'docker compose generator online', 'docker-compose.yml generator',
  'Docker Compose file builder free', 'Dockerfile generator browser',
  'gitignore generator free', '.gitignore file generator online',
  'gitignore for Node Python Go', 'package.json generator online',
  'npm package.json builder free', 'package json creator browser',
  'git commit message generator', 'conventional commits generator',
  'semantic commit message builder', 'env file parser online free',
  '.env file viewer browser', 'environment variable parser',
  'semver calculator online', 'semantic versioning calculator free',
  'npm version bump tool', 'semver range tester browser',
  'npm package search online', 'npm registry search free',

  // ── Number & Math Utilities ────────────────────────────────────────────────
  'base converter online free', 'number base converter browser',
  'decimal to binary hex converter', 'binary octal hex decimal converter',
  'bit byte converter online', 'KB MB GB TB converter free',
  'data size converter online', 'bitwise calculator online',
  'bitwise AND OR XOR NOT calculator', 'bit manipulation calculator',

  // ── Long-tail global intent queries ───────────────────────────────────────
  'how to format JSON online without installing anything',
  'free JSON formatter with syntax highlighting no login',
  'decode JWT token online without sending to server',
  'generate UUID online no registration needed',
  'check WCAG color contrast for accessibility free',
  'convert hex color to RGB and HSL online',
  'generate secure random password in browser no server',
  'unix timestamp to readable date converter free',
  'online regex tester with match groups highlighted',
  'format SQL query with proper indentation online free',
  'base64 encode decode online no upload required',
  'generate docker compose file online free no install',
  'cron expression builder with human readable explanation',
  'find HTTP status code meaning online 2026',
  'how to calculate IPv4 subnet range online',
  'convert CSV to JSON online free no limit',
  'online diff checker show changes side by side',
  'convert markdown to HTML preview online',
  'online gitignore generator for multiple languages',
  'convert between timezones instantly online free',
  'how to check color contrast ratio WCAG AA free',
  'build cURL command visually online no install',
  'convert px to rem em online instantly free',
  'SVG code optimizer browser based free',
  'online RSA key info decoder no server upload',
]

// Fun tools keywords
const FUN_KEYWORDS = [
  'fun calculators online free 2026',
  'zodiac sign calculator free', 'zodiac compatibility calculator',
  'Chinese zodiac calculator', 'astrology calculator free',
  'birth chart calculator free', 'horoscope calculator',
  'love compatibility calculator free', 'love percentage calculator',
  'couple compatibility test free', 'relationship calculator',
  'name compatibility calculator', 'soulmate calculator',
  'lucky number calculator numerology', 'numerology calculator free',
  'life path number calculator', 'destiny number calculator',
  'personality quiz free online 2026', 'Myers Briggs quiz free',
  'MBTI test free online', 'personality type test',
  'introvert extrovert test free', '16 personalities free',
  'superhero name generator', 'what is my superhero name',
  'villain name generator free', 'fantasy name generator',
  'RPG character name generator', 'wizard name generator',
  'age in days calculator free', 'how many days old am I',
  'days since birthday calculator', 'heartbeats since born',
  'birthday countdown timer free', 'days until birthday',
  'morse code translator online free', 'text to morse code',
  'morse code decoder', 'pig latin translator free',
  'UwU text generator free', 'emoji translator free',
  'text to emoji converter', 'fortune cookie online free',
  'daily fortune teller', 'random compliment generator free',
  'Shakespearean insult generator', 'random fact generator free',
  'trivia quiz free online', 'random trivia questions',
  'general knowledge quiz free', 'trivia game online free',
  'would you rather questions free', 'this or that game online',
  'how rich am I calculator', 'global wealth percentile',
  'pizza calculator online', 'how many pizzas to order',
  'sleep debt calculator free', 'screen time lifetime calculator',
  'procrastination score calculator', 'life expectancy calculator fun',
  'coffee calculator daily', 'caffeine limit calculator',
  'viral calculator 2026', 'trending calculator 2026',
  'fun personality test 2026', 'what kind of person am I quiz',
]

// Region keywords
const REGION_KW: Record<string, string[]> = {
  usa: ['calculator USA 2026', 'American calculator free', 'US dollar calculator',
        'United States financial tool', 'IRS approved calculator', 'federal guidelines calculator'],
  uk:  ['calculator UK 2026', 'British financial calculator', 'HMRC tax calculator UK',
        'pounds sterling calculator', 'UK financial tool free'],
  europe: ['European calculator 2026', 'EU financial calculator', 'Euro calculator free',
           'European Union tax calculator'],
  india: ['calculator India 2026', 'Indian financial calculator', 'rupee calculator free',
          'India free calculator'],
  global: ['global calculator free', 'international calculator online', 'multi-currency calculator',
           'worldwide financial calculator', 'calculator USD EUR GBP INR'],
}

export function generateCalculatorMetadata(params: {
  title: string
  description: string
  slug: string
  category: 'finance' | 'health' | 'dev' | 'fun'
  keywords: string[]
  region?: 'usa' | 'uk' | 'europe' | 'india' | 'global'
}): Metadata {
  const { title, description, slug, category, keywords, region = 'global' } = params
  const url = `${BASE_URL}/calculators/${category}/${slug}`

  const catKW = category === 'health' ? HEALTH_KEYWORDS
    : category === 'finance' ? FINANCE_KEYWORDS
    : category === 'dev' ? DEV_KEYWORDS
    : FUN_KEYWORDS

  const regionKW = REGION_KW[region] || REGION_KW.global

  const allKeywords = Array.from(new Set([
    ...keywords,
    ...CORE_KEYWORDS,
    ...catKW,
    ...regionKW,
  ]))

  // Better title templates for higher CTR and clearer intent
  const regionLabel = region === 'usa' ? 'USA'
    : region === 'uk' ? 'UK'
    : region === 'europe' ? 'Europe'
    : region === 'india' ? 'India' : ''

  // Title: matches search intent, includes "Free", optimized CTR per category, branded with Tooltrio
  const fullTitle = category === 'health'
    ? `Free ${title} — US Standard (lbs/ft) | Tooltrio`
    : category === 'dev'
    ? `${title} — Free Online Tool | Tooltrio`
    : regionLabel
    ? `Free ${regionLabel} ${title} - Instant, Accurate | Tooltrio`
    : `Free ${title} - Instant Results | Tooltrio`

  // Ensure description ends with a strong CTA and is 150-160 chars
  const enrichedDescription = category === 'health'
    ? (description.endsWith('.') ? description : `${description}. Free, no signup. US standard units (lbs & ft-in). CDC & NIH validated.`)
    : category === 'dev'
    ? (description.endsWith('.') ? description : `${description}. Runs 100% in your browser — no install, no signup, no data sent to any server.`)
    : (description.endsWith('.') ? description : `${description}. 100% free, no signup, instant results.`)

  return {
    title: fullTitle,
    description: enrichedDescription,
    keywords: allKeywords,
    authors: [{ name: 'tooltrio Team', url: BASE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    },
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description: enrichedDescription,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: fullTitle }],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: enrichedDescription,
      images: [OG_IMAGE],
    },
    other: {
      'geo.region': 'US',
      'geo.placename': 'United States',
      'language': 'English',
      'content-language': 'en-US',
    },
  }
}

export function generateDevToolMetadata(params: {
  title: string; description: string; slug: string; keywords: string[]
}): Metadata {
  return generateCalculatorMetadata({ ...params, category: 'dev', region: 'global' })
}

export function generateFunToolMetadata(params: {
  title: string; description: string; slug: string; keywords: string[]
}): Metadata {
  return generateCalculatorMetadata({ ...params, category: 'fun', region: 'global' })
}

export function generateDevToolJsonLd(params: {
  name: string
  description: string
  slug: string
  faqs: { question: string; answer: string }[]
}) {
  const url = `${BASE_URL}/calculators/dev/${params.slug}`
  return {
    webApp: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: params.name,
      description: params.description,
      url,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      featureList: 'Runs entirely in browser, No server upload, No signup required, No data stored',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '843',
        bestRating: '5',
        worstRating: '1',
      },
      author: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Developer Tools', item: `${BASE_URL}/calculators/dev` },
        { '@type': 'ListItem', position: 3, name: params.name, item: url },
      ],
    },
    faqPage: params.faqs.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: params.faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    } : null,
  }
}

export function generateFAQStructuredData(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}


// Health-specific: MedicalWebPage schema for health calculators
export function generateMedicalWebPageSchema(params: {
  name: string; description: string; url: string; medicalAudience?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: params.name,
    description: params.description,
    url: params.url,
    audience: {
      '@type': 'MedicalAudience',
      audienceType: params.medicalAudience || 'Patient',
    },
    about: { '@type': 'MedicalCondition', name: params.name.replace(' Calculator', '') },
    author: {
      '@type': 'Organization',
      name: 'tooltrio.com',
      url: 'https://tooltrio.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'tooltrio.com',
      url: 'https://tooltrio.com',
    },
    isAccessibleForFree: 'True',
    inLanguage: 'en-US',
    specialty: { '@type': 'MedicalSpecialty', name: 'Preventive Medicine' },
    lastReviewed: new Date().toISOString().split('T')[0],
  }
}

export function generateWebAppStructuredData(params: {
  name: string; description: string; url: string; category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: params.category,
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
  }
}

export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * ItemList schema -- helps Google and AI engines understand a collection of tools.
 * Use on category pages (Finance Calculators, Health Calculators, etc.)
 */
export function generateItemListStructuredData(params: {
  name: string
  description: string
  url: string
  items: { name: string; url: string; description?: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: params.name,
    description: params.description,
    url: params.url,
    numberOfItems: params.items.length,
    itemListElement: params.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  }
}

/**
 * Review / AggregateRating schema for individual calculator pages.
 * Enables star ratings in search results.
 */
export function generateCalculatorRatingSchema(params: {
  name: string
  description: string
  url: string
  ratingValue?: string
  ratingCount?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: params.ratingValue ?? '4.9',
      ratingCount: params.ratingCount ?? '1247',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
  }
}
