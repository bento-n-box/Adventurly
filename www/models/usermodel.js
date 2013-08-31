var mongoose =require('mongoose'),
	UserSchema = mongoose.Schema({
		displayName: String,
		email: String,
		name: {
			familyName: String,
			username: String,
			givenName: String
		},
		logins:{type: Number, default:0},
		image: String,
		avatar: String
	}),

UserModel = mongoose.model('user', UserSchema); // user is the mongo collection name

module.exports = UserModel;
	