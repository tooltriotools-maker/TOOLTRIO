import { defineConfig, globalIgnores } from 'eslint/config'

// Keep the project on ESLint's flat-config format without loading legacy
// plugin presets during `next build`. The previous Next preset could resolve
// an empty plugin name in some CI/Vercel environments and fail the build with
// `Plugin "" not found.` TypeScript checking remains handled by Next.js.
export default defineConfig(
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    'coverage/**',
    'public/**',
    '*.min.js',
  ]),
)
