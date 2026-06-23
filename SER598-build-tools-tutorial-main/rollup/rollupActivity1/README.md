
## Activity 1: With Rollup ##

### Folder Structure ###
```
activity1rollup/
├── src/
│   ├── index.js
│   ├── math.js
│   ├── index.html
├── package.json
├── rollup.config.js
├── dist/
│   ├── bundle.js
│   ├── bundle.css
│   ├── index.html
```

### Code ###

**src/math.js**
```javascript
export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}
```

**src/index.js**
```javascript
import { add, multiply } from './math.js';

console.log("Sum:", add(2, 3));
console.log("Product:", multiply(2, 3));
```

**src/index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rollup Project</title>
  <link rel="stylesheet" href="bundle.css">
</head>
<body>
  <h1>Hello, Rollup!</h1>
  <script src="bundle.js"></script>
</body>
</html>
```

---

## What Is rollup.config.js? ##
The `rollup.config.js` file is the configuration file for Rollup. It defines how Rollup processes and bundles files. You will need to add this file directly to the directory at the root level.

**rollup.config.js**
```javascript
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
```

**Important Parts of rollup.config.js**
- **input**: Specifies the entry point of the application (`src/index.js`).
- **output**: Defines the output file (`dist/bundle.js`), the format (ES modules), and enables source maps for debugging.
- **plugins**:  
  - `@rollup/plugin-html`: Generates the HTML file for the project.  
  - `rollup-plugin-css-only`: Extracts CSS into `bundle.css`.

---

## Steps to Set Up Rollup ##

1. Initialize the Project (if needed):  
   `npm init -y`

2. Install Rollup and Plugins:  
   ```bash
   npm install --save-dev rollup rollup-plugin-html 
   npm install --save-dev rollup-plugin-css-only
   npm install --save-dev http-server
   npm install --save-dev @rollup/plugin-html
   ```

3. Add the rollup.config.js file as given in the earlier section.

4. Create or Copy Required Files:  
   Create `index.js`, `index.html`, and `style.css` in the `src/` folder. For the purpose of this tutorial, we have pre-built files in the GitHub repository.

5. Add Scripts to package.json:  
   For example:  
   ```json
   "scripts": {
       "build": "rollup -c",
       "serve": "http-server dist"
   }
   ```

6. Run Rollup:  
   - `npm run build` to generate the `dist` folder with `bundle.js`, `bundle.css`, and `index.html`.
   - `npm run serve` to start a local server and view your application in the browser.

---
## Conclusion ##

Without Rollup:
- Developers must manually manage script and CSS loading.
- Incorrect import orders lead to runtime errors.

With Rollup:
- Dependencies are resolved automatically.
- Tree shaking eliminates unused code, reducing bundle size.
- Script and CSS order are handled by Rollup, simplifying project management.
- The project becomes more scalable, maintainable, and optimized for both development and production environments.
