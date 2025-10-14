import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';
import {CompatibleConfigArray} from 'typescript-eslint/dist/compatibility-types.js';

// @ts-check
export default CompatibleConfigArray(
  tseslint.configs.recommended,
  ...mantine,
  {ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}']},
  {
    files: ['**/*.story.tsx'],
    rules: {'no-console': 'off'},
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: process.cwd(),
        project: ['./tsconfig.json'],
      },
    },
  }
);
