const { Router } = require("express");
const route = Router();
const db = require("../../db");

// renderē sign up lapu
route.get("/signup", (req, res) => {
	res.render("login/signup", {
		session: req.session.user,
		page: "signup",
		title: "signup",
	});
});

// apstrādā POST pieprasījumu
route.post("/signup", async (req, res) => {
	const name = req.body.name;
	const lastname = req.body.lastname;
	const email = req.body.email;
	const password = req.body.password;

	await db
	// sql query lai pārbaudit vai lietotājs neeksistē
		.getData(
			"SELECT EXISTS(SELECT email FROM users WHERE email = '" +
				email +
				"' ) as s",
		)
		.then((result) => {
			if (result[0].s === 1) {
				return res.status(400).json("User already exists");
			} else {
				// sql query lai ievietot datus DB
				db.insertData(
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
							res.status(500).json(
								"User was not created. Please try again.",
							);
						}
					})
					.catch((error) => {
						console.log("Create user: ", error);
						res.status(500).json("Server error");
					});
			}
		})
		.catch((err) => {
			return res
				.status(500)
				.json("User was not created. Please try again.");
		});
});

module.exports = route;
