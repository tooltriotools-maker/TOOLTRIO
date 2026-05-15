import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'City to ZIP Code | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Find all ZIP codes for any US city. Search by city name to get a full list of ZIP codes.',
  keywords: ['city to zip', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
}

const relatedTools = [
  {name:'ZIP Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
    {name:'ZIP Distance',href:'/zip/zip-code-distance',icon:'📏'},
    {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
    {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
    {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'},
    {name:'ZIP to Timezone',href:'/zip/zip-to-timezone',icon:'🕐'}
]


const tips = [
  "Large cities like New York or Los Angeles have dozens of ZIP codes.",
    "Search by full city name or a partial name (e.g., 'Los' finds Los Angeles, Los Altos, etc.).",
    "Click the 📍 icon next to any result to view it on Google Maps.",
]

export default function Page() {
  return (
    <ZipToolLayout
      title="City to ZIP Code"
      description="Find all ZIP codes for any US city. Search by city name to get a full list of ZIP codes."
      icon="🏙️"
      relatedTools={relatedTools}
      tips={tips}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
