const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const db = require("./db");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();
// json undecoder
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// loop for routes
const routesDirectory = path.join(__dirname, "routes");
fs.readdirSync(routesDirectory).forEach((file) => {
	const routePath = path.join(routesDirectory, file);
	const route = require(routePath);
	app.use(route);
});



// server starting
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
