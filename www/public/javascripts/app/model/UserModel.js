/**
 * @module model/ExampleModel
 */

define(['backbone'], function (Backbone) {

	'use strict';

	return Backbone.Model.extend({
		urlRoot: '/users',
		

		"defaults": {
				_id: null,
			    name: "",
			    sport: "Cast-Fishing",
			    description: "",
			    picture: null,
		},

		"initialize": function () {
			
			
		}

	});

});