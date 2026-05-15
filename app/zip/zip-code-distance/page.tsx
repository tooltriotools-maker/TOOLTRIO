import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Code Distance Calculator | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Calculate the straight-line distance between two US ZIP codes in miles and kilometers. Includes a Google Maps directions link.',
  keywords: ['zip code distance', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
}

const relatedTools = [
  {name:'ZIP Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
    {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
    {name:'City to ZIP',href:'/zip/city-to-zip',icon:'🏙️'},
    {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
    {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'},
    {name:'ZIP to Timezone',href:'/zip/zip-to-timezone',icon:'🕐'}
]


const tips = [
  "Distance shown is straight-line (as-the-crow-flies). Actual driving distance is typically 20-30% more.",
    "Use the Google Maps button to get real turn-by-turn directions.",
    "Try the Drive Time Estimator tool for estimated travel time.",
]

export default function Page() {
  return (
    <ZipToolLayout
      title="ZIP Code Distance Calculator"
      description="Calculate the straight-line distance between two US ZIP codes in miles and kilometers. Includes a Google Maps directions link."
      icon="📏"
      relatedTools={relatedTools}
      tips={tips}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
