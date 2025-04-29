const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const serverless = require("serverless-http");

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const URL = process.env.MONGODB_URL;
mongoose.connect(URL);
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB connection successful!");
});

// Routes
const programRoutes = require("./routers/programs.js");
const feedBackRoutes = require("./routers/feedback.js");

app.get("/", (req, res) => {
	res.send("Hello from serverless Express!");
});

app.use("/program", programRoutes);
app.use("/feedback", feedBackRoutes);

// Start Express Server

app.listen(3000, () => {
	console.log(`Running locally at http://localhost:3000`);
});

module.exports.handler = serverless(app);
