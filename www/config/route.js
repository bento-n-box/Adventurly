var PagesController = require("../controllers/pagescontroller")
	, AuthController = require("../controllers/authcontroller")
	, UserController = require("../controllers/usercontroller")
	, passport = require('passport')
	, mongoose =  require('mongoose')
	;
	
var globalRoute = function(req, res, next){
	console.log(req.isAuthenticated())
	if (req.session.passport.user === undefined) {
		console.log('session is null');
		user = false;
		next();
	}else{
		user = req.user;
		next();
	}
}

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
};


var route = function(app, res, next){
	app.get('/*', globalRoute);
	
	app.get('/', PagesController.home);
	app.get('/login', AuthController.login);
	app.get('/logout', AuthController.logout);
	app.get('/help', PagesController.help);
	app.get('/list', UserController.list);  
	app.get('/listall', UserController.listAll);  
	app.get('/styleguide', PagesController.styleguide)     
	
	// Google Passport Auth Login
	app.get('/auth/google', passport.authenticate('google'));
	app.get('/auth/google/return', 
		passport.authenticate('google', { failureRedirect: '/login'}),
		function(req, res) {
		    res.redirect('/');
		  });

	
	// Twitter Passport Auth Login
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', 
	passport.authenticate('twitter', { failureRedirect: '/login'}),
		function(req, res) {
		    res.redirect('/');
		  });

	//Facebook Passport Auth Login
	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', { failureRedirect: '/login'}),
		function(req, res) {
			res.redirect('/profile/req.id');  
		});


	//User Profile 
	// app.get('/users', UserController.findAll);
	app.get('/profile/:id', UserController.findById);
	app.get('/users', UserController.findAll);
	app.post('/profile/:id', UserController.addUser);
	app.put('/profile/:id', UserController.updateUser);
	app.delete('/profile/:id', UserController.deleteUser);
	
	
};

module.exports = route;