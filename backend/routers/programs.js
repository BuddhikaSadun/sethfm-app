const express = require("express");
const programController = require("../controllers/programs");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

//Routes

router.post("/add", upload.single("image"), programController.addProgram);
router.get("/get", programController.getPrograms);
router.get("/get/:id", programController.getImagePrograms);

router.delete("/delete/:pId", programController.deleteProgram);

module.exports = router;
