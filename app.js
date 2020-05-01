/*********************************
 * ES5 implementation
 */

// Book Constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

/***************************
 * UI constructor
 */
function UI() {}

UI.prototype.addBookToList = function (book) {
	const list = document.getElementById("book-list");

	// create tr element
	const row = document.createElement("tr");

	// insert cols

	row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

	list.appendChild(row);
};
UI.prototype.showAlert = function (message, className) {
	// create div
	const div = document.createElement("div");

	// Add classes
	div.className = `alert ${className}`;

	// add text
	div.appendChild(document.createTextNode(message));

	// Get a parent
	const container = document.querySelector(".container");

	const form = document.querySelector("#book-form");
	// Insert alert
	container.insertBefore(div, form);

	//Timeout after 3s
	setTimeout(() => {
		document.querySelector(".alert").remove();
	}, 3000);
};

UI.prototype.deleteBook = (target) => {
	if (target.className === 'delete') {
		target.parentElement.parentElement.remove(); 
	}
}
UI.prototype.clearFields = function () {
	document.getElementById("title").value = "";
	document.getElementById("author").value = "";
	document.getElementById("isbn").value = "";
};

// Event Listeners for adding books

document.getElementById("book-form").addEventListener("submit", (e) => {
	// get form  input values
	const title = document.getElementById("title").value,
		author = document.getElementById("author").value,
		isbn = document.getElementById("isbn").value;

	// Instantiating book object
	const book = new Book(title, author, isbn);

	// instantiate UI objects
	const ui = new UI();

	//Validate inputs
	if (title === "" || author === "" || isbn === "") {
		ui.showAlert("Please fill in all fields", "error");
	} else {
		// add book to list
		ui.addBookToList(book);

		ui.showAlert("Book added!", "success");

		// Clear fields after submit

		ui.clearFields();
	}

	e.preventDefault();
});

// Event listener for deletion of book
document.getElementById("book-list").addEventListener("click", (e) => {
	// Instiantiate UI
	const ui = new UI();

	ui.deleteBook(e.target); 

	// show a message
	ui.showAlert('book removed!', 'success'); 


	e.preventDefault();
});
