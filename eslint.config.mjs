// eslint.config.mjs
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    '.agents/**', // Vendored agent skills, not app code.
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig;
