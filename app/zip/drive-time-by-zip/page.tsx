import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'Drive Time Estimator by ZIP | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Estimate drive time between two US ZIP codes. Based on straight-line distance and average highway speeds.',
  keywords: ['drive time by zip', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
}

const relatedTools = [
  {name:'ZIP Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
    {name:'ZIP Distance',href:'/zip/zip-code-distance',icon:'📏'},
    {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
    {name:'City to ZIP',href:'/zip/city-to-zip',icon:'🏙️'},
    {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
    {name:'ZIP to County',href:'/zip/zip-to-county',icon:'📍'}
]


const tips = [
  "Estimated times use a 1.2x road factor over straight-line distance.",
    "For accurate door-to-door directions, always use the Google Maps button.",
    "Select 'City traffic' for urban routes and 'Interstate' for long highway trips.",
]

export default function Page() {
  return (
    <ZipToolLayout
      title="Drive Time Estimator by ZIP"
      description="Estimate drive time between two US ZIP codes. Based on straight-line distance and average highway speeds."
      icon="🚗"
      relatedTools={relatedTools}
      tips={tips}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
