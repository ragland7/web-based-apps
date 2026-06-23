
Now lets implement Webpack in our application to improve it and take advantage of all the benefits it provides!

## 1. Setting Up Webpack in our project

We can start by copying our Part 1 of the activity into a fresh directory and go from there

1. **Initialize the Project:**
   ```bash
   npm init -y
   npm install --save-dev webpack webpack-cli webpack-dev-server
   ```

2. **Add Loaders and Plugins:**
   ```bash
   npm install --save-dev css-loader style-loader mini-css-extract-plugin html-webpack-plugin
   ```

3. **Create `webpack.config.js`:**
   Define how to process files, where to output them, and how to generate HTML:
   ```javascript
	const path = require('path');
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const MiniCssExtractPlugin = require('mini-css-extract-plugin');
	module.exports = {
	entry: {
		main: './src/index.js',
		planet: './src/planet.js'
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	mode: 'development',
	devServer: {
		static: './dist',
		port: 3000,
		hot: true
	},
	module: {
		rules: [
		{
			test: /\.css$/i,
			use: [MiniCssExtractPlugin.loader, 'css-loader']
		},
		{
			test: /\.(png|jpe?g|svg|gif)$/i,
			type: 'asset/resource'
		},
		{
			test: /\.(woff|woff2|ttf|eot|otf)$/i,
			type: 'asset/resource'
		}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
		template: './src/templates/index.html',
		filename: 'index.html',
		chunks: ['main']
		}),
		new HtmlWebpackPlugin({
		template: './src/templates/planet.html',
		filename: 'planet.html',
		chunks: ['planet']
		}),
		new MiniCssExtractPlugin({
		filename: '[name].[contenthash].css'
		})
	],
	optimization: {
		splitChunks: {
		chunks: 'all'
		}
	}
	};
   ```
#### Explanation of Key Sections:

1. **Entry Points:**
   ```javascript
   entry: {
     main: './src/index.js',
     planet: './src/planet.js'
   },
   ```
   - Specifies multiple entry points: `main` for the main page (`index.html`) and `planet` for the planet details page (`planet.html`).
   - Each entry point generates its own JavaScript bundle.

2. **Output Configuration:**
   ```javascript
   output: {
     filename: '[name].[contenthash].js',
     path: path.resolve(__dirname, 'dist'),
     clean: true
   },
   ```
   - `[name]` dynamically names the output file based on the entry point name (e.g., `main.[hash].js`, `planet.[hash].js`).
   - `contenthash` ensures that filenames change when the file content changes, enabling efficient caching.
   - `path` specifies the directory where the bundled files will be output (`dist`).
   - `clean: true` ensures the `dist` folder is cleaned before each build.

3. **Mode:**
   ```javascript
   mode: 'development',
   ```
   - Specifies the build mode (`development` or `production`). In `development`, Webpack prioritizes speed and readability over optimization.

4. **DevServer Configuration:**
   ```javascript
   devServer: {
     static: './dist',
     port: 3000,
     hot: true
   },
   ```
   - Serves the application locally from the `dist` directory.
   - `hot: true` enables Hot Module Replacement (HMR) for live-reloading during development.

5. **Module Rules:**
   ```javascript
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: [MiniCssExtractPlugin.loader, 'css-loader']
       },
       {
         test: /\.(png|jpe?g|svg|gif)$/i,
         type: 'asset/resource'
       },
       {
         test: /\.(woff|woff2|ttf|eot|otf)$/i,
         type: 'asset/resource'
       }
     ]
   },
   ```
   - **CSS Rule:** Processes `.css` files using `css-loader` (to bundle CSS) and `MiniCssExtractPlugin.loader` (to extract CSS into separate files).
   - **Image Rule:** Handles image files (e.g., `.png`, `.jpg`, `.svg`) as `asset/resource`, moving them to the output directory and replacing file references with the correct paths.
   - **Font Rule:** Similar to images, processes font files and outputs them to the `dist` folder.

6. **Plugins:**
   ```javascript
   plugins: [
     new HtmlWebpackPlugin({
       template: './src/templates/index.html',
       filename: 'index.html',
       chunks: ['main']
     }),
     new HtmlWebpackPlugin({
       template: './src/templates/planet.html',
       filename: 'planet.html',
       chunks: ['planet']
     }),
     new MiniCssExtractPlugin({
       filename: '[name].[contenthash].css'
     })
   ],
   ```
   - **HtmlWebpackPlugin:** Automatically generates `index.html` and `planet.html` with the correct `<script>` tags for their respective bundles.
     - `chunks` ensures only the relevant bundle (`main` or `planet`) is included in each page.
   - **MiniCssExtractPlugin:** Extracts CSS into separate files for better caching and smaller JS bundles.

7. **Optimization:**
   ```javascript
   optimization: {
     splitChunks: {
       chunks: 'all'
     }
   }
   ```
   - Enables code splitting for shared dependencies (e.g., third-party libraries like `lodash`) to avoid duplicating code across bundles.

---

This configuration allows for multiple entry points, optimized output, automated asset handling, and dynamic HTML generation, providing a scalable and maintainable build system for the Cosmic Explorer project.



## 2. Structuring Your Code for Webpack

### Move Files into the `src` Folder

Restructure your project so that all source files (JavaScript, CSS, HTML, images) are inside the `src` folder. Your updated directory structure should look like this:

