// /controller/programController.js
const Program = require("../modules/programs");

// Save program data (optimized for Base64 image upload)
exports.addProgram = async (req, res) => {
	try {
		console.log("req.file:", req.file); // Log the file to ensure it's being received

		const { pId, title, category, startTime, endTime } = req.body;

		if (!req.file) {
			return res
				.status(400)
				.json({ success: false, message: "Image file is missing" });
		}

		const imageBuffer = req.file.buffer;
		const contentType = req.file.mimetype;

		const newProgram = new Program({
			pId,
			title,
			category,
			startTime,
			endTime,
			image: imageBuffer,
			contentType: contentType,
		});

		const savedProgram = await newProgram.save();

		console.log(savedProgram); // Log the saved program for debugging

		res.status(201).json({
			success: true,
			message: "Created Program successfully",
			createdProgram: savedProgram,
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
exports.getPrograms = async (req, res) => {
	try {
		const allPrograms = await Program.find().select(
			"pId title category startTime endTime contentType",
		);

		const programs = allPrograms.map((program) => ({
			_id: program._id,
			pId: program.pId,
			title: program.title,
			category: program.category,
			startTime: program.startTime,
			endTime: program.endTime,
			imageUrl: `${req.protocol}://${req.get("host")}/program/get/${
				program._id
			}`,
		}));

		res.status(200).json({ success: true, count: programs.length, programs });
	} catch (error) {
		console.error("Get Programs Error:", error);
		res.status(500).json({ success: false, message: error.message });
	}
};

exports.getImagePrograms = async (req, res) => {
	try {
		const program = await Program.findById(req.params.id);

		if (!program || !program.image || !program.contentType) {
			return res.status(404).send("Image not found");
		}

		res.set("Content-Type", program.contentType);
		res.send(program.image);
	} catch (error) {
		res.status(500).send("Server error");
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
