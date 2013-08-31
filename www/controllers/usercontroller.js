var UserModel = require('../models/usermodel');


UserController = {
	
	
	findAll: function(req, res){
		UserModel.find({}, function(err, users){
			if (err) return res.json(500, {error:'internal'});
			res.format({
		
			  'text/html': function(){
			    res.render('users/list', {users: users})
			  },
			  
			  'application/json': function(){
			    res.send({ message: 'hey' });
			  }
			});
		});
	},
	findById: function(req, res){
		UserModel.findById(req.id, function(err, user){
			if (err) return res.json(500, {error:'internal Error'});
				res.format({
				  'text/html': function(){
				    res.render('users/profile', {user: req.user})
				}
			});
		});
	},
	addUser: function(req, res){
		res.render('./pages/help');
	},
	updateUser: function(req, res){
		var image = req.files.image.path.split('/').pop()
		console.log(image);
		UserModel.findByIdAndUpdate(req.id, function(err, user){
			req.session.user = user;
			res.render('users/profile', {user: user});
		});
	},
	deleteUser: function(req, res){
		res.render('./pages/help');
	},
	list: function(req, res){
		res.render('users/list');
	},
	profile: function(req, res){
		res.render('users/profile', {user: req.user})	
	}
}

module.exports= UserController;