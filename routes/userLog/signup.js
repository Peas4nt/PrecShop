const { Router } = require("express");
const route = Router();
const db = require("../../db");

route.get("/signup", (req, res) => {
	res.render("login/signup", {
		session: req.session.user,
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
		.getData(
			"SELECT EXISTS(SELECT * FROM codes WHERE barcode = '" +
				code +
				"' ) as s",
		)
		.then((result) => {
			if (result[0].s === 1) {
				res.status(400).json("User already exists");
			}
		})
		.catch((err) => {
			res.status(500).json("User was not created. Please try again.");
		});

	await db
		.insertData(
			"INSERT INTO users(name,lastname,email,password) VALUES (?, ?, ?, ?)",
			[name, lastname, email, password],
		)
		.then((result) => {
			console.log(result);
			if (result.result) {
				console.log(`User ${name} was created`);
				req.session.user = {
					id: result.id,
					name,
					lastname,
					email,
				};
				res.status(200).json(1);
			} else {
				console.log(`User ${name} was not created`);
				res.status(500).json("User was not created. Please try again.");
			}
		})
		.catch((error) => {
			console.log("Create user: ", error);
			res.status(500).json("Server error");
		});
});

module.exports = route;
