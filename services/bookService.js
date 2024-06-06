const Book = require("../models/Book");

async function arrayOfGenre() {
  let genres = [];
  let flag = 0;
  const books = await Book.find();

  for (const book of books) {
    flag = 0;

    for (let index = 0; index <= genres.length; index++) {
      if (genres[index] == book.genre) {
        flag = 1;
      }
    }

    if (flag == 0) {
      genres.push(book.genre);
    }
  }
  return genres;
}

async function arrayOfAuthor() {
  let author = [];
  let flag = 0;
  const books = await Book.find();

  for (const book of books) {
    flag = 0;

    for (let index = 0; index <= author.length; index++) {
      if (author[index] == book.author) {
        flag = 1;
      }
    }

    if (flag == 0) {
      author.push(book.author);
    }
  }
  return author;
}

module.exports = {
  arrayOfGenre,
  arrayOfAuthor,
};
