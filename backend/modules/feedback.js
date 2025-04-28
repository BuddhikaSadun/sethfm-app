const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
	},
	message: {
		type: String,
	},
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
