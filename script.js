class Books {
   constructor (array) {
        this.bookArray = array;
    }

    bookObj(bookTitle, authorName){
      const eachBook = {
        title: bookTitle,
        author: authorName,
      };
        this.bookArray.push(eachBook)
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

    const bookTitle = document.createElement('p');
    bookTitle.classList.add('title');
    bookTitle.textContent = allBooks.bookArray[i].title;
    container.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('author');
    bookAuthor.textContent = allBooks.bookArray[i].author;
    container.appendChild(bookAuthor);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'remove';

    removeButton.onclick = () => {
      allBooks.booksFilter(allBooks.bookArray[i])
      addToLocalStorage();
      displayBook();
    };

    container.appendChild(removeButton);

    // const line = document.createElement('hr');
    container.appendChild(line);
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
