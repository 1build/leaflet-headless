Leaflet-headless
----------------

[Leaflet](http://leafletjs.com) for node, cleaned up version of https://github.com/rclark/server-side-leaflet.
This does not include the actual leaflet code but has it as a dependency.

## Limitations
 - fixed 1024x1024 map size.

## Example

```JavaScript
var L = require('leaflet-headless');

var map = L.map(document.createElement('div'));

map.setView([52, 4], 10);

var marker = L.marker([52, 4]).addTo(map);
```

Another example in `examples/leaflet-image/index.js`, using [leaflet-image](https://github.com/mapbox/leaflet-image) to output a `.png`.