const express = require("express");
const feedbackController = require("../controllers/feedback");
const router = express.Router();

router.post("/create", feedbackController.createFeedback);
router.get("/get", feedbackController.getFeedback);

module.exports = router;
