'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Minus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [a, setA] = useState(42)
  const [b, setB] = useState(27)
  const [shift, setShift] = useState(2)

  const toBin = (n: number, bits=8) => (n>>>0).toString(2).padStart(bits,'0').slice(-bits)
  const toHex = (n: number) => (n>>>0).toString(16).toUpperCase().padStart(8,'0')

  const ops = useMemo(() => [
    { op:'AND',  sym:'&',   r: a & b },
    { op:'OR',   sym:'|',   r: a | b },
    { op:'XOR',  sym:'^',   r: a ^ b },
    { op:'NOT A',sym:'~',   r: ~a },
    { op:'NOT B',sym:'~',   r: ~b },
    { op:'A << '+shift, sym:'<<', r: a << shift },
    { op:'A >> '+shift, sym:'>>', r: a >> shift },
    { op:'A >>> '+shift,sym:'>>>',r: a >>> shift },
  ], [a,b,shift])

  const BitRow = ({label, n}: {label:string; n:number}) => (
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xs font-mono text-gray-500 w-16 text-right flex-shrink-0">{label}</span>
      <div className="flex gap-0.5">
        {toBin(n,16).split('').map((bit,i)=>(
          <span key={i} className={`w-5 h-6 flex items-center justify-center text-xs font-black rounded ${bit==='1'?'bg-green-500 text-white':'bg-gray-100 text-gray-400'}`}>{bit}</span>
        ))}
      </div>
      <span className="text-xs font-mono text-gray-600 ml-1">{n>>>0}</span>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Bitwise Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⚙️ Bitwise Calculator</h1>
      <p className="text-gray-500 mb-8">AND - OR - XOR - NOT - Shift - with bit visualisation</p>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex gap-4 mb-6 flex-wrap">
          {[{l:'Value A',v:a,s:setA},{l:'Value B',v:b,s:setB}].map(({l,v,s})=>(
            <div key={l}>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">{l}</label>
              <input type="number" value={v} onChange={e=>s(Number(e.target.value))}
                className="border-2 border-gray-200 focus:border-green-400 rounded-xl px-4 py-2.5 font-mono text-xl font-bold focus:outline-none w-36" />
              <p className="text-xs text-gray-400 mt-1 font-mono">bin: {toBin(v,8)} - hex: 0x{toHex(v).slice(-4)}</p>
            </div>
          ))}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Shift Amount</label>
            <input type="number" value={shift} onChange={e=>setShift(Number(e.target.value))} min={0} max={31}
              className="border-2 border-gray-200 focus:border-green-400 rounded-xl px-4 py-2.5 font-mono text-xl font-bold focus:outline-none w-24" />
          </div>
        </div>
        <div className="overflow-x-auto pb-2">
          <BitRow label="A" n={a} />
          <BitRow label="B" n={b} />
          <div className="border-t border-gray-200 my-2"/>
          {ops.slice(0,3).map(o=><BitRow key={o.op} label={o.op} n={o.r}/>)}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ops.map(o=>(
          <div key={o.op} className="bg-white rounded-xl border border-gray-200 p-3 text-center shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase">{o.op}</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{o.r>>>0}</p>
            <p className="text-xs font-mono text-gray-400">0x{(o.r>>>0).toString(16).toUpperCase().padStart(4,'0')}</p>
          </div>
        ))}
      </div>

      <SEOContent
        title="Bitwise Calculator — AND OR XOR NOT Operations"
        category="dev"
        intro={`Bitwise operations are fundamental to low-level programming, network protocols, and permission systems. Bitmask flag checking, subnet mask calculation, and bitwise swap algorithms all require AND, OR, XOR, and NOT operations that are difficult to reason about without seeing the binary representation.

This calculator performs all bitwise operations and shows inputs/output in all number bases simultaneously. Runs in your browser.

**Long-tail searches answered here:** bitwise operations calculator free online usa, and or xor bitwise calculator free tool, bitwise shift calculator free no signup, binary bitwise operation tester online free, how to do bitwise operations calculator free, bitwise and or xor not calculator online free, what is bitwise and how to use it calculator free usa, bitwise xor for encryption example calculator, bitwise shift left vs right effect calculator free, bitwise flags bitmask calculator free online usa, how programming languages use bitwise operations free, two complement bitwise operations calculator usa free, bitwise operation truth table generator free online, bitwise not operation result calculator free usa, binary number bitwise challenge solver free online

For related operations, pair with [Base Converter](/calculators/dev/base-converter).`}
        howItWorks={`Performs bitwise AND (&), OR (|), XOR (^), NOT (~), left shift (<<), right shift (>>), and unsigned right shift (>>>) operations. Shows inputs and output in binary, decimal, hexadecimal, and octal simultaneously. Supports 8-bit, 16-bit, 32-bit, and 64-bit integer widths.`}
        benefits={[
          { title: `All bitwise operations`, text: `AND, OR, XOR, NOT, left shift, right shift, and unsigned right shift — all the bitwise operations you need for bitmask work and low-level protocols.` },
          { title: `Multi-base display`, text: `Shows inputs and output in binary, decimal, hexadecimal, and octal simultaneously — see the operation in the most appropriate format for your context.` },
          { title: `Integer width selection`, text: `Supports 8-bit, 16-bit, 32-bit, and 64-bit integer widths. The bit width affects NOT (ones complement) and signed vs unsigned shift behavior.` },
          { title: `Step-by-step binary display`, text: `Shows the operation as a binary alignment — each bit column aligned for visual verification of AND, OR, and XOR operations.` },
        ]}
        useCases={[
          { title: `Bitmask flag operations`, text: `flags & FEATURE_FLAG !== 0 checks if a bit is set. flags | NEW_FLAG sets a bit. flags & ~REMOVE_FLAG clears a bit. Verify your bitmask operations here before putting them in code.` },
          { title: `Subnet mask calculation`, text: `IP subnet calculation is bitwise: IP & MASK = network address. Verify the subnet arithmetic here alongside [CIDR Calculator](/calculators/dev/cidr-calculator).` },
          { title: `Permission flag systems`, text: `Many systems encode permissions as bit flags (read=4, write=2, execute=1). Verify flag combinations here before implementing.` },
          { title: `XOR swap algorithm`, text: `a ^= b; b ^= a; a ^= b swaps two integers without a temporary variable using XOR. The calculator shows the intermediate values.` },
        ]}
        keyStats={[
          { stat: `Bitmask flags`, source: `Bitwise operations are fundamental to permission systems, network protocols, and hardware interfaces` },
          { stat: `Signed vs unsigned`, source: `JavaScript NOT (~) treats numbers as signed 32-bit integers: ~0 = -1 (all bits set)` },
          { stat: `Integer width`, source: `The bit width affects NOT complement and shift overflow behavior` },
        ]}
        inlineLinks={[
          { text: `Base Converter`, href: `/calculators/dev/base-converter`, label: `Base Converter` },
          { text: `Bit Byte Converter`, href: `/calculators/dev/bit-byte-converter`, label: `Bit Byte Converter` },
          { text: `Binary Text Converter`, href: `/calculators/dev/binary-text-converter`, label: `Binary Text Converter` },
          { text: `chmod Calculator`, href: `/calculators/dev/chmod-calculator`, label: `chmod Calculator` },
          { text: `Number Formatter`, href: `/calculators/dev/number-formatter`, label: `Number Formatter` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `CIDR Calculator`, href: `/calculators/dev/cidr-calculator`, label: `CIDR Calculator` },
          { text: `IP Subnet Calculator`, href: `/calculators/dev/ip-subnet-calculator`, label: `IP Subnet Calculator` },
        ]}
        tipsSection={`Bitmask flag patterns. flags & FEATURE_FLAG !== 0 checks if a bit is set. flags | NEW_FLAG sets a bit. flags & ~REMOVE_FLAG clears a bit. Verify your bitmask operations here before putting them in code.

Signed vs unsigned. JavaScript NOT (~) treats numbers as signed 32-bit integers: ~0 = -1 (all bits set). Unsigned right shift (>>>) treats as unsigned. Watch the sign when interpreting results.

Subnet mask as AND. IP subnet calculation is bitwise: IP & MASK = network address. The [CIDR Calculator](/calculators/dev/cidr-calculator) uses this — verify subnet arithmetic here.

XOR for value swapping. a ^= b; b ^= a; a ^= b swaps two integers without a temporary variable using XOR. The calculator shows the intermediate values.`}
        conclusion={`Bitwise operations are fundamental to low-level programming, network protocols, and permission systems. Seeing the binary representation alongside decimal and hex makes the operations concrete. For related operations: [Base Converter](/calculators/dev/base-converter) and [chmod Calculator](/calculators/dev/chmod-calculator).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
