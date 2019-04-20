const mongoose = require('mongoose');

const SubjectsSchema = new mongoose.Schema({
	sub_name: {
		type: String,
		required: true
	},
	no_of_notes: {
		type: Number,
		required: true
	},
	no_of_downs: {
		type: Number,
		required: false
	}
});

const Subs = mongoose.model('Subjects',SubjectsSchema);
module.exports = Subs;