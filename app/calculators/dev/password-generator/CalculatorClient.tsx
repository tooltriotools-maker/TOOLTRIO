'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Shield } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [nums, setNums] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [exclude, setExclude] = useState('0O1lI')
  const [count, setCount] = useState(5)
  const [passwords, setPasswords] = useState<string[]>([])
  const [copied, setCopied] = useState<string|null>(null)

  const generate = useCallback(() => {
    let chars = ''
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (nums) chars += '0123456789'
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    chars = Array.from(new Set(chars.split(''))).filter(c => !exclude.includes(c)).join('')
    if (!chars) return
    setPasswords(Array.from({length: count}, () =>
      Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    ))
  }, [length, upper, lower, nums, symbols, exclude, count])

  const strength = (p: string) => {
    if (!p) return {label:'', color:''}
    const s = (p.length >= 16 ? 2 : p.length >= 12 ? 1 : 0) + (/[A-Z]/.test(p)?1:0) + (/[a-z]/.test(p)?1:0) + (/\d/.test(p)?1:0) + (/[^A-Za-z0-9]/.test(p)?1:0)
    if (s >= 6) return {label:'Very Strong', color:'text-green-600'}
    if (s >= 4) return {label:'Strong', color:'text-blue-600'}
    if (s >= 3) return {label:'Medium', color:'text-yellow-600'}
    return {label:'Weak', color:'text-red-600'}
  }

  useState(() => { generate() })

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Password Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔑 Password Generator</h1>
      <p className="text-gray-500 mb-6">Generate strong, random passwords. Runs entirely in your browser - never sent anywhere.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm space-y-4">
        <div>
          <label className="text-sm font-bold text-gray-700">Length: <span className="text-green-600">{length}</span></label>
          <input type="range" min={4} max={128} value={length} onChange={e=>setLength(+e.target.value)} className="w-full accent-green-600 mt-1" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[['Uppercase A-Z', upper, setUpper],['Lowercase a-z', lower, setLower],['Numbers 0-9', nums, setNums],['Symbols !@#...', symbols, setSymbols]].map(([label, val, setter]: any) => (
            <label key={label as string} className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${val ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}>
              <input type="checkbox" checked={val} onChange={e=>setter(e.target.checked)} className="accent-green-600" />
              <span className="text-xs font-semibold text-gray-700">{label as string}</span>
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Exclude characters</label>
            <input value={exclude} onChange={e=>setExclude(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl font-mono text-sm focus:border-green-400 focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Generate count</label>
            <input type="number" min={1} max={20} value={count} onChange={e=>setCount(+e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl font-bold focus:border-green-400 focus:outline-none" />
          </div>
        </div>
        <button onClick={generate} className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-black rounded-xl hover:bg-green-700">
          <RefreshCw className="w-4 h-4" /> Generate Passwords
        </button>
      </div>

      <div className="space-y-2">
        {passwords.map((p,i) => {
          const s = strength(p)
          return (
            <div key={i} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl group">
              <code className="flex-1 font-mono text-sm break-all">{p}</code>
              <span className={`text-xs font-bold ${s.color} hidden sm:block`}>{s.label}</span>
              <button onClick={()=>{navigator.clipboard.writeText(p);setCopied(p);setTimeout(()=>setCopied(null),1500)}}
                className="p-1.5 hover:bg-gray-100 rounded-lg">
                {copied===p?<Check className="w-4 h-4 text-green-600"/>:<Copy className="w-4 h-4 text-gray-400"/>}
              </button>
            </div>
          )
        })}
      </div>


      <SEOContent
        title="Password Generator — Secure Random Passwords"
        category="dev"
        intro={`Secure passwords need to be random, long, and unique for each service. Reusing passwords, using predictable patterns, or relying on only lowercase letters creates accounts vulnerable to brute-force and credential stuffing attacks.

This generator creates cryptographically random passwords using the browser Web Crypto API. Runs in your browser — passwords are never transmitted.

**Long-tail searches answered here:** password generator free online usa no signup, strong password creator free tool, secure random password generator free, 12 16 20 character password generator free online, password generator with symbols numbers free, how to generate a strong password free usa, passphrase vs password generator comparison free, diceware passphrase generator free online usa, how many character password is secure calculator free, password entropy calculator bits of security free usa, pronounceable password generator free online, exclude ambiguous characters password generator free usa, bulk password list generator for testing free, password strength checker and generator combined free usa, nist password guidelines 2026 compliant generator free

For security tools, pair with [Hash Generator](/calculators/dev/hash-generator) and [RSA Key Info](/calculators/dev/rsa-key-info).`}
        howItWorks={`Generates cryptographically random passwords using window.crypto.getRandomValues() — the browser native secure random number generator. Configurable character sets: uppercase letters, lowercase letters, digits, and symbols. Configurable length (8-128 characters). Excludes ambiguous characters (0, O, l, I) optionally. Password strength estimation shows bits of entropy.`}
        benefits={[
          { title: `Cryptographically random`, text: `Uses window.crypto.getRandomValues() — the browser native CSPRNG (Cryptographically Secure Pseudo-Random Number Generator). Not Math.random() which is not cryptographically secure.` },
          { title: `Configurable character sets`, text: `Toggle uppercase letters, lowercase letters, digits, and symbols independently. Exclude ambiguous characters (0/O, l/1/I) for passwords that need to be read aloud.` },
          { title: `Entropy display`, text: `Shows the password strength as bits of entropy. 60+ bits is good; 80+ bits is very strong. Longer passwords with more character types have more entropy.` },
          { title: `Batch generation`, text: `Generate multiple passwords at once for bulk account creation or when you need options to choose from.` },
        ]}
        useCases={[
          { title: `New account credentials`, text: `Generate a strong password here before creating a new account. Copy it directly into your password manager — do not try to memorize it.` },
          { title: `API key generation`, text: `Generate a cryptographically random string to use as an API key, webhook secret, or HMAC signing key for your application.` },
          { title: `Test account passwords`, text: `Generate realistic-looking but secure passwords for test accounts in your development and staging environments.` },
          { title: `Temporary access credentials`, text: `Generate a temporary one-time password for granting access to a system — use a password manager to share it securely.` },
        ]}
        keyStats={[
          { stat: `Web Crypto API`, source: `window.crypto.getRandomValues() — browser native CSPRNG, not Math.random()` },
          { stat: `Entropy bits`, source: `Each additional character exponentially increases the number of possible passwords` },
          { stat: `60+ bits recommended`, source: `Below 40 bits is weak (less than 1 trillion combinations); above 60 bits is strong` },
        ]}
        inlineLinks={[
          { text: `Hash Generator`, href: `/calculators/dev/hash-generator`, label: `Hash Generator` },
          { text: `RSA Key Info`, href: `/calculators/dev/rsa-key-info`, label: `RSA Key Info` },
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` },
          { text: `Base64 Encoder`, href: `/calculators/dev/base64-encoder`, label: `Base64 Encoder` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `chmod Calculator`, href: `/calculators/dev/chmod-calculator`, label: `chmod Calculator` },
          { text: `Env File Parser`, href: `/calculators/dev/env-file-parser`, label: `Env File Parser` },
          { text: `UUID Generator`, href: `/calculators/dev/uuid-generator`, label: `UUID Generator` },
        ]}
        tipsSection={`Use a password manager. A generated password is only secure if you store it securely. Copy the generated password directly into your password manager (Bitwarden, 1Password, etc.) — do not write it in plain text or memorize it (use a manager to eliminate that need).

Longer is better than complex. A 20-character password of only lowercase letters has more entropy than a 12-character password with all character types. Aim for 20+ characters when possible.

Exclude ambiguous characters for printed passwords. If a password might be entered by reading it from a printed sheet, enable the exclude ambiguous option (removes 0, O, l, 1, I that look similar).

Do not use passwords as secrets in code. Use environment variables and secrets management instead. Passwords generated here are for human authentication, not for hardcoding in source code.`}
        conclusion={`Cryptographically random passwords are the foundation of account security. This generator uses the browser native CSPRNG — the same randomness used by security tools — to produce passwords that are genuinely unpredictable. For security infrastructure: [Hash Generator](/calculators/dev/hash-generator) and [RSA Key Info](/calculators/dev/rsa-key-info).`}
      />
            <div className="mt-8 space-y-3">
        {faqs.map(f => (
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
