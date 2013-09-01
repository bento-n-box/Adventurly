/**
 * @module view/MapView
 */

define(['jquery','underscore','backbone', 'async!http://maps.google.com/maps/api/js?v=3.exp&sensor=false&libraries=places'], function ($, _, Backbone) {
	'use strict';
	return Backbone.View.extend({

		"events": {},

		

		"initialize": function (options) {
			var view = this;

			_.bindAll(this);

			view.render();

			log('Backbone : Global : MapView : Initialized');
		
			var input = (document.getElementById('target'));
			view.searchBox = new google.maps.places.SearchBox(input);
  			
		    var mapDiv = document.getElementById('map-canvas');

            var map = new google.maps.Map(mapDiv, {
                center: new google.maps.LatLng(37.4419, -122.1419),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL
                }
            });
            var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
            var request = {
			    location: pyrmont,
			    radius: 500,
			    types: ['store']
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
			      console.log(results[i])
			    }
			  }
		},
		"placesChanged": function () {
			var view = this;
			var markers = [];
			var places = view.searchBox.getPlaces();

		    for (var i = 0, marker; marker = markers[i]; i++) {
		    	console.log(markers[i])
		      marker.setMap(null);
		    }
		    markers = [];
		    var bounds = new google.maps.LatLngBounds();
		    for (var i = 0, place; place = places[i]; i++) {
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

		      markers.push(marker);
		      bounds.extend(place.geometry.location);
		    }

		    map.fitBounds(bounds);
		},

	});
});