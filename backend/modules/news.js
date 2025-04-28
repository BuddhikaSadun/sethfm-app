const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
  nId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  dateTime: { type: Date },
  image: {
    type: String,
    required: true,
  },
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
