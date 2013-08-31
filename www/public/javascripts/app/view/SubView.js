/**
 * @module view/SubView
 */

define(['underscore', 'backbone', 'swig', 'plugins/text!template/ExampleTemplate.html'], function (_, Backbone, swig, ExampleTemplate) {

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

			view.exampleTemplate = swig.compile(ExampleTemplate);
			view.$el.append(view.exampleTemplate({
				"url": "https://github.com/cpbtechnology/US-boilerplate-backbonejs"
			}));
		},
		'saveProfile': function (e) {
			
		}

	});

});