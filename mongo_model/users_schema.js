const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	profileId: {
		type: String
	},
	username : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true
	},
	password : {
		type : String
	},
	dob : {
		type : Date
	},
	phone : {
		type : String
	},
	profilePic: {
		type: String
	},
	provider: {
		type : String,
		required: true,
		default: 'local'
	}
});

const User = mongoose.model('Users',UserSchema);
module.exports = User;