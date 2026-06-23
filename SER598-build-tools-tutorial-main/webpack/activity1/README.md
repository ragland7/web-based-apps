## **Activity 1: Without Webpack**

### **Folder Structure**
```
activity1/
├── index.html
├── index.js
├── math.js
```

### **Code**

#### `math.js`
```javascript
function add(a, b) {
    return a + b;
}

window.add = add;
```

#### `index.js`
```javascript
console.log(add(3, 5));
```

#### `index.html`
```html
<!DOCTYPE html>
<html>
<body>
	<!-- Correct order of import -->
	<script src="math.js"></script>
	<script src="index.js"></script>


	<!-- Incorrect order of import, will not work -->
	<!-- <script src="index.js"></script> -->
	<!-- <script src="math.js"></script> -->

</body>
</html>
```

Let's now open up the `index.html` file on our browser to start the application and see if the `console.log()` works.

We can notice that it fails we uncomment the incorrect order of import above and passes if we do vice versa.

### **Why It Fails**
   - If the `<script>` tags in `index.html` are not in the correct order (e.g., `index.js` before `math.js`), the browser will throw an error:
     ```
     Uncaught ReferenceError: add is not defined
     ```

   - All functions are attached to the global `window` object, increasing the risk of name conflicts as the application grows.

---