var UserModel = require('../models/usermodel');

AuthController = {
	
	login: function(req, res){
		res.render('login');
	},
	logout: function(req, res){
		req.logOut();
		res.redirect('/login');
	}
}
module.exports = AuthController;