// pārbauda login datus un pārsuta to serverim
const login = document.querySelector(".login");
login.addEventListener("submit", function (event) {
	event.preventDefault();

	const email = event.currentTarget.elements[0].value;
	const password = event.currentTarget.elements[1].value;
	fetch("/login", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: `email=${email}&password=${password}`,
	})
		.then((result) => result.json())
		.then((result) => {
			if (result == 1) {
				document.location.href = "/";
			} else {
				alert(result);
			}
		});
});
