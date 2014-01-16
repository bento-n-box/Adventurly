		/**
 * @module collection/ExampleCollection
 */

define(['backbone', 'model/UserModel'], function (Backbone, UserModel) {

	'use strict';

	return Backbone.Collection.extend({

	    model: UserModel,

	    url: "/listAll",

	    idAttribute: "_id",

	    parse: function(response){
	    	var users = response.users;
	    	return {users: users};
	    }

	    

	});

});