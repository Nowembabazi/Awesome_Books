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

function booksFilter(index) {
  bookArray = bookArray.filter((book) => book !== bookArray[index]);
}

function displayBook() {
  const addedBooks = document.getElementById('list');
  addedBooks.innerHTML = '';
  for (let i = 0; i < bookArray.length; i += 1){
    const container = document.createElement('div');
    container.classList.add('book');
    addedBooks.appendChild(container);

    const bookTitle = document.createElement('p');
    bookTitle.classList.add('title');
    bookTitle.textContent = bookArray[i].title;
    container.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('author');
    bookAuthor.textContent = bookArray[i].author;
    container.appendChild(bookAuthor);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'remove';

    removeButton.onclick = () => {
      booksFilter(i);
      addToLocalStorage();
      displayBook();
    };

    container.appendChild(removeButton);

    const line = document.createElement('hr');
    container.appendChild(line);
  }
}

function getFromLocalStorage() {
  const stringifyArray = localStorage.getItem('storedBooks');
  bookArray = JSON.parse(stringifyArray);
  displayBook();
}

if (localStorage.getItem('storedBooks') == null) {
  addToLocalStorage();
} else {
  getFromLocalStorage();
}
const addBtn = document.getElementById('addButton');
addBtn.addEventListener('click', () => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  bookObj(title.value, author.value);
  addToLocalStorage();
  displayBook();
});
