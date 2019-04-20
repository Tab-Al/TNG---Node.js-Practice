const mongoose = require('mongoose');

const AutomataSchema = new mongoose.Schema({

	topic: {
		type: String,
		required: true,
	},
	uploader: {
		type: String,
		required: true,
		default: 'admin'
	},
	uploaded_on: {
		type: Date,
		required: false,
		default: Date.now()
	},
	no_of_downs: {
		type: Number,
		required: false,
		default: 0
	}
});

const Automata = mongoose.model('Automata',AutomataSchema,'aut');
module.exports = Automata;