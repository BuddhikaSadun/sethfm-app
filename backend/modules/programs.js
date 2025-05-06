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
		type: Buffer,
	},
	contentType: {
		type: String,
	},
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
