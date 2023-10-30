const mysql = require("mysql2/promise");

class DBmysql {
	#host = "";
	#user = "";
	#db = "";
	#password = "";

	#conn = "";
	constructor(host, user, db, password) {
		this.#host = host;
		this.#user = user;
		this.#db = db;
		this.#password = password;
	}

	connectToDB() {
		if (this.#host == "localhost") {
			this.#conn = mysql.createPool({
				connectionLimit: 5,
				host: this.#host,
				user: this.#user,
				database: this.#db,
				password: this.#password,
			});
		} else {
			this.#conn = mysql.createPool({
				connectionLimit: 5,
				host: this.#host,
				user: this.#user,
				database: this.#db,
				password: this.#password,
				ssl: {},
			});
		}
	}

	dbOff() {
		this.#conn
			.end()
			.then(() => {
				console.log("DB connection closed");
			})
			.catch(function (err) {
				console.error(err.message);
			});
	}

	// funkcija, kas apstrādā sql select pieprasījumu
	getData(sql) {
		return this.#conn
			.execute(sql)
			.then((result) => {
				// output a sql injection result
				return result[0];
			})
			.catch(function (err) {
				// output a sql injection error
				console.error(err.message);
				return { error: err.message };
			});
	}

	// funkcija, kas apstrādā sql insert pieprasījumu
	insertData(sql, data) {
		return this.#conn
			.execute(sql, data)
			.then((result) => {
				// output a sql injection result
				return {
					id: result[0].insertId,
					result: true,
				};
			})
			.catch(function (err) {
				// output a sql injection error
				console.error(err.message);
				return {
					error: err.message,
					result: false,
				};
			});
	}
}

module.exports = DBmysql;
