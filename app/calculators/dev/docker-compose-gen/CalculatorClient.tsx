'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

type Service = { name: string; image: string; port: string; envVars: string; volumes: string; depends: string }
const TEMPLATES: Record<string, Partial<Service>> = {
  'nginx':       { image: 'nginx:alpine', port: '80:80', envVars: '', volumes: './html:/usr/share/nginx/html' },
  'postgres':    { image: 'postgres:16-alpine', port: '5432:5432', envVars: 'POSTGRES_DB=mydb\nPOSTGRES_USER=user\nPOSTGRES_PASSWORD=password', volumes: 'pgdata:/var/lib/postgresql/data' },
  'redis':       { image: 'redis:7-alpine', port: '6379:6379', envVars: '', volumes: 'redisdata:/data' },
  'mysql':       { image: 'mysql:8', port: '3306:3306', envVars: 'MYSQL_ROOT_PASSWORD=root\nMYSQL_DATABASE=mydb\nMYSQL_USER=user\nMYSQL_PASSWORD=password', volumes: 'mysqldata:/var/lib/mysql' },
  'node':        { image: 'node:20-alpine', port: '3000:3000', envVars: 'NODE_ENV=development', volumes: './app:/app' },
  'mongodb':     { image: 'mongo:7', port: '27017:27017', envVars: 'MONGO_INITDB_ROOT_USERNAME=root\nMONGO_INITDB_ROOT_PASSWORD=password', volumes: 'mongodata:/data/db' },
  'custom':      { image: '', port: '', envVars: '', volumes: '' },
}

const makeService = (name: string): Service => ({ name, image: 'nginx:alpine', port: '80:80', envVars: '', volumes: '', depends: '' })

