## **Activity 1: With Webpack**

Now follow along and lets implement some basic functionalities of Webpack together!


### **Folder Structure**
```
activity1webpack/
├── src/
│   ├── index.js
│   ├── math.js
├── index.html
├── package.json
├── webpack.config.js
├── dist/
│   ├── (generated bundle.js)
```

### **Code**

Update all the files code as below: 

#### `src/math.js`
```javascript
export function add(a, b) {
    return a + b;
}
```

#### `src/index.js`
```javascript
import { add } from './math.js';
console.log(add(3, 5));
```

#### `index.html`
```html
<!DOCTYPE html>
<html>
	<body>
		<script src="dist/bundle.js"></script>
	</body>
</html>
```

### **What Is `webpack.config.js`?**

Create a `webpack.config.js` in the root directory with the following code.
The `webpack.config.js` file is the configuration file for Webpack. It defines how Webpack processes and bundles your files.

#### **Code**
```javascript
const path = require('path');

module.exports = {
    entry: './src/index.js', 
    output: {
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'dist'), 
    },
    mode: 'development', 
};

```

### **Important Parts of `webpack.config.js`**
1. **`entry`**:
   - Specifies the entry point of the application (`src/index.js`).

2. **`output`**:
   - Defines the output file (`dist/bundle.js`) and directory (`dist/`).

3. **`mode`**:
   - Defines the build mode (`development` or `production`).

---

### **Steps to Set Up Webpack**

1. **Initialize the Project**:
   Run the following command to create a `package.json` file:
   ```bash
   npm init -y
   ```

2. **Install Webpack**:
   Install Webpack and Webpack CLI as development dependencies:
   ```bash
   npm install webpack webpack-cli --save-dev
   ```

3. **Add Build Script**:
   Update `package.json` to include a build script:
   ```json
   "scripts": {
       "build": "webpack"
   }
   ```

4. **Run Webpack**:
   Generate the bundle file by running:
   ```bash
   npm run build
   ```

   This command creates the `dist/bundle.js` file.

5. **Open in Browser**:
   Open `index.html` in your browser. Ensure that it loads `dist/bundle.js`, we can also see that the `console.log()` works undependant on import order

---

## **Conclusion**
1. **Without Webpack**:
   - Developers must manage script loading manually.
   - Incorrect import orders cause runtime errors.

2. **With Webpack**:
   - Dependencies are resolved automatically.
   - Script order doesn’t matter.
   - The project is more scalable, maintainable, and optimized.
