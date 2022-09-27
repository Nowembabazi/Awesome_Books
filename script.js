let bookArray = [];

function bookObj(bookTitle, authorName) {
  const eachBook = {
    title: bookTitle,
    author: authorName,
  };

  bookArray.push(eachBook);
}

function addToLocalStorage() {
  const stringifyArray = JSON.stringify(bookArray);
  localStorage.setItem('storedBooks', stringifyArray);
}

function booksFilter(eachBook) {
  bookArray = bookArray.filter((book) => book !== eachBook);
}

function displayBook() {
  const addedBooks = document.getElementById('list');
  addedBooks.innerHTML = '';

  bookArray.forEach((eachBook) => {
    const container = document.createElement('div');
    container.classList.add('book');
    addedBooks.appendChild(container);

    const bookTitle = document.createElement('p');
    bookTitle.classList.add('title');
    bookTitle.textContent = eachBook.title;
    container.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('author');
    bookAuthor.textContent = eachBook.author;
    container.appendChild(bookAuthor);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'remove';

    removeButton.addEventListener('click', () => {
      booksFilter(eachBook);
      addToLocalStorage();
      displayBook();
    });
    container.appendChild(removeButton);

    const line = document.createElement('hr');
    container.appendChild(line);
  });
}

function getFromLocalStorage() {
  const stringifyArray = localStorage.getItem('storedBooks');
  bookArray = JSON.parse(stringifyArray);
  displayBook();
}

getFromLocalStorage();

const addBtn = document.getElementById('addButton');
addBtn.addEventListener('click', () => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  bookObj(title.value, author.value);
  addToLocalStorage();
  displayBook();
});
