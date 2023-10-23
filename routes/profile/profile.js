const { Router } = require("express");
const route = Router();
const db = require("../../db");
const { checkAuthentication } = require("../../modules/checklogin");

route.get("/profile", checkAuthentication, async (req, res) => {
  const userid = req.session.user.id;
  const user = await db.getData(
	`SELECT name,lastname,email FROM users WHERE id = ${userid}`
  )
  const imported_products = await db.getData(
	`
	SELECT 
  storage.name AS "name",
  imported_products.quantity as quantity,
  DATE_FORMAT(delivery_date, "%d/%m/%Y") AS "deliverydate"
  FROM imported_products 
  LEFT JOIN storage 
  ON imported_products.product_id = storage.id
  LEFT JOIN users
  ON imported_products.user_id = users.id
  WHERE users.id = ${userid}
  ORDER BY delivery_date DESC
  `
  )
  const exported_products = await db.getData(
	`
	SELECT 
  storage.name AS "name",
  exported_products.quantity as quantity,
  DATE_FORMAT(remove_date, "%d/%m/%Y") AS "RemoveDate"
  FROM exported_products 
  LEFT JOIN storage 
  ON exported_products.product_id = storage.id
  LEFT JOIN users
  ON exported_products.user_id = users.id
  WHERE users.id = ${userid}
  ORDER BY remove_date DESC
  `
  )
  console.log(user);
  console.log(imported_products);
  console.log(exported_products);

  res.render("profile/profile", {
    session: req.session.user,
    page: "profile",
    title: "Profile",
	user: user[0],
	exported_products,
	imported_products,
  });
});

module.exports = route;
