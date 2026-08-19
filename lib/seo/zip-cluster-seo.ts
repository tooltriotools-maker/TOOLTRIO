export const EXCLUDED_ZIP_SEO_TERMS = [
  'zip code distance',
  'zip code lookup',
  'zip to timezone',
  'zip code map',
  'zip+4 code lookup',
  'zip code validation',
  'zip coordinate',
  'usps address',
]

export const EXCLUDED_ZIP_SEO_ROUTES = [
  '/zip/zip-code-distance',
  '/zip/zip-code-lookup',
  '/zip/zip-to-timezone',
  '/zip/zip-code-map',
  '/zip/zip-plus-4-lookup',
  '/zip/zip-code-validator',
  '/zip/zip-to-coordinates',
  '/zip/usps-address-format',
]

export function sanitizeZipSeoKeywords(keywords: string[]) {
  return Array.from(new Set(keywords)).filter((keyword) => {
    const value = keyword.toLowerCase()
    return !EXCLUDED_ZIP_SEO_TERMS.some((term) => value.includes(term))
  })
}

export function filterZipRelatedTools<T extends { href: string }>(tools: T[]) {
  return tools.filter((tool) => !EXCLUDED_ZIP_SEO_ROUTES.includes(tool.href))
}

export interface ZipSeoEnhancement {
  keywords: string[]
  tagline: string
  proTip?: string
  howToSteps?: { num: number; title: string; desc: string }[]
  featureCards?: { icon: string; title: string; desc: string; bullets: string[] }[]
  useCases?: { icon: string; title: string; desc: string }[]
  statsTable?: { label: string; value: string }[]
  successStory?: { title: string; problem: string; fix: string; icon: string }
  dataSources?: { icon: string; name: string; desc: string }[]
  populationChart?: { title: string; subtitle: string; unit: string; bars: { label: string; value: number }[] }
}

const profiles: Record<string, Omit<ZipSeoEnhancement, 'keywords'>> = {
  'address-to-zip': {
    tagline: 'CASS-style address-to-ZIP resolution: parsing a street line down to the carrier-route or ZIP+4 segment, not just the 5-digit envelope.',
  },
  'area-code-by-zip': {
    tagline: 'Find the **telephone area code associated with a US ZIP code** for CRM enrichment, geographic calling analysis and phone-data research.',
  },
  'city-to-zip': {
    tagline: 'Find **all US ZIP codes serving a city and state** for local research, territory lists, customer segmentation and postal-area analysis.',
  },
  'county-zip-codes': {
    tagline: 'Find **all ZIP codes inside a US county** for county research, local government analysis, service territories, market planning and geographic reporting.',
  },
  'drive-time-by-zip': {
    tagline: 'Estimate **driving time between two US ZIP codes** for logistics, sales visits, delivery planning, field service and trip scheduling.',
  },
  'largest-zip-codes': {
    tagline: 'Explore the **largest US ZIP code areas by population, land area, housing and density** for demographic research and geographic comparison.',
  },
  'multi-zip-distance': {
    tagline: 'Calculate **total distance across multiple US ZIP codes** for multi-stop sales trips, service routes, deliveries and geographic sequence planning.',
  },
  'multiple-cities-in-zip': {
    tagline: 'See **every city or community associated with a US ZIP code** when one postal area serves multiple named places.',
  },
  'nearest-zip-code': {
    tagline: 'Find the **nearest ZIP codes to any US ZIP** and rank surrounding postal areas by geographic proximity for local research and territory analysis.',
  },
  'same-timezone-zips': {
    tagline: 'Find **US ZIP codes that share the same time zone** for scheduling, call-center coverage, regional operations and geographic reporting.',
  },
  'state-zip-codes': {
    tagline: 'Browse **all ZIP codes in any US state** with city, county and population context for statewide research, territory lists and data analysis.',
  },
  'zip-boundary-info': {
    tagline: 'Understand **ZIP geographic boundaries, area, perimeter, bounding boxes and neighboring ZIPs** for mapping, GIS and territory research.',
  },
  'zip-by-area-code': {
    tagline: 'Find **US ZIP codes associated with a telephone area code** for regional research, phone-data analysis and geographic campaign planning.',
  },
  'zip-code-elevation': {
    tagline: 'Find the **average elevation associated with a US ZIP code** for altitude research, weather studies, shipping analysis and geographic context.',
  },
  'zip-code-format-guide': {
    tagline: 'Learn the **US ZIP code structure, five-digit format, leading zeros, storage rules and postal-data best practices** for forms and databases.',
  },
  'zip-code-generator': {
    tagline: 'Generate **US ZIP-code test data** for software QA, demos, forms, database development and sample datasets without creating real customer records.',
  },
  'zip-code-population': {
    tagline: 'Explore **US ZIP code population, housing, households and demographic statistics** for market sizing, research and geographic planning.',
  },
  'zip-code-type': {
    tagline: 'Identify **US ZIP code types such as Standard, PO Box, Unique and military ZIP categories** for postal-data classification and business rules.',
  },
  'zip-time-converter': {
    tagline: 'Convert **local time between US ZIP codes** for meetings, customer support, remote teams, sales calls and distributed operations.',
  },
  'zip-to-area-code': {
    tagline: 'Find the **telephone area code for any US ZIP code** and connect postal geography with phone-number regions for CRM and communications analysis.',
  },
  'zip-to-city': {
    tagline: 'Find the **city, state and county associated with any US ZIP code** for geographic research, data enrichment and postal-area analysis.',
  },
  'zip-to-county': {
    tagline: 'Find the **county and FIPS code for any US ZIP code** for government reporting, GIS, market analysis and territory classification.',
  },
  'zip-to-state': {
    tagline: 'Find **which US state or territory a ZIP code belongs to** and return the full state name and abbreviation for geographic data workflows.',
  },
  'zip-to-timezone-map': {
    tagline: 'Explore **US ZIP time-zone geography visually** to understand Eastern, Central, Mountain, Pacific, Alaska and Hawaii coverage.',
  },
  'zip-to-zip-route': {
    tagline: 'Plan a **driving route between two US ZIP codes** with route distance, estimated travel time and turn-by-turn navigation context.',
  },
  'zips-by-city-name': {
    tagline: 'Search **US ZIP codes by city or community name across all 50 states** when the city is known but the ZIP is not.',
  },
  'zips-within-radius': {
    tagline: 'Find **US ZIP codes within 5–500 miles of a center ZIP** for marketing territories, delivery areas, service coverage, population research and geographic planning.',
  },
}

