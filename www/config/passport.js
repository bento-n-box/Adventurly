passportHelper = {
	var GoogleStrategy = require('passport-google').Strategy;
	var UserModel = require('./models/usermodel');

	passport.use(new GoogleStrategy({
	    returnURL: 'http://localhost:3000/auth/google/return',
	    realm: 'http://localhost:3000'
	  },
	  function(identifier, profile, done) {
	    console.log(profile);
		  UserModel.findOneAndUpdate({email:profile.email, accountType: "Google"}, {$set:profile, $inc:{logins:1}}, {upsert:true}, done);
	  }
	));



	TwitterStrategy = require('passport-twitter').Strategy;

	passport.use(new TwitterStrategy({
	    consumerKey: 'PC3tlwIdHmtjSe8KjMAvjg',
	    consumerSecret: 'K9c5vSfSJ84rwoIp3PZVOfwL4ZEf8kCZaOiGnHP5ZQ',
	    callbackURL: "http://localhost:3000/auth/twitter/callback"
	  },
	  function(token, tokenSecret, profile, done) {
	    console.log(profile.entities)
	   	   UserModel.findOneAndUpdate({name:profile.name, accountType: "Twitter", avatar: profile.name }, {$set:profile, $inc:{logins:1}}, {upsert:true}, function(err, user) {
	          if (err) { return done(err); }
	          done(null, user);
	        });
	  }
	));


	var FacebookStrategy = require('passport-facebook').Strategy;

	passport.use(new FacebookStrategy({
	    clientID: '140797139425648',
	    clientSecret: '9c6bd9189dd185d75e1b8cbf954b2734',
	    callbackURL: "http://localhost:3000/auth/facebook/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {
	    console.log(profile.photos)
	    UserModel.findOneAndUpdate({name:profile.name, accountType: "Facebook", avatar: 'https://graph.facebook.com/'+ profile.id +'/picture?type=large'}, {$set:profile, $inc:{logins:1}}, {upsert:true}, function(err, user) {
	      if (err) { return done(err); }
	      done(null, user);
	    });
	  }
	));

	var LocalStrategy = require('passport-local').Strategy
	// use local strategy
	  passport.use(new LocalStrategy({
	      usernameField: 'email',
	      passwordField: 'password'
	    },
	    function(email, password, done) {
	      User.findOne({ email: email }, function (err, user) {
	        if (err) { return done(err) }
	        if (!user) {
	          return done(null, false, { message: 'Unknown user' })
	        }
	        if (!user.authenticate(password)) {
	          return done(null, false, { message: 'Invalid password' })
	        }
	        return done(null, user)
	      })
	    }
	  ))
	};

module.exports = passportHelper;