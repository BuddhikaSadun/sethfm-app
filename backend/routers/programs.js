const express = require("express");
const programController = require("../controllers/programs");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop(); // Extract file extension
    cb(
      null,
      `${file.fieldname}-${Date.now()}.${ext === "jpg" ? "jpg" : "jpg"}`
    ); // Ensure file is saved with .jpg extension
  },
});
const upload = multer({ storage: storage });

//Routes

router.post("/add", upload.single("image"), programController.addProgram);
router.get("/get", programController.getPrograms);
router.delete("/delete/:pId", programController.deleteProgram);

router.get("/getImages", programController.getAllImages);
module.exports = router;
