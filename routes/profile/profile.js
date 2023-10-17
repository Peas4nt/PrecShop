const {
	Router
} = require("express");
const route = Router();
const db = require("../../db");
const { checkAuthentication } = require("../../modules/checklogin");

route.get("/profile", checkAuthentication, (req, res) => {
});


module.exports = route;
