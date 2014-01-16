/**
 * @module view/ExampleView
 */

define(['jquery','underscore','backbone','model/UserModel','collection/UserCollection'], function ($, _, Backbone, UserModel, usersCollection) {

	'use strict';

	return Backbone.View.extend({

		tagName: "ul",

		el: '#main',
 
		template: _.template('<li class="test"> test <%= obj.displayName %></li>'),

	    initialize:function () {
	        log('Backbone : Global : UserListView : Initialized');
	        var view = this;
	        this.UserModel = new UserModel();
           	this.UserModel.on('reset', this.render, this);
           	 
           	this.UserModel.fetch({
           			success: function() {
				       console.log(view.UserModel.toJSON()); 
				    }
           		});	
           	this.render();
	    },
	 
	    render:function (eventName) {	  
	    	//var data = this.UserModel.get('displayName');
	    	var data = this.UserModel.toJSON();
	    	console.log( data instanceof Array);
	    	console.log( "data" );		
	      	this.$el.html(this.template(data));
	        return this;

	    }
	});
});