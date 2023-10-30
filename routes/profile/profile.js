const { Router } = require("express");
const route = Router();
const db = require("../../db");
const { checkAuthentication } = require("../../modules/checklogin");

// renderē profila lapu
route.get("/profile/:id?", checkAuthentication, async (req, res) => {
  const userid = req.params.id ?? req.session.user.id;
  // sql query 
  const user = await db.getData(
    `SELECT name,lastname,email FROM users WHERE id = ${userid}`
  );
  // sql query no imported products
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
  );
  // sql query no exported products
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
  );

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