export default function CalculatorClient({ faqs }: Props) {
  const [services, setServices] = useState<Service[]>([makeService('web'), makeService('db')])
  const [version, setVersion] = useState('3.8')
  const [network, setNetwork] = useState('app-network')
  const [copied, setCopied] = useState(false)

  const update = (i: number, k: keyof Service, v: string) => setServices(s => s.map((svc,j) => j===i ? {...svc,[k]:v} : svc))
  const applyTemplate = (i: number, t: string) => {
    const tmpl = TEMPLATES[t] || {}
    setServices(s => s.map((svc,j) => j===i ? {...svc, image: tmpl.image||svc.image, port: tmpl.port||svc.port, envVars: tmpl.envVars||svc.envVars, volumes: tmpl.volumes||svc.volumes} : svc))
  }

  const yaml = [
    `version: '${version}'`,
    '',
    'services:',
    ...services.flatMap(svc => {
      const lines = [`  ${svc.name || 'service'}:`]
      if (svc.image) lines.push(`    image: ${svc.image}`)
      if (svc.port) lines.push(`    ports:\n      - "${svc.port}"`)
      if (svc.envVars.trim()) {
        lines.push('    environment:')
        svc.envVars.trim().split('\n').forEach(e => e && lines.push(`      - ${e}`))
      }
      if (svc.volumes.trim()) {
        lines.push('    volumes:')
        svc.volumes.trim().split('\n').forEach(v => v && lines.push(`      - ${v}`))
      }
      if (svc.depends.trim()) lines.push(`    depends_on:\n      - ${svc.depends}`)
      lines.push(`    networks:\n      - ${network}`)
      lines.push('')
      return lines
    }),
    'networks:',
    `  ${network}:`,
    '    driver: bridge',
  ].join('\n')

  const copy = () => { navigator.clipboard.writeText(yaml); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-blue-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Docker Compose Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🐳 Docker Compose Generator</h1>
      <p className="text-gray-500 mb-6">Generate docker-compose.yml files visually. Add services, ports, environment variables, volumes, and dependencies with templates.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex gap-4 items-center">
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Compose Version</label>
              <select value={version} onChange={e=>setVersion(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-blue-400 focus:outline-none">
                {['3.9','3.8','3.7','2.4'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Network Name</label>
              <input value={network} onChange={e=>setNetwork(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-blue-400 focus:outline-none" />
            </div>
          </div>

          {services.map((svc, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <input value={svc.name} onChange={e=>update(i,'name',e.target.value)} className="font-black text-gray-900 text-base border-0 border-b-2 border-transparent hover:border-gray-200 focus:border-blue-400 focus:outline-none w-32" />
                <div className="flex gap-1">
                  <select onChange={e=>{ if(e.target.value) applyTemplate(i, e.target.value); e.target.value='' }} className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 focus:outline-none">
                    <option value="">Apply template...</option>
                    {Object.keys(TEMPLATES).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {services.length > 1 && <button onClick={() => setServices(s => s.filter((_,j)=>j!==i))} className="p-1 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Image</label>
                  <input value={svc.image} onChange={e=>update(i,'image',e.target.value)} className="w-full border border-gray-200 rounded-xl px-2 py-1.5 text-xs font-mono focus:border-blue-400 focus:outline-none" placeholder="nginx:alpine" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Port (host:container)</label>
                  <input value={svc.port} onChange={e=>update(i,'port',e.target.value)} className="w-full border border-gray-200 rounded-xl px-2 py-1.5 text-xs font-mono focus:border-blue-400 focus:outline-none" placeholder="80:80" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Environment (KEY=value)</label>
                  <textarea value={svc.envVars} onChange={e=>update(i,'envVars',e.target.value)} rows={2} className="w-full border border-gray-200 rounded-xl px-2 py-1.5 text-xs font-mono focus:border-blue-400 focus:outline-none resize-none" placeholder="NODE_ENV=production" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Volumes (host:container)</label>
                  <textarea value={svc.volumes} onChange={e=>update(i,'volumes',e.target.value)} rows={2} className="w-full border border-gray-200 rounded-xl px-2 py-1.5 text-xs font-mono focus:border-blue-400 focus:outline-none resize-none" placeholder="./data:/app/data" />
                </div>
              </div>
              <div className="mt-2">
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Depends On (service name)</label>
                <input value={svc.depends} onChange={e=>update(i,'depends',e.target.value)} className="w-full border border-gray-200 rounded-xl px-2 py-1.5 text-xs font-mono focus:border-blue-400 focus:outline-none" placeholder="db" />
              </div>
            </div>
          ))}

          <button onClick={() => setServices(s => [...s, makeService(`service${s.length+1}`)])} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-2xl text-sm font-bold text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
            <Plus className="w-4 h-4"/>Add Service
          </button>
        </div>

        <div className="bg-gray-950 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase">docker-compose.yml</span>
            <button onClick={copy} className="flex items-center gap-1.5 text-xs font-bold text-green-400 hover:text-green-300">
              {copied ? <><Check className="w-3.5 h-3.5"/>Copied!</> : <><Copy className="w-3.5 h-3.5"/>Copy YAML</>}
            </button>
          </div>
          <pre className="font-mono text-xs text-green-300 whitespace-pre overflow-auto max-h-[520px]">{yaml}</pre>
        </div>
      </div>

      <SEOContent title="Docker Compose Generator" category="dev"
        intro="The Docker Compose Generator creates production-ready docker-compose.yml files through a visual interface - add services with pre-built templates for Nginx, PostgreSQL, Redis, MySQL, MongoDB, and Node.js, configure ports, environment variables, volumes, and service dependencies, then copy the complete YAML instantly.\n\nDocker Compose is the standard tool for defining and running multi-container Docker applications. Used by millions of development teams worldwide, it defines your entire application stack in a single YAML file that can be run with docker compose up on any machine with Docker installed.

**Long-tail searches answered here:** docker compose yaml generator free online usa, docker compose file builder free no signup, generate docker compose from requirements free, docker compose generator for common stacks free, docker compose template generator free tool, how to write docker compose file generator free, docker compose for nginx postgres redis free usa, docker compose networking configuration generator free, docker compose volume mount configuration free tool, multi container docker compose generator free usa, docker compose environment variables setup free, docker compose health check configuration free usa, docker compose depends on wait for service free, docker compose override file generator free online, docker compose production vs development config free usa"
        howItWorks="The generator maintains a reactive data model for each service (name, image, ports, environment variables, volumes, depends_on). As you edit fields or apply templates, the docker-compose.yml output is regenerated in real time. Templates populate service fields with sensible defaults for common services - Postgres with proper environment variables, Nginx with standard port mapping, Redis with persistence volume.\n\nAll YAML generation is done client-side using JavaScript string templates. The output follows docker-compose v3.x specification compatible with Docker Compose v2 (the current standard, replacing the deprecated standalone docker-compose binary)."
        benefits={[
          { title: 'Service Templates', text: 'One-click templates for Nginx, PostgreSQL, Redis, MySQL, MongoDB, and Node.js pre-fill correct images, ports, and environment variable patterns.' },
          { title: 'Real-Time YAML Preview', text: 'The complete docker-compose.yml updates instantly as you edit any field - see exactly what will be deployed before copying.' },
          { title: 'Environment Variable Management', text: 'Multi-line environment variable input with KEY=value format that generates correct YAML environment arrays.' },
          { title: 'Volume & Dependency Configuration', text: 'Configure bind mounts, named volumes, and service dependencies (depends_on) for correct container startup ordering.' },
          { title: 'Network Auto-Configuration', text: 'All services are automatically added to a shared bridge network for inter-service communication - the standard Docker Compose pattern.' },
          { title: 'Multiple Services', text: 'Add as many services as your stack needs - typical web stacks have 3-5 services (app, database, cache, proxy, queue).' },
        ]}
        useCases={[
          { title: 'Local Development Environment', text: 'Define your entire development stack (app server + database + cache) in one file so every team member runs the identical environment with one command.' },
          { title: 'CI/CD Pipeline Services', text: 'Define test database and cache services for GitHub Actions, GitLab CI, and Jenkins pipeline test jobs - spin up and tear down automatically.' },
          { title: 'Learning Docker', text: 'The visual builder and real-time YAML preview teaches Docker Compose syntax by showing the relationship between UI choices and YAML structure.' },
          { title: 'Microservices Development', text: 'Run multiple microservices locally alongside their shared infrastructure (message queue, service discovery) during development and integration testing.' },
          { title: 'Database Development', text: 'Quickly spin up a PostgreSQL, MySQL, or MongoDB instance for local development with proper initial credentials and persistent data volumes.' },
          { title: 'Proof of Concept', text: 'Rapidly define a complete stack for a technology proof of concept without manually writing YAML - get a working multi-container environment in minutes.' },
        ]}
        tipsSection={`Never hardcode passwords in docker-compose.yml for production. Use .env files (Docker Compose automatically reads .env) for secrets: POSTGRES_PASSWORD=\${DB_PASSWORD}. Add .env to .gitignore and use environment variables from your CI/CD secrets manager in production.\n\nFor local development, use named volumes (db-data:/var/lib/postgresql/data) rather than bind mounts for database data - they're faster on macOS/Windows and survive docker compose down without data loss.\n\nUse depends_on with condition: service_healthy (Docker Compose v2.1+) rather than just depends_on: - db when your app needs the database to be fully ready before starting - regular depends_on only waits for the container to start, not for the service to be accepting connections.

For production deployments, consider migrating from Docker Compose to Kubernetes (k8s) for multi-server scaling, but Docker Compose remains the best choice for single-server deployments and development. Docker Compose V2 supports profiles (--profile production) that activate specific services for different environments - useful for running optional monitoring services only in staging.

Docker layer caching is critical for fast build times. Order your Dockerfile instructions from least to most frequently changing: OS base -> system packages -> dependency manifests (package.json) -> dependencies (npm install) -> application code. Copying package.json before copying your source code ensures npm install is only re-run when dependencies change, not on every code change.

For development databases, always use named volumes rather than bind mounts for database data directories. Named volumes (postgres-data:/var/lib/postgresql/data) survive docker compose down without data loss, while bind mounts (./data:/var/lib/postgresql/data) work but can have permission issues on macOS and Windows due to file system differences between the host OS and the Linux container.`}
        scienceSection={`Docker Compose was originally created by Orchard (as Fig) in 2014 and acquired by Docker in the same year. The tool introduced a declarative YAML format for defining multi-container applications, revolutionizing local development environments. In 2023, Docker released Compose V2 as the default, deprecating the original Python-based docker-compose tool in favor of a Go implementation integrated as docker compose (without hyphen).

The Docker Compose specification defines a standard for multi-container application definitions that is now implemented by multiple platforms: Docker Desktop, Podman Compose, Rancher Desktop, and cloud platforms like AWS ECS (with some extensions). This standardization makes Compose files portable across different container runtimes.

According to the 2024 Stack Overflow Developer Survey, Docker is used by 58% of developers, making it the most-used non-language, non-OS tool. Container adoption has grown from 35% in 2019 to 58% in 2024, driven primarily by the local development workflow improvements that Docker Compose enables - eliminating "it works on my machine" problems that cost development teams significant debugging time.`}
        conclusion="The Docker Compose Generator eliminates the need to look up image names, port numbers, and environment variable conventions for common services. Build your local development stack or CI environment in minutes - free, private, and accurate."
      />

      <div className="mt-8 space-y-3">
        {faqs.map(f => <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
          <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
        </details>)}
      </div>
    </div>
  )
}
