/**
 * @module view/SubView
 */

define(['underscore', 'backbone', 'swig'], function (_, Backbone, swig) {

	'use strict';

	return Backbone.View.extend({

		"events": {
			'click #saveProfile': 'saveProfile'
			
		},

		"initialize": function (options) {
			var view = this;

			_.bindAll(this);

			view.render();

			log('Backbone : Global : SubView : Initialized');
		},

		"render": function () {
			var view = this;
		},
		'saveProfile': function (e) {
			
		}

	});

});