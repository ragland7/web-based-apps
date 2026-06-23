
## Activity 2: Advanced Features with Rollup ##

### Folder Structure ###
```
activity2/
├── src/
│   ├── index.js
│   ├── util.js
│   ├── helper.js
│   ├── unused.js
│   ├── index.html
│   ├── styles.css
├── package.json
├── rollup.config.js
├── dist/
│   ├── bundle.js
│   ├── bundle.js.map
│   ├── bundle.css
│   ├── index.html
│   ├── bundle-stats.html
```

---

### Steps to Implement Advanced Rollup Features ###

### Step 1: Minifying the Bundle
Minifying the bundle reduces its size by removing unnecessary characters such as whitespace, comments, and unused code. We achieve this using the **Terser** plugin.

#### Code Changes
Add the Terser plugin to the `rollup.config.js` file:
```javascript
import terser from '@rollup/plugin-terser';

export default {
  // Other configurations
  plugins: [
    terser(), // Minify the bundle
  ],
};
```

#### Expected Outcome

- Minifying allows us to have smaller bundle files which gives us faster load times and lower bandwidth costs. The following step works hand in hand with step 5. The bundle sizes displayed should be clearly smaller. Hence the expected outcome is as below - 

  - The JavaScript bundle (`bundle.js`) will be minified, resulting in a smaller file size.


---

### Step 2: Resolving Node.js Modules
Node.js libraries like `lodash` are not accessible by default in Rollup. The **Resolve** plugin allows us to resolve these dependencies from the `node_modules` directory.

#### Code Changes
Add the Resolve plugin to the `rollup.config.js` file:
```javascript
import resolve from '@rollup/plugin-node-resolve';

export default {
  // Other configurations
  plugins: [
    resolve(), // Resolve Node.js modules from node_modules
  ],
};
```

#### Example Usage
In `src/index.js`, import `lodash` (a Node.js module):
```javascript
import _ from 'lodash';

console.log(_.capitalize('hello rollup'));
```

#### Expected Outcome

- This is focusing on the use of resolve() allowing us to use modules like lodash which would not be possible without this plugin's presence. Hence this is the expected outcome - 

  - The bundle includes the `lodash` module, enabling its usage in the code.

---

### Step 3: Converting CommonJS Modules
Some libraries, such as `moment`, are written in the CommonJS format. The **CommonJS** plugin converts these modules to ES6 so they can be included in the Rollup bundle.

#### Code Changes
Add the CommonJS plugin to the `rollup.config.js` file:
```javascript
import commonjs from '@rollup/plugin-commonjs';

export default {
  // Other configurations
  plugins: [
    commonjs(), // Convert CommonJS modules to ES6
  ],
};
```

#### Example Usage
In `src/index.js`, require the `moment` library (a CommonJS module):
```javascript
import moment from 'moment'; // not in commonjs syntax, which is intended.
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
```

#### Expected Outcome

- Since the rollup bundle requires us to have it in ES6 format, we would need to convert a format like commonjs to ES6 before bundling. One such library is moment. Hence the below is the expected outcome - 

- The `moment` library is converted to ES6 format and included in the bundle.

---

### Step 4: Visualizing the Bundle
The **Visualizer** plugin generates an interactive HTML report that shows the size and composition of the bundle. This helps identify large dependencies and optimize the project.

#### Code Changes
Add the Visualizer plugin to the `rollup.config.js` file:
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  // Other configurations
  plugins: [
    visualizer({
      filename: 'dist/bundle-stats.html',
      open: true, // Automatically open the report in a browser
    }),
  ],
};
```

#### Expected Output
Run the build process:
```bash
npm run build
```

The `dist/bundle-stats.html` file is generated, showing the composition of the bundle.

#### Visualizer Output
---

### Step 5: Analyzing the Bundle
The **Analyzer** plugin provides a summary of the bundle, including its size, module count, and code reduction. This is displayed in the terminal after building.

#### Code Changes
Add the Analyzer plugin to the `rollup.config.js` file:
```javascript
import analyze from 'rollup-plugin-analyzer';

export default {
  // Other configurations
  plugins: [
    analyze({
      summaryOnly: true, // Show only the summary in the terminal
    }),
  ],
};
```

#### Expected Output
Run the build process:
```bash
npm run build
```

The terminal displays the bundle summary, including the size and module count.

---

### Summary of Changes ###
- **Minification**: Used the Terser plugin to reduce the bundle size.
- **Node.js Module Resolution**: Added the Resolve plugin to include libraries from `node_modules`.
- **CommonJS Conversion**: Used the CommonJS plugin to convert modules like `moment` to ES6.
- **Visualization**: Generated an interactive HTML report with the Visualizer plugin.
- **Analysis**: Analyzed the bundle summary using the Analyzer plugin.