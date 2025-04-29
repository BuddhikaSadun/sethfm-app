// /middleware/uploadMiddleware.js
const multer = require("multer");

// Memory storage (no saving to disk)
const storage = multer.memoryStorage();

const upload = multer({
	storage: storage,
	limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = upload;
