const { Router } = require("express");
const route = Router();
const db = require("../db");

route.get("/signup", (req, res) => {
	res.render("signup", {
		page: "signup",
		title: "signup",
	});
});

route.post("/signup", async (req, res) => {
	const name = req.body.name;
	const lastname = req.body.lastname;
	const email = req.body.email;
	const password = req.body.password;

	await db
		.insertData(
			"INSERT INTO users(name,lastname,email,password) VALUES (?, ?, ?, ?)",
			[name, lastname, email, password],
		)
		.then((result) => {
			if (result) {
				console.log(`User ${name} was created`);
				res.status(200).redirect("/");
			} else {
				console.log(`User ${name} was not created`);
				res.status(500).redirect("/signup");
			}
		}).catch((error) => {
			console.log("Create user: ", error)
			res.status(500).send("Server error");
		});
});

module.exports = route;
