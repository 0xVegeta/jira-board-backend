const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: `.env` });
const { connectDB } = require("./config/db");
const apiRouters = require('./routes/api')

connectDB();
const expressApp = express();
expressApp.use(bodyParser.json());
expressApp.get("/", (req, res) => {
	res.json({ message: "Yayy you're at JIRA board" });
});

expressApp.use("/api", apiRouters);


module.exports = {
	app: expressApp,
};
