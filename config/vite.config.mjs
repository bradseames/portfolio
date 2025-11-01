import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import mdx from '@mdx-js/rollup';
import remarkMath from 'remark-math';
import rehypeMathJax from 'rehype-mathjax';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, '..', p);

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeMathJax],
    }),
    reactRouter(),
    tsconfigPaths({ projects: [resolve('tsconfig.json')] }),

  ],
  css: {
    postcss: resolve('config/postcss.config.js'),
  },
  test: {
    setupFiles: [resolve('config/vitest.setup.mjs')],
    // ... other test config
  },

  optimizeDeps: {
    include: ['@mdx-js/react'],
  },
});
