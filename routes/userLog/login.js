const { Router } = require("express");
const db = require("../../db");
const route = Router();

route.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email,password);
  await db
    .getData(
      "SELECT EXISTS(SELECT * FROM users WHERE email = '" +
				email +
				"' AND password = '" +
				password +
				"') as s",
    )
    .then((result) => {
			if (result[0].s === 1) {
        
          console.log("1");
          res.json(1);
			} else {
          console.log("0");
          res.json("Wrong email or password");
			}
		})
})
route.get("/login",(req, res) => {

  res.render("login/login", {
    page: "login",
    title: "login",
  });
});

module.exports = route;
