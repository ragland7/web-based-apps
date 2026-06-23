import html from '@rollup/plugin-html';
import css from 'rollup-plugin-css-only';

import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { visualizer } from 'rollup-plugin-visualizer';
import analyze from 'rollup-plugin-analyzer';

import path from 'path';
import fs from 'fs';

export default {
  input: ['./src/index.js', './src/another.js'],
  external: ['lodash'],
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true,
      preserveModules: true,
    },
    {
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: true,
    }
  ],
  plugins: [
    html({
      fileName: 'index.html',
      template: () => {
        const htmlPath = path.resolve(__dirname, 'src/index.html');
        return fs.readFileSync(htmlPath, 'utf8');
      },
    }),
    css({ output: 'bundle.css' }),
    // minify the bundle
    terser(),
    // For resolving node_modules packages
    resolve(), 
    // For converting CommonJS modules to ES6
    commonjs(), 
    // For visualizing the bundle
    visualizer({
      filename: 'dist/bundle-stats.html',
      open: true,
    }),
    // For analyzing the bundle
    analyze({
      summaryOnly: true,
    }),
    
  ],
};