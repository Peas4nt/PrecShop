const form = document.querySelector(".delete-prod-form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const form = e.currentTarget;
	if (confirm("You want to delete this?")) {
		const id = form.id.value;
		const body = `id=${id}`;
		deleteQuery(body);
	}
});

function deleteQuery(body){
    console.log(body);
    fetch("/delete/product", {
		method: "DELETE",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: body,
	})
		.then((result) => result.json())
		.then((result) => {
			if (result == 1) {
                alert("Product was deleted successfully")
				document.location.href = "/storage/";
			} else {
				alert(result);
			}
		});
}