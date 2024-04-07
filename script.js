const author = document.getElementById('author');
const title = document.getElementById('title');
const pages = document.getElementById('pages');
const bookRead = document.getElementById('bookRead');
const addButton = document.getElementById('add');


const myLibrary = [];

function Book(author, title, pages, bookRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.bookRead = bookRead;
}

function addBookToLibrary() {
  
}
