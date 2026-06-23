import './styles.css';

import { add, subtract } from './util';
import { greet } from './helper';
import _ from 'lodash'; // Node.js module (this won't work without resolve plugin)
import moment from 'moment'; // CommonJS module (not written in ES6, needs to be converted to be included in rollup bundle)

console.log('Add:', add(2, 3));
console.log('Subtract:', subtract(5, 2));
console.log(greet('Rollup'));
console.log(_.capitalize('hello rollup'));
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

interface MathModule {
  add: (a: number, b: number) => number;
}

interface StringModule {
  toUpperCase: (str: string) => string;
}

async function loadModule(moduleName: string): Promise<void> {
  if (moduleName === 'math') {
    const { add }: MathModule = await import('./dynamicImport1');
    console.log(add(2, 3));
  } else if (moduleName === 'string') {
    const { toUpperCase }: StringModule = await import('./dynamicImport2');
    console.log(toUpperCase('hello'));
  }
}

loadModule('math');