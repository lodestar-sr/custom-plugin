#CKEditor 5  Financial Table Plugins

###TableUnderline

####Installation
```bash
npm install
```

####Build
```bash
npm run build
```
After build, please aware of this code in the build/ckeditor.js file.
```javascript
function Iw(t){return t?!![...t.getAttributeKeys()].length:0}

.......

this._destructor=t=>t?t.destroy():false
```

####Integration
```bash
cp -rf dist ../your_app/lib
```
index.html
```html
...
<script src="lib/bundle.js"></script>
...
<div id="editor">
  <p>Simple Test</p>
</div>
```

Then, open `index.html` file on browser
