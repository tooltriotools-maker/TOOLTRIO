// GENERATED CATALOG SOURCE OF TRUTH
// Generated from route folders. Preserve names by keeping them in this file before regeneration.

export type ToolCategory = 'fun' | 'zip'
export type ToolRegion = 'usa' | 'uk' | 'europe' | 'india' | 'global'

export type ToolRecord = {
  name: string
  href: string
  cat: ToolCategory
  catLabel: string
  kw: string
  region?: ToolRegion
}

export const TOOL_CATALOG: readonly ToolRecord[] = [
  { name: 'Age in Days', href: '/calculators/fun/age-in-days', cat: 'fun', catLabel: 'Fun', kw: 'age in days', region: 'global' },
  { name: 'Birthday Countdown', href: '/calculators/fun/birthday-countdown', cat: 'fun', catLabel: 'Fun', kw: 'birthday countdown', region: 'global' },
  { name: 'Calories in Beer', href: '/calculators/fun/calories-in-beer', cat: 'fun', catLabel: 'Fun', kw: 'calories in beer', region: 'global' },
  { name: 'Coffee Calculator', href: '/calculators/fun/coffee-calculator', cat: 'fun', catLabel: 'Fun', kw: 'coffee calculator', region: 'global' },
  { name: 'Compliment Generator', href: '/calculators/fun/compliment-generator', cat: 'fun', catLabel: 'Fun', kw: 'compliment generator', region: 'global' },
  { name: 'Emoji Translator', href: '/calculators/fun/emoji-translator', cat: 'fun', catLabel: 'Fun', kw: 'emoji translator', region: 'global' },
  { name: 'Fantasy Name Generator', href: '/calculators/fun/fantasy-name-generator', cat: 'fun', catLabel: 'Fun', kw: 'fantasy name generator', region: 'global' },
  { name: 'Fortune Cookie', href: '/calculators/fun/fortune-cookie', cat: 'fun', catLabel: 'Fun', kw: 'fortune cookie', region: 'global' },
  { name: 'How Rich Am I', href: '/calculators/fun/how-rich-am-i', cat: 'fun', catLabel: 'Fun', kw: 'how rich am i', region: 'usa' },
  { name: 'Life Expectancy Fun', href: '/calculators/fun/life-expectancy-fun', cat: 'fun', catLabel: 'Fun', kw: 'life expectancy fun', region: 'global' },
  { name: 'Love Compatibility', href: '/calculators/fun/love-compatibility', cat: 'fun', catLabel: 'Fun', kw: 'love compatibility', region: 'global' },
  { name: 'Lucky Number', href: '/calculators/fun/lucky-number', cat: 'fun', catLabel: 'Fun', kw: 'lucky number', region: 'global' },
  { name: 'Personality Quiz', href: '/calculators/fun/personality-quiz', cat: 'fun', catLabel: 'Fun', kw: 'personality quiz', region: 'global' },
  { name: 'Pig Latin Converter', href: '/calculators/fun/pig-latin-converter', cat: 'fun', catLabel: 'Fun', kw: 'pig latin converter', region: 'global' },
  { name: 'Pizza Calculator', href: '/calculators/fun/pizza-calculator', cat: 'fun', catLabel: 'Fun', kw: 'pizza calculator', region: 'global' },
  { name: 'Procrastination Score', href: '/calculators/fun/procrastination-score', cat: 'fun', catLabel: 'Fun', kw: 'procrastination score', region: 'global' },
  { name: 'Random Fact Generator', href: '/calculators/fun/random-fact-generator', cat: 'fun', catLabel: 'Fun', kw: 'random fact generator', region: 'global' },
  { name: 'Random Name Generator', href: '/calculators/fun/random-name-generator', cat: 'fun', catLabel: 'Fun', kw: 'random name generator', region: 'global' },
  { name: 'Screen Time Calculator', href: '/calculators/fun/screen-time-calculator', cat: 'fun', catLabel: 'Fun', kw: 'screen time calculator', region: 'global' },
  { name: 'Insult Generator', href: '/calculators/fun/shakespeare-insult-generator', cat: 'fun', catLabel: 'Fun', kw: 'shakespeare insult generator', region: 'global' },
  { name: 'Sleep Debt Calculator', href: '/calculators/fun/sleep-debt-calculator', cat: 'fun', catLabel: 'Fun', kw: 'sleep debt calculator', region: 'global' },
  { name: 'Social Media Addiction', href: '/calculators/fun/social-media-addiction', cat: 'fun', catLabel: 'Fun', kw: 'social media addiction', region: 'global' },
  { name: 'Superhero Name', href: '/calculators/fun/superhero-name', cat: 'fun', catLabel: 'Fun', kw: 'superhero name', region: 'global' },
  { name: 'Text to Morse', href: '/calculators/fun/text-to-morse', cat: 'fun', catLabel: 'Fun', kw: 'text to morse', region: 'global' },
  { name: 'Trivia Quiz', href: '/calculators/fun/trivia-quiz', cat: 'fun', catLabel: 'Fun', kw: 'trivia quiz', region: 'global' },
  { name: 'Uwu Text Generator', href: '/calculators/fun/uwu-text-generator', cat: 'fun', catLabel: 'Fun', kw: 'uwu text generator', region: 'global' },
  { name: 'Villain Name', href: '/calculators/fun/villain-name', cat: 'fun', catLabel: 'Fun', kw: 'villain name', region: 'global' },
  { name: 'Workout Excuse Generator', href: '/calculators/fun/workout-excuse-generator', cat: 'fun', catLabel: 'Fun', kw: 'workout excuse generator', region: 'global' },
  { name: 'Would You Rather', href: '/calculators/fun/would-you-rather', cat: 'fun', catLabel: 'Fun', kw: 'would you rather', region: 'global' },
  { name: 'Zodiac Calculator', href: '/calculators/fun/zodiac-calculator', cat: 'fun', catLabel: 'Fun', kw: 'zodiac calculator', region: 'global' },
  { name: 'Address To Zip', href: '/zip/address-to-zip', cat: 'zip', catLabel: 'ZIP', kw: 'address to zip', region: 'usa' },
  { name: 'Area Code By Zip', href: '/zip/area-code-by-zip', cat: 'zip', catLabel: 'ZIP', kw: 'area code by zip', region: 'usa' },
  { name: 'City To Zip', href: '/zip/city-to-zip', cat: 'zip', catLabel: 'ZIP', kw: 'city to zip', region: 'usa' },
  { name: 'County Zip Codes', href: '/zip/county-zip-codes', cat: 'zip', catLabel: 'ZIP', kw: 'county zip codes', region: 'usa' },
  { name: 'Drive Time By Zip', href: '/zip/drive-time-by-zip', cat: 'zip', catLabel: 'ZIP', kw: 'drive time by zip', region: 'usa' },
  { name: 'Largest Zip Codes', href: '/zip/largest-zip-codes', cat: 'zip', catLabel: 'ZIP', kw: 'largest zip codes', region: 'usa' },
  { name: 'Multi Zip Distance', href: '/zip/multi-zip-distance', cat: 'zip', catLabel: 'ZIP', kw: 'multi zip distance', region: 'usa' },
  { name: 'Multiple Cities In Zip', href: '/zip/multiple-cities-in-zip', cat: 'zip', catLabel: 'ZIP', kw: 'multiple cities in zip', region: 'usa' },
  { name: 'Nearest Zip Code', href: '/zip/nearest-zip-code', cat: 'zip', catLabel: 'ZIP', kw: 'nearest zip code', region: 'usa' },
  { name: 'Same Timezone Zips', href: '/zip/same-timezone-zips', cat: 'zip', catLabel: 'ZIP', kw: 'same timezone zips', region: 'usa' },
  { name: 'State Zip Codes', href: '/zip/state-zip-codes', cat: 'zip', catLabel: 'ZIP', kw: 'state zip codes', region: 'usa' },
  { name: 'Usps Address Format', href: '/zip/usps-address-format', cat: 'zip', catLabel: 'ZIP', kw: 'usps address format', region: 'usa' },
  { name: 'Zip Boundary Info', href: '/zip/zip-boundary-info', cat: 'zip', catLabel: 'ZIP', kw: 'zip boundary info', region: 'usa' },
  { name: 'Zip By Area Code', href: '/zip/zip-by-area-code', cat: 'zip', catLabel: 'ZIP', kw: 'zip by area code', region: 'usa' },
  { name: 'Zip Code Distance', href: '/zip/zip-code-distance', cat: 'zip', catLabel: 'ZIP', kw: 'zip code distance', region: 'usa' },
  { name: 'Zip Code Elevation', href: '/zip/zip-code-elevation', cat: 'zip', catLabel: 'ZIP', kw: 'zip code elevation', region: 'usa' },
  { name: 'Zip Code Format Guide', href: '/zip/zip-code-format-guide', cat: 'zip', catLabel: 'ZIP', kw: 'zip code format guide', region: 'usa' },
  { name: 'Zip Code Generator', href: '/zip/zip-code-generator', cat: 'zip', catLabel: 'ZIP', kw: 'zip code generator', region: 'usa' },
  { name: 'Zip Code Lookup', href: '/zip/zip-code-lookup', cat: 'zip', catLabel: 'ZIP', kw: 'zip code lookup', region: 'usa' },
  { name: 'Zip Code Map', href: '/zip/zip-code-map', cat: 'zip', catLabel: 'ZIP', kw: 'zip code map', region: 'usa' },
  { name: 'Zip Code Population', href: '/zip/zip-code-population', cat: 'zip', catLabel: 'ZIP', kw: 'zip code population', region: 'usa' },
  { name: 'Zip Code Type', href: '/zip/zip-code-type', cat: 'zip', catLabel: 'ZIP', kw: 'zip code type', region: 'usa' },
  { name: 'Zip Code Validator', href: '/zip/zip-code-validator', cat: 'zip', catLabel: 'ZIP', kw: 'zip code validator', region: 'usa' },
  { name: 'Zip Plus 4 Lookup', href: '/zip/zip-plus-4-lookup', cat: 'zip', catLabel: 'ZIP', kw: 'zip plus 4 lookup', region: 'usa' },
  { name: 'Zip Time Converter', href: '/zip/zip-time-converter', cat: 'zip', catLabel: 'ZIP', kw: 'zip time converter', region: 'usa' },
  { name: 'Zip To Area Code', href: '/zip/zip-to-area-code', cat: 'zip', catLabel: 'ZIP', kw: 'zip to area code', region: 'usa' },
  { name: 'Zip To City', href: '/zip/zip-to-city', cat: 'zip', catLabel: 'ZIP', kw: 'zip to city', region: 'usa' },
  { name: 'Zip To Coordinates', href: '/zip/zip-to-coordinates', cat: 'zip', catLabel: 'ZIP', kw: 'zip to coordinates', region: 'usa' },
  { name: 'Zip To County', href: '/zip/zip-to-county', cat: 'zip', catLabel: 'ZIP', kw: 'zip to county', region: 'usa' },
  { name: 'Zip To State', href: '/zip/zip-to-state', cat: 'zip', catLabel: 'ZIP', kw: 'zip to state', region: 'usa' },
  { name: 'Zip To Timezone', href: '/zip/zip-to-timezone', cat: 'zip', catLabel: 'ZIP', kw: 'zip to timezone', region: 'usa' },
  { name: 'Zip To Timezone Map', href: '/zip/zip-to-timezone-map', cat: 'zip', catLabel: 'ZIP', kw: 'zip to timezone map', region: 'usa' },
  { name: 'Zip To Zip Route', href: '/zip/zip-to-zip-route', cat: 'zip', catLabel: 'ZIP', kw: 'zip to zip route', region: 'usa' },
  { name: 'Zips By City Name', href: '/zip/zips-by-city-name', cat: 'zip', catLabel: 'ZIP', kw: 'zips by city name', region: 'usa' },
  { name: 'Zips Within Radius', href: '/zip/zips-within-radius', cat: 'zip', catLabel: 'ZIP', kw: 'zips within radius', region: 'global' },
]
