'use strict';

if($("#map").length > 0){

	/*-------------------------------------------------------------------------------
	  Map Initialization
	-------------------------------------------------------------------------------*/
	mapboxgl.accessToken = 'pk.eyJ1IjoiaGFtemFzaGF0ZWxhIiwiYSI6ImNqbGs2NXhqMDBpcm8za254YjlwdnhnZjAifQ.S28pWEmFt4b4ysT80zq55g'; // <---- YOUR MAPBOX API KEY GOES HERE
	var map = new mapboxgl.Map({
	  style: 'mapbox://styles/mapbox/light-v10',
	  center: [73.0479, 33.6844],
	  zoom: 11.5,
	  pitch: 45,
	  container: 'map',
	  antialias: true
	});

	/*-------------------------------------------------------------------------------
	  The Draggable Marker
	-------------------------------------------------------------------------------*/
	var marker = new mapboxgl.Marker()
	  .setLngLat([73.0479, 33.6844])
	  .addTo(map);

	/*-------------------------------------------------------------------------------
	  Map Building Generation
	-------------------------------------------------------------------------------*/
	// The 'building' layer in the mapbox-streets vector source contains building-height
	// data from OpenStreetMap.
	map.on('load', function() {
	  // Insert the layer beneath any symbol layer.
	  var layers = map.getStyle().layers;

	  var labelLayerId;
	  for (var i = 0; i < layers.length; i++) {
	    if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
	      labelLayerId = layers[i].id;
	      break;
	    }
	  }

	  map.addLayer({
	      'id': '3d-buildings',
	      'source': 'composite',
	      'source-layer': 'building',
	      'filter': ['==', 'extrude', 'true'],
	      'type': 'fill-extrusion',
	      'minzoom': 15,
	      'paint': {
	        'fill-extrusion-color': '#aaa',

	        // use an 'interpolate' expression to add a smooth transition effect to the
	        // buildings as the user zooms in
	        'fill-extrusion-height': [
	          'interpolate',
	          ['linear'],
	          ['zoom'],
	          15,
	          0,
	          15.05,
	          ['get', 'height']
	        ],
	        'fill-extrusion-base': [
	          'interpolate',
	          ['linear'],
	          ['zoom'],
	          15,
	          0,
	          15.05,
	          ['get', 'min_height']
	        ],
	        'fill-extrusion-opacity': 0.6
	      }
	    },
	    labelLayerId
	  );
	});

}
