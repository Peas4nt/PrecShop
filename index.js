// moduļu importēšana
const express = require("express");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const db = require("./db");

// datubāze konfigurācija
require("dotenv").config();

// ports uz kura strādā website
const PORT = process.env.PORT || 3000;

const app = express();
// json undecoder
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");
// public:)
app.use(express.static("public"));

// sessija
app.use(
	session({
		secret: "qwerty",
		resave: false,
		saveUninitialized: false,
	}),
);


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
	db.connectToDB();
	// server starting
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT} \nhttp://localhost:${PORT}`);
	});
};

// starts
start();
