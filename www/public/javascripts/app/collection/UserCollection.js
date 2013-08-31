/**
 * @module collection/ExampleCollection
 */

define(['backbone', 'model/UserModel'], function (Backbone) {

	'use strict';

	return Backbone.Collection.extend({

		"initialize": function () {

			this.model = User;

			log('Backbone : UserCollection : Initialized');

		}

	});

});