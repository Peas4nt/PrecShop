const form = document.querySelector(".singup-form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const form = e.currentTarget;
	if (checkPassword(e.currentTarget)) {
		const name = form.name.value;
		const lastname = form.lastname.value;
		const email = form.email.value;
		const password = form.password1.value;
		
		const body = `name=${name}&lastname=${lastname}&email=${email}&password=${password}`;
		postQuery(body);
	}
});

function checkPassword(form) {
	const password1 = form.password1.value;
	const password2 = form.password2.value;

	if (password1 != password2) {
		alert("\nPassword did not match: Please try again...");
		return false;
	}
	return true
}

function postQuery(body) {
	fetch("/signup", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: body,
	})
		.then((result) => result.json())
		.then((result) => {
			if (result == 1) {
				document.location.href = "/";
			} else {
				alert(result);
			}
		});
}
