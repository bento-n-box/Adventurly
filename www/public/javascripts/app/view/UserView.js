/**
 * @module view/ExampleView
 */

define(['jquery','underscore','backbone','view/SubView', 'model/UserModel'], function ($, _, Backbone, SubView, userModel) {

	'use strict';

	return Backbone.View.extend({

		model: userModel,
		
		tagName: "ul",

		el: $('#main'),

		template:_.template('<li><%= user %></li>'),
 	
		initialize: function(){
			this.model.bind("change", this.render, this);
        	this.model.bind("destroy", this.close, this);
		},

	    render:function (eventName) {
	    	this.model.fetch();
	        $(this.el).html(this.template(this.model.toJSON()));
	        return this;
	    },

	    close: function(){
	    	$(this.el).unbind();
	    	$(this.el).remove();
	    }

	});
});