import html from '@rollup/plugin-html';
import css from 'rollup-plugin-css-only';

import path from 'path';
import fs from 'fs';

export default {
  input: './src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    html({
      fileName: 'index.html',
      template: () => {
        const htmlPath = path.resolve(__dirname, 'src/index.html');
        return fs.readFileSync(htmlPath, 'utf8');
      },
    }),
    css({ output: 'bundle.css' }),
  ],
};