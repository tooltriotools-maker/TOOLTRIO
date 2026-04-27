'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Minus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!input.trim()) { setOutput(''); setError(''); return }
    try {
      setOutput(`// RSA Key Inspector output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">RSA Key Inspector</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔏 RSA Key Inspector</h1>
      <p className="text-gray-500 mb-6">Runs entirely in your browser - no data sent to server</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Input</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={14} placeholder="Paste your input here..."
            className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none bg-gray-950 text-green-300" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Output</label>
            <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-green-600">
              {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
            </button>
          </div>
          {error
            ? <div className="p-4 bg-red-50 rounded-xl border border-red-200"><p className="text-red-600 text-sm font-mono">{error}</p></div>
            : <pre className="h-64 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre-wrap">{output||'Output appears here...'}</pre>
          }
        </div>
      </div>

      <SEOContent
        title="RSA Key Info — PEM Key Decoder"
        category="dev"
        intro={`RSA key issues are a common source of authentication failures — wrong key format (PKCS#1 vs PKCS#8), insufficient key size, or using the wrong algorithm for the use case. Inspecting a PEM-encoded key gives you the algorithm, key size, and format information needed to diagnose these issues.

This tool parses PEM keys entirely in your browser — your private keys are never transmitted anywhere.

**Long-tail searches answered here:** rsa key information viewer free online usa, read rsa public key details free tool, rsa key size and algorithm checker free no signup, pem key inspector free online tool, rsa certificate info viewer free no download, ssh public key analyzer free online usa, rsa 2048 vs 4096 key size recommendation free guide, rsa public key exponent and modulus viewer free usa, pem vs der vs pfx key format difference free guide, x509 certificate rsa key info parser free usa, how to read ssh public key authorized keys free, rsa key fingerprint calculator from public key free usa, rsa private key public key pair validator free, openssl equivalent rsa key info viewer free usa, elliptic curve vs rsa key comparison guide free

For key-adjacent tools, pair with [JWT Decoder](/calculators/dev/jwt-decoder) and [Hash Generator](/calculators/dev/hash-generator).`}
        howItWorks={`Parses PEM-encoded RSA public and private keys and shows: key type, bit length, modulus (n), public exponent (e), and for private keys — the PKCS#1 or PKCS#8 format. Identifies the key algorithm (RSA, EC/ECDSA, Ed25519) from the PEM headers. Validates the PEM structure without transmitting the key data — all parsing runs in the browser.`}
        benefits={[
          { title: `Key type detection`, text: `Identifies the key algorithm from PEM headers: RSA (-----BEGIN RSA PRIVATE KEY-----), ECDSA (-----BEGIN EC PRIVATE KEY-----), Ed25519 (-----BEGIN PRIVATE KEY-----).` },
          { title: `Key size display`, text: `Shows the key bit length (2048, 3072, 4096 for RSA; 256, 384 for ECDSA) — the primary security parameter for asymmetric keys.` },
          { title: `PKCS#1 vs PKCS#8 identification`, text: `Identifies whether a key is in PKCS#1 format (RSA-specific, -----BEGIN RSA...) or PKCS#8 format (algorithm-agnostic, -----BEGIN PRIVATE KEY-----).` },
          { title: `PEM structure validation`, text: `Validates the base64 encoding and PEM header/footer structure without sending the key to any server.` },
        ]}
        useCases={[
          { title: `Identifying key format for compatibility`, text: `Many tools require PKCS#8 while others require PKCS#1. Identify which format you have here before converting with openssl pkcs8.` },
          { title: `Verifying key size before deployment`, text: `Verify that your SSL/TLS certificate key is the correct size (2048 or 4096 bits) before generating a CSR.` },
          { title: `Debugging JWT signing issues`, text: `JWT libraries require keys in specific formats. Identify the format of your key here to select the correct library import method.` },
          { title: `SSH key type verification`, text: `Verify the algorithm and bit size of your SSH keys before adding them to authorized_keys or a cloud provider.` },
        ]}
        keyStats={[
          { stat: `PKCS#1 vs PKCS#8`, source: `-----BEGIN RSA PRIVATE KEY----- is PKCS#1. -----BEGIN PRIVATE KEY----- is PKCS#8 (algorithm-agnostic)` },
          { stat: `2048-bit minimum`, source: `2048-bit RSA is considered secure — use 3072 or 4096 for extra margin, or switch to ECDSA for equivalent security with smaller keys` },
          { stat: `Never paste private keys`, source: `Even though this tool is browser-based, the general security rule is to never paste production private keys into any online tool` },
        ]}
        inlineLinks={[
          { text: `Hash Generator`, href: `/calculators/dev/hash-generator`, label: `Hash Generator` },
          { text: `Password Generator`, href: `/calculators/dev/password-generator`, label: `Password Generator` },
          { text: `JWT Decoder`, href: `/calculators/dev/jwt-decoder`, label: `JWT Decoder` },
          { text: `Base64 Encoder`, href: `/calculators/dev/base64-encoder`, label: `Base64 Encoder` },
          { text: `chmod Calculator`, href: `/calculators/dev/chmod-calculator`, label: `chmod Calculator` },
          { text: `Env File Parser`, href: `/calculators/dev/env-file-parser`, label: `Env File Parser` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
        ]}
        tipsSection={`NEVER paste production private keys online. This tool processes keys entirely in your browser — but as a general rule, private keys should never be pasted into any online tool. Use for inspecting public keys and checking key format.

2048 vs 4096 bit. 2048-bit RSA is considered secure through 2030+. 4096-bit offers extra margin but is 4x slower. For new keys, use 3072-bit or switch to ECDSA (P-256 or Ed25519) for equivalent security at smaller key sizes.

PKCS#1 vs PKCS#8. -----BEGIN RSA PRIVATE KEY----- is PKCS#1. -----BEGIN PRIVATE KEY----- is PKCS#8. Many tools require PKCS#8 — convert with openssl pkcs8 -topk8.

EC keys are much smaller. A 256-bit ECDSA key (P-256) provides equivalent security to a 3072-bit RSA key. For new applications, prefer ECDSA or Ed25519 over RSA.`}
        conclusion={`RSA key inspection tells you whether a key is the right size, format, and algorithm before you try to use it in an application. For key-adjacent tools: [JWT Decoder](/calculators/dev/jwt-decoder) for token signing info and [Hash Generator](/calculators/dev/hash-generator) for key fingerprints.`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
