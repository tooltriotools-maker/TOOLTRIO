import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIPs by City Name — Find ZIP Codes by Searching City Name USA 2026 | TOOLTRIO',
  description: 'Search for US ZIP codes by city name. Find all ZIP codes matching a city name across any state. Free city name to ZIP code search tool.',
  keywords: ['zips by city name', 'zip codes by city name search', 'find zip codes by city name', 'city name zip code search', 'search zip code by city', 'all zip codes city name', 'zip code city name finder', 'zip code search by city name usa'],
}
const relatedTools = [
  {name:'City to ZIP Code',href:'/zip/city-to-zip',icon:'🏙️'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'Multiple Cities in ZIP',href:'/zip/multiple-cities-in-zip',icon:'🏘️'},
  {name:'State ZIP Codes',href:'/zip/state-zip-codes',icon:'🗺️'},
  {name:'County ZIP Codes',href:'/zip/county-zip-codes',icon:'📋'},
  {name:'ZIP Code Validator',href:'/zip/zip-code-validator',icon:'✅'},
  {name:'ZIP Code Map',href:'/zip/zip-code-map',icon:'🗺️'},
  {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'},
]
const tips = ['Search nationwide — results include every state where the city name appears.', "Add a state abbreviation (e.g., 'Franklin TN') to filter to a specific state.", 'Alternate city name matches are labeled separately from preferred city matches.']
const seoContent = {
  heading: 'ZIPs by City Name — Searching US ZIP Codes by City Name',
  body: "Finding all US ZIP codes that match a city name is a common need for marketing campaigns, data enrichment, and geographic research — especially when you need to find all ZIP codes for a city name that appears in multiple states. Our ZIPs by City Name tool performs a nationwide search across all USPS city name records, returning every ZIP code associated with your searched city name regardless of which state it's in.\n\n**City Name Search vs. Single-City Lookup**\n\nOur standard City to ZIP tool returns ZIP codes for a specific city (filtered by state). ZIPs by City Name is different — it searches nationwide and returns all ZIP codes where your searched city name appears as either the preferred city name or an acceptable alternate, across all 50 states and territories. This is particularly useful for common city names: over 30 states have a city named Springfield, searching it returns all ZIP codes for every Springfield in the country organized by state.\n\n**The Most Duplicated City Names in the US**\n\nSome city names appear in an extraordinary number of states. Springfield appears in at least 34 US states. Franklin appears in over 30 states. Clinton in over 25 states. Madison in over 20 states. Georgetown in over 25 states. For these common names, our tool returns results organized by state so you can quickly identify the specific city you're looking for.\n\n**Preferred vs. Alternate City Name Matching**\n\nOur search matches against both preferred USPS city names and acceptable alternate city names. A ZIP code where your searched city appears only as an alternate (not the preferred name) is still returned, but labeled so you can distinguish it from ZIPs where it's the primary name.\n\n**Building City-to-ZIP Lookup Tables**\n\nDevelopers building address validation or auto-complete features can use ZIPs by City Name to build comprehensive city-to-ZIP lookup tables. For each city name in your application, query all associated ZIP codes (including state filtering if needed) to build an index that correctly maps city names to their full set of valid ZIP codes. This is especially important for common city names where a city-only match would return ZIP codes from dozens of different states.",
  faqs: [
    {q:'What is the difference between this tool and City to ZIP?',a:'City to ZIP returns ZIP codes for a specific city with optional state filtering. ZIPs by City Name searches nationwide for all ZIP codes matching the city name across every state — useful for common city names that appear in multiple states.'},
    {q:"How many ZIP codes does 'Springfield' have across the US?",a:"Springfield appears in at least 34 states, with each having 1 to several ZIP codes. The total number of ZIP codes associated with the name 'Springfield' nationally exceeds 50."},
    {q:'Does the search match partial city names?',a:"Yes — entering 'Spring' returns results for Springfield, Spring Hill, Spring Valley, Spring Lake, and any other city name containing 'Spring'. Narrow your search with a more complete city name for focused results."},
    {q:'Are alternate city names included in search results?',a:'Yes. ZIP codes where your searched city appears as an acceptable alternate (not the preferred USPS city name) are included and labeled accordingly.'},
    {q:'Can I filter results by state?',a:"Yes — add a state abbreviation to your search (e.g., 'Springfield IL') to filter results to a specific state."},
    {q:'Why might the same ZIP code appear more than once?',a:"A ZIP code may appear twice if your searched city name appears as both a preferred and an alternate city in that ZIP's record."},
  ],
}
export default function Page() {
  return (
    <ZipToolLayout title={'ZIPs by City Name'} description={'Search for ZIP codes by city name across all US states.'} icon={'🔎'} relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
