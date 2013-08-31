/**
 * @module view/ExampleView
 */

define(['jquery','underscore','backbone','view/SubView'], function ($, _, Backbone, SubView) {

	'use strict';

	return Backbone.View.extend({

		"events": {},

		"initialize": function (options) {
			var view = this;

			_.bindAll(this);

			view.render();

			log('Backbone : Global : UserListView : Initialized');
		},

		"render": function () {
			var view = this;
			
			$(document).click(function(e){
				var target = e.target;
				if($(target).is('.userName')){
					$('.dropdown-menu').addClass('active');
				}
				else {				
					$('.dropdown-menu').removeClass('active');
				}
			})

			
			
			view.subview = new SubView({
				"el": "#content"
			});
		}
	});
});