
/**
 * Module dependencies.
 */

var express = require('express')
  , route = require('./config/route')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , mongoose =  require('mongoose')
  , mongoStore = require('connect-mongo')(express)
  ;
   
var app = express();

app.configure(function(req, res){

  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname+"/public/images/users"}));  

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
	 mongoose.connect('mongodb://localhost/std_DEV');
	  
	  app.use(express.session({
			    secret: 'foo'
			  , store: new mongoStore({
			  			mongoose_connection: mongoose.connection, 
			  			db: 'Adventurly_DEV'
			  			})
			  		})); // wire up sessions so mongo db remembers session and stores it
  app.use(passport.initialize()); 	// Needed for Passport in this location
  app.use(passport.session());		// Needed for Passport in this location
  app.use(app.router);
  //app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, '/public')));
  console.log(__dirname);

  
  app.locals.title = "Adventurly";
  app.use(function(req, res, next){
	    res.locals.user = req.user;
  });
});



app.configure('development', function(req, res){
  app.use(express.errorHandler());
  //mongoose.connect('mongodb://localhost/std_DEV');
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var GoogleStrategy = require('passport-google').Strategy;
var UserModel = require('./models/usermodel');
passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000'
  },
  function(identifier, profile, done) {
	  profile.email = profile.emails[0].value;
	  UserModel.findOneAndUpdate({email:profile.email}, {$set:profile, $inc:{logins:1}}, {upsert:true}, done);
  }
));



TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: 'PC3tlwIdHmtjSe8KjMAvjg',
    consumerSecret: 'K9c5vSfSJ84rwoIp3PZVOfwL4ZEf8kCZaOiGnHP5ZQ',
    callbackURL: "http://localhost:3000"
  },
  function(token, tokenSecret, profile, done) {
   	  UserModel.findOneAndUpdate({email:profile.email}, {$set:profile, $inc:{logins:1}}, {upsert:true}, done);
  
  }
));

var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '140797139425648',
    clientSecret: '9c6bd9189dd185d75e1b8cbf954b2734',
    callbackURL: "http://localhost:3000"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log(profile);
   	UserModel.findOneAndUpdate({email:profile.email}, {$set:profile, $inc:{logins:1}}, {upsert:true}, done)
  }
));

var BearerStrategy = require('passport-http-bearer').Strategy;
passport.use(new BearerStrategy(
  function(token, tokenSecret, profile, done) {
   	UserModel.findOneAndUpdate({email:profile.email}, {$set:profile, $inc:{logins:1}}, {upsert:true}, done)
    var User = mongoose.model('User');
	    User.findOne({providerId: profile.id},
	      function(err, user) {
	        if (!err && user != null) {
	          var ObjectId = mongoose.Types.ObjectId;
	          User.update({"_id": user["_id"]}, { $set: {lastConnected: new Date()} } ).exec();
	        } else {
	          var userData = new User({
	            provider: profile.provider,
	            providerUsername: profile.username,
	            providerId: profile.username + ":" + profile.id,
	            created: Date.now(),
	            oauthToken: token,
	            username: profile.displayName,
	            profilePicture: 'https://api.twitter.com/1/users/profile_image?screen_name=' + profile.username +'&size=bigger'
	          });
	        
	          userData.save(function(err) {
	            if (err) console.log(err);
	            else console.log('Saving user...');
	          });
	        }
	      }
	     );
	      var user = { id: profile.id, name: profile.username };
	      done(null, user);
	      
  }
  
));

route(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
