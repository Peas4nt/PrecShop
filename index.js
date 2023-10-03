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

// this two loops for routes reading
// f loop read the folders
const routesDirectory = path.join(__dirname, "routes");
fs.readdirSync(routesDirectory).forEach((folder) => {
	// the s read the routes
	const routesFolder = path.join(routesDirectory, folder);
	fs.readdirSync(routesFolder).forEach((file) => {
		const routePath = path.join(routesFolder, file);
		const route = require(routePath);
		app.use(route);
	});
});

const start = () => {
	// connect to database
	db.сonnectToDB();
	// server starting
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
};

start();
