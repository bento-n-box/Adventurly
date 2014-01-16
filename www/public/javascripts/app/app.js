/**
 * @module app
 */

define([
		'jquery',
		'underscore',
		'modernizr',
		'backbone',
		'swig',
		'helpers/events',
		'helpers/analytics',
		'helpers/utilities',
		'settings',
		'collection/UserCollection',
		'model/AppConfig',
		'model/UserModel',
		'router/AppRouter',
		'view/userlistView',
		'view/userView',
		'view/MapView'
	], // end dependencies
	function ($, _, Modernizr, Backbone, Swig, Events, Analytics, Utilities, settings, UserCollection, AppConfig, UserModel, AppRouter, userListView, userView, MapView) {

	'use strict';

	 window.App = {

		"config": new AppConfig(settings),

		"cache": {
			"routers": {},
			"models": {},
			"collections": {},
			"views": {}
		},

		/**
		 * Initialize Application. Responsible for instantiating Backbone router and starting Backbone history.
		 * @method App.initialize
		 */
		"initialize": function () {
			Utilities.initialize();

			Analytics.initialize({
				"gaAccountId": App.config.get('gaAccountId'),
				"trackingMap": App.trackingMap
			}).pageTrack('/index');

			App.bindCustomEvents();

			App.cache.routers.appRouter = new AppRouter();
			Backbone.history.start({ pushState: true });
			
			
		
			// App.cache.views.userListView = new userListView();
			// App.cache.models.userModel = new UserModel({})
			// App.cache.collections.UserCollection = new UserCollection({})
			
		 //    go here first: https://developers.google.com/maps/documentation/javascript/tutorial#api_key
			// App.cache.views.mapView = new MapView({
			// 	"el": "#map-canvas"
			// });

			log('App : Initialized');
			
			return App; // do not use "this" in a static context
		},

		/**
		 * Use this function to bind tracking against any custom event triggered against the app.events dispatch.
		 * @method App.bindCustomEvents
		 */
		"bindCustomEvents": function () {
			
			Events.bind('trackPage', function (pageName) {
				Analytics.pageTrack(pageName);
			});

			log('App : Custom Events Binding Complete');
			return App;
		},

		"trackingMap": {
			"click": {
				"section-main": function (e) {
					Analytics.customEventTrack(['param1', 'param2', 'param3']);
				}
			}
		}
	};
	return App;
});