import json from '@eslint/json';
import markdown from '@eslint/markdown';
import mantine from 'eslint-config-mantine';
import eslintConfigPrettier from 'eslint-config-prettier';
import mdx from 'eslint-plugin-mdx';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...mantine,
  { ...mdx.flat, files: ['**/*.mdx'] },
  ...markdown.configs.recommended,
  ...json.configs.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  eslintConfigPrettier, // Must be last
  {
    ignores: [
      '**/node_modules/**',
      '**/.react-router/**',
      '**/build/**',
      '**/dist/**',
      'config/',
      '.idea/',
    ],
  },
);
