var UserModel = require('../models/usermodel');


UserController = {
	
	findAll: function(req, res){
		UserModel.find({}, function(err, users){
			if (err) return res.json(500, {error:'internal'});
			res.format({
		
			  'text/html': function(){
			    res.render('profile/list', {users: users})
			  },
			  
			  'application/json': function(){
			    res.json({users: users});
			  }
			});
		});
	},
	listAll: function(req, res){
		UserModel.find({}, function(err, users){
			if (err) return res.json(500, {error:'internal'});
			res.format({
			  
			  'application/json': function(){
			    res.json({users: users});
			  }
			});
		});
	},

	findById: function(req, res){
		console.log(req.params);
		var id = req.params.id;

		UserModel.findById(id, function(err, user){
			if (err) return res.json(500, {error:'internal Error'});
			res.format({
			  'text/html': function(){
			    res.render('profile/profile', {user: req.user})
				}
			});
		});

		// db.collection('wines', function(err, collection) {
	 //        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
	 //            res.send(item);
	 //        });
	 //    });
	},
	addUser: function(req, res){
		res.render('./pages/help');
	},
	updateUser: function(req, res){
		console.log('update user');
		console.log(req.id);
		//var image = req.files.image.path.split('/').pop()
		//console.log(image);
		UserModel.findByIdAndUpdate(req.id, function(err, user){
			req.session.user = user;
			res.render('profile/req.id', {user: user});
		});
	},
	deleteUser: function(req, res){
		res.render('./pages/help');
	},
	list: function(req, res){
		res.render('profile/list', {user: user});
	},
	profile: function(req, res){
		console.log('profile');
		res.render('profile/profile', {user: req.user})	
	}
}

module.exports= UserController;