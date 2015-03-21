/**
 * leaflet-image example.
 *
 */

'use strict';
var fs = require('fs');
var path = require('path');

var L = require('../../index.js');
var leafletImage = require('leaflet-image');

function leafletImageExample(callback) {
	// create an element for the map.
	var element = document.createElement('div');
	element.id = 'map-leaflet-image';
	document.body.appendChild(element);

	var map = L.map(element.id).setView([0, 0], 3);

	// load some geojson
	var gj = JSON.parse(fs.readFileSync(__dirname + '/countries.geojson'));
	L.geoJson(gj, {
		style: {
			weight: 2
		}
	}).addTo(map);

	L.marker([-12, 14]).addTo(map);
	L.marker([-12, -14]).addTo(map);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	leafletImage(map, function (err, canvas) {
		var outfilename = path.join(__dirname, 'test-leaflet-image.png');
		var out = fs.createWriteStream(outfilename);
		var stream = canvas.pngStream();

		stream.on('data', function (chunk) {
			out.write(chunk);
		});

		stream.on('end', function () {
			if (callback) {
				callback(outfilename);
			}
		});
	});
}

// export if script is called as a module
if (typeof exports === 'object') {
	module.exports = leafletImageExample;
}

// run the example if it's ran directly
if (require.main === module) {
	console.log('Saving an image using leaflet-image...');
	console.time('leaflet-image');

	leafletImageExample(function (filename) {
		console.log('Saved file to ' + filename);
		console.timeEnd('leaflet-image');
	});
}
