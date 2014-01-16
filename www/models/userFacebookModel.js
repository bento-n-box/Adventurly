var mongoose =require('mongoose'),
	UserSchema = mongoose.Schema({
		name: String,
		logins:{type: Number, default:0},
	}),

UserFBModel = mongoose.model('FBuser', UserSchema); // user is the mongo collection name

module.exports = UserFBModel;
	