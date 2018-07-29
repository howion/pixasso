# pixasso

Javascript library for browsers to generate pixel arts from images with custom pixel size, zoom and color pick mode.

## Usage

Download and include [pixasso.min.js](https://github.com/howion/pixasso/blob/master/lib/pixasso.min.js)

```html
<script src="pixasso.min.js"></script>
```

```js
var img = document.createElement('img');
// img.src = ''

var options = {
  pixSize: 10, // pixSize > 0
  zoom: 10,    // zoom    > 0
  colorPickMode: pixasso.colorPickMode.JointColor
};

pixasso.createPixelArt(img, options.pixSize, options.zoom, options.colorPickMode);
//-> <img>
```

## Example

<p align="center">
  <img src="https://raw.githubusercontent.com/howion/box/master/pixasso/example.png">
</p>

## License

[**MIT**](https://github.com/howion/pixasso/blob/master/LICENSE)
