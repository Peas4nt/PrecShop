module.exports = {
	// pārbauda vai lietotājs ir "ielogojies"
	checkAuthentication: (req, res, next) => {
		if (req.session && req.session.user) {
			return next();
		}
		// ja lietotājs nav "ielogots", novirza uz login lapu
		res.redirect("/login");
	},


};
