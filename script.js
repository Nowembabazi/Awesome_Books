class Books {
  constructor(array) {
    this.bookArray = array;
  }

  bookObj(bookTitle, authorName) {
    const eachBook = {
      title: bookTitle,
      author: authorName,
    };
    this.bookArray.push(eachBook);
  }

  booksFilter(eachBook) {
    this.bookArray = this.bookArray.filter((book) => book !== eachBook);
  }
}

const allBooks = new Books([]);

function addToLocalStorage() {
  const stringifyArray = JSON.stringify(allBooks.bookArray);
  localStorage.setItem('storedBooks', stringifyArray);
}

function displayBook() {
  const addedBooks = document.getElementById('list');
  addedBooks.innerHTML = '';
  for (let i = 0; i < allBooks.bookArray.length; i += 1) {
    const container = document.createElement('div');
    container.classList.add('book');
    addedBooks.appendChild(container);

    const container2 = document.createElement('div');
    container2.classList.add('titleAuthor');
    container.appendChild(container2);

    const bookDetails = document.createElement('p');
    bookDetails.classList.add('title');
    bookDetails.textContent = `"${allBooks.bookArray[i].title}" by ${allBooks.bookArray[i].author}`;
    container2.appendChild(bookDetails);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'Remove';

    removeButton.onclick = () => {
      allBooks.booksFilter(allBooks.bookArray[i]);
      addToLocalStorage();
      displayBook();
    };
    container2.appendChild(removeButton);
  }
}

function getFromLocalStorage() {
  const stringifyArray = localStorage.getItem('storedBooks');
  allBooks.bookArray = JSON.parse(stringifyArray);
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
  allBooks.bookObj(title.value, author.value);
  addToLocalStorage();
  displayBook();
});

// Page content
const list = document.getElementById('list');
const addNew = document.getElementById('addNew');
const contactSection = document.getElementById('contact-section');

// Nav buttons
const listLink = document.getElementById('list-link');
const addLink = document.getElementById('add-link');
const contactLink = document.getElementById('contact-link');

listLink.addEventListener('click', () => {
  list.classList.remove('hide');
  addNew.classList.add('hide');
  contactSection.classList.add('hide');
});

addLink.addEventListener('click', () => {
  addNew.classList.remove('hide');
  list.classList.add('hide');
  contactSection.classList.add('hide');
});

contactLink.addEventListener('click', () => {
  contactSection.classList.remove('hide');
  addNew.classList.add('hide');
  list.classList.add('hide');
});
