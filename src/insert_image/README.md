Fullscreen for CKEditor 5 classic editor build


```
npm i -D @ckeditor/ckeditor5-core
npm i -D @ckeditor/ckeditor5-ui
```



Include in your ckeditor.js

```
import InsertImage from './InsertImage';
```

Include in the plugin List
ClassicEditor.builtinPlugins = [
	....
	InsertImage,
];
```

And include it in your toolbar
```
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			.....,
			'insertImage'
		]
	},
```
