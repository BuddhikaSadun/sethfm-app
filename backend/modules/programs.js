const mongoose = require("mongoose");

const programSchema = mongoose.Schema({
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
  imagePath: {
    type: String,
    required: true,
  },
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
