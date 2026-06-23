import './styles.css';

import { add, subtract } from './util.js';
import { greet } from './helper';
// import _ from 'lodash'; // Node.js module (this won't work without resolve plugin)
import moment from 'moment'; // CommonJS module (not written in ES6, needs to be converted to be included in rollup bundle)

// No need for common js syntax which looks like - 
// const moment = require('moment');

console.log('Add:', add(2, 3));
console.log('Subtract:', subtract(5, 2));
console.log(greet('Rollup'));
console.log(_.capitalize('hello rollup'));
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));