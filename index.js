class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	// super(title, author, isbn)

	addBookToList(book) {
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
	}

	showAlert(message, className) {
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
	}

	deleteBook(target) {
		if (target.className === "delete") {
			target.parentElement.parentElement.remove();
		}
	}

	clearFields() {
		document.getElementById("title").value = "";
		document.getElementById("author").value = "";
		document.getElementById("isbn").value = "";
	}
}

/****************
 *  Local Storage Class
 */

class Storage {
	static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books')); 
        }
        return books; 
    }

	static displayBooks() {
        const books = Storage.getBooks();
        books.forEach(book => {
            const ui = new UI(); 
            // add book to ui
            ui.addBookToList(book);
        })
    }

	static addBook(book) {
        const books = Storage.getBooks();
        books.push(book); 
        localStorage.setItem('books', JSON.stringify(books)); 
    }

	static removeBook(isbn) {
		const books = Storage.getBooks();
		books.forEach((book, index )=> {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});

		localStorage.setItem('books', JSON.stringify(books));
	}
}


/*********************************
 * DOM LOAD Event Listener
 */

document.addEventListener('DOMContentLoaded', Storage.displayBooks); 

/***************************************
 * EVENT LISTENERS
 */

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
        
        // Add book to local storage;
        Storage.addBook(book); 
        

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
    // Delete book from UI
    ui.deleteBook(e.target);

    // Remove from local storage; 
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

	// show a message
	ui.showAlert("book removed!", "success");

	e.preventDefault();
});


// Automatically generate date
const date = new Date().getFullYear(); 

document.getElementById('year').innerHTML = date; 