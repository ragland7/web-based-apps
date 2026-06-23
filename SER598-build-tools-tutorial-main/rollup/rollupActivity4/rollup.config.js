// rollup.config.js

import html from '@rollup/plugin-html';
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { visualizer } from 'rollup-plugin-visualizer';
import analyze from 'rollup-plugin-analyzer';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import fs from 'fs';

const commonPlugins = [
  resolve(),
  commonjs(),
  analyze({ summaryOnly: true }),
];

export default [
  // **Browser Build**
  {
    input: './src/index.ts',
    output: {
      file: 'dist/bundle.js',      
      format: 'iife',               // IIFE format for browsers
      sourcemap: true,
      inlineDynamicImports: true,   // Prevents code-splitting for IIFE. This is important since rollup causes problems otherwise
    },
    plugins: [
      html({
        fileName: 'index.html',
        template: () => fs.readFileSync(path.resolve(__dirname, 'src/index.html'), 'utf8'),
      }),
      css({ output: 'bundle.css' }),
      ...commonPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
      terser(),
      visualizer({
        filename: 'dist/bundle-stats.html',
        open: true,
      }),
    ],
  },
  
  // **CommonJS (CJS) Build**
  {
    input: ['./src/index.ts', './src/another.ts'], 
    external: ['lodash'],                          
    output: {
      dir: 'dist/cjs',              
      format: 'cjs',                
      sourcemap: true,
      preserveModules: true,        
    },
    plugins: [
      css({ output: 'cjs.css' }),
      ...commonPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,                      
        declarationDir: './dist/cjs/types',     
      }),
      terser(),
    ],
  },
  
  // **ES Module (ESM) Build**
  {
    input: ['./src/index.ts', './src/another.ts'], 
    external: ['lodash'],                           
    output: {
      dir: 'dist/esm',              
      format: 'esm',                
      sourcemap: true,
    },
    plugins: [
      css({ output: 'esm.css' }),
      ...commonPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,                      
        declarationDir: './dist/esm/types',     
      }),
      terser(), 
    ],
  },
];