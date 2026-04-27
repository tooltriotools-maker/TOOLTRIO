import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'chmod Calculator — Unix File Permissions Free Online',
  description: 'Convert between symbolic (rwxr-xr-x) and octal (755) Unix file permissions. Visual breakdown of owner, group, and other permissions. Runs in your browser.',
  slug: 'chmod-calculator',
  keywords: ['chmod calculator online free','unix file permission calculator browser','linux chmod 755 644 tool','octal to permission converter','file permission checker free'],
})

const faqs = [
  { question: "What do the three groups in Unix permissions mean?", answer: `Every file in a Unix system has three sets of permissions: owner (the user who owns the file), group (users belonging to the file's assigned group), and other (everyone else). Each set has three bits: read (r), write (w), and execute (x). The typical pattern rwxr-xr-x means: owner can read, write, and execute; group members can read and execute but not write; all others can read and execute but not write. This is the basis of Unix security — a web server process only accesses files where 'other' or its group has the needed permissions.` },
  { question: "What is the difference between chmod 755 and chmod 644?", answer: `chmod 755 (rwxr-xr-x) is the standard for directories and executable scripts: the owner has full control, everyone else can read and traverse. chmod 644 (rw-r--r--) is the standard for regular files: the owner can read and write, everyone else can only read. The rule: directories and scripts that need execution use 755; regular files like HTML, CSS, images, and configuration files use 644. A common mistake is setting all files to 777 (rwxrwxrwx — everyone can do everything), which is a security risk on any shared or internet-facing system.` },
  { question: "What does the execute bit mean for a directory?", answer: `For files, the execute bit means the file can be run as a program. For directories, it means the directory can be entered — you can cd into it and access files inside. This differs from read (r), which lets you list directory contents with ls. A directory with r but not x shows filenames but denies access to the files. A directory with x but not r allows access to specific files (if you know the exact name) but ls shows 'Permission denied'. Most useful directories need both r and x.` },
  { question: "What does chmod 4755 (the setuid bit) do?", answer: `The setuid bit (4 in the leading digit) causes an executable to run with the permissions of the file owner rather than the user running it. The canonical example: /usr/bin/passwd needs to write to /etc/shadow (owned by root), but runs as the regular user. The setuid bit lets it temporarily run as root for that specific operation. Setuid is security-critical: a vulnerable setuid root binary can be exploited to escalate privileges. In web application development, setuid binaries should be avoided unless absolutely necessary.` },
  { question: "How do I fix 'Permission denied' errors in a Linux web server?", answer: `Most common causes: (1) The web server process (nginx/apache running as www-data) does not have read permission on the file — check with ls -la and ensure 'other' or the group has at least r. (2) A directory in the path does not have execute permission for the web server user — every directory from / to the file must be traversable. (3) SELinux or AppArmor is blocking access despite correct permissions — check /var/log/audit/audit.log. Quickest diagnostic: sudo -u www-data cat /path/to/file.` },
  { question: "What is umask and how does it affect file creation permissions?", answer: `umask is subtracted from the maximum permissions when creating new files. Default maximum for files: 666 (rw-rw-rw-). With common umask 022: files are created at 644 (666 minus 022), directories at 755 (777 minus 022). umask 027 creates files at 640 and directories at 750, blocking 'other' from any access. Web applications running as a dedicated user often set umask 027 or 077 to ensure created files are not world-readable by default.` },
  { question: "What other infrastructure tools are on this site?", answer: `The CIDR Calculator handles IP subnet math — the other common infrastructure task requiring bit-level thinking. The Cron Expression Generator builds scheduled task syntax for server automation. The Bandwidth Calculator estimates network throughput. The HTTP Status Codes reference covers server log error codes. The .htaccess Generator builds Apache redirect and rewrite rules. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'chmod Calculator — Unix File Permissions Free Online',
    description: 'Convert between symbolic (rwxr-xr-x) and octal (755) Unix file permissions. Visual breakdown of owner, group, and other permissions. Runs in your browser.',
    slug: 'chmod-calculator',
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
