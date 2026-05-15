import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import ZipToolClient from './ZipToolClient'

export const metadata: Metadata = {
  title: 'Same Timezone ZIP Codes | Free USA ZIP Code Tools | TOOLTRIO',
  description: 'Find all ZIP codes that share the same timezone as a given ZIP. Useful for scheduling across regions.',
}

const relatedTools = [
  {name:'ZIP Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
    {name:'ZIP Distance',href:'/zip/zip-code-distance',icon:'📏'},
    {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
    {name:'City to ZIP',href:'/zip/city-to-zip',icon:'🏙️'},
    {name:'ZIP to State',href:'/zip/zip-to-state',icon:'🗺️'},
    {name:'ZIPs in Radius',href:'/zip/zips-within-radius',icon:'🎯'}
]

export default function Page() {
  return (
    <ZipToolLayout title="Same Timezone ZIP Codes" description="Find all ZIP codes that share the same timezone as a given ZIP. Useful for scheduling across regions." icon="🕐" relatedTools={relatedTools}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
