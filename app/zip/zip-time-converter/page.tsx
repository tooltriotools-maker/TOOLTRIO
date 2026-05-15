import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'ZIP Time Converter | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Convert the current time between two US ZIP code locations. Instantly see what time it is in any ZIP code.',
  keywords: ['zip time converter', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
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
  "Times update every second in real-time.",
    "Try comparing East Coast (10001) with West Coast (90210) to see the 3-hour difference.",
    "Hawaii (96813) is 5-6 hours behind Eastern Time.",
]

export default function Page() {
  return (
    <ZipToolLayout
      title="ZIP Time Converter"
      description="Convert the current time between two US ZIP code locations. Instantly see what time it is in any ZIP code."
      icon="⏱️"
      relatedTools={relatedTools}
      tips={tips}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
