const { Router } = require("express");
const db = require("../../db");
const route = Router();

// renderē login lapu
route.get("/login", (req, res) => {
	res.render("login/login", {
		session: req.session.user,
		page: "login",
		title: "login",
	});
});

// apstrādā POST pieprasījumu
route.post("/login", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// sql query lai pārbaudit vai akkaunts eksistē
	await db
		.getData(
			`SELECT id, name, lastname, email FROM users WHERE email='${email}' AND password ='${password}' LIMIT 1`
		)
		.then((result) => {
			if (result.length == 1) {
				const user = result[0];
				req.session.user = user;
				res.json(1);
			} else {
				console.log("0");
				res.json("Wrong email or password");
			}
		});
});

module.exports = route;
