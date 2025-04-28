const mongoose = require("mongoose");

const programSchema = mongoose.Schema({
	pId: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	startTime: {
		type: String,
	},
	endTime: {
		type: String,
	},
	category: {
		type: String,
	},
	image: {
		type: String,
		required: true,
	},
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