```
cosmic-explorer-webpack/
├── src/
│   ├── templates/
│   │   ├── index.html
│   │   ├── planet.html
│   ├── facts.js
│   ├── gallery.js
│   ├── index.js
│   ├── planet.js
├── fonts/
│   ├── cosmic-font.ttf
├── utils/
│   ├── format.js
├── styles/
│   ├── main.css
│   ├── gallery.css
│   ├── planet.css
├── images/
│   ├── earth.jpg
│   ├── mars.jpg
│   ├── jupiter.jpg
│   ├── sirius.jpg
│   ├── betelgeuse.jpg
│   ├── andromeda.jpg
│   ├── milkyway.jpg
├── webpack.config.js
├── package.json
```

### Import Assets in JavaScript

- In `index.js`, instead of linking CSS in HTML, `import` it, add these lines to the top of your `index.js`:
  ```javascript
  import '../styles/main.css';
  import '../styles/gallery.css';
  import { initGallery } from './gallery';
  ```

- In `planet.js` import both the CSS files, add these lines to the top of your `planet.js` file:
  ```javascript
  import '../styles/main.css';
  import '../styles/gallery.css';
  ```

- In `gallery.js`, `import` images, now use these references within the file instead of paths, also export our `initGallery()` function

Final code of `gallery.js` looks like this:
  ```javascript
	import earth from '../images/earth.jpg';
	import mars from '../images/mars.jpg';
	import jupiter from '../images/jupiter.jpg';
	import sirius from '../images/sirius.jpg';
	import betelgeuse from '../images/betelgeuse.jpg';
	import andromeda from '../images/andromeda.jpg';
	import milkyway from '../images/milkyway.jpg';

	const cosmicObjects = [
		{ type: 'planet', name: 'Earth', img: earth, desc: 'The blue planet, teeming with life.', slug: 'earth' },
		{ type: 'planet', name: 'Mars', img: mars, desc: 'The red planet, with hints of past water.', slug: 'mars' },
		{ type: 'planet', name: 'Jupiter', img: jupiter, desc: 'A gas giant with a famous Great Red Spot.', slug: 'jupiter' },
		{ type: 'star', name: 'Sirius', img: sirius, desc: 'The brightest star in Earth’s night sky.', slug: 'sirius' },
		{ type: 'star', name: 'Betelgeuse', img: betelgeuse, desc: 'A red supergiant star nearing the end of its life.', slug: 'betelgeuse' },
		{ type: 'galaxy', name: 'Andromeda', img: andromeda, desc: 'A spiral galaxy on a collision course with the Milky Way.', slug: 'andromeda' },
		{ type: 'galaxy', name: 'Milky Way', img: milkyway, desc: 'Our home galaxy, containing billions of stars.', slug: 'milkyway' },
	];
	
	export function initGallery() {
		const galleryDiv = document.getElementById('gallery');
		galleryDiv.innerHTML = '';
		
		cosmicObjects.forEach(obj => {
		const itemDiv = document.createElement('div');
		itemDiv.className = 'gallery-item';
		itemDiv.innerHTML = `
			<img src="${obj.img}" alt="${obj.name}">
			<h2>${obj.name}</h2>
			<p>${obj.desc}</p>
			<a href="planet.html?obj=${obj.slug}">View Details</a>
		`;
		galleryDiv.appendChild(itemDiv);
		});
	}
  ```

- Do the same thing in `planet.js`, no code this time because take it as a self exercise!

<sub><sup> Just kidding, final code is present in the repository if you need it! :)</sup></sub>


- Export the `showFact()` function in `fact.js`
```javascript
	export function showFact() {
```

**Why does this work?** Because now Webpack knows to process these files, bundle them, and optimize them. No more manual `<link>` or `<script>` tags!
Since we import the images of modules, Webpack now keeps track of the locations and updates the references in the bundle output, This ensures path is always correct

## 3. Dynamic Imports and Code Splitting

To load “interesting facts” on-demand for the planet detail page:

- In `planet.js`, replace `getElementById('loadFactsBtn').addEventListener` with the below code:
  ```javascript
  document.getElementById('loadFactsBtn').addEventListener('click', async () => {
    const { showFact } = await import('./facts'); // dynamically imports `facts.js`
    showFact(slug);
  });
  ```

This tells webpack to split `facts.js` into a separate chunk, only fetched when the user clicks the button, improving initial load times.

## 4. Tree Shaking and Production Builds

- **Tree Shaking:**
  Export functions you need, and ensure unused code isn’t imported anywhere. In production mode:
  ```bash
  npx webpack --mode production
  ```
  Webpack removes unused code automatically.

- **Check for Unused Code:**
  For example, if `unusedFunction()` in `format.js` is never imported, it won’t appear in the production bundle.

## 5. Running and Testing

- **Development Server:**
  ```bash
  npx webpack serve
  ```
  This launches a dev server with live reloading at `http://localhost:3000`.

- **Production Build:**
  ```bash
  npx webpack --mode production
  ```
  This generates an optimized, minified build in `dist/`.

## 6. Verifying the Results

Open `http://localhost:3000` and see the gallery. Click “View Details” to navigate to `planet.html`. The CSS, images, and JavaScript are automatically injected and optimized by webpack.

- Check that the “Show Interesting Facts” button dynamically loads `facts.js`.
- Inspect `dist/` to confirm the presence of hashed filenames and reduced file sizes.

## 7. Troubleshooting

If something doesn’t work:

- Ensure correct relative paths when importing CSS and images.
- Make sure `planet.js` and `facts.js` are properly included via the `HtmlWebpackPlugin` configuration and/or dynamic imports.
- Use production mode to ensure tree shaking and minification are applied.

---
## Conclusion

By integrating webpack:

- We eliminated manual script and style references.
- Enabled code splitting and lazy loading for improved performance.

- Introduced tree shaking to remove unused code, reducing bundle sizes.

- Automated HTML generation, making it easier to scale and maintain the app.


This tutorial shows how a manual setup can evolve into a modern, optimized build system that improves maintainability, scalability, and performance.
