/**
 * @module view/MapView
 */

define(['jquery','underscore','backbone', 'async!http://maps.google.com/maps/api/js?v=3.exp&sensor=false&libraries=places&type=hike'], function ($, _, Backbone) {
	'use strict';
	return Backbone.View.extend({

		"events": {},

		
		//src="http://maps.google.com/maps?file=api&v=2&sensor=false&key=AIzaSyBRgKI3IOoNEgDvWEG0P2D8K0y9FZNivnE"
// 		<!--- http://fs.usda.gov/wps -->
// <!-- <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key=ABQIAAAAY93b7gGv4eo9JgOwH0dxlhSKzpSm-AJhzjSRYtU-3IUjK0SHDBS4s4NEtjPP0KyDE82McKs62ERMZg" type="text/javascript"></script>  -->

// <!-- Overall USDA Google API key 
// <script src="http://maps.google.com/maps?file=api&amp;v=2.1.50&amp;client=gme-usda&amp;sensor=false&amp;key=geme-usda" type="text/javascript"></script>
// -->

		"initialize": function (options) {
			var view = this;

			_.bindAll(this);

			view.render();

			log('Backbone : Global : MapView : Initialized');
		
			var input = (document.getElementById('target'));
			var options = {
		
			  types: ['trailhead']
			};

			view.searchBox = new google.maps.places.SearchBox(input);
  			
		    var mapDiv = document.getElementById('map-canvas');

            var map = new google.maps.Map(mapDiv, {
                center: new google.maps.LatLng(37.4419, -122.1419),
                zoom: 13, 
                mapTypeId: google.maps.MapTypeId.SATELLITE,
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL
                }
            });
            var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
            var request = {
			    location: pyrmont,
			    radius: 500,
			    types: ['trailhead']
			  };
			var	infowindow = new google.maps.InfoWindow();
			var service = new google.maps.places.PlacesService(map);
			service.nearbySearch(request, view.placesResults);

            google.maps.event.addListener(view.searchBox, 'places_changed', view.placesChanged);
            google.maps.event.addListener(map, 'bounds_changed', view.mapMove);
            
            window.map = map;
            	
		},

		"render": function () {
			var view = this;
		},
		"mapMove": function(){
			console.log('mapMove')
			var bounds = map.getBounds();
		},
		"placesResults": function () {
			console.log('placesResults')
			 if (status == google.maps.places.PlacesServiceStatus.OK) {
			    for (var i = 0; i < results.length; i++) {
			      createMarker(results[i]);
			    }
			  }
		},
		"placesChanged": function () {
			var view = this;
			var markers = [];
			var places = view.searchBox.getPlaces();

		    for (var i = 0, marker; marker = markers[i]; i++) {
		      	marker.setMap(null);
		      	console.log(markers[i])
		    }
		    markers = [];
		    var bounds = new google.maps.LatLngBounds();
		    for (var i = 0, place; place = places[i]; i++) {
		    	console.log(places[i])
		      var image = {
		        url: place.icon,
		        size: new google.maps.Size(71, 71),
		        origin: new google.maps.Point(0, 0),
		        anchor: new google.maps.Point(17, 34),
		        scaledSize: new google.maps.Size(25, 25)
		      };
		      var marker = new google.maps.Marker({
		        map: map,
		        icon: image,
		        title: place.name,
		        position: place.geometry.location
		      });
		      console.log(marker);
		      markers.push(marker);
		      bounds.extend(place.geometry.location);
		    }

		    map.fitBounds(bounds);
		},

	});
});