const fs = require("fs");
const path = require("path");
const Program = require("../modules/programs");

exports.addProgram = async (req, res) => {
  try {
    const { title, category, startTime, endTime } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is missing" });
    }

    const imagePath = req.file.path;
    const base64Image = fs.readFileSync(imagePath, { encoding: "base64" });
    const mimeType = req.file.mimetype;

    const newProgram = new Program({
      title,
      category,
      startTime,
      endTime,
      imageBase64: base64Image,
      contentType: mimeType,
    });

    const savedProgram = await newProgram.save();

    // Optional: delete image from disk after reading
    fs.unlinkSync(imagePath);

    res.status(201).json({
      success: true,
      message: "Created Program successfully",
      createdProgram: savedProgram,
    });
  } catch (error) {
    console.error("Add Program Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all programs
exports.getPrograms = async (req, res) => {
  try {
    const allPrograms = await Program.find();

    const programs = allPrograms.map((program) => ({
      _id: program._id,
      title: program.title,
      category: program.category,
      startTime: program.startTime,
      endTime: program.endTime,
      imageUrl: `data:${program.contentType};base64,${program.imageBase64}`,
    }));

    res.status(200).json({ success: true, count: programs.length, programs });
  } catch (error) {
    console.error("Get Programs Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/*
exports.getImagePrograms = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program || !program.imagePath) {
      return res.status(404).send("Image not found");
    }

    const imagePath = path.resolve(program.imagePath);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).send("Image file not found on server");
    }

    res.sendFile(imagePath);
  } catch (error) {
    console.error("Get Image Error:", error);
    res.status(500).send("Server error");
  }
};*/

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
