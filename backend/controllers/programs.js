const Program = require("../modules/programs");
const fs = require("fs");
const path = require("path");
// Save program data
exports.addProgram = async (req, res) => {
	try {
		const newProgram = new Program({
			pId: req.body.pId,
			title: req.body.title,
			category: req.body.category,
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			image: req.file.path,
		});
		const saveProgram = await newProgram.save();

		console.log(saveProgram);
		res.status(201).json({
			success: true,
			message: "Created Program successfully",
			createdProgram: {
				id: req.body._id,
				pId: req.body.pId,
				title: req.body.title,
				category: req.body.category,
				startTime: req.body.startTime,
				endTime: req.body.endTime,
				image: req.file.path,
			},
		});
	} catch (error) {
		console.error(error); // Log the error for debugging purposes
		res.status(500).json({
			message: "Server error",
		});
	}
};

// Get all programs

exports.getPrograms = async (req, res) => {
	try {
		const allPrograms = await Program.find()
			.select("pId title category timeDuration startTime endTime image")
			.exec();

		const response = {
			count: allPrograms.length,
			programs: allPrograms.map((doc) => {
				return {
					pId: doc.pId,
					title: doc.title,
					category: doc.category,
					startTime: doc.startTime,
					endTime: doc.endTime,
					image: doc.image,
				};
			}),
		};
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: error.message,
		});
	}
};

//get all images
exports.getAllImages = async (req, res) => {
	try {
		const images = [];
		var dirname = "../uploads";
		const programs = await Program.find().select("image").exec();
		for (const program of programs) {
			const imageFilePath = path.join(__dirname, "uploads", program.image);

			// Read the image file and encode it as base64
			const imageBuffer = fs.readFileSync(imageFilePath);
			const base64Image = Buffer.from(imageBuffer).toString("base64");

			images.push({
				filename: path.basename(imageFilePath),
				data: base64Image,
			});
		}

		res.status(201).json({
			message: "Successfully received",
			payload: images,
		});
	} catch (error) {
		console.log(error);
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
