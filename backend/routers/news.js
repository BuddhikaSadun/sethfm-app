const express = require("express");
const newsController = require("../controllers/news");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage });

//Routes

router.post("/add", upload.single("image"), newsController.addNews);
router.get("/get", newsController.getNews);
router.get("/get/:category", newsController.getNewsCategory);
router.delete("/delete/:pId", newsController.deleteNews);

module.exports = router;
