const Feedback = require("../modules/feedback");

exports.createFeedback = async (req, res) => {
	try {
		const newFeedback = new Feedback({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			message: req.body.message,
		});

		await newFeedback.save();
		res.status(201).json({
			createdFeedback: newFeedback,
			message: "success",
		});
	} catch (error) {
		console.error(error.message);
	}
};
exports.getFeedback = async (req, res) => {
	try {
		const feedbackDetails = await Feedback.find().exec();
		res.status(201).json({
			feedBackData: feedbackDetails,
			message: "success",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: error.message,
		});
	}
};
