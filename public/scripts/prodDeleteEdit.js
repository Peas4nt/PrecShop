// delete
const deleteForm = document.querySelector(".delete-prod-form");

deleteForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const form = e.currentTarget;
	if (confirm("You want to delete this?")) {
		const id = form.id.value;
		const body = `id=${id}`;
		deleteQuery(body);
	}
});

function deleteQuery(body) {
	console.log(body);
	fetch("/storage/product", {
		method: "DELETE",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: body,
	})
		.then((result) => result.json())
		.then((result) => {
			if (result == 1) {
				alert("Product was deleted successfully");
				document.location.href = "/storage/";
			} else {
				alert(result);
			}
		})
		.catch((err) => {
			alert("Please login to continue");
			document.location.href = "/login";
		});
}

// Edit
const editStart = document.querySelector(".edit-prod-form");
const data = document.querySelector(".data");
const form = document.querySelector(".edit-form");
let id = null;

// edit button event
// show form for product editing
editStart.addEventListener("submit", (e) => {
	e.preventDefault();
	showForm();
	id = editStart.id.value;
	console.log(id + "alo");
});

// show edit form and hide data
function showForm() {
	deleteForm.style.display = "none";
	editStart.style.display = "none";

	data.style.display = "none";
	form.style.display = "block";
}

// submit button event for product editing
form.submit.addEventListener("click", (e) => submit());

// get edit form data
function submit() {
	console.log("Perfect");
	const data = {
		id,
		name: document.querySelector(".prod-name-input").value,
		serial_num: document.querySelector(".prod-serial-num-input").value,
		barcode: document.querySelector(".prod-barcode-input").value,
		type: document.getElementById("prod_type").value,
		quantity: document.querySelector(".prod-quantity-input").value,
		cost: document.querySelector(".prod-cost-input").value,
	};
	console.log(data)
	const body = `id=${data.id}&name=${data.name}&serial_num=${data.serial_num}&barcode=${data.barcode}&type=${data.type}&quantity=${data.quantity}&cost=${data.cost}`;
	editQuery(body);
}

// set data to server
function editQuery(body) {
	fetch("/storage/product", {
		method: "PUT",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: body,
	})
		.then((result) => result.json())
		.then((result) => {
			if (result == 1) {
				alert("Product was edited successfully");
				window.location.reload();
			} else {
				alert(result);
			}
		})
		.catch((err) => {
			alert("Please login to continue");
			document.location.href = "/login";
		});
}

form.cancel.addEventListener("click", (e) => cancelForm());

function cancelForm() {
	deleteForm.style.display = "block";
	editStart.style.display = "block";

	data.style.display = "block";
	form.style.display = "none";
}

