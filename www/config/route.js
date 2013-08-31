var PagesController = require("../controllers/pagescontroller")
	, AuthController = require("../controllers/authcontroller")
	, UserController = require("../controllers/usercontroller")
	, passport = require('passport')
	, mongoose =  require('mongoose')
	;
	
var globalRoute = function(req, res, next){
	if (req.session.passport.user === undefined) {
		console.log('session is null');
		user = false;
		next();
	}else{
		user = req.user;
		next();
	}
}

profileCheck =  function(req, res, next){
	
	
}

var route = function(app, res, next){
	app.get('/*', globalRoute);
	
	app.get('/', PagesController.home);
	app.get('/login', AuthController.login);
	app.get('/logout', AuthController.logout);
	app.get('/help', PagesController.help);
	app.get('/profile', UserController.profile);   
	app.get('/list', UserController.list);  
	app.get('/styleguide', PagesController.styleguide)     
	
	// Redirect the user to Google for authentication.  When complete, Google
	// will redirect the user back to the application at
	//     /auth/google/return
	app.get('/auth/google', passport.authenticate('google'));
	
	// Google will redirect the user to this URL after authentication.  Finish
	// the process by verifying the assertion.  If valid, the user will be
	// logged in.  Otherwise, authentication has failed.
	app.get('/auth/google/return', 
	  passport.authenticate('google', { successRedirect: '/',
	                                    failureRedirect: '/auth/login' }));
	
	// Redirect the user to Twitter for authentication.  When complete, Twitter
	// will redirect the user back to the application at
	//   /auth/twitter/callback
	app.get('/auth/twitter', passport.authenticate('twitter'));
	
	// Twitter will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.
	app.get('/auth/twitter/callback', 
	  passport.authenticate('twitter', { successRedirect: '/',
	                                     failureRedirect: '/auth/login' }));
	                                     
	// Redirect the user to Facebook for authentication.  When complete,
	// Facebook will redirect the user back to the application at
	//     /auth/facebook/callback
	app.get('/auth/facebook', passport.authenticate('facebook'));
	
	// Facebook will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.
	app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/',
	                                      failureRedirect: '/auth/login' }));
	 
	 
	 app.get('/users', UserController.findAll);
	 app.get('/users/:id', UserController.findById);
	 app.post('/users', UserController.updateUser);

	 app.post('/users', UserController.addUser);
	 //app.put('/users/:id', UserController.updateUser);
	 app.delete('/users/:id', UserController.deleteUser);
	 
	/*
	app.get('/venue', venue.findaAll);
	 app.get('/venue/:id', venue.findById);
	 app.post('/venue', venue.addVenue);
	 app.put('/venue/:id', venue.updateVenue);
	 app.delete('/venue/:id', venue.deleteVenue);      
	 */                     

	
};

module.exports = route;