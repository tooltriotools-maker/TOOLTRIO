import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Base Converter — Decimal, Hex, Octal, Binary Free',
  description: 'Convert numbers between decimal, hexadecimal, octal, and binary simultaneously. Supports negative numbers and floating point. Runs in your browser.',
  slug: 'base-converter',
  keywords: ['number base converter online free','decimal to binary hex converter','binary octal hex decimal free','base 2 8 10 16 converter','number system converter online'],
})

const faqs = [
  { question: 'When do developers actually need to convert between number bases?', answer: 'Hex (base-16) appears constantly: colour codes (#3b82f6), memory addresses in debuggers (0x7fff5fbff8a8), byte values in network packets and binary file formats, Unix permissions bitmask representations, and character code points (U+1F600 is hex). Binary (base-2) is essential for understanding bitwise operations, CPU registers, networking (subnet masks as binary), and low-level data formats. Octal (base-8) appears in Unix chmod values (755 = 111 101 101 in binary) and some legacy systems. Developers working on embedded systems, networking, or security tools use all four bases regularly.' },
  { question: 'How do I read hex colour codes?', answer: 'A hex colour like #3b82f6 is three bytes: RR GG BB. 3b = red channel (59 decimal = 23% intensity), 82 = green channel (130 decimal = 51%), f6 = blue channel (246 decimal = 96%). High blue and moderate green = a medium-blue colour. The shorthand #rgb doubles each digit: #38f = #3388ff. Alpha can be appended as a fourth byte: #3b82f680 — 80 hex = 128 decimal = 50% opacity. Understanding hex colours as three separate RGB bytes makes colour mixing intuitive: add to the blue byte to make it bluer, subtract from red and green to make it cooler.' },
  { question: 'How does bitwise AND, OR, XOR work and why do I need hex for it?', answer: 'Bitwise operations work on individual bits of binary representations. AND (&): bit is 1 only if both inputs are 1 — used for masking: 0xFF & value keeps only the lowest byte. OR (|): bit is 1 if either input is 1 — used for setting flags: value | 0x04 sets bit 2. XOR (^): bit is 1 if inputs differ — used for toggling flags and simple encryption. NOT (~): flips all bits. Hex is used because each hex digit represents exactly 4 bits (a nibble), making the binary representation immediately readable: 0xFF = 1111 1111, 0x0F = 0000 1111. This is why bitwise code uses hex constants rather than decimal.' },
  { question: 'What is two\'s complement and how does it affect negative numbers?', answer: 'Two\'s complement is how computers represent negative integers in binary. The most significant bit is the sign bit — 0 for positive, 1 for negative. To negate a number: flip all bits (one\'s complement) then add 1. -1 in 8-bit binary is 11111111 (0xFF in hex). -128 is 10000000 (0x80). This matters for: understanding overflow behaviour in fixed-width integers, reading raw memory dumps, and working with signed vs unsigned integer types. In C, (int8_t)0xFF = -1 but (uint8_t)0xFF = 255 — same bytes, different interpretation based on signedness.' },
  { question: 'How do I convert between hex and decimal in my head?', answer: 'A useful mental shortcut: each hex digit is 4 bits and represents 0-15. For small hex values: 0xF = 15, 0xFF = 255, 0x100 = 256, 0x10 = 16, 0x1000 = 4096. For specific bytes: 0x80 = 128, 0x40 = 64, 0x20 = 32, 0x10 = 16. Powers of 16: 16^0 = 1, 16^1 = 16, 16^2 = 256, 16^3 = 4096, 16^4 = 65536. To convert 0x3b: 3×16 + 11 = 48 + 11 = 59. Most developers just use this calculator rather than doing mental hex arithmetic, but understanding the relationship helps with debugging.' },
  { question: 'Is my data sent to a server?', answer: 'No — all conversion happens in your browser. Nothing is transmitted.' },
  { question: 'What other encoding and number tools are on this site?', answer: 'The Binary to Text Converter handles text-as-binary encoding where each character becomes its ASCII bit pattern. The Bitwise Calculator performs AND, OR, XOR, NOT operations on hex or decimal values. The chmod Calculator uses octal values for Unix permissions. All are in the Dev Tools section.' },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Base Converter — Decimal, Hex, Octal, Binary Free',
    description: 'Convert numbers between decimal, hexadecimal, octal, and binary simultaneously. Supports negative numbers and floating point. Runs in your browser.',
    slug: 'base-converter',
    faqs,
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
      {jsonLd.faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }} />
      )}
      <CalculatorClient faqs={faqs} />
    </>
  )
}
