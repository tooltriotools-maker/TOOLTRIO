'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [perms, setPerms] = useState([[true,true,true],[true,false,true],[false,false,true]])
  const [octal, setOctal] = useState('755')
  const [copied, setCopied] = useState(false)

  const calcOctal = (p: boolean[][]) => p.map(g=>g.reduce((acc,bit,i)=>acc+(bit?[4,2,1][i]:0),0)).join('')
  const calcSymbol = (p: boolean[][]) => {
    const types = ['r','w','x']
    return p.map(g=>g.map((bit,i)=>bit?types[i]:'-').join('')).join('')
  }

  const fromOctal = (o: string): boolean[][] => {
    const digits = o.padStart(3,'0').slice(-3).split('').map(Number)
    return digits.map(d=>[(d&4)>0,(d&2)>0,(d&1)>0])
  }

  const handlePermChange = (group: number, bit: number) => {
    const n = perms.map((g,gi)=>gi===group?g.map((v,bi)=>bi===bit?!v:v):g)
    setPerms(n)
    setOctal(calcOctal(n))
  }

  const handleOctalChange = (val: string) => {
    setOctal(val)
    if (/^[0-7]{1,4}$/.test(val)) setPerms(fromOctal(val))
  }

  const symbol = calcSymbol(perms)
  const currentOctal = calcOctal(perms)

  const copy = () => { navigator.clipboard.writeText(currentOctal); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">chmod Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔐 chmod Calculator</h1>
      <p className="text-gray-500 mb-6">Calculate Linux/Unix file permissions. Click permission bits or enter an octal code.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="grid grid-cols-4 gap-3 mb-5">
          <div className="text-xs font-bold text-gray-500 text-center"></div>
          {['Read (r)','Write (w)','Execute (x)'].map(l=>(
            <div key={l} className="text-xs font-bold text-gray-500 text-center">{l}</div>
          ))}
        </div>
        {['Owner','Group','Others'].map((grp,gi)=>(
          <div key={grp} className="grid grid-cols-4 gap-3 mb-3">
            <div className="flex items-center text-sm font-bold text-gray-700">{grp}</div>
            {perms[gi].map((val,bi)=>(
              <button key={bi} onClick={()=>handlePermChange(gi,bi)}
                className={`py-3 rounded-xl font-black text-sm border-2 transition-all ${val?'bg-green-600 border-green-600 text-white':'bg-gray-50 border-gray-200 text-gray-400 hover:border-green-300'}`}>
                {val ? 'v' : '✗'}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-5 text-center">
          <p className="text-xs font-bold text-green-700 mb-1">Octal Code</p>
          <div className="flex items-center justify-center gap-2">
            <input value={octal} onChange={e=>handleOctalChange(e.target.value)}
              className="text-4xl font-black text-green-800 bg-transparent w-24 text-center focus:outline-none border-b-2 border-green-400" />
            <button onClick={copy} className="text-green-600">{copied?<Check className="w-5 h-5"/>:<Copy className="w-5 h-5"/>}</button>
          </div>
          <p className="text-sm text-green-700 mt-1 font-mono">chmod {currentOctal} file</p>
        </div>
        <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-5 text-center">
          <p className="text-xs font-bold text-blue-700 mb-1">Symbolic</p>
          <p className="text-4xl font-black text-blue-800 font-mono">{symbol}</p>
          <p className="text-xs text-blue-700 mt-1">owner-group-others</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <p className="text-sm font-bold text-gray-700 mb-2">Common Permission Presets</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[{l:'755 - Web files',v:'755'},{l:'644 - Read-only',v:'644'},{l:'777 - Full access',v:'777'},{l:'600 - Private',v:'600'}].map(p=>(
            <button key={p.v} onClick={()=>handleOctalChange(p.v)} className="p-2 text-center bg-gray-50 hover:bg-green-50 rounded-xl border border-gray-100 text-xs">
              <p className="font-black font-mono text-gray-900">{p.v}</p>
              <p className="text-gray-500 mt-0.5">{p.l.split('-')[1]}</p>
            </button>
          ))}
        </div>
      </div>


      <SEOContent
        title="chmod Calculator — Unix File Permission Calculator"
        category="dev"
        intro={`Unix file permissions are represented as three-digit octal numbers (755, 644, 777) that compress nine binary flags — read/write/execute for owner, group, and others — into compact notation. Getting permissions wrong means either security vulnerabilities (world-writable files) or broken deployments (non-executable scripts).

This calculator converts between octal notation, symbolic notation (rwxr-xr-x), and the chmod command you need. Runs in your browser.

**Long-tail searches answered here:** chmod permission calculator free online usa, linux file permission calculator free tool, chmod 755 644 777 meaning calculator, unix permission octal converter free no signup, linux chmod numeric to rwx converter free, file permission calculator linux no download, what does chmod 644 mean free guide usa, chmod for web server files best practice calculator, how to set recursive permissions with chmod calculator free, chmod sticky bit setuid setgid calculator free, windows acl vs linux chmod permissions comparison free, chmod command for public readable file usa free, minimum chmod permissions for security calculator, nginx apache file permission requirements calculator free, chmod 700 vs 755 security difference calculator free usa

Pair with [Docker Compose Generator](/calculators/dev/docker-compose-gen) for container permission troubleshooting.`}
        howItWorks={`File permissions are a 9-bit field split into three 3-bit groups: owner (user), group, others. Each group encodes read (4), write (2), execute (1) as a sum — so 7 = read+write+execute, 6 = read+write, 5 = read+execute, 4 = read-only.

The calculator displays all three representations simultaneously: octal (755), symbolic (rwxr-xr-x), and the chmod command. Toggle individual bits with checkboxes to see how the octal value changes in real time. Special bits: setuid (4000), setgid (2000), and sticky bit (1000) are also supported.`}
        benefits={[
          { title: `Octal to symbolic and back`, text: `Instantly converts between 755 and rwxr-xr-x representations. No memorizing which number maps to which combination of read/write/execute flags.` },
          { title: `Visual bit toggle`, text: `Click individual read/write/execute checkboxes for owner/group/others and watch the octal value update in real time.` },
          { title: `setuid, setgid, sticky bit`, text: `The special permission bits (4755 = setuid, 2755 = setgid, 1755 = sticky) are often misunderstood. This calculator shows them explicitly with explanations.` },
          { title: `Ready-to-use chmod command`, text: `Outputs the exact chmod NNN filename command to copy and run. No translation step between 755 and what to type in the terminal.` },
        ]}
        useCases={[
          { title: `Web server file permissions`, text: `Apache and Nginx require specific permissions: 644 for HTML/CSS/JS files, 755 for directories. Verify here before chmod-ing your entire document root.` },
          { title: `SSH key permissions`, text: `SSH requires private keys to be 600 (owner read-write only) or it refuses to connect with permissions too open. Verify the exact octal here before chmod.` },
          { title: `Shell script executability`, text: `Your deploy script needs to be executable but not world-writable. 755 gives the owner execute permission and lets everyone read-execute without writing.` },
          { title: `Container file permissions`, text: `Docker containers often run as non-root users and hit permission denied errors. Calculate the correct permissions here before adding RUN chmod commands to your Dockerfile.` },
        ]}
        keyStats={[
          { stat: `9 bits`, source: `Three groups (owner/group/others) times three flags (read/write/execute) equals 9 permission bits` },
          { stat: `600 for SSH keys`, source: `SSH refuses private keys readable by group/others — 600 is the required maximum` },
          { stat: `777 is dangerous`, source: `World-writable files allow any user to overwrite content — a serious security risk` },
        ]}
        inlineLinks={[
          { text: `Docker Compose Generator`, href: `/calculators/dev/docker-compose-gen`, label: `Docker Compose Generator` },
          { text: `Gitignore Generator`, href: `/calculators/dev/gitignore-generator`, label: `Gitignore Generator` },
          { text: `Env File Parser`, href: `/calculators/dev/env-file-parser`, label: `Env File Parser` },
          { text: `RSA Key Info`, href: `/calculators/dev/rsa-key-info`, label: `RSA Key Info` },
          { text: `CIDR Calculator`, href: `/calculators/dev/cidr-calculator`, label: `CIDR Calculator` },
          { text: `Cron Expression Builder`, href: `/calculators/dev/cron-expression`, label: `Cron Expression Builder` },
          { text: `Hash Generator`, href: `/calculators/dev/hash-generator`, label: `Hash Generator` },
          { text: `Password Generator`, href: `/calculators/dev/password-generator`, label: `Password Generator` },
        ]}
        tipsSection={`644 for files, 755 for directories. This is the standard web server permission pattern. Files need no execute bit. Directories need execute to allow traversal.

Never use 777 in production. World-writable means any user on the system can overwrite your files. Use 644 or 755 instead.

Check effective permissions with ls -la. The octal from this calculator is what you pass to chmod. To verify it applied correctly, run ls -la filename and compare the symbolic notation.

setuid on directories. The setuid bit on directories has no effect on most Linux systems, but setgid on directories makes new files inherit the group owner — useful for shared project directories.`}
        conclusion={`Unix permissions are a fundamental that every developer encounters when deploying code, configuring SSH, or debugging permission denied errors. The octal notation is compact but non-obvious — this calculator makes the bit-to-number mapping concrete and generates the chmod command you need.

For deployment security: verify permissions here, manage containers with [Docker Compose Generator](/calculators/dev/docker-compose-gen), and protect secrets with [RSA Key Info](/calculators/dev/rsa-key-info).`}
      />
            <div className="mt-8 space-y-3">
        {faqs.map(f=>(
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
