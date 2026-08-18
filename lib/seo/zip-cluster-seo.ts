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
  proTip: string
  howToSteps: { num: number; title: string; desc: string }[]
  featureCards: { icon: string; title: string; desc: string; bullets: string[] }[]
  useCases: { icon: string; title: string; desc: string }[]
  statsTable: { label: string; value: string }[]
  successStory: { title: string; problem: string; fix: string; icon: string }
  dataSources: { icon: string; name: string; desc: string }[]
  populationChart: { title: string; subtitle: string; unit: string; bars: { label: string; value: number }[] }
}

const profiles: Record<string, Omit<ZipSeoEnhancement, 'keywords'>> = {
  'address-to-zip': {
    tagline: 'Convert a **US street address into its ZIP code** for delivery workflows, customer records, service-area setup and geographic data cleanup.',
    proTip: '✓ US-focused • ✓ Fast address search • ✓ City/state confirmation • Use the returned ZIP as the postal-area value in your customer or logistics workflow.',
    howToSteps: [
      { num: 1, title: 'Enter Street Address:', desc: 'Enter the house or building number and street name for the US location.' },
      { num: 2, title: 'Choose City & State:', desc: 'Provide the city and state so similarly named streets can be separated correctly.' },
      { num: 3, title: 'Find ZIP Code:', desc: 'Run the search to identify the ZIP associated with the supplied location.' },
      { num: 4, title: 'Verify the Result:', desc: 'Compare the returned city, state and ZIP with the address record before using it for shipping or customer data.' },
    ],
    featureCards: [
      { icon: '📍', title: 'Address-to-ZIP Matching', desc: 'Turn a US street location into the postal ZIP needed for geographic and delivery workflows.', bullets: ['Street input', 'City/state context', 'ZIP result'] },
      { icon: '🧹', title: 'Data Cleanup', desc: 'Use ZIP results to standardize customer, lead and service records that are missing postal codes.', bullets: ['CRM cleanup', 'Lead enrichment', 'Territory setup'] },
      { icon: '🚚', title: 'Delivery Preparation', desc: 'Identify the ZIP area associated with an address before applying downstream delivery and routing rules.', bullets: ['Shipping data', 'Service areas', 'Operational checks'] },
    ],
    useCases: [
      { icon: '🛒', title: 'Ecommerce Customer Records', desc: 'Fill missing ZIP fields in customer records before shipping, tax or geographic segmentation workflows.' },
      { icon: '🏢', title: 'Business Data Enrichment', desc: 'Enrich CRM, lead and account records with a postal ZIP derived from a US address.' },
      { icon: '📬', title: 'Mail & Delivery Setup', desc: 'Use the ZIP as the postal-area input for downstream mailing and delivery processes.' },
    ],
    statsTable: [
      { label: 'Coverage', value: 'US addresses' }, { label: 'Input', value: 'Street + city + state' }, { label: 'Output', value: 'ZIP code' }, { label: 'Use Cases', value: 'CRM / shipping / data' },
    ],
    successStory: { title: 'How a CRM Team Recovered Missing ZIP Fields', problem: 'A customer database contained thousands of US address records without populated ZIP fields, making territory reporting unreliable.', fix: 'The team used address-to-ZIP matching to fill the missing postal area and then reused the ZIP field for segmentation and service-area analysis.', icon: '🧹' },
    dataSources: [
      { icon: '📮', name: 'US ZIP Dataset', desc: 'Postal ZIP records provide the geographic ZIP relationship used by the tool.' },
      { icon: '🧭', name: 'Address Context', desc: 'Street, city and state context helps distinguish locations before returning a ZIP.' },
    ],
    populationChart: { title: 'Address Data Workflow', subtitle: 'Typical steps from raw address to usable ZIP field', unit: 'step', bars: [{ label: 'Street address', value: 1 }, { label: 'City/state', value: 2 }, { label: 'ZIP match', value: 3 }, { label: 'Data verification', value: 4 }] },
  },
  'area-code-by-zip': {
    tagline: 'Find the **telephone area code associated with a US ZIP code** for CRM enrichment, geographic calling analysis and phone-data research.',
    proTip: '✓ US area-code coverage • ✓ Overlay-aware results • ✓ Geographic context • A ZIP area code is geographic context, not proof of the current location of a specific mobile number.',
    howToSteps: [
      { num: 1, title: 'Enter ZIP:', desc: 'Enter the 5-digit US ZIP code you want to research.' },
      { num: 2, title: 'Run Area-Code Search:', desc: 'Submit the ZIP to retrieve the geographic telephone area code information associated with that area.' },
      { num: 3, title: 'Review Overlays:', desc: 'Check whether the ZIP is served by multiple overlay area codes.' },
      { num: 4, title: 'Use as Geographic Context:', desc: 'Apply the result to CRM enrichment, regional analysis or communication workflows as a soft geographic signal.' },
    ],
    featureCards: [
      { icon: '📞', title: 'ZIP-to-NPA Context', desc: 'Connect postal ZIP geography with North American telephone numbering areas.', bullets: ['Area code', 'State/city', 'Overlay awareness'] },
      { icon: '🔄', title: 'Overlay Awareness', desc: 'Recognize regions where multiple area codes serve the same geographic area.', bullets: ['Multiple NPAs', '10-digit dialing context', 'Metro coverage'] },
      { icon: '🧩', title: 'CRM Enrichment', desc: 'Use area-code geography as an additional field when analyzing phone records.', bullets: ['Lead enrichment', 'Regional analysis', 'Soft validation'] },
    ],
    useCases: [
      { icon: '📱', title: 'Phone Data Enrichment', desc: 'Add geographic area-code context to customer and lead datasets.' },
      { icon: '🧠', title: 'CRM Quality Checks', desc: 'Compare phone prefixes with expected geographic area-code coverage as a non-definitive data-quality signal.' },
      { icon: '📣', title: 'Campaign Segmentation', desc: 'Group geographic audiences by telephone numbering area for campaign planning.' },
    ],
    statsTable: [
      { label: 'Input', value: '5-digit ZIP' }, { label: 'Output', value: 'Area code(s)' }, { label: 'System', value: 'NANP' }, { label: 'Overlay Support', value: 'Yes' },
    ],
    successStory: { title: 'How a CRM Team Added Phone Geography', problem: 'A lead database had ZIP fields but no geographic phone-area field for regional reporting.', fix: 'The team mapped ZIP records to geographic area codes and used the additional field for segmentation and quality review.', icon: '📱' },
    dataSources: [
      { icon: '☎️', name: 'NANP Geography', desc: 'Telephone numbering areas provide the geographic area-code relationship.' },
      { icon: '📮', name: 'US ZIP Records', desc: 'ZIP geography provides the postal-area input for the phone-area relationship.' },
    ],
    populationChart: { title: 'Area-Code Coverage Workflow', subtitle: 'How ZIP geography connects to telephone numbering areas', unit: 'stage', bars: [{ label: 'ZIP region', value: 1 }, { label: 'NPA area', value: 2 }, { label: 'Overlay check', value: 3 }, { label: 'CRM segment', value: 4 }] },
  },
  'city-to-zip': {
    tagline: 'Find **all US ZIP codes serving a city and state** for local research, territory lists, customer segmentation and postal-area analysis.',
    proTip: '✓ All-state search intent • ✓ Multiple ZIPs per city supported • A city name can occur in several states, so always include the state when possible.',
    howToSteps: [
      { num: 1, title: 'Enter City:', desc: 'Type the US city or community name you want to search.' },
      { num: 2, title: 'Select State:', desc: 'Choose the state to avoid mixing cities that share the same name.' },
      { num: 3, title: 'Find ZIPs:', desc: 'Run the search to return the ZIP codes serving that city.' },
      { num: 4, title: 'Review the List:', desc: 'Use the complete ZIP set for territory, marketing, postal or geographic analysis.' },
    ],
    featureCards: [
      { icon: '🏙️', title: 'City-to-ZIP Search', desc: 'Find postal ZIPs associated with a US city and state.', bullets: ['City input', 'State filter', 'Multiple ZIPs'] },
      { icon: '📋', title: 'Complete City List', desc: 'Useful when one city is served by several ZIP codes.', bullets: ['All matching ZIPs', 'Postal coverage', 'Export-friendly'] },
      { icon: '🎯', title: 'Territory Research', desc: 'Use city ZIP lists as inputs to geographic business workflows.', bullets: ['Marketing', 'Sales', 'Service areas'] },
    ],
    useCases: [
      { icon: '📣', title: 'Local Marketing', desc: 'Build a ZIP audience around a city for local campaign planning.' },
      { icon: '🏢', title: 'Business Territory Lists', desc: 'Create a complete city ZIP list for sales or service coverage.' },
      { icon: '🗂️', title: 'Postal Research', desc: 'Understand how a city is divided across multiple postal areas.' },
    ],
    statsTable: [
      { label: 'Coverage', value: '50 states' }, { label: 'Input', value: 'City + state' }, { label: 'Output', value: 'All matching ZIPs' }, { label: 'Common Result', value: 'Multiple ZIPs' },
    ],
    successStory: { title: 'How a Local Marketer Built a City ZIP Audience', problem: 'A campaign team had a city name but needed every postal ZIP serving that city before uploading its geographic audience.', fix: 'They searched the city and state, collected the complete ZIP list and used it as the campaign geography.', icon: '📣' },
    dataSources: [
      { icon: '📮', name: 'US ZIP Records', desc: 'ZIP records provide the postal areas associated with city names.' },
      { icon: '🏙️', name: 'City & State Mapping', desc: 'City/state relationships distinguish same-named communities across the country.' },
    ],
    populationChart: { title: 'City-to-ZIP Coverage', subtitle: 'A city may be served by one or many postal ZIP areas', unit: 'ZIPs', bars: [{ label: 'Small city', value: 1 }, { label: 'Growing suburb', value: 3 }, { label: 'Regional city', value: 8 }, { label: 'Large metro city', value: 20 }] },
  },
  'county-zip-codes': {
    tagline: 'Find **all ZIP codes inside a US county** for county research, local government analysis, service territories, market planning and geographic reporting.',
    proTip: '✓ 3,100+ US counties • ✓ County + state search • ZIP lists can cross postal and municipal boundaries, so county membership is a geographic classification rather than a city boundary.',
    howToSteps: [
      { num: 1, title: 'Choose State:', desc: 'Select the US state containing the county you want to analyze.' },
      { num: 2, title: 'Enter County:', desc: 'Select or enter the county name.' },
      { num: 3, title: 'List ZIP Codes:', desc: 'Run the search to return ZIP records associated with the county.' },
      { num: 4, title: 'Analyze Coverage:', desc: 'Use the ZIP list for government, business, market and service-area analysis.' },
    ],
    featureCards: [
      { icon: '🏛️', title: 'County ZIP Coverage', desc: 'See the ZIP areas associated with a US county.', bullets: ['County filter', 'State filter', 'ZIP list'] },
      { icon: '🗺️', title: 'Regional Planning', desc: 'Turn county geography into a usable ZIP-level list.', bullets: ['Service areas', 'Sales regions', 'Market research'] },
      { icon: '📊', title: 'Data Analysis', desc: 'Use county ZIPs as a bridge between postal and administrative datasets.', bullets: ['Population', 'CRM joins', 'Reporting'] },
    ],
    useCases: [
      { icon: '🏥', title: 'County Service Areas', desc: 'Build candidate ZIP lists for healthcare and local-service planning.' },
      { icon: '📈', title: 'County Market Research', desc: 'Combine county ZIPs with population and customer datasets.' },
      { icon: '🏛️', title: 'Government Reporting', desc: 'Support county-level geographic reporting using ZIP-level records.' },
    ],
    statsTable: [
      { label: 'County Coverage', value: '3,100+' }, { label: 'Input', value: 'County + state' }, { label: 'Output', value: 'ZIP list' }, { label: 'Geography', value: 'County / ZIP' },
    ],
    successStory: { title: 'How a Service Company Built County ZIP Territories', problem: 'A regional service business operated by county but its customer system was organized by ZIP.', fix: 'The company generated county ZIP lists and used them to reconcile customer records with its operational territories.', icon: '🗺️' },
    dataSources: [
      { icon: '🏛️', name: 'County Geography', desc: 'County classifications provide the administrative geography used for the search.' },
      { icon: '📮', name: 'ZIP Records', desc: 'ZIP records connect postal areas to county-level geographic information.' },
    ],
    populationChart: { title: 'County ZIP Coverage Scale', subtitle: 'County ZIP counts vary with area, population and postal geography', unit: 'ZIPs', bars: [{ label: 'Small county', value: 5 }, { label: 'Mid-size county', value: 20 }, { label: 'Large county', value: 50 }, { label: 'Dense metro county', value: 100 }] },
  },
  'drive-time-by-zip': {
    tagline: 'Estimate **driving time between two US ZIP codes** for logistics, sales visits, delivery planning, field service and trip scheduling.',
    proTip: '✓ Road-based intent • ✓ Hours + minutes • ✓ Driving mileage • Geographic ZIP inputs are a planning estimate; actual address-level travel varies with route and traffic.',
    howToSteps: [
      { num: 1, title: 'Enter Origin ZIP:', desc: 'Enter the ZIP where the trip starts.' },
      { num: 2, title: 'Enter Destination ZIP:', desc: 'Enter the destination ZIP.' },
      { num: 3, title: 'Calculate Drive Time:', desc: 'Run the road-distance workflow to estimate mileage and travel duration.' },
      { num: 4, title: 'Plan the Trip:', desc: 'Use the estimate for scheduling, territory and logistics decisions.' },
    ],
    featureCards: [
      { icon: '🚗', title: 'Drive-Time Estimate', desc: 'Estimate road travel time between US ZIP locations.', bullets: ['Hours/minutes', 'Driving distance', 'ZIP-to-ZIP'] },
      { icon: '🛣️', title: 'Road Planning', desc: 'Designed for workflows where geographic distance alone is not enough.', bullets: ['Routes', 'Field visits', 'Delivery'] },
      { icon: '⏱️', title: 'Schedule Support', desc: 'Turn ZIP pairs into a practical travel-time estimate.', bullets: ['Appointments', 'Dispatch', 'Sales calls'] },
    ],
    useCases: [
      { icon: '🚚', title: 'Delivery Planning', desc: 'Estimate travel time between a facility and destination ZIP.' },
      { icon: '🧑‍💼', title: 'Field Sales Scheduling', desc: 'Estimate travel between customer ZIPs when building visit schedules.' },
      { icon: '🛠️', title: 'Service Dispatch', desc: 'Support technician scheduling with ZIP-level travel estimates.' },
    ],
    statsTable: [
      { label: 'Input', value: '2 US ZIPs' }, { label: 'Output', value: 'Time + miles' }, { label: 'Use', value: 'Road planning' }, { label: 'Precision', value: 'ZIP-level estimate' },
    ],
    successStory: { title: 'How a Field Team Improved Visit Scheduling', problem: 'A regional service team needed a quick way to estimate travel between customer areas before assigning daily visits.', fix: 'The team used ZIP-level drive-time estimates to build a practical first-pass schedule and then confirmed final routes before dispatch.', icon: '⏱️' },
    dataSources: [
      { icon: '🛣️', name: 'Road Network', desc: 'Road-based routing data supports the driving estimate where available.' },
      { icon: '📍', name: 'ZIP Geography', desc: 'ZIP locations provide the origin and destination geographic context.' },
    ],
    populationChart: { title: 'Typical Drive-Time Planning Bands', subtitle: 'Illustrative planning bands; actual travel varies by geography and traffic', unit: 'min', bars: [{ label: 'Local', value: 20 }, { label: 'Metro', value: 45 }, { label: 'Regional', value: 90 }, { label: 'Long regional', value: 180 }] },
  },
  'largest-zip-codes': {
    tagline: 'Explore the **largest US ZIP code areas by population, land area, housing and density** for demographic research and geographic comparison.',
    proTip: '✓ Population + area analysis • ✓ Compare ZIP scale • Large geographic ZIPs are not necessarily the most populous ZIPs.',
    howToSteps: [
      { num: 1, title: 'Choose Ranking:', desc: 'Decide whether you want population, geographic area, housing or another size measure.' },
      { num: 2, title: 'Browse ZIPs:', desc: 'Review the largest ZIP records in the selected ranking.' },
      { num: 3, title: 'Compare Geography:', desc: 'Compare population, land area, density and housing characteristics.' },
      { num: 4, title: 'Use the Data:', desc: 'Apply the rankings to research, planning, education or geographic analysis.' },
    ],
    featureCards: [
      { icon: '👥', title: 'Population Rankings', desc: 'Find ZIP areas with the largest resident populations.', bullets: ['Top ZIPs', 'Population', 'Density'] },
      { icon: '🗺️', title: 'Geographic Area', desc: 'Compare ZIP areas by physical size.', bullets: ['Land area', 'Regional scale', 'Rural ZIPs'] },
      { icon: '🏠', title: 'Housing Scale', desc: 'Review ZIP areas with high housing-unit counts.', bullets: ['Housing units', 'Households', 'Market size'] },
    ],
    useCases: [
      { icon: '📊', title: 'Demographic Research', desc: 'Identify high-population ZIP areas for market and census analysis.' },
      { icon: '🏬', title: 'Market Expansion', desc: 'Compare large ZIP markets when evaluating potential customer areas.' },
      { icon: '🎓', title: 'Education & Research', desc: 'Use ranked ZIP geography in data projects and geographic studies.' },
    ],
    statsTable: [
      { label: 'Coverage', value: 'US ZIPs' }, { label: 'Population', value: 'Rankable' }, { label: 'Area', value: 'Rankable' }, { label: 'Housing', value: 'Rankable' },
    ],
    successStory: { title: 'How an Analyst Shortlisted Large ZIP Markets', problem: 'A market analyst needed a fast list of high-scale ZIP areas before performing detailed demographic comparisons.', fix: 'The analyst started with the largest ZIP rankings, then narrowed the candidate markets using population density and housing data.', icon: '📊' },
    dataSources: [
      { icon: '👥', name: 'Population Data', desc: 'ZIP-level population fields support population ranking.' },
      { icon: '🗺️', name: 'Area Data', desc: 'Geographic area fields support physical-size comparisons.' },
    ],
    populationChart: { title: 'ZIP Size Dimensions', subtitle: 'Different definitions of “largest” answer different research questions', unit: 'rank factor', bars: [{ label: 'Population', value: 100 }, { label: 'Housing', value: 80 }, { label: 'Land area', value: 60 }, { label: 'Density', value: 40 }] },
  },
  'multi-zip-distance': {
    tagline: 'Calculate **total distance across multiple US ZIP codes** for multi-stop sales trips, service routes, deliveries and geographic sequence planning.',
    proTip: '✓ Multi-stop planning • ✓ Total route distance • ✓ ZIP sequence input • For final dispatch, validate the exact address route and road conditions.',
    howToSteps: [
      { num: 1, title: 'Add ZIP Stops:', desc: 'Enter the US ZIP codes in the order you expect to visit them.' },
      { num: 2, title: 'Review Sequence:', desc: 'Confirm the stop order because total distance depends on the sequence.' },
      { num: 3, title: 'Calculate Total:', desc: 'Run the calculation to sum the segment distances across the ZIP sequence.' },
      { num: 4, title: 'Optimize Your Plan:', desc: 'Compare alternative sequences or use the result as a first-pass route estimate.' },
    ],
    featureCards: [
      { icon: '📐', title: 'Multi-Stop Distance', desc: 'Measure total distance across a sequence of ZIP locations.', bullets: ['Multiple stops', 'Segment totals', 'Grand total'] },
      { icon: '🚚', title: 'Route Planning', desc: 'Useful for delivery, field service and sales-visit planning.', bullets: ['Delivery', 'Sales', 'Service'] },
      { icon: '🔄', title: 'Sequence Comparison', desc: 'Test different stop orders to improve a first-pass route plan.', bullets: ['Alternative orders', 'Distance comparison', 'Planning'] },
    ],
    useCases: [
      { icon: '🚚', title: 'Delivery Runs', desc: 'Estimate the total geographic or road distance across multiple delivery ZIPs.' },
      { icon: '🧑‍💼', title: 'Sales Visit Plans', desc: 'Estimate a day of customer visits using a sequence of ZIP locations.' },
      { icon: '🛠️', title: 'Field Service', desc: 'Compare multi-stop service schedules before dispatching technicians.' },
    ],
    statsTable: [
      { label: 'Input', value: 'Multiple ZIPs' }, { label: 'Output', value: 'Total distance' }, { label: 'Workflow', value: 'Multi-stop' }, { label: 'Planning', value: 'Sequence-based' },
    ],
    successStory: { title: 'How a Sales Team Reduced a Daily Visit Loop', problem: 'A sales team planned customer visits manually and had no quick way to compare the geographic cost of different stop sequences.', fix: 'They compared several ZIP sequences and selected a shorter first-pass route before confirming the final road route.', icon: '🔄' },
    dataSources: [
      { icon: '📍', name: 'ZIP Geography', desc: 'ZIP locations provide the geographic points used for each segment.' },
      { icon: '🧮', name: 'Distance Calculation', desc: 'Each consecutive ZIP pair is calculated and summed into the route total.' },
    ],
    populationChart: { title: 'Multi-Stop Route Growth', subtitle: 'More stops create more route segments and planning complexity', unit: 'segments', bars: [{ label: '2 ZIPs', value: 1 }, { label: '3 ZIPs', value: 2 }, { label: '5 ZIPs', value: 4 }, { label: '10 ZIPs', value: 9 }] },
  },
  'multiple-cities-in-zip': {
    tagline: 'See **every city or community associated with a US ZIP code** when one postal area serves multiple named places.',
    proTip: '✓ Multi-city ZIP support • ✓ Community names • A ZIP can serve multiple accepted city names because postal geography and municipal boundaries do not always align.',
    howToSteps: [
      { num: 1, title: 'Enter ZIP:', desc: 'Enter the 5-digit ZIP code you want to investigate.' },
      { num: 2, title: 'Review City Names:', desc: 'View the cities and communities associated with that postal ZIP.' },
      { num: 3, title: 'Compare Geography:', desc: 'Use the city list to understand the broader postal service area.' },
      { num: 4, title: 'Apply to Data:', desc: 'Use the alternate city information for research, CRM and geographic normalization.' },
    ],
    featureCards: [
      { icon: '🏙️', title: 'Multiple City Names', desc: 'Identify every city or community associated with a ZIP.', bullets: ['Primary city', 'Alternate names', 'Community coverage'] },
      { icon: '📮', title: 'Postal Geography', desc: 'Understand why one ZIP can serve more than one named place.', bullets: ['Delivery area', 'Municipal overlap', 'Local names'] },
      { icon: '🧹', title: 'Data Normalization', desc: 'Improve city-name handling in geographic and customer datasets.', bullets: ['CRM cleanup', 'Search matching', 'Reporting'] },
    ],
    useCases: [
      { icon: '📋', title: 'Address Data Cleanup', desc: 'Understand alternate city names before normalizing customer or shipping records.' },
      { icon: '🏘️', title: 'Community Research', desc: 'Discover communities served by the same postal ZIP.' },
      { icon: '📊', title: 'Geographic Reporting', desc: 'Explain apparent city differences inside one ZIP-level dataset.' },
    ],
    statsTable: [
      { label: 'Input', value: '1 ZIP' }, { label: 'Output', value: 'City names' }, { label: 'Coverage', value: 'US ZIPs' }, { label: 'Use', value: 'Postal geography' },
    ],
    successStory: { title: 'How a Data Team Explained Duplicate City Names', problem: 'A customer report showed several city names for the same ZIP and analysts assumed the records were inconsistent.', fix: 'The team used the multi-city view to document the postal-area relationship and update its normalization rules.', icon: '🏙️' },
    dataSources: [
      { icon: '📮', name: 'Postal City Mapping', desc: 'ZIP records provide primary and associated city-name relationships.' },
      { icon: '🗺️', name: 'Geographic Context', desc: 'City associations are interpreted as postal geography rather than municipal boundaries.' },
    ],
    populationChart: { title: 'City Names per ZIP', subtitle: 'Most ZIPs have one primary city name, while some serve multiple communities', unit: 'city names', bars: [{ label: 'Typical ZIP', value: 1 }, { label: 'Multi-city ZIP', value: 2 }, { label: 'Complex ZIP', value: 4 }] },
  },
  'nearest-zip-code': {
    tagline: 'Find the **nearest ZIP codes to any US ZIP** and rank surrounding postal areas by geographic proximity for local research and territory analysis.',
    proTip: '✓ Neighbor ranking • ✓ Geographic proximity • ✓ Multiple nearby ZIPs • Use road routing afterward when “nearest” must mean shortest driving trip.',
    howToSteps: [
      { num: 1, title: 'Enter Center ZIP:', desc: 'Enter the ZIP that acts as the reference point.' },
      { num: 2, title: 'Run Nearby Search:', desc: 'Search the surrounding ZIP dataset for nearby postal areas.' },
      { num: 3, title: 'Rank Results:', desc: 'Review the closest ZIPs and their geographic distance from the center.' },
      { num: 4, title: 'Use the Neighbors:', desc: 'Apply the nearby ZIP list to marketing, service-area or regional research.' },
    ],
    featureCards: [
      { icon: '📍', title: 'Nearest ZIP Finder', desc: 'Identify surrounding ZIP areas ranked by geographic proximity.', bullets: ['Closest ZIP', 'Nearby ZIPs', 'Distance'] },
      { icon: '🧭', title: 'Local Area Research', desc: 'Quickly understand the ZIPs surrounding a location.', bullets: ['Neighborhood area', 'Territory', 'Coverage'] },
      { icon: '🎯', title: 'Business Targeting', desc: 'Use nearby ZIPs as candidate local markets or service areas.', bullets: ['Marketing', 'Sales', 'Service'] },
    ],
    useCases: [
      { icon: '🏬', title: 'Store Catchment', desc: 'Find the closest ZIP areas around a store or branch.' },
      { icon: '🚚', title: 'Service Expansion', desc: 'Identify nearby ZIPs when considering additional service coverage.' },
      { icon: '📣', title: 'Local Campaigns', desc: 'Build nearby ZIP audiences around a campaign center.' },
    ],
    statsTable: [
      { label: 'Input', value: 'Center ZIP' }, { label: 'Output', value: 'Nearby ZIPs' }, { label: 'Ranking', value: 'Geographic distance' }, { label: 'Use', value: 'Local proximity' },
    ],
    successStory: { title: 'How a Branch Team Identified Nearby ZIP Markets', problem: 'A branch manager needed a quick list of neighboring postal areas before evaluating local customer coverage.', fix: 'The manager ranked nearby ZIPs and used the resulting list as the starting geography for customer and market analysis.', icon: '📍' },
    dataSources: [
      { icon: '📮', name: 'US ZIP Dataset', desc: 'ZIP records provide candidate neighboring postal areas.' },
      { icon: '🧮', name: 'Geographic Distance', desc: 'Distance between ZIP representative points determines the proximity ranking.' },
    ],
    populationChart: { title: 'Nearby ZIP Ranking', subtitle: 'Proximity results can be grouped into immediate, local and extended neighbors', unit: 'rank band', bars: [{ label: 'Immediate', value: 5 }, { label: 'Local', value: 15 }, { label: 'Extended', value: 30 }] },
  },
  'same-timezone-zips': {
    tagline: 'Find **US ZIP codes that share the same time zone** for scheduling, call-center coverage, regional operations and geographic reporting.',
    proTip: '✓ Time-zone grouping • ✓ US-focused • ✓ Daylight-saving aware context • Time zone follows geographic/administrative rules, not just ZIP numbering.',
    howToSteps: [
      { num: 1, title: 'Enter ZIP:', desc: 'Enter a US ZIP code whose time zone you want to use as the reference.' },
      { num: 2, title: 'Identify Time Zone:', desc: 'Read the reference ZIP time-zone classification.' },
      { num: 3, title: 'Find Matching ZIPs:', desc: 'Return ZIPs that share the same time-zone classification.' },
      { num: 4, title: 'Use the Group:', desc: 'Apply the ZIP set to scheduling, operations and geographic segmentation.' },
    ],
    featureCards: [
      { icon: '🕐', title: 'Timezone Grouping', desc: 'Find ZIPs that share a common US time zone.', bullets: ['Reference ZIP', 'Timezone', 'Matching ZIPs'] },
      { icon: '📞', title: 'Call-Center Planning', desc: 'Group customer regions by local-time behavior.', bullets: ['Calling windows', 'Support teams', 'Scheduling'] },
      { icon: '🗓️', title: 'Operations', desc: 'Build time-zone aware territory and workflow lists.', bullets: ['Meetings', 'Dispatch', 'Regional teams'] },
    ],
    useCases: [
      { icon: '☎️', title: 'Call Windows', desc: 'Group customer ZIPs into practical local-time calling regions.' },
      { icon: '👩‍💻', title: 'Support Operations', desc: 'Organize service teams around customer local-time coverage.' },
      { icon: '📦', title: 'Regional Operations', desc: 'Create time-zone aware operating groups for distributed teams.' },
    ],
    statsTable: [
      { label: 'US Time Zones', value: '6 primary' }, { label: 'Input', value: 'Reference ZIP' }, { label: 'Output', value: 'Matching ZIPs' }, { label: 'Use', value: 'Scheduling' },
    ],
    successStory: { title: 'How a Support Team Built Local-Time Queues', problem: 'A support organization had customers across the country and needed ZIP-level time-zone groups for staffing and outreach windows.', fix: 'The team grouped ZIPs by the reference time zone and used the groups to organize staffing and customer communication.', icon: '🕐' },
    dataSources: [
      { icon: '🕐', name: 'US Time-Zone Rules', desc: 'Time-zone classification supplies the regional local-time relationship.' },
      { icon: '📮', name: 'ZIP Records', desc: 'ZIPs provide the geographic records grouped into the selected time zone.' },
    ],
    populationChart: { title: 'US Time-Zone Coverage', subtitle: 'ZIP records are distributed across major US time-zone regions', unit: 'relative coverage', bars: [{ label: 'Eastern', value: 100 }, { label: 'Central', value: 95 }, { label: 'Mountain', value: 45 }, { label: 'Pacific', value: 65 }, { label: 'Alaska', value: 5 }, { label: 'Hawaii', value: 3 }] },
  },
  'state-zip-codes': {
    tagline: 'Browse **all ZIP codes in any US state** with city, county and population context for statewide research, territory lists and data analysis.',
    proTip: '✓ All 50 states • ✓ State-level ZIP lists • ZIPs are postal geography, so a statewide list is best used as a postal dataset rather than a municipal boundary map.',
    howToSteps: [
      { num: 1, title: 'Select State:', desc: 'Choose the US state you want to research.' },
      { num: 2, title: 'Load ZIP List:', desc: 'View the ZIP records associated with the selected state.' },
      { num: 3, title: 'Filter the Data:', desc: 'Use city, county or other available fields to narrow the list.' },
      { num: 4, title: 'Use State Coverage:', desc: 'Apply the ZIP list to marketing, sales, analysis or data workflows.' },
    ],
    featureCards: [
      { icon: '🗺️', title: 'State ZIP Directory', desc: 'Browse ZIP records across every US state.', bullets: ['50 states', 'ZIP list', 'State filter'] },
      { icon: '🏙️', title: 'City & County Context', desc: 'Use city and county fields to understand statewide ZIP geography.', bullets: ['Cities', 'Counties', 'Population'] },
      { icon: '📊', title: 'Statewide Analysis', desc: 'Turn ZIP lists into business and research datasets.', bullets: ['Territories', 'Marketing', 'Reporting'] },
    ],
    useCases: [
      { icon: '📣', title: 'Statewide Campaigns', desc: 'Build complete ZIP audiences for state-level marketing.' },
      { icon: '🏢', title: 'Sales Coverage', desc: 'Create state ZIP lists for sales-territory assignment.' },
      { icon: '📊', title: 'Data Projects', desc: 'Use ZIP records as a statewide geographic dimension in analysis.' },
    ],
    statsTable: [
      { label: 'State Coverage', value: '50 states' }, { label: 'ZIP Dataset', value: '41k+' }, { label: 'Context', value: 'City / county' }, { label: 'Use', value: 'Statewide analysis' },
    ],
    successStory: { title: 'How a Sales Team Built a Statewide Territory File', problem: 'A growing sales organization needed a complete ZIP-level reference for each state before assigning regional accounts.', fix: 'The team generated state ZIP lists, added customer records and then divided the ZIPs into operational sales territories.', icon: '🏢' },
    dataSources: [
      { icon: '📮', name: 'US ZIP Dataset', desc: 'ZIP records provide the statewide postal list.' },
      { icon: '🗺️', name: 'State Mapping', desc: 'Each ZIP record is associated with its state for statewide filtering.' },
    ],
    populationChart: { title: 'State ZIP Coverage', subtitle: 'State ZIP counts vary with population, geography and postal organization', unit: 'relative ZIP count', bars: [{ label: 'Large state', value: 100 }, { label: 'Medium state', value: 65 }, { label: 'Small state', value: 30 }, { label: 'Compact state', value: 15 }] },
  },
  'zip-boundary-info': {
    tagline: 'Understand **ZIP geographic boundaries, area, perimeter, bounding boxes and neighboring ZIPs** for mapping, GIS and territory research.',
    proTip: '✓ Geographic boundary context • ✓ Area + perimeter • ✓ Neighboring ZIPs • ZIP boundaries represent postal geography and can differ from city or county boundaries.',
    howToSteps: [
      { num: 1, title: 'Enter ZIP:', desc: 'Enter the 5-digit ZIP code whose geographic area you want to inspect.' },
      { num: 2, title: 'Review Boundary Metrics:', desc: 'Inspect area, perimeter and available bounding-box information.' },
      { num: 3, title: 'Check Neighbors:', desc: 'Review nearby or adjacent ZIP areas around the selected ZIP.' },
      { num: 4, title: 'Use the Geography:', desc: 'Apply the information to GIS, territory and regional analysis.' },
    ],
    featureCards: [
      { icon: '🔲', title: 'Boundary Metrics', desc: 'Understand the geographic size and shape of a ZIP area.', bullets: ['Area', 'Perimeter', 'Bounds'] },
      { icon: '🧭', title: 'Neighboring ZIPs', desc: 'See the postal areas surrounding the selected ZIP.', bullets: ['Neighbors', 'Adjacency', 'Regional context'] },
      { icon: '🗺️', title: 'GIS Context', desc: 'Use boundary information in geographic data workflows.', bullets: ['Mapping data', 'Territories', 'Analysis'] },
    ],
    useCases: [
      { icon: '🗺️', title: 'GIS Research', desc: 'Understand ZIP geometry before combining it with geographic datasets.' },
      { icon: '🏢', title: 'Territory Design', desc: 'Use neighboring ZIP and area information when refining business territories.' },
      { icon: '📐', title: 'Area Comparison', desc: 'Compare physical ZIP size across urban and rural regions.' },
    ],
    statsTable: [
      { label: 'Input', value: '1 ZIP' }, { label: 'Metrics', value: 'Area / perimeter' }, { label: 'Bounds', value: 'Available' }, { label: 'Neighbors', value: 'Available' },
    ],
    successStory: { title: 'How a GIS Analyst Investigated ZIP Size', problem: 'An analyst needed to explain why two ZIP areas with similar population had very different geographic footprints.', fix: 'Boundary metrics and neighboring ZIP information showed the difference between dense urban postal geography and large rural coverage.', icon: '🗺️' },
    dataSources: [
      { icon: '🗺️', name: 'ZIP Boundary Geometry', desc: 'Geographic boundary records provide area, perimeter and spatial context.' },
      { icon: '📍', name: 'Neighbor Relationships', desc: 'Adjacent ZIP relationships help explain the local geographic context.' },
    ],
    populationChart: { title: 'ZIP Boundary Dimensions', subtitle: 'Physical ZIP size can vary dramatically by geography', unit: 'relative size', bars: [{ label: 'Dense urban', value: 10 }, { label: 'Suburban', value: 35 }, { label: 'Rural', value: 100 }] },
  },
  'zip-by-area-code': {
    tagline: 'Find **US ZIP codes associated with a telephone area code** for regional research, phone-data analysis and geographic campaign planning.',
    proTip: '✓ Area-code-to-ZIP search • ✓ US coverage • Area codes can overlap, so a single area code may correspond to many ZIPs and a ZIP can appear under multiple area codes.',
    howToSteps: [
      { num: 1, title: 'Enter Area Code:', desc: 'Enter the three-digit US telephone area code.' },
      { num: 2, title: 'Find ZIPs:', desc: 'Run the search to identify ZIP records associated with the geographic area code region.' },
      { num: 3, title: 'Review Geography:', desc: 'Inspect the city, state and ZIP coverage represented by the area code.' },
      { num: 4, title: 'Use the ZIP List:', desc: 'Apply the list to campaign, CRM and regional analysis workflows.' },
    ],
    featureCards: [
      { icon: '📞', title: 'Area Code to ZIP', desc: 'Reverse the relationship and find ZIP areas associated with a telephone area code.', bullets: ['Area code input', 'ZIP results', 'State/city'] },
      { icon: '🗺️', title: 'Regional Coverage', desc: 'Understand the geographic footprint represented by a phone area code.', bullets: ['Metro areas', 'State regions', 'Overlays'] },
      { icon: '📣', title: 'Campaign Segmentation', desc: 'Create ZIP-level geographic lists from telephone numbering regions.', bullets: ['Marketing', 'CRM', 'Research'] },
    ],
    useCases: [
      { icon: '📱', title: 'Phone Geography', desc: 'Study the ZIP areas associated with a telephone numbering region.' },
      { icon: '📣', title: 'Regional Marketing', desc: 'Use area-code regions as a starting point for geographic audience creation.' },
      { icon: '🧹', title: 'CRM Analysis', desc: 'Compare phone-area and ZIP geography in customer records.' },
    ],
    statsTable: [
      { label: 'Input', value: '3-digit area code' }, { label: 'Output', value: 'ZIP list' }, { label: 'System', value: 'NANP' }, { label: 'Use', value: 'Regional analysis' },
    ],
    successStory: { title: 'How a Marketing Team Converted Phone Geography to ZIPs', problem: 'A campaign was defined by telephone area codes but downstream audience systems required ZIP-based geographic lists.', fix: 'The team converted area-code regions into ZIP candidates and used those ZIPs for local campaign analysis.', icon: '📣' },
    dataSources: [
      { icon: '☎️', name: 'Telephone Geography', desc: 'Area-code geography supplies the source region.' },
      { icon: '📮', name: 'ZIP Mapping', desc: 'ZIP records connect postal areas with the relevant phone geography.' },
    ],
    populationChart: { title: 'Area Code ZIP Coverage', subtitle: 'Phone regions can span many ZIP areas depending on geographic footprint', unit: 'relative ZIP count', bars: [{ label: 'Small area', value: 15 }, { label: 'Metro area', value: 60 }, { label: 'Large region', value: 100 }] },
  },
  'zip-code-elevation': {
    tagline: 'Find the **average elevation associated with a US ZIP code** for altitude research, weather studies, shipping analysis and geographic context.',
    proTip: '✓ Feet + meters • ✓ US ZIP coverage • ZIP elevation is representative geographic context and can vary within large ZIP areas.',
    howToSteps: [
      { num: 1, title: 'Enter ZIP:', desc: 'Enter the 5-digit ZIP code you want to analyze.' },
      { num: 2, title: 'Read Elevation:', desc: 'View the ZIP-level elevation value in feet and meters.' },
      { num: 3, title: 'Compare Regions:', desc: 'Compare altitude between ZIP areas or geographic markets.' },
      { num: 4, title: 'Apply the Data:', desc: 'Use elevation as supporting context for weather, health, logistics or geographic research.' },
    ],
    featureCards: [
      { icon: '⛰️', title: 'Elevation by ZIP', desc: 'Find representative altitude for a US ZIP area.', bullets: ['Feet', 'Meters', 'ZIP input'] },
      { icon: '🌦️', title: 'Weather Context', desc: 'Use altitude as a geographic factor in weather and climate research.', bullets: ['Climate', 'Snow', 'Temperature context'] },
      { icon: '🚚', title: 'Logistics Context', desc: 'Consider terrain and elevation when evaluating regional operations.', bullets: ['Terrain', 'Shipping', 'Fleet research'] },
    ],
    useCases: [
      { icon: '🌨️', title: 'Weather Research', desc: 'Compare ZIP-level elevation when studying climate and precipitation patterns.' },
      { icon: '🏔️', title: 'Geographic Studies', desc: 'Use altitude as a geographic variable in regional analysis.' },
      { icon: '📦', title: 'Shipping Research', desc: 'Add terrain context to high-altitude logistics and delivery analysis.' },
    ],
    statsTable: [
      { label: 'Input', value: 'US ZIP' }, { label: 'Output', value: 'Elevation' }, { label: 'Units', value: 'ft + m' }, { label: 'Use', value: 'Geographic context' },
    ],
    successStory: { title: 'How a Researcher Added Terrain to ZIP Analysis', problem: 'A regional study compared locations but ignored altitude as a factor in weather and terrain.', fix: 'The researcher added ZIP-level elevation to the dataset and used it alongside other geographic variables.', icon: '⛰️' },
    dataSources: [
      { icon: '⛰️', name: 'Elevation Data', desc: 'Representative elevation values provide altitude context for the ZIP area.' },
      { icon: '📮', name: 'ZIP Geography', desc: 'ZIP records provide the geographic unit used for the elevation lookup.' },
    ],
    populationChart: { title: 'Illustrative ZIP Elevation Bands', subtitle: 'US ZIPs span low coastal areas to high mountain regions', unit: 'relative elevation', bars: [{ label: 'Coastal', value: 5 }, { label: 'Lowland', value: 25 }, { label: 'Plateau', value: 55 }, { label: 'Mountain', value: 100 }] },
  },
  'zip-code-format-guide': {
    tagline: 'Learn the **US ZIP code structure, five-digit format, leading zeros, storage rules and postal-data best practices** for forms and databases.',
    proTip: '✓ 5-digit format • ✓ Leading-zero safe • ✓ Database guidance • Store ZIP values as text when leading zeros must be preserved.',
    howToSteps: [
      { num: 1, title: 'Identify ZIP Type:', desc: 'Determine whether your field contains a standard five-digit ZIP or an extended postal representation.' },
      { num: 2, title: 'Preserve Leading Zeros:', desc: 'Treat ZIP values as strings so values such as 02108 remain five digits.' },
      { num: 3, title: 'Set Validation Rules:', desc: 'Use appropriate length and numeric-character rules for your application.' },
      { num: 4, title: 'Store Consistently:', desc: 'Choose a text-based database column and consistent normalization strategy.' },
    ],
    featureCards: [
      { icon: '🔢', title: 'Five-Digit Structure', desc: 'Understand the standard US ZIP representation used in forms and datasets.', bullets: ['5 digits', 'Leading zeros', 'Text storage'] },
      { icon: '💾', title: 'Database Storage', desc: 'Avoid losing leading zeros or accidentally converting ZIPs into numbers.', bullets: ['VARCHAR/text', 'Import rules', 'ETL safety'] },
      { icon: '🧪', title: 'Application Testing', desc: 'Build reliable ZIP handling into forms, APIs and data pipelines.', bullets: ['Forms', 'APIs', 'QA cases'] },
    ],
    useCases: [
      { icon: '💻', title: 'Software Development', desc: 'Design ZIP fields correctly in web applications and APIs.' },
      { icon: '🗄️', title: 'SQL Databases', desc: 'Store postal ZIP values without losing leading zeros.' },
      { icon: '📊', title: 'Excel & CSV', desc: 'Prevent spreadsheet imports from converting ZIP strings into numbers.' },
    ],
    statsTable: [
      { label: 'Standard ZIP', value: '5 digits' }, { label: 'Leading Zero', value: 'Preserve' }, { label: 'Recommended DB Type', value: 'Text' }, { label: 'Primary Use', value: 'Postal geography' },
    ],
    successStory: { title: 'How a Database Migration Stopped ZIP Corruption', problem: 'A legacy migration converted ZIP values into integers and stripped leading zeros from Northeastern US records.', fix: 'The team changed the schema to a text field, added format checks and reprocessed the affected records.', icon: '💾' },
    dataSources: [
      { icon: '📮', name: 'US ZIP Structure', desc: 'Postal ZIP conventions define the basic five-digit representation.' },
      { icon: '💾', name: 'Data Engineering Practices', desc: 'String storage and normalization prevent common ZIP-data corruption.' },
    ],
    populationChart: { title: 'ZIP Data Quality Workflow', subtitle: 'A reliable ZIP field moves through format, storage and validation stages', unit: 'stage', bars: [{ label: 'Format', value: 1 }, { label: 'Normalize', value: 2 }, { label: 'Store as text', value: 3 }, { label: 'Test', value: 4 }] },
  },
  'zip-code-generator': {
    tagline: 'Generate **US ZIP-code test data** for software QA, demos, forms, database development and sample datasets without creating real customer records.',
    proTip: '✓ Testing focused • ✓ State filters • ✓ ZIP-type options • Generated ZIPs are for testing and demonstration, not proof that an address exists at that ZIP.',
    howToSteps: [
      { num: 1, title: 'Choose State:', desc: 'Optionally narrow generated ZIP examples to a US state.' },
      { num: 2, title: 'Choose ZIP Type:', desc: 'Select the available ZIP category appropriate for your test case.' },
      { num: 3, title: 'Generate Samples:', desc: 'Create random ZIP values from the local ZIP dataset.' },
      { num: 4, title: 'Use in QA:', desc: 'Insert the generated values into forms, fixtures, demos and test databases.' },
    ],
    featureCards: [
      { icon: '🎲', title: 'Random ZIP Samples', desc: 'Generate realistic US ZIP values for non-production test data.', bullets: ['Random selection', 'US coverage', 'Repeatable QA'] },
      { icon: '🧪', title: 'QA & Testing', desc: 'Populate forms and APIs without using real customer records.', bullets: ['Validation tests', 'Fixtures', 'Demo data'] },
      { icon: '🗂️', title: 'State Filtering', desc: 'Create test data that represents specific regional cases.', bullets: ['State filter', 'ZIP category', 'Regional QA'] },
    ],
    useCases: [
      { icon: '💻', title: 'Frontend Testing', desc: 'Populate ZIP fields and edge cases during UI development.' },
      { icon: '🗄️', title: 'Database QA', desc: 'Load realistic postal values into development and test environments.' },
      { icon: '🎤', title: 'Product Demos', desc: 'Use plausible ZIP examples when demonstrating geographic features.' },
    ],
    statsTable: [
      { label: 'Dataset', value: 'US ZIPs' }, { label: 'Purpose', value: 'Testing' }, { label: 'Filters', value: 'State / type' }, { label: 'Production Data', value: 'No' },
    ],
    successStory: { title: 'How QA Replaced Handwritten ZIP Fixtures', problem: 'Developers repeatedly typed the same ZIP values into tests and missed regional edge cases.', fix: 'The team generated diverse state-filtered ZIP samples and used them as automated test fixtures.', icon: '🧪' },
    dataSources: [
      { icon: '📮', name: 'Local ZIP Dataset', desc: 'Generated values are selected from the available US ZIP dataset.' },
      { icon: '🧪', name: 'QA Workflow', desc: 'Randomized selection supports broader test coverage without customer data.' },
    ],
    populationChart: { title: 'ZIP Test-Data Workflow', subtitle: 'Generate realistic values while keeping test data separate from production records', unit: 'stage', bars: [{ label: 'Choose scope', value: 1 }, { label: 'Generate', value: 2 }, { label: 'Inject test data', value: 3 }, { label: 'Run QA', value: 4 }] },
  },
  'zip-code-population': {
    tagline: 'Explore **US ZIP code population, housing, households and demographic statistics** for market sizing, research and geographic planning.',
    proTip: '✓ Census-style demographics • ✓ Population + housing • ✓ ZIP-level market analysis • Remember that ZIP-level estimates can include statistical margins of error.',
    howToSteps: [
      { num: 1, title: 'Enter ZIP:', desc: 'Enter the ZIP code whose population and demographic profile you want to research.' },
      { num: 2, title: 'Review Population:', desc: 'Read resident population and related household or housing measures.' },
      { num: 3, title: 'Compare Metrics:', desc: 'Use density, households, income or other available fields to understand the market.' },
      { num: 4, title: 'Apply to Planning:', desc: 'Use the statistics for market sizing, research and geographic business decisions.' },
    ],
    featureCards: [
      { icon: '👥', title: 'Population', desc: 'See the resident population associated with a US ZIP area.', bullets: ['Population', 'Households', 'Density'] },
      { icon: '🏠', title: 'Housing Data', desc: 'Use housing-unit and household measures to understand market scale.', bullets: ['Housing units', 'Households', 'Occupancy'] },
      { icon: '📈', title: 'Market Research', desc: 'Turn ZIP demographics into a practical geographic market view.', bullets: ['Market size', 'Demographics', 'Planning'] },
    ],
    useCases: [
      { icon: '🏬', title: 'Retail Site Research', desc: 'Compare nearby ZIP populations when evaluating store markets.' },
      { icon: '📣', title: 'Marketing Segmentation', desc: 'Use population and household measures to prioritize ZIP audiences.' },
      { icon: '🏘️', title: 'Real Estate Research', desc: 'Study population and housing context around property markets.' },
    ],
    statsTable: [
      { label: 'Geography', value: 'US ZIP' }, { label: 'Population', value: 'Included' }, { label: 'Housing', value: 'Included' }, { label: 'Market Use', value: 'Yes' },
    ],
    successStory: { title: 'How a Retail Analyst Compared ZIP Markets', problem: 'A retail team had several candidate markets but needed a consistent population baseline before deeper research.', fix: 'The analyst compared ZIP population and housing measures, then prioritized markets for detailed customer and competitor analysis.', icon: '📈' },
    dataSources: [
      { icon: '🏛️', name: 'Census-Style Estimates', desc: 'ZIP-level demographic estimates provide population and household context.' },
      { icon: '📮', name: 'ZIP Geography', desc: 'ZIP records define the geographic unit for demographic reporting.' },
    ],
    populationChart: { title: 'ZIP Market Size Factors', subtitle: 'Population is only one part of ZIP-level market potential', unit: 'relative factor', bars: [{ label: 'Population', value: 100 }, { label: 'Households', value: 80 }, { label: 'Housing', value: 75 }, { label: 'Density', value: 60 }] },
  },
  'zip-code-type': {
    tagline: 'Identify **US ZIP code types such as Standard, PO Box, Unique and military ZIP categories** for postal-data classification and business rules.',
    proTip: '✓ ZIP-type classification • ✓ Standard / PO Box / Unique / military context • Use ZIP type as a data attribute, not as proof of a deliverable street address.',
    howToSteps: [
      { num: 1, title: 'Enter ZIP:', desc: 'Enter the 5-digit ZIP you want to classify.' },
      { num: 2, title: 'Read ZIP Type:', desc: 'Review the category assigned to the ZIP record.' },
      { num: 3, title: 'Understand the Geography:', desc: 'Use the type to distinguish ordinary geographic delivery areas from special postal categories.' },
      { num: 4, title: 'Apply Business Rules:', desc: 'Use ZIP type in data validation, shipping logic and postal workflows.' },
    ],
    featureCards: [
      { icon: '🏷️', title: 'ZIP Classification', desc: 'Identify the postal category associated with a ZIP record.', bullets: ['Standard', 'PO Box', 'Unique'] },
      { icon: '🪖', title: 'Military ZIP Context', desc: 'Recognize military postal categories used by APO, FPO and DPO communities.', bullets: ['APO', 'FPO', 'DPO'] },
      { icon: '⚙️', title: 'Business Rules', desc: 'Use ZIP type to drive downstream application behavior.', bullets: ['Shipping logic', 'Forms', 'Data QA'] },
    ],
    useCases: [
      { icon: '📦', title: 'Shipping Logic', desc: 'Classify ZIPs before applying shipping and fulfillment rules.' },
      { icon: '🧹', title: 'Data Quality', desc: 'Add ZIP-type context to geographic data pipelines.' },
      { icon: '💻', title: 'Application Rules', desc: 'Use ZIP type to trigger appropriate UI or workflow behavior.' },
    ],
    statsTable: [
      { label: 'Types', value: 'Multiple categories' }, { label: 'Input', value: '5-digit ZIP' }, { label: 'Output', value: 'ZIP type' }, { label: 'Use', value: 'Postal data rules' },
    ],
    successStory: { title: 'How an Ecommerce Team Separated Special ZIPs', problem: 'A shipping workflow treated every ZIP as an ordinary geographic delivery area.', fix: 'The team added ZIP-type classification so special postal categories could follow separate operational rules.', icon: '📦' },
    dataSources: [
      { icon: '📮', name: 'ZIP Type Classification', desc: 'ZIP records include the category used to distinguish standard and special postal areas.' },
      { icon: '🪖', name: 'Military Postal Geography', desc: 'Military ZIP categories provide context for APO/FPO/DPO records.' },
    ],
    populationChart: { title: 'ZIP Type Categories', subtitle: 'US ZIP datasets contain several postal-use categories', unit: 'category', bars: [{ label: 'Standard', value: 100 }, { label: 'PO Box', value: 45 }, { label: 'Unique', value: 20 }, { label: 'Military', value: 5 }] },
  },
  'zip-time-converter': {
    tagline: 'Convert **local time between US ZIP codes** for meetings, customer support, remote teams, sales calls and distributed operations.',
    proTip: '✓ Current local time • ✓ Daylight-saving aware • ✓ ZIP-to-ZIP comparison • Always confirm exceptional local rules for critical scheduling.',
    howToSteps: [
      { num: 1, title: 'Enter First ZIP:', desc: 'Enter the ZIP representing the first local time zone.' },
      { num: 2, title: 'Enter Second ZIP:', desc: 'Enter the ZIP representing the destination or comparison time zone.' },
      { num: 3, title: 'Compare Times:', desc: 'View the local time relationship between the two ZIP areas.' },
      { num: 4, title: 'Schedule:', desc: 'Use the difference to choose practical meeting, calling or support windows.' },
    ],
    featureCards: [
      { icon: '🕐', title: 'ZIP Time Conversion', desc: 'Compare local time across two US ZIP areas.', bullets: ['Origin time', 'Destination time', 'Time difference'] },
      { icon: '🌞', title: 'DST Context', desc: 'Account for normal US daylight-saving transitions where applicable.', bullets: ['DST', 'Seasonal changes', 'Local time'] },
      { icon: '📅', title: 'Scheduling', desc: 'Turn geographic time differences into practical business schedules.', bullets: ['Meetings', 'Calls', 'Support'] },
    ],
    useCases: [
      { icon: '👥', title: 'Remote Meetings', desc: 'Find a meeting time that works across customer and employee ZIP regions.' },
      { icon: '☎️', title: 'Customer Calls', desc: 'Avoid calling too early or too late by checking the recipient ZIP time.' },
      { icon: '🌎', title: 'Distributed Operations', desc: 'Coordinate regional teams using ZIP-level local-time context.' },
    ],
    statsTable: [
      { label: 'Input', value: '2 US ZIPs' }, { label: 'Output', value: 'Local times' }, { label: 'DST', value: 'Supported' }, { label: 'Use', value: 'Scheduling' },
    ],
    successStory: { title: 'How a Support Manager Fixed Cross-Time-Zone Scheduling', problem: 'A support team repeatedly scheduled customer calls during the customer’s evening because agents were using their own local clocks.', fix: 'The team checked both ZIP locations before scheduling and standardized outreach windows by customer time zone.', icon: '📅' },
    dataSources: [
      { icon: '🕐', name: 'US Time-Zone Data', desc: 'ZIP geography is mapped to the appropriate local time-zone context.' },
      { icon: '🌞', name: 'Daylight-Saving Rules', desc: 'Normal seasonal time changes are incorporated into local-time calculations.' },
    ],
    populationChart: { title: 'US ZIP Time Difference', subtitle: 'The continental US spans multiple major time zones', unit: 'hours', bars: [{ label: 'Same zone', value: 0 }, { label: 'Adjacent zone', value: 1 }, { label: 'Two zones', value: 2 }, { label: 'Coast-to-coast', value: 3 }] },
  },
  'zip-to-area-code': {
    tagline: 'Find the **telephone area code for any US ZIP code** and connect postal geography with phone-number regions for CRM and communications analysis.',
    proTip: '✓ ZIP-to-phone geography • ✓ Overlay context • An area code indicates numbering geography, not necessarily where a person currently lives.',
    howToSteps: [
      { num: 1, title: 'Enter ZIP:', desc: 'Enter the US ZIP code you want to analyze.' },
      { num: 2, title: 'Get Area Code:', desc: 'Retrieve the telephone area code associated with that geographic ZIP region.' },
      { num: 3, title: 'Review Overlays:', desc: 'Check for multiple area codes in the same geographic area.' },
      { num: 4, title: 'Apply the Result:', desc: 'Use the area code as geographic context in CRM and communication workflows.' },
    ],
    featureCards: [
      { icon: '📞', title: 'ZIP to Phone Area', desc: 'Connect a postal ZIP to its geographic telephone numbering area.', bullets: ['Area code', 'State', 'City'] },
      { icon: '🔄', title: 'Overlay Context', desc: 'Recognize regions where multiple area codes cover the same geography.', bullets: ['Overlays', '10-digit dialing', 'Metro areas'] },
      { icon: '🧹', title: 'Data Enrichment', desc: 'Add phone-area geography to ZIP-based customer records.', bullets: ['CRM', 'Segmentation', 'Quality checks'] },
    ],
    useCases: [
      { icon: '📱', title: 'CRM Enrichment', desc: 'Add area-code context to customer and lead records.' },
      { icon: '📣', title: 'Phone Campaigns', desc: 'Analyze geographic phone regions for outreach planning.' },
      { icon: '🗺️', title: 'Regional Analysis', desc: 'Compare postal and telephone geographies in the same market.' },
    ],
    statsTable: [
      { label: 'Input', value: 'US ZIP' }, { label: 'Output', value: 'Area code(s)' }, { label: 'System', value: 'NANP' }, { label: 'Overlay', value: 'Supported' },
    ],
    successStory: { title: 'How a CRM Added Telephone Geography', problem: 'A customer system stored ZIP codes but had no derived phone-area field for regional analysis.', fix: 'The company added ZIP-to-area-code enrichment and used the result as an additional reporting dimension.', icon: '📱' },
    dataSources: [
      { icon: '☎️', name: 'Telephone Area Geography', desc: 'NANP geographic assignments provide the phone-region relationship.' },
      { icon: '📮', name: 'US ZIP Data', desc: 'ZIP records provide the geographic input for the area-code mapping.' },
    ],
    populationChart: { title: 'ZIP-to-Area-Code Workflow', subtitle: 'Postal geography can be enriched with telephone numbering context', unit: 'stage', bars: [{ label: 'ZIP', value: 1 }, { label: 'Area code', value: 2 }, { label: 'Overlay check', value: 3 }, { label: 'CRM use', value: 4 }] },
  },
  'zip-to-city': {
    tagline: 'Find the **city, state and county associated with any US ZIP code** for geographic research, data enrichment and postal-area analysis.',
    proTip: '✓ 41k+ ZIP records • ✓ City + state + county • A ZIP’s preferred city name is a postal relationship and may differ from the incorporated municipality name.',
    howToSteps: [
      { num: 1, title: 'Enter ZIP:', desc: 'Enter a valid 5-digit US ZIP code.' },
      { num: 2, title: 'Find City:', desc: 'Retrieve the city or preferred locality associated with the ZIP.' },
      { num: 3, title: 'Review State & County:', desc: 'Use the additional geography fields to confirm the broader region.' },
      { num: 4, title: 'Enrich Your Data:', desc: 'Use the result in customer, reporting, shipping or geographic workflows.' },
    ],
    featureCards: [
      { icon: '🏙️', title: 'ZIP to City', desc: 'Convert a five-digit ZIP into a city/locality name.', bullets: ['City', 'State', 'County'] },
      { icon: '🗺️', title: 'Geographic Context', desc: 'See the broader state and county around the ZIP.', bullets: ['State', 'County', 'Region'] },
      { icon: '🧹', title: 'Data Enrichment', desc: 'Fill missing city fields in geographic datasets.', bullets: ['CRM', 'Reports', 'Forms'] },
    ],
    useCases: [
      { icon: '📋', title: 'Customer Data', desc: 'Fill city fields from ZIP values in CRM or account records.' },
      { icon: '🚚', title: 'Shipping Research', desc: 'Use city context when reviewing destination ZIP records.' },
      { icon: '📊', title: 'Geographic Reporting', desc: 'Group ZIP-level records by city and state.' },
    ],
    statsTable: [
      { label: 'Coverage', value: '41k+ ZIPs' }, { label: 'Input', value: '5-digit ZIP' }, { label: 'Output', value: 'City / state / county' }, { label: 'Use', value: 'Data enrichment' },
    ],
    successStory: { title: 'How a Data Team Filled Missing City Fields', problem: 'A CRM export had ZIP codes but thousands of missing city values.', fix: 'The team used ZIP-to-city mapping to populate city and county context before generating geographic reports.', icon: '🧹' },
    dataSources: [
      { icon: '📮', name: 'US ZIP Dataset', desc: 'ZIP records provide the postal-to-city relationship.' },
      { icon: '🗺️', name: 'County & State Mapping', desc: 'Additional geography fields provide state and county context.' },
    ],
    populationChart: { title: 'ZIP Geographic Enrichment', subtitle: 'A ZIP can provide multiple geographic fields for one record', unit: 'field', bars: [{ label: 'ZIP', value: 1 }, { label: 'City', value: 2 }, { label: 'State', value: 3 }, { label: 'County', value: 4 }] },
  },
  'zip-to-county': {
    tagline: 'Find the **county and FIPS code for any US ZIP code** for government reporting, GIS, market analysis and territory classification.',
    proTip: '✓ County + FIPS • ✓ US ZIP coverage • ZIP and county boundaries do not always align perfectly, so county assignment is a geographic classification.',
    howToSteps: [
      { num: 1, title: 'Enter ZIP:', desc: 'Enter the five-digit ZIP code.' },
      { num: 2, title: 'Find County:', desc: 'Retrieve the county associated with the ZIP record.' },
      { num: 3, title: 'Review FIPS:', desc: 'Use the county FIPS identifier for database and reporting workflows.' },
      { num: 4, title: 'Join Data:', desc: 'Use county information to connect ZIP records with county-level datasets.' },
    ],
    featureCards: [
      { icon: '🏛️', title: 'County Lookup', desc: 'Find the county associated with a US ZIP.', bullets: ['County', 'State', 'FIPS'] },
      { icon: '🔢', title: 'FIPS Identifier', desc: 'Use standardized county codes in analytical datasets.', bullets: ['FIPS', 'Database joins', 'Reporting'] },
      { icon: '📊', title: 'Geographic Analysis', desc: 'Bridge ZIP-level records to county-level research.', bullets: ['Markets', 'Government', 'GIS'] },
    ],
    useCases: [
      { icon: '🏛️', title: 'Government Reporting', desc: 'Map ZIP-level records to county identifiers for reporting workflows.' },
      { icon: '📈', title: 'Market Analysis', desc: 'Aggregate customer or population records by county.' },
      { icon: '🗄️', title: 'Database Joins', desc: 'Use FIPS as a stable county key in data pipelines.' },
    ],
    statsTable: [
      { label: 'Input', value: 'US ZIP' }, { label: 'Output', value: 'County + FIPS' }, { label: 'Coverage', value: '41k+ ZIPs' }, { label: 'Use', value: 'Data joins' },
    ],
    successStory: { title: 'How an Analyst Connected ZIPs to County Data', problem: 'A customer dataset was organized by ZIP while the demographic source was organized by county FIPS.', fix: 'The analyst mapped each ZIP to county/FIPS and used the identifier to join the two datasets.', icon: '🔢' },
    dataSources: [
      { icon: '🏛️', name: 'County Mapping', desc: 'County relationships provide the administrative geography.' },
      { icon: '🔢', name: 'FIPS Codes', desc: 'County FIPS identifiers support standardized analytical joins.' },
    ],
    populationChart: { title: 'ZIP-to-County Data Join', subtitle: 'A postal ZIP can be connected to administrative county geography', unit: 'stage', bars: [{ label: 'ZIP record', value: 1 }, { label: 'County', value: 2 }, { label: 'FIPS', value: 3 }, { label: 'Joined dataset', value: 4 }] },
  },
  'zip-to-state': {
    tagline: 'Find **which US state or territory a ZIP code belongs to** and return the full state name and abbreviation for geographic data workflows.',
    proTip: '✓ 5-digit ZIP input • ✓ Full state + abbreviation • Use state mapping as a geographic classification for ZIP-level records.',
    howToSteps: [
      { num: 1, title: 'Enter ZIP:', desc: 'Enter the five-digit US ZIP code.' },
      { num: 2, title: 'Identify State:', desc: 'Retrieve the full state name associated with the ZIP.' },
      { num: 3, title: 'Get Abbreviation:', desc: 'Use the two-letter state code in reports and datasets.' },
      { num: 4, title: 'Apply the Mapping:', desc: 'Group ZIP records by state for business and geographic analysis.' },
    ],
    featureCards: [
      { icon: '🗺️', title: 'State Identification', desc: 'Find the state represented by a US ZIP.', bullets: ['State name', 'Abbreviation', 'ZIP input'] },
      { icon: '📊', title: 'Data Grouping', desc: 'Use state as a dimension for ZIP-level datasets.', bullets: ['Reports', 'CRM', 'Markets'] },
      { icon: '🇺🇸', title: 'US Coverage', desc: 'Designed around US ZIP geography and state-level organization.', bullets: ['50 states', 'Regional data', 'State filters'] },
    ],
    useCases: [
      { icon: '📊', title: 'State Reporting', desc: 'Group ZIP-level records into state summaries.' },
      { icon: '🏢', title: 'Sales Territories', desc: 'Add state context to customer and account records.' },
      { icon: '🧹', title: 'Data Enrichment', desc: 'Fill missing state values from a ZIP field.' },
    ],
    statsTable: [
      { label: 'Input', value: '5-digit ZIP' }, { label: 'Output', value: 'State + code' }, { label: 'Coverage', value: 'US ZIPs' }, { label: 'Use', value: 'Geographic grouping' },
    ],
    successStory: { title: 'How a Reporting Pipeline Recovered State Values', problem: 'A ZIP-level export lacked state abbreviations, preventing reliable regional reporting.', fix: 'The team mapped each ZIP to its state name and code before loading the records into its reporting system.', icon: '📊' },
    dataSources: [
      { icon: '📮', name: 'ZIP-State Mapping', desc: 'ZIP records supply the state classification.' },
      { icon: '🇺🇸', name: 'State Codes', desc: 'Two-letter state abbreviations provide a compact reporting key.' },
    ],
    populationChart: { title: 'ZIP-to-State Enrichment', subtitle: 'State mapping adds a reusable geographic dimension to ZIP records', unit: 'field', bars: [{ label: 'ZIP', value: 1 }, { label: 'State name', value: 2 }, { label: 'State code', value: 3 }] },
  },
  'zip-to-timezone-map': {
    tagline: 'Explore **US ZIP time-zone geography visually** to understand Eastern, Central, Mountain, Pacific, Alaska and Hawaii coverage.',
    proTip: '✓ Visual timezone context • ✓ ZIP-level geography • Time-zone boundaries are not identical to state boundaries and can contain special local rules.',
    howToSteps: [
      { num: 1, title: 'Open the Timezone View:', desc: 'Load the visual ZIP time-zone coverage.' },
      { num: 2, title: 'Locate a Region:', desc: 'Inspect the area around a state, city or ZIP.' },
      { num: 3, title: 'Compare Zones:', desc: 'See how neighboring regions move between local-time zones.' },
      { num: 4, title: 'Use the Map:', desc: 'Apply the visual context to scheduling, operations and geographic research.' },
    ],
    featureCards: [
      { icon: '🕐', title: 'Timezone Geography', desc: 'See how ZIP areas are distributed across US time zones.', bullets: ['Eastern', 'Central', 'Mountain', 'Pacific'] },
      { icon: '🗺️', title: 'Visual Context', desc: 'Understand time-zone transitions geographically rather than as a simple list.', bullets: ['Borders', 'Regional view', 'ZIP context'] },
      { icon: '📅', title: 'Operations Planning', desc: 'Use the map to reason about local-time coverage.', bullets: ['Scheduling', 'Support', 'Operations'] },
    ],
    useCases: [
      { icon: '☎️', title: 'Call-Center Coverage', desc: 'Visualize customer time zones before setting outreach windows.' },
      { icon: '🌎', title: 'Regional Operations', desc: 'Understand local-time differences across service regions.' },
      { icon: '🎓', title: 'Geographic Education', desc: 'Use ZIP-level time-zone geography to explain US time zones.' },
    ],
    statsTable: [
      { label: 'Primary US Zones', value: '6' }, { label: 'View', value: 'Interactive' }, { label: 'Geography', value: 'ZIP-level' }, { label: 'Use', value: 'Time-zone research' },
    ],
    successStory: { title: 'How a Distributed Team Visualized Coverage', problem: 'A national support team struggled to understand where local-time handoffs occurred between regions.', fix: 'The team used ZIP time-zone geography to visualize coverage and set staffing windows around local customer time.', icon: '🗺️' },
    dataSources: [
      { icon: '🕐', name: 'US Time-Zone Data', desc: 'Time-zone assignments provide the geographic classification.' },
      { icon: '📮', name: 'ZIP Geography', desc: 'ZIP records provide the spatial units displayed in the timezone view.' },
    ],
    populationChart: { title: 'US Time-Zone Coverage', subtitle: 'Major US ZIP regions span several local-time zones', unit: 'relative coverage', bars: [{ label: 'Eastern', value: 100 }, { label: 'Central', value: 95 }, { label: 'Mountain', value: 45 }, { label: 'Pacific', value: 65 }, { label: 'Alaska', value: 5 }, { label: 'Hawaii', value: 3 }] },
  },
  'zip-to-zip-route': {
    tagline: 'Plan a **driving route between two US ZIP codes** with route distance, estimated travel time and turn-by-turn navigation context.',
    proTip: '✓ Road-route intent • ✓ Driving distance • ✓ Travel-time estimate • ZIP-level routing is a planning estimate; exact address routes can differ.',
    howToSteps: [
      { num: 1, title: 'Enter Origin ZIP:', desc: 'Enter the starting ZIP for the trip.' },
      { num: 2, title: 'Enter Destination ZIP:', desc: 'Enter the destination ZIP.' },
      { num: 3, title: 'Generate Route:', desc: 'Run the route workflow to calculate road distance and estimated time.' },
      { num: 4, title: 'Open Navigation:', desc: 'Use the route result as the basis for final turn-by-turn navigation.' },
    ],
    featureCards: [
      { icon: '🛣️', title: 'ZIP-to-ZIP Route', desc: 'Create a road route between two US ZIP locations.', bullets: ['Origin', 'Destination', 'Route'] },
      { icon: '🚗', title: 'Driving Metrics', desc: 'Review estimated mileage and travel time.', bullets: ['Miles', 'Time', 'Road route'] },
      { icon: '🧭', title: 'Navigation Handoff', desc: 'Use the route as a starting point for detailed navigation.', bullets: ['Directions', 'Trip planning', 'Dispatch'] },
    ],
    useCases: [
      { icon: '🚚', title: 'Delivery Routing', desc: 'Plan a first-pass road route between facility and destination ZIPs.' },
      { icon: '🧑‍💼', title: 'Sales Travel', desc: 'Estimate the route between a rep’s base and a customer ZIP.' },
      { icon: '🛠️', title: 'Service Visits', desc: 'Plan technician travel between service areas.' },
    ],
    statsTable: [
      { label: 'Input', value: '2 US ZIPs' }, { label: 'Output', value: 'Route + miles' }, { label: 'Time', value: 'Estimated' }, { label: 'Use', value: 'Road planning' },
    ],
    successStory: { title: 'How a Dispatcher Built a Faster Pre-Trip Workflow', problem: 'A dispatcher needed a quick route estimate before assigning a delivery between two regional ZIPs.', fix: 'The dispatcher generated the ZIP-to-ZIP route first, then confirmed the final address route in navigation before dispatch.', icon: '🚚' },
    dataSources: [
      { icon: '🛣️', name: 'Road Network Data', desc: 'Road routing provides the driving path and estimated travel metrics.' },
      { icon: '📍', name: 'ZIP Geography', desc: 'ZIPs provide the origin and destination location context.' },
    ],
    populationChart: { title: 'Route Planning Workflow', subtitle: 'ZIP routing moves from geographic input to road navigation', unit: 'stage', bars: [{ label: 'ZIP inputs', value: 1 }, { label: 'Route', value: 2 }, { label: 'Mileage', value: 3 }, { label: 'Navigation', value: 4 }] },
  },
  'zips-by-city-name': {
    tagline: 'Search **US ZIP codes by city or community name across all 50 states** when the city is known but the ZIP is not.',
    proTip: '✓ Nationwide city-name search • ✓ Same city names across states • Include the state when known to reduce ambiguous matches.',
    howToSteps: [
      { num: 1, title: 'Enter City Name:', desc: 'Type the city or community name you want to search across the US.' },
      { num: 2, title: 'Review Matches:', desc: 'See ZIP records associated with matching city names.' },
      { num: 3, title: 'Narrow by State:', desc: 'Use state context to separate communities that share the same name.' },
      { num: 4, title: 'Use the Results:', desc: 'Apply the ZIP list to research, data enrichment and geographic analysis.' },
    ],
    featureCards: [
      { icon: '🏙️', title: 'Nationwide City Search', desc: 'Search ZIP records using a city or community name.', bullets: ['All states', 'City input', 'ZIP results'] },
      { icon: '🔎', title: 'Ambiguous Name Handling', desc: 'Find every matching community when the same city name occurs in multiple states.', bullets: ['State context', 'Multiple matches', 'Research'] },
      { icon: '📋', title: 'ZIP List Output', desc: 'Turn city-name searches into usable postal ZIP lists.', bullets: ['ZIPs', 'State', 'City'] },
    ],
    useCases: [
      { icon: '📍', title: 'Location Research', desc: 'Find ZIPs when only a city name is known.' },
      { icon: '📣', title: 'Local Campaign Setup', desc: 'Build ZIP audiences from city-name targets.' },
      { icon: '🧹', title: 'Data Enrichment', desc: 'Resolve city names into postal ZIP candidates for downstream workflows.' },
    ],
    statsTable: [
      { label: 'Coverage', value: 'All 50 states' }, { label: 'Input', value: 'City name' }, { label: 'Output', value: 'Matching ZIPs' }, { label: 'Ambiguity', value: 'State-aware' },
    ],
    successStory: { title: 'How a Researcher Resolved an Ambiguous City Name', problem: 'A source file contained a city name but omitted the state, and the same city name existed in several states.', fix: 'The researcher searched nationwide, reviewed all matching ZIPs and then used additional context to select the correct state.', icon: '🔎' },
    dataSources: [
      { icon: '🏙️', name: 'City Name Mapping', desc: 'City/community names provide the search key.' },
      { icon: '📮', name: 'US ZIP Records', desc: 'ZIP records provide the postal areas associated with matching city names.' },
    ],
    populationChart: { title: 'City Name Search Scope', subtitle: 'A city-name query can produce one or many state-level matches', unit: 'scope', bars: [{ label: 'Unique city', value: 1 }, { label: 'Multi-state name', value: 4 }, { label: 'Common city name', value: 10 }] },
  },
  'zips-within-radius': {
    tagline: 'Find **US ZIP codes within 5–500 miles of a center ZIP** for marketing territories, delivery areas, service coverage, population research and geographic planning.',
    proTip: '✓ Local US ZIP dataset • ✓ 5–500 miles • ✓ Population + county + state • Geographic radius uses ZIP representative points, not road travel.',
    howToSteps: [
      { num: 1, title: 'Enter Center ZIP:', desc: 'Enter the US ZIP code that defines the center of the geographic search.' },
      { num: 2, title: 'Choose Radius:', desc: 'Select a radius from 5 to 500 miles depending on your market or territory use case.' },
      { num: 3, title: 'Find Nearby ZIPs:', desc: 'The tool filters the local US ZIP dataset using geographic distance.' },
      { num: 4, title: 'Analyze & Export:', desc: 'Review ZIP count, population, county and state coverage, then download the results.' },
    ],
    featureCards: [
      { icon: '🎯', title: 'Radius Search', desc: 'Find every ZIP whose representative point falls inside your selected geographic radius.', bullets: ['5–500 miles', 'Cross-state', 'Up to 500 results'] },
      { icon: '👥', title: 'Market Size', desc: 'Use population and ZIP counts to estimate the size of a geographic market.', bullets: ['Population', 'ZIP count', 'States'] },
      { icon: '🚚', title: 'Territory Planning', desc: 'Build candidate sales, delivery and service territories from a consistent radius.', bullets: ['Marketing', 'Delivery', 'Service'] },
    ],
    useCases: [
      { icon: '📣', title: 'Marketing Radius', desc: 'Build local ZIP audiences around stores, branches and campaign centers.' },
      { icon: '💼', title: 'Sales Territories', desc: 'Create candidate ZIP territories and refine them using customer and revenue data.' },
      { icon: '🚚', title: 'Delivery Coverage', desc: 'Create a first-pass ZIP service area around warehouses, restaurants and field hubs.' },
    ],
    statsTable: [
      { label: 'US ZIP Records', value: '41k+' }, { label: 'Radius', value: '5–500 mi' }, { label: 'Results', value: 'Up to 500' }, { label: 'Method', value: 'ZIP geography' },
    ],
    successStory: { title: 'How a Branch Built a Candidate Market Area', problem: 'A new branch needed a quick ZIP-level market boundary before detailed customer and road analysis.', fix: 'The team searched a 25-mile radius, reviewed ZIP population and county coverage, then exported the ZIP list for territory planning.', icon: '🎯' },
    dataSources: [
      { icon: '📮', name: 'Local US ZIP Dataset', desc: 'The calculator uses ToolTrio’s local ZIP data rather than requiring a third-party ZIP search API.' },
      { icon: '🧮', name: 'Haversine Geography', desc: 'Representative ZIP locations are compared using geographic distance to determine radius membership.' },
    ],
    populationChart: { title: 'Typical ZIP Coverage by Radius', subtitle: 'Illustrative counts vary by location and ZIP density', unit: 'ZIPs', bars: [{ label: '5 mi', value: 12 }, { label: '10 mi', value: 38 }, { label: '25 mi', value: 95 }, { label: '50 mi', value: 210 }, { label: '100 mi', value: 560 }] },
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
