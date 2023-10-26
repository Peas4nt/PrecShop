const { Router } = require("express");
const route = Router();
const db = require("../../db");

route.get("/tables/exportedProducts/:page?", async (req, res) => {
  const products = await db.getData(`
  SELECT
  storage.name AS "name",
  users.name AS "exporter",
  exported_products.quantity as quantity,
  exported_products.object as object,
  DATE_FORMAT(remove_date, "%d/%m/%Y") AS "removedate"
  FROM exported_products 
  LEFT JOIN storage 
  ON exported_products.product_id = storage.id
  LEFT JOIN users
  ON exported_products.user_id = users.id
  ORDER BY remove_date DESC`);

  const productsPerPage = 10;
  const productMaxPages = Math.ceil(products.length / productsPerPage);
  // current page
  const currentPage =
    !req.params.page || req.params.page > productMaxPages || req.params.page < 1
      ? 1
      : req.params.page;

  // array indexes
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = products.slice(startIndex, endIndex);
  res.render("tables/exportedProducts", {
    session: req.session.user,
    page: "exportedProducts",
    title: "exported Products",
    exported_products: productsToShow,
    pagination: {
      currentPage,
      productMaxPages,
    },
  });
});

module.exports = route;
