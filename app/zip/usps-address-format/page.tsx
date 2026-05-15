import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'USPS Address Formatter | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Format a US address in official USPS format. Enter your address details and get the correctly formatted version.',
  keywords: ['usps address format', 'zip code', 'usa zip', 'zip lookup', 'zip tool'],
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
  "USPS requires all address text in UPPERCASE for automated sorting.",
    "Leave two spaces between state abbreviation and ZIP code (e.g., NY  10001).",
    "Include apartment or suite number on the same line as the street address.",
]

export default function Page() {
  return (
    <ZipToolLayout
      title="USPS Address Formatter"
      description="Format a US address in official USPS format. Enter your address details and get the correctly formatted version."
      icon="📬"
      relatedTools={relatedTools}
      tips={tips}
    >
      <ZipToolClient />
    </ZipToolLayout>
  )
}
