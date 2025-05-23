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
  imageBase64: String,
  contentType: String,
});

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
