import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Time Converter — Convert Time Between Any Two US ZIP Codes 2026 | TOOLTRIO',
  description: "Convert the current time between any two US ZIP codes. See what time it is in another ZIP code's timezone. Free ZIP time converter.",
  keywords: ['zip time converter', 'convert time between zip codes', 'zip code time conversion', 'what time is it in zip code', 'time difference between zip codes', 'zip code timezone converter', 'time zone by zip code converter', 'zip code local time', 'current time by zip code'],
}
const relatedTools = [
  {name:'ZIP to Timezone',href:'/zip/zip-to-timezone',icon:'🕐'},
  {name:'Same Timezone ZIPs',href:'/zip/same-timezone-zips',icon:'🕐'},
  {name:'ZIP to Timezone Map',href:'/zip/zip-to-timezone-map',icon:'🗺️'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'Area Code by ZIP',href:'/zip/area-code-by-zip',icon:'📱'},
  {name:'Drive Time by ZIP',href:'/zip/drive-time-by-zip',icon:'🚗'},
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
]
const tips = ['Time shown is the current local time accounting for DST automatically.', 'Arizona (except Navajo Nation) stays on MST year-round — no DST shift.', 'Use this tool before scheduling cross-country calls to avoid timezone confusion.']
const seoContent = {
  heading: 'ZIP Time Converter — How to Convert Time Between US ZIP Code Timezones',
  body: "When coordinating with colleagues, customers, or partners across the United States, knowing the current local time in a different ZIP code is essential. With the US spanning six time zones, a 9 AM call in New York is 6 AM in Los Angeles — a critical difference that can derail meetings if overlooked. Our ZIP Time Converter lets you enter any two US ZIP codes and see the current time in each, plus the exact time offset between them.\n\n**US Time Zones and Their ZIP Code Coverage**\n\nThe continental United States spans four primary time zones. Eastern Time (ET) covers UTC-5 standard and UTC-4 DST — the most populous timezone covering the eastern seaboard from Maine to Florida and inland to parts of Michigan and Indiana. Central Time (CT) covers UTC-6 standard and UTC-5 DST — the second most populous, covering the Midwest and South from North Dakota to Texas. Mountain Time (MT) covers UTC-7 standard and UTC-6 DST — the Rocky Mountain region; notably, Arizona except Navajo Nation does not observe DST and stays at UTC-7 year-round. Pacific Time (PT) covers UTC-8 standard and UTC-7 DST — the West Coast: California, Oregon, Nevada, Washington. Plus Alaska Time (AKT, UTC-9 standard) and Hawaii-Aleutian Time (HAT, UTC-10, no DST for Hawaii).\n\n**How the ZIP Time Conversion Works**\n\nEvery US ZIP code is mapped to its specific timezone based on county-level timezone assignments. When you enter two ZIP codes: each ZIP is matched to its timezone identifier such as America/New_York or America/Chicago, the current UTC time is retrieved, each timezone's current offset from UTC is applied accounting for whether DST is currently active, and the local time for each ZIP is displayed along with the hours-and-minutes difference between them.\n\n**Daylight Saving Time Complications**\n\nDST makes time zone offsets dynamic — they shift by one hour twice a year. The US observes DST from the second Sunday of March to the first Sunday of November. Most of the US shifts clocks forward in spring and back in fall. Key exceptions: Arizona (most of the state) stays on Mountain Standard Time year-round, Hawaii stays on Hawaii-Aleutian Standard Time year-round, and Navajo Nation within Arizona observes DST. Our converter always uses the current correct offset, accounting for whether DST is active today.",
  faqs: [
    {q:'Does the converter account for Daylight Saving Time?',a:"Yes. The converter always uses the current correct UTC offset, automatically accounting for whether DST is active or not on today's date."},
    {q:'What time zone is Arizona in?',a:'Most of Arizona observes Mountain Standard Time (UTC-7) year-round with no DST. However, the Navajo Nation within Arizona does observe DST. Enter the specific ZIP for the most accurate timezone.'},
    {q:'Can I convert a specific time (not just the current time)?',a:'Yes — enter the time you want to convert along with the source ZIP code and the tool calculates what that time corresponds to in the destination ZIP code.'},
    {q:'What is the maximum time difference between two US ZIP codes?',a:'Between Hawaii (HST, UTC-10) and the Eastern US (EDT, UTC-4 in summer), the maximum difference is 6 hours.'},
    {q:'Does this work for Puerto Rico and US territories?',a:'Yes. Puerto Rico observes Atlantic Standard Time (UTC-4) with no DST. Guam, American Samoa, and other territories are also mapped to their correct UTC offsets.'},
    {q:'Why might two neighboring ZIP codes be in different time zones?',a:'State timezone borders can run between adjacent ZIP codes, particularly in states that straddle timezone boundaries like Indiana, Kentucky, Tennessee, Idaho, and parts of Texas and Kansas.'},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'ZIP Time Converter'} description={'Convert the current time between any two US ZIP codes instantly.'} icon={'⏱️'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
