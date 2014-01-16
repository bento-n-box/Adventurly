/**
 * @module router/AppRouter
 */

define(['backbone', 'model/UserModel', 'view/UserView', 'view/UserListView', 'collection/UserCollection'], function (Backbone, userModel, userView, userListView, UserCollection) {

	'use strict';
	

	return Backbone.Router.extend({

		"initialize": function () {
			log('Backbone : Global : AppRouter : Initialized');
		},

		"routes": {
			"users": "list",
			"profile/:id":"UserDetails"
		},

 
	    list:function () {
	    	console.log('list view');
	        //console.log(this.userListView.render().el);
	        // App.cache.models.userModel = new userModel({})
	        // App.cache.models.userModel.fetch();
	        App.cache.views.userListView  = new userListView();
	        
	        //App.cache.models.userModel.fetch();
	        //$('#main').append(App.cache.views.userListView.render().el);
	    },
	 
	    userDetails:function (id) {
	        this.user = this.userList.get(id);
	        this.userView = new UserView({ model: this.user });
	        $('#main').apend(this.userView.render().el);
	    }
	});
	new AppRouter();
});