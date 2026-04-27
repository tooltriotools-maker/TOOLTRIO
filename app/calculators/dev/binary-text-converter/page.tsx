import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Binary to Text Converter — Text to Binary & Back Free',
  description: 'Convert text to binary (01010100...) and binary back to text. ASCII and UTF-8 support. Runs entirely in your browser.',
  slug: 'binary-text-converter',
  keywords: ['binary to text converter online free','text to binary converter browser','ascii binary converter','binary string decoder free','convert text to binary online','binary code translator free'],
})

const faqs = [
  { question: 'How does text-to-binary conversion work?', answer: 'Each character is converted to its ASCII or Unicode code point, then that number is written in binary (base-2). The letter \'A\' has ASCII code 65, which is 01000001 in 8-bit binary. \'Hello\' becomes 01001000 01100101 01101100 01101100 01101111. Standard ASCII uses 7 bits (0-127), but binary representations are typically padded to 8 bits. For Unicode characters above U+007F (non-ASCII), the conversion depends on encoding — UTF-8 encodes these as multi-byte sequences, so a single character might produce 16 or 24 bits of output.' },
  { question: 'Is this the same binary as what computers actually store internally?', answer: 'For ASCII text, yes — computers store text as sequences of bytes, and each byte is representable as 8 binary digits. \'Hello\' in a text file on disk is those exact bytes: 0x48 0x65 0x6C 0x6C 0x6F, which in binary is 01001000 01100101 01101100 01101100 01101111. For non-ASCII text (Unicode), modern systems use UTF-8 or UTF-16 encoding which produces different byte sequences than the raw code point value. This tool shows binary as ASCII-compatible binary strings — the standard representation for encoding demonstrations.' },
  { question: 'What is this used for in real development?', answer: 'Binary text encoding appears in: educational contexts for understanding ASCII and character encoding. Protocol debugging — some legacy protocols and embedded systems transmit data as binary strings. CTF (Capture the Flag) cybersecurity challenges frequently use binary encoding. Low-level data format documentation where bit-level representation is described. Steganography (hiding data in binary patterns). For practical data transmission, Base64 is preferred over binary text encoding because it is far more compact (6 bits per character vs 1 bit per character in binary text representation).' },
  { question: 'What is the difference between binary representation and binary data?', answer: 'Binary representation (what this tool produces) is the text string \'01001000\' — eight ASCII characters that represent the number 72. Binary data is the actual single byte 0x48 (value 72) stored in memory or a file. These are very different things: the binary representation is 8 bytes of ASCII text; the binary data is 1 byte. This distinction matters when talking about file sizes and data formats. \'Storing data in binary\' means storing the actual compact byte values, not storing the textual \'0\' and \'1\' characters.' },
  { question: 'How do I convert a binary string to a number?', answer: 'Binary-to-decimal: multiply each bit from right to left by its positional power of 2 and sum. 01001000: 0×128 + 1×64 + 0×32 + 0×16 + 1×8 + 0×4 + 0×2 + 0×1 = 64 + 8 = 72. A shortcut: group bits into nibbles (groups of 4) and convert each to hex: 0100 = 4, 1000 = 8, so 01001000 = 0x48 = 72 decimal. The Base Converter on this site handles this conversion for arbitrary length binary strings.' },
  { question: 'Is my data sent to a server?', answer: 'No — all conversion happens in your browser. Nothing is transmitted.' },
  { question: 'What other encoding tools are on this site?', answer: 'The Base Converter converts between binary, decimal, octal, and hex number systems. The Base64 Encoder handles the more compact text-safe binary encoding used in practice. The Bitwise Calculator performs AND, OR, XOR operations on binary values. All are in the Dev Tools Encoders section.' },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Binary to Text Converter — Text to Binary & Back Free',
    description: 'Convert text to binary (01010100...) and binary back to text. ASCII and UTF-8 support. Runs entirely in your browser.',
    slug: 'binary-text-converter',
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
