const News = require("../modules/news");

exports.addNews = async (req, res) => {
  try {
    const newNews = new News({
      pId: req.body.pId,
      title: req.body.title,
      desc: req.body.desc,
      category: req.body.category,
      dateTime: req.body.dateTime,
      image: req.file.originalname,
    });
    const saveNews = await newNews.save();
    if (saveNews) {
      console.log("News created");
      res.status(201).json({
        message: "News Added successfully",
      });
    } else {
      res.status(400).json({
        message: "Database Error for Adding saveNews",
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get all news

exports.getNews = async (req, res) => {
  try {
    const allsaveNews = await saveNews.find(); // Use the 'find()' method on the Program model
    if (allsaveNews) {
      res.status(201).json({
        message: "Fetched all programs successfully!",
        payload: allsaveNews,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get by category

exports.getNewsCategory = async (req, res) => {
  let category = req.params.category;
  try {
    const allsaveNews = await saveNews.findOne({ category: category });
    if (allsaveNews) {
      res.status(201).json({
        message: "Fetched news by category successfully!",
        payload: allsaveNews,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete Program
exports.deleteNews = async (req, res) => {
  let nId = req.params.nId;
  try {
    const deleteNews = await News.findOneAndDelete({ nId: nId });
    if (deleteNews) {
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
