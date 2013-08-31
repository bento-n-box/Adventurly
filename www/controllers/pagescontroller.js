
PagesController = {
	
	home: function(req, res){
		res.render('index');
	},
	help: function(req, res){
		res.render('./pages/help');
	},
	styleguide: function(req, res){
		res.render('styleguide')
	}
	
}

module.exports= PagesController;