const keywordProfiles: Record<string, string[]> = {
  'address-to-zip': ['address to zip code', 'find zip code by address', 'street address to zip', 'address zip finder usa', 'zip code from street address', 'find postal code from address usa', 'address to postal code', 'address zip lookup tool', 'zip by street address', 'zip code for a property address', 'business address zip finder', 'customer address zip enrichment', 'shipping address zip finder', 'address normalization zip', 'crm address zip enrichment', 'bulk address zip workflow', 'zip code address search usa', 'city state address zip', 'street address postal code usa', 'free address to zip tool'],
  'area-code-by-zip': ['area code by zip code', 'phone area code by zip', 'zip code phone area code', 'telephone area code by zip usa', 'area code for zip usa', 'zip to phone area code', 'area code geographic lookup', 'npa by zip code', 'telephone geography by zip', 'area code overlay by zip', 'area code crm enrichment', 'phone geography zip analysis', 'area code segmentation usa', 'zip area code mapping', 'area code regional research', 'area code by postal area', 'npa zip relationship', 'phone area code data usa', 'area code business lookup', 'free area code by zip'],
  'city-to-zip': ['city to zip code', 'find zip codes by city', 'all zip codes for a city', 'city zip code search usa', 'city postal codes usa', 'zip codes serving a city', 'city state zip finder', 'multiple zip codes in city', 'city to postal code usa', 'find zip by city and state', 'city zip list', 'city zip database', 'city zip code directory', 'city geography zip mapping', 'local city zip search', 'marketing zip codes by city', 'sales zip codes by city', 'city zip territory', 'city zip export', 'free city to zip tool'],
  'county-zip-codes': ['county zip codes', 'zip codes in a county', 'find zip codes by county', 'county postal codes usa', 'all zip codes in county', 'county zip list', 'county to zip codes', 'zip codes by county and state', 'county zip finder usa', 'county postal area search', 'county zip database', 'county geographic zip mapping', 'county service area zip codes', 'county market zip list', 'county crm segmentation', 'county zip export', 'county zip analysis', 'county fips zip mapping', 'county territory zip codes', 'free county zip code tool'],
  'drive-time-by-zip': ['drive time by zip code', 'driving time between zip codes', 'zip code travel time calculator', 'zip to zip driving time', 'estimated drive time by zip', 'road travel time between zip codes', 'driving time usa zip codes', 'zip code commute time', 'zip driving time calculator', 'travel time between zip codes', 'field service drive time', 'sales travel time by zip', 'delivery drive time zip', 'fleet travel time zip', 'dispatch travel time', 'road distance and time zip', 'zip route time estimate', 'business travel time by zip', 'delivery scheduling zip', 'free drive time by zip'],
  'largest-zip-codes': ['largest zip codes usa', 'largest zip code by population', 'largest zip codes by area', 'most populous zip codes', 'biggest zip codes in america', 'largest postal areas usa', 'top zip codes by population', 'zip code population ranking', 'zip code area ranking', 'largest zip code housing units', 'highest population zip codes usa', 'zip code density ranking', 'largest rural zip codes', 'largest urban zip codes', 'zip market size ranking', 'largest zip code database', 'top us zip markets', 'zip demographics ranking', 'zip code size comparison', 'free largest zip codes'],
  'multi-zip-distance': ['multi zip distance calculator', 'distance across multiple zip codes', 'multiple zip route distance', 'multi stop zip calculator', 'zip code route sequence', 'total distance multiple zip codes', 'multi location zip distance', 'zip route planner usa', 'multiple stops by zip', 'sales route zip planner', 'delivery route zip distance', 'field service route zip', 'multi stop mileage zip', 'zip sequence distance', 'bulk zip route planning', 'zip route optimization', 'multi city zip distance', 'total trip distance by zip', 'zip route analysis', 'free multi zip distance'],
  'multiple-cities-in-zip': ['multiple cities in one zip code', 'zip code serves multiple cities', 'all cities in a zip code', 'cities served by zip code', 'alternate city names zip', 'zip code community names', 'multiple communities zip', 'zip city relationship usa', 'zip postal city names', 'zip city aliases', 'city names associated with zip', 'zip code city data', 'postal geography city names', 'zip city normalization', 'crm city zip cleanup', 'shipping city zip research', 'multiple city zip analysis', 'zip community lookup', 'city names by zip', 'free multiple cities zip'],
  'nearest-zip-code': ['nearest zip code', 'closest zip code', 'nearest zip code finder', 'closest zip to a zip code', 'neighboring zip codes', 'nearby zip codes', 'closest postal code usa', 'zip code proximity finder', 'nearest zip by distance', 'surrounding zip codes', 'adjacent zip codes', 'nearest zip search usa', 'local zip proximity', 'closest zip territory', 'nearby zip marketing', 'nearest zip service area', 'nearest zip delivery area', 'neighbor zip code list', 'zip proximity ranking', 'free nearest zip code tool'],
  'same-timezone-zips': ['same timezone zip codes', 'zip codes in same time zone', 'find zip codes same timezone', 'timezone zip group', 'zip timezone grouping', 'same time zone usa zip', 'zip codes by timezone', 'time zone zip list', 'zip timezone region', 'customer timezone by zip', 'call center timezone zip', 'support timezone zip', 'sales timezone territory', 'timezone business scheduling zip', 'zip local time group', 'same timezone postal codes', 'timezone coverage by zip', 'zip timezone segmentation', 'timezone operations usa', 'free same timezone zip tool'],
  'state-zip-codes': ['state zip codes', 'all zip codes by state', 'zip codes in each state', 'state postal codes usa', 'zip code list by state', 'state zip code directory', 'browse zip codes by state', 'us state zip database', 'statewide zip list', 'zip codes for all 50 states', 'state zip territory list', 'state zip marketing list', 'state zip sales coverage', 'state zip export', 'state zip data usa', 'state postal area list', 'state zip population list', 'state zip research', 'state zip database', 'free state zip codes'],
  'zip-boundary-info': ['zip code boundaries', 'zip boundary information', 'zip area boundaries usa', 'zip code area size', 'zip perimeter', 'zip bounding box', 'zip neighboring areas', 'zip geographic boundary data', 'zip boundary lookup', 'zip geography boundaries', 'zip area square miles', 'zip boundary gis data', 'zip postal boundary research', 'zip territory boundaries', 'zip neighboring codes', 'zip geometry data usa', 'zip geographic area analysis', 'zip boundary dataset', 'zip perimeter area', 'free zip boundary info'],
  'zip-by-area-code': ['zip codes by area code', 'find zip codes by phone area code', 'area code to zip codes', 'zip list by area code', 'postal codes by area code', 'all zip codes in area code', 'area code geographic zip list', 'area code zip database', 'area code territory zip codes', 'area code marketing zip list', 'area code customer geography', 'area code regional zip search', 'phone region zip list', 'npa zip code list', 'area code to postal geography', 'zip coverage by area code', 'area code zip export', 'area code business territory', 'area code zip research', 'free zip by area code'],
  'zip-code-elevation': ['zip code elevation', 'elevation by zip code', 'zip altitude usa', 'average elevation by zip', 'zip code altitude feet', 'zip code elevation meters', 'highest elevation zip codes', 'lowest elevation zip codes', 'zip elevation lookup usa', 'zip terrain data', 'zip altitude data', 'elevation geography by zip', 'zip climate elevation research', 'mountain zip elevation', 'shipping altitude by zip', 'health elevation by zip', 'weather elevation zip', 'zip terrain analysis', 'zip elevation dataset', 'free zip elevation'],
  'zip-code-format-guide': ['zip code format', 'us zip code format', 'five digit zip code format', 'zip code leading zeros', 'zip code database format', 'zip code field type', 'store zip code as text', 'zip code validation rules', 'zip code data format usa', 'zip code structure', 'postal code format usa', 'zip code sql datatype', 'zip code excel format', 'zip code csv formatting', 'zip code api format', 'zip code programming rules', 'zip code regex usa', 'zip data normalization', 'zip code storage best practices', 'free zip format guide'],
  'zip-code-generator': ['zip code generator', 'random zip code generator', 'random us zip codes', 'valid zip code generator', 'zip code test data generator', 'zip generator for testing', 'random postal codes usa', 'zip code sample data', 'zip code qa generator', 'zip code demo data', 'zip code fixture generator', 'zip code test cases', 'state zip code generator', 'random zip by state', 'zip type generator', 'zip code software testing', 'zip code database test data', 'zip code api test data', 'random zip csv', 'free zip code generator'],
  'zip-code-population': ['zip code population', 'population by zip code', 'zip code demographics', 'zip population data usa', 'population lookup by zip', 'zip code census population', 'zip code housing units', 'households by zip code', 'population density by zip', 'median income by zip', 'zip demographics usa', 'zip market population', 'zip code market size', 'population within zip', 'zip housing data', 'zip census data', 'zip population statistics', 'zip demographic research', 'zip market analysis', 'free zip code population'],
  'zip-code-type': ['zip code type', 'standard zip code', 'po box zip code', 'unique zip code', 'military zip code', 'apo fpo dpo zip code', 'zip type lookup', 'zip classification usa', 'zip code category', 'zip postal type', 'zip type database', 'standard vs po box zip', 'unique zip geography', 'military postal zip', 'zip type shipping rules', 'zip type data quality', 'zip code classification tool', 'zip type crm rule', 'zip type analysis', 'free zip code type'],
  'zip-time-converter': ['zip time converter', 'time between zip codes', 'time conversion by zip', 'local time by zip code', 'zip code time difference', 'convert time between zip codes', 'zip timezone time converter', 'us zip local time', 'zip code meeting time', 'zip time scheduling', 'customer local time by zip', 'call time by zip', 'remote team time by zip', 'zip time zone calculator', 'zip local clock', 'business time conversion zip', 'daylight saving zip time', 'zip time difference usa', 'time across zip codes', 'free zip time converter'],
  'zip-to-area-code': ['zip to area code', 'area code by zip usa', 'telephone area code for zip', 'phone code by zip', 'zip telephone code', 'zip phone geography', 'npa by zip', 'zip area code mapping', 'zip to phone region', 'area code geographic context', 'zip phone enrichment', 'crm area code by zip', 'phone region by postal zip', 'zip area code overlay', 'telephone geography zip', 'zip area code business data', 'zip phone analysis', 'area code from postal zip', 'zip phone region usa', 'free zip to area code'],
  'zip-to-city': ['zip code to city', 'city by zip code', 'find city from zip', 'zip city lookup usa', 'zip code city state', 'zip city county', 'postal city by zip', 'zip to locality', 'zip geographic city', 'zip city name finder', 'zip city data usa', 'zip city crm enrichment', 'zip city shipping research', 'zip city reporting', 'zip city state county', 'zip code locality mapping', 'zip city database', 'zip city geography', 'city name from postal zip', 'free zip to city'],
  'zip-to-county': ['zip code to county', 'county by zip code', 'find county from zip', 'zip county lookup usa', 'zip county fips', 'county name by zip', 'postal zip county mapping', 'zip county geography', 'zip county data usa', 'zip to county fips', 'zip county reporting', 'zip county crm enrichment', 'zip county market analysis', 'zip county government data', 'zip county database', 'zip county classification', 'zip county territory', 'county from postal zip', 'zip county join', 'free zip to county'],
  'zip-to-state': ['zip code to state', 'state by zip code', 'find state from zip', 'zip state lookup usa', 'zip state abbreviation', 'which state is zip code', 'zip code state mapping', 'postal zip state data', 'zip state geography', 'zip state reporting', 'zip state crm enrichment', 'zip state territory', 'zip state market analysis', 'zip state database', 'state name from postal zip', 'zip state code usa', 'zip state classification', 'zip state grouping', 'zip state export', 'free zip to state'],
  'zip-to-timezone-map': ['zip code timezone map', 'us zip timezone map', 'timezone map by zip code', 'zip time zone map usa', 'interactive zip timezone map', 'zip timezone geography', 'timezone boundaries by zip', 'zip local time map', 'us timezone zip map', 'zip timezone visualizer', 'zip timezone coverage', 'timezone regions by zip', 'zip time zone boundaries', 'zip timezone gis', 'zip timezone research', 'zip timezone operations map', 'zip timezone scheduling map', 'zip timezone data visualization', 'postal timezone map usa', 'free zip timezone map'],
  'zip-to-zip-route': ['zip to zip route', 'driving route between zip codes', 'route by zip code', 'zip code driving directions', 'zip to zip driving directions', 'road route by zip', 'zip route planner', 'zip route calculator', 'driving directions zip usa', 'zip travel route', 'delivery route by zip', 'sales route by zip', 'service route by zip', 'zip route mileage', 'zip route travel time', 'zip route planning tool', 'road trip zip route', 'fleet route by zip', 'zip route navigation', 'free zip to zip route'],
  'zips-by-city-name': ['zip codes by city name', 'search zip codes by city', 'city name zip finder usa', 'all zip codes for city name', 'city postal code search', 'zip search by community name', 'city zip database search', 'same city name zip codes', 'city name across states zip', 'zip city name matching', 'zip code city search usa', 'city community zip lookup', 'city name geographic search', 'city zip research', 'city zip marketing', 'city zip territory', 'city zip data enrichment', 'city zip export', 'postal codes by city name', 'free zip codes by city name'],
  'zips-within-radius': ['zip code radius calculator', 'zip codes within radius', 'zip codes within miles', 'nearby zip codes by radius', 'find zip codes within 25 miles', 'find zip codes within 50 miles', 'zip code proximity search', 'zip radius usa', 'us zip codes within radius', 'zip code territory radius', 'marketing radius zip codes', 'sales territory zip radius', 'delivery radius zip codes', 'service area zip codes radius', 'population within zip radius', 'zip radius market size', 'multi state zip radius', 'zip radius haversine', 'zip radius sql', 'free zip code radius'],
}

export const ZIP_CLUSTER_SEO: Record<string, ZipSeoEnhancement> = Object.fromEntries(
  Object.entries(profiles).map(([slug, content]) => [slug, { ...content, keywords: keywordProfiles[slug] || [] }])
)

export function getZipClusterSeo(slug: string): ZipSeoEnhancement {
  const seo = ZIP_CLUSTER_SEO[slug]
  if (!seo) throw new Error(`Missing ZIP cluster SEO config for: ${slug}`)
  return seo
}
