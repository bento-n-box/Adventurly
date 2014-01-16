/**
 * @module model/ExampleModel
 */

define(['backbone'], function (Backbone) {

	'use strict';

	var UserModel = Backbone.Model.extend({
    	
    	idAttribute: "_id",	
  		
  		url: "/listAll",

  		"initialize": function (options) {
  			console.log('called');
  		}
	});

	return UserModel;

});