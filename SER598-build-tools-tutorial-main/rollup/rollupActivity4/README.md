
## Activity 4: TypeScript Integration ##

### Folder Structure ###
```
activity4/
├── src/
│   ├── index.ts
│   ├── another.ts
│   ├── util.ts
│   ├── helper.ts
│   ├── dynamicImport1.ts
│   ├── dynamicImport2.ts
│   ├── styles.css
│   ├── index.html
├── tsconfig.json
├── package.json
├── rollup.config.js
├── dist/
│   ├── cjs/
│   │   ├── index.js
│   │   ├── another.js
│   │   ├── types/
│   │       ├── index.d.ts
│   │       ├── another.d.ts
│   ├── esm/
│   │   ├── index.js
│   │   ├── another.js
│   │   ├── types/
│   │       ├── index.d.ts
│   │       ├── another.d.ts
│   ├── bundle.css
│   ├── bundle-stats.html
```

---

### Steps to Implement TypeScript Support ###

### Step 1: Install the TypeScript Plugin
To enable TypeScript support, we need the Rollup TypeScript plugin and TypeScript itself.

#### Installation
Run the following command to install the required packages:
```bash
npm install --save-dev @rollup/plugin-typescript typescript
```

---

### Step 2: Add TypeScript Configuration
A `tsconfig.json` file is needed to specify TypeScript compiler options. This ensures consistent behavior across the project.

#### Code
Create `tsconfig.json` with the following content:
```json
{
    "compilerOptions": {
      "target": "ESNext",
      "module": "ESNext",
      "declaration": true,
      "strict": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "moduleResolution": "node"
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

#### Key Options
- `declaration`: Generates type declaration files (`.d.ts`).
- `strict`: Enables all strict type-checking options.
- `esModuleInterop`: Ensures compatibility with CommonJS modules.
- `moduleResolution`: Specifies how modules are resolved (`node`).

---

### Step 3: Convert JavaScript to TypeScript
Rename all `.js` files in the `src/` folder to `.ts` and add type annotations where applicable.

#### Example Conversion
**Before (JavaScript):**
```javascript
export function add(num1: number, num2: number): number {
    return num1 + num2;
}
```

**After (TypeScript):**
```typescript
export function toUpperCase(stringToConvert: string): string {
    return stringToConvert.toUpperCase();
}
```

Repeat this process for all files in the `src/` folder.

---

### Step 4: Update Rollup Configuration
The Rollup configuration needs to include the TypeScript plugin and use the `tsconfig.json` file for settings.

#### Code
Add the TypeScript plugin to `rollup.config.js`:
```javascript
import typescript from '@rollup/plugin-typescript';

const plugins = [
  // Other plugins
  typescript({
    tsconfig: './tsconfig.json',
    declaration: true,
    declarationDir: 'dist/types',
  }),
];
```

Configure separate outputs for CommonJS and ES Modules:
```javascript
export default [
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
```
### Step 5 Browser related changes

Note: Seems like iife support for dynamic imports in rollup does not work as of now. So an option called 'inlineDynamicImports' should be set to true in the output section of your rollup.config.js to prevent build errors.

```javascript
export default [
  {
    input: './src/index.ts',
    output: {
      file: 'dist/bundle.js',      
      format: 'iife',               // IIFE format for browsers
      sourcemap: true,
      /* Prevents code-splitting for IIFE. This is important since rollup causes problems otherwise */
      inlineDynamicImports: true,   
    },
    plugins: plugins, // the usual stuff mentioned before
  },
];
```

#### Key Changes
- **`declaration`**: Enables generation of `.d.ts` files.
- **`declarationDir`**: Specifies the output directory for type declaration files.

---

### Step 6: Generate Type Declarations
Run the Rollup build command to generate the output bundles and type declaration files.

#### Command
```bash
npm run build
```

#### Expected Output

- The above changes are focused on taking are typescript application and providing the similar results as we would get for a normal js application. For the same, we would expect the following output - 

  - Bundled JavaScript files in `dist/cjs` and `dist/esm`.
  - Type declaration files (`.d.ts`) in `dist/cjs/types` and `dist/esm/types`.

---

### Summary of Changes ###
1. **Install TypeScript Support**: Added the Rollup TypeScript plugin and TypeScript itself.
2. **TypeScript Configuration**: Created `tsconfig.json` to define compiler options.
3. **File Conversion**: Renamed all `.js` files to `.ts` and added type annotations.
4. **Type Declaration Files**: Configured Rollup to generate `.d.ts` files for both CommonJS and ES module outputs.