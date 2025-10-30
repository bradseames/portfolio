import {defineConfig} from 'vite';
import {reactRouter} from '@react-router/dev/vite';
import mdx from '@mdx-js/rollup';
import remarkMath from 'remark-math';
import rehypeMathJax from 'rehype-mathjax';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeMathJax],
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    include: ['@mdx-js/react'],
  },
});
