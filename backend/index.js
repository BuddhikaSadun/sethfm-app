const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const serverless = require("serverless-http");

dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8080;
const URL = process.env.MONGODB_URL;

// MongoDB Connection
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB connection successful!");
});

// Routes
const programRoutes = require("./routers/programs.js");
const feedBackRoutes = require("./routers/feedback.js");

app.use("/program", programRoutes);
app.use("/feedback", feedBackRoutes);

// Start Express Server
/*
app.listen(PORT, () => {
	console.log(`Backend running on port ${PORT}`);
});*/
if (process.env.NODE_ENV !== "production") {
	const PORT = process.env.PORT || 8080;
	app.listen(PORT, () => {
		console.log(`Running locally at http://localhost:${PORT}`);
	});
}

app.get("/", (req, res) => {
	res.send("Hello from serverless Express!");
});

module.exports.handler = serverless(app);
