// /controller/programController.js
const Program = require("../modules/programs");

// Save program data (optimized for Base64 image upload)
exports.addProgram = async (req, res) => {
	try {
		const { pId, title, category, startTime, endTime } = req.body;
		let imageBase64 = null;

		if (req.file) {
			imageBase64 = req.file.buffer.toString("base64");
		}

		const newProgram = new Program({
			pId,
			title,
			category,
			startTime,
			endTime,
			image: imageBase64, // Save Base64 image
		});

		const savedProgram = await newProgram.save();

		console.log(savedProgram);

		res.status(201).json({
			success: true,
			message: "Created Program successfully",
			createdProgram: savedProgram, // Return the saved program object directly
		});
	} catch (error) {
		console.error("Add Program Error:", error);
		res.status(500).json({
			success: false,
			message: "Server error",
		});
	}
};

// Get all programs

// Get all programs
exports.getPrograms = async (req, res) => {
	try {
		const allPrograms = await Program.find()
			.select("pId title category startTime endTime image")
			.exec();

		res.status(200).json({
			success: true,
			count: allPrograms.length,
			programs: allPrograms,
		});
	} catch (error) {
		console.error("Get Programs Error:", error);
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

// Delete Program
exports.deleteProgram = async (req, res) => {
	let pId = req.params.pId;
	try {
		const deletePro = await Program.findOneAndDelete({ pId: pId });
		if (deletePro) {
			res.status(201).json({
				message: "Successfully deleted",
			});
		} else {
			res.status(400).json({
				message: "Delete failed",
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Server error",
		});
	}
};
