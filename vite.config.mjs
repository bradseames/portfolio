// vite.config.ts
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';              // MDX for Vite/Rollup
import { reactRouter } from '@react-router/dev/vite';
import remarkMath from 'remark-math';          // MDX math
// import rehypeKatex from "rehype-katex";        // or rehype-mathjax
import rehypeMathJax from 'rehype-mathjax';

export default defineConfig({
  plugins: [
    mdx({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeMathJax] }),
    reactRouter(),                   // React Router framework mode
  ],
  optimizeDeps: {
    include: ['@mdx-js/react'],
  },
});


// import {defineConfig} from 'vite';
// // import react from '@vitejs/plugin-react';
// import mdx from '@mdx-js/rollup';
// import remarkMath from 'remark-math';
// import rehypeMathJax from 'rehype-mathjax';
// import {reactRouter} from '@react-router/dev/vite
// export default defineConfig({
//   plugins: [
//     reactRouter(),
//     mdx({
//       // You need to explicitly tell @mdx-js/rollup to use @mdx-js/react
//       // for processing JSX.
//       jsxImportSource: '@mdx-js/react',
//       // Process markdown math syntax (e.g., $...$ and $$...$$)
//       remarkPlugins: [remarkMath],
//       // Convert the processed math nodes into MathJax-compatible HTML
//       rehypePlugins: [rehypeMathJax],
//     }),
//   ],
// This is necessary to resolve .mdx files correctly in your imports.
// TypeScript users will also need a similar declaration in their config.
// optimizeDeps: {
//   include: ['@mdx-js/react'],
// },
// });


// import {reactRouter} from '@react-router/dev/vite';
// import {defineConfig} from 'vite';
// import tsconfigPaths from 'vite-tsconfig-paths';
// import {mdx} from '@mdx-js/react'
// import mdx from '@mdx-js/rollup';
// import {loader} from '@mdx-js/loader'
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [
//     // MDX plugin should typically be placed before other plugins that process its output
//     mdx({
//       jsxRuntime: 'automatic', // or 'classic' depending on your setup
//       providerImportSource: '@mdx-js/react', // if using @mdx-js/react
//     }),
//     reactRouter(),
//     // react({
//     //   // Include MDX files for fast refresh and other React plugin features
//     //   include: /\.(jsx|js|mdx|md|tsx|ts)$/,
//     // }),
//     tsconfigPaths()],
//   ssr: false
// });