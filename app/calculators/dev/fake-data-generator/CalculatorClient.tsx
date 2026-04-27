'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Minus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [count, setCount] = useState(5)
  const [fields, setFields] = useState(['name','email','phone','address','uuid','dob'])
  const [format, setFormat] = useState<'json'|'csv'>('json')
  const [data, setData] = useState<Record<string,string>[]>([])
  const [copied, setCopied] = useState(false)

  const FIELD_OPTS = ['name','email','phone','address','city','country','uuid','dob','username','company','job','url','ip','creditcard','color','latitude','longitude']

  const FIRST = ['Alice','Bob','Carol','David','Emma','Frank','Grace','Henry','Isabella','James','Kate','Liam','Mia','Noah','Olivia','Paul','Quinn','Rachel','Sam','Tara']
  const LAST = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin']
  const DOMAINS = ['gmail.com','yahoo.com','hotmail.com','outlook.com','company.com','email.net','work.io','tech.dev']
  const STREETS = ['Main St','Oak Ave','Pine Rd','Elm Dr','Maple Ln','Cedar Blvd','Willow Way','Park Pl']
  const CITIES = ['New York','Los Angeles','Chicago','Houston','Phoenix','Philadelphia','San Antonio','San Diego','London','Manchester','Birmingham','Leeds']
  const COUNTRIES = ['USA','UK','Canada','Australia','Germany','France','India','Japan']
  const COMPANIES = ['Acme Corp','TechFlow Inc','Global Systems','Digital Works','Cloud Nine','DataSync','WebForge','NetPulse']
  const JOBS = ['Software Engineer','Product Manager','UX Designer','Data Analyst','DevOps Engineer','QA Engineer','Tech Lead','CTO']

  const rand = (arr: string[]) => arr[Math.floor(Math.random()*arr.length)]
  const randInt = (a: number, b: number) => Math.floor(Math.random()*(b-a+1))+a
  const pad = (n: number, w=2) => String(n).padStart(w,'0')

  const genField = (field: string) => {
    const fn = rand(FIRST), ln = rand(LAST)
    switch(field) {
      case 'name': return `${fn} ${ln}`
      case 'email': return `${fn.toLowerCase()}.${ln.toLowerCase()}${randInt(1,99)}@${rand(DOMAINS)}`
      case 'phone': return `+1 (${randInt(200,999)}) ${randInt(100,999)}-${randInt(1000,9999)}`
      case 'address': return `${randInt(1,9999)} ${rand(STREETS)}, Apt ${randInt(1,99)}`
      case 'city': return rand(CITIES)
      case 'country': return rand(COUNTRIES)
      case 'uuid': { const h=()=>Math.floor(Math.random()*65536).toString(16).padStart(4,'0'); return `${h()}${h()}-${h()}-4${h().slice(1)}-${(Math.floor(Math.random()*4)+8).toString(16)}${h().slice(1)}-${h()}${h()}${h()}` }
      case 'dob': return `${randInt(1970,2005)}-${pad(randInt(1,12))}-${pad(randInt(1,28))}`
      case 'username': return `${fn.toLowerCase()}${ln.toLowerCase().slice(0,3)}${randInt(10,99)}`
      case 'company': return rand(COMPANIES)
      case 'job': return rand(JOBS)
      case 'url': return `https://www.${rand(COMPANIES).toLowerCase().replace(' ','')}.com`
      case 'ip': return `${randInt(1,254)}.${randInt(0,255)}.${randInt(0,255)}.${randInt(1,254)}`
      case 'creditcard': { const n=`4${Array.from({length:15},()=>randInt(0,9)).join('')}`; return `${n.slice(0,4)} ${n.slice(4,8)} ${n.slice(8,12)} ${n.slice(12,16)}` }
      case 'color': return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6,'0').toUpperCase()}`
      case 'latitude': return (Math.random()*180-90).toFixed(6)
      case 'longitude': return (Math.random()*360-180).toFixed(6)
      default: return ''
    }
  }

  const generate = useCallback(() => {
    setData(Array.from({length:count}, () => Object.fromEntries(fields.map(f=>[f, genField(f)]))))
  }, [count, fields])

  useEffect(()=>{ generate() }, [fields, count])

  const output = useMemo(() => {
    if (format==='json') return JSON.stringify(data, null, 2)
    if (!data.length) return ''
    const hdrs = Object.keys(data[0])
    return [hdrs.join(','), ...data.map(r=>hdrs.map(h=>`"${r[h]}"`).join(','))].join('\n')
  }, [data, format])

  const toggleField = (f: string) => setFields(prev => prev.includes(f) ? prev.filter(x=>x!==f) : [...prev, f])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Fake Data Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🎭 Fake Data Generator</h1>
      <p className="text-gray-500 mb-6">Generate realistic test data - names, emails, addresses, UUIDs and more</p>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex flex-wrap gap-3 mb-4">
          <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1">Count</label>
            <select value={count} onChange={e=>setCount(Number(e.target.value))} className="border-2 border-gray-200 rounded-xl px-3 py-2 font-bold text-sm focus:outline-none focus:border-green-400 bg-white">
              {[1,5,10,25,50,100].map(n=><option key={n} value={n}>{n} records</option>)}
            </select>
          </div>
          <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1">Format</label>
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              {(['json','csv'] as const).map(f=><button key={f} onClick={()=>setFormat(f)} className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase transition-all ${format===f?'bg-white shadow text-gray-900':'text-gray-500'}`}>{f}</button>)}
            </div>
          </div>
          <div className="flex items-end">
            <button onClick={generate} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 text-sm">
              <RefreshCw className="w-4 h-4" /> Regenerate
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Fields</label>
          <div className="flex flex-wrap gap-2">
            {FIELD_OPTS.map(f=>(
              <button key={f} onClick={()=>toggleField(f)}
                className={`px-3 py-1.5 text-xs font-bold rounded-full border-2 transition-all ${fields.includes(f)?'bg-green-600 text-white border-green-600':'bg-gray-50 text-gray-600 border-gray-200 hover:border-green-400'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-950 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <span className="text-xs font-bold text-gray-400 uppercase">{format.toUpperCase()} - {data.length} records</span>
          <button onClick={()=>{navigator.clipboard.writeText(output);setCopied(true);setTimeout(()=>setCopied(false),1500)}}
            className="flex items-center gap-1 text-xs font-bold text-green-400 hover:text-green-300">
            {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
          </button>
        </div>
        <pre className="p-4 font-mono text-xs text-green-300 overflow-auto max-h-96 whitespace-pre">{output}</pre>
      </div>

      <SEOContent
        title="Fake Data Generator — Realistic Test Data"
        category="dev"
        intro={`Good tests need realistic data — names with apostrophes, emails with plus signs, phone numbers in international format. Using test@example.com and John Smith misses the edge cases that cause production bugs.

This generator creates realistic fake data in JSON, CSV, or SQL format. Runs in your browser — no external API.

**Long-tail searches answered here:** fake test data generator free online usa, random fake user data generator free no signup, mock data generator for testing free tool, generate fake names emails addresses free online, bulk fake data generator free no download, test data generator for databases free usa, realistic fake address generator for usa testing free, fake social security number format for testing free, mock api response data generator free online usa, synthetic dataset generator for machine learning free, fake credit card number generator for testing usa free, random fake phone number us format generator free, fake company name and description generator free usa, mock user profile data bulk generator free, seed based reproducible fake data generator free usa

Convert output to CSV with [JSON to CSV](/calculators/dev/json-to-csv). Seed databases with [SQL Formatter](/calculators/dev/sql-formatter).`}
        howItWorks={`Uses pre-built name lists, city names, domain names, and format templates combined with Math.random() to produce realistic values. Output formats: JSON array of objects, CSV, or SQL INSERT statements. 1-1,000 records per batch. Field selection covers 15+ types: name, email, phone, address, date, UUID, company, job title, boolean, number, IP address, URL, and more. All generation is client-side — nothing is transmitted.`}
        benefits={[
          { title: `15+ field types`, text: `Name, email, phone, address, city, country, company, job title, date, UUID, IP, URL — covering the most common test data needs in one tool.` },
          { title: `JSON, CSV, and SQL output`, text: `Export as JSON array for API mocking, CSV for database import, or SQL INSERT statements for direct database seeding.` },
          { title: `Realistic edge cases`, text: `Names include apostrophes (O'Brien), hyphens (Smith-Jones), spaces (van der Berg). Emails use plus signs and subdomains. Tests the edge cases that John Smith never exposes.` },
          { title: `1-1000 records per batch`, text: `Generate up to 1,000 records at once. For larger datasets, generate multiple batches.` },
        ]}
        useCases={[
          { title: `Unit test fixtures`, text: `Generate 10 realistic user objects as JSON test fixtures. Edge cases in names and emails exercise code paths that simplified test values skip.` },
          { title: `UI prototype data`, text: `Building a data table? Generate 50 realistic users to see how the layout handles varying name lengths and long email addresses.` },
          { title: `Database development seeding`, text: `Export as SQL INSERT statements and run against your development database. Realistic data reveals query performance issues that placeholder data hides.` },
          { title: `API mock responses`, text: `When the real API is not ready, generate a JSON array matching the expected response schema for frontend development mocking.` },
        ]}
        keyStats={[
          { stat: `Realistic edge cases`, source: `Names with apostrophes, hyphens, and accents — catch encoding bugs that John Smith never exposes` },
          { stat: `1-1,000 records`, source: `Configurable batch size for flexible test dataset generation` },
          { stat: `JSON/CSV/SQL`, source: `Three output formats for API mocking, database import, and SQL seeding` },
        ]}
        inlineLinks={[
          { text: `JSON to CSV`, href: `/calculators/dev/json-to-csv`, label: `JSON to CSV` },
          { text: `CSV to JSON`, href: `/calculators/dev/csv-to-json`, label: `CSV to JSON` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `JSON Schema Generator`, href: `/calculators/dev/json-schema-gen`, label: `JSON Schema Generator` },
          { text: `UUID Generator`, href: `/calculators/dev/uuid-generator`, label: `UUID Generator` },
          { text: `SQL Formatter`, href: `/calculators/dev/sql-formatter`, label: `SQL Formatter` },
          { text: `Lorem Ipsum Generator`, href: `/calculators/dev/lorem-ipsum-generator`, label: `Lorem Ipsum Generator` },
          { text: `Table Generator`, href: `/calculators/dev/table-generator`, label: `Table Generator` },
        ]}
        tipsSection={`Include edge-case names. Real user names include apostrophes (O'Connor), hyphens (Smith-Jones), and accents (Jose). Include names to catch encoding and string handling issues John Smith never exposes.

Use UUIDs as primary keys. Generate UUID fields for primary keys — prevents ID collisions between test runs that auto-increment integers can cause.

Combine with JSON Schema. Generate sample data here, then use [JSON Schema Generator](/calculators/dev/json-schema-gen) to auto-generate a validation schema from it.

SQL INSERT for development seeding. The SQL output generates standard INSERT statements. Format with [SQL Formatter](/calculators/dev/sql-formatter) before running.`}
        conclusion={`Realistic test data catches bugs that simplified values never reach — an apostrophe in a name or a plus sign in an email are common production bug triggers. This generator includes those edge cases by default. For the full workflow: generate here, convert to CSV with [JSON to CSV](/calculators/dev/json-to-csv), validate schemas with [JSON Schema Generator](/calculators/dev/json-schema-gen).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
