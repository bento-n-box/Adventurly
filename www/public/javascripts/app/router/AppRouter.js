/**
 * @module router/AppRouter
 */

define(['backbone'], function (Backbone) {

	'use strict';
	

	return Backbone.Router.extend({

		"initialize": function () {
			log('Backbone : Global : AppRouter : Initialized');
		
		},
		"routes": {
			"": "index",
			"users/:id#": "UserView",
			"users": "UserList"
		},
      	"UserView": function () {
	      	alert('userView');
	      		
      	},
      	"UserList": function () {
	      	alert('userList');
	      		
      	},
		"index": function () {
		}
	});
	new AppRouter();
});