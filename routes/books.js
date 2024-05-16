const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const multer = require("multer");
const exceljs = require("exceljs");
const path = require("path");
const fs = require("fs");

const bookService = require("../services/bookService");

// Multer setup for file upload
const upload = multer({ dest: "uploads/" });

router.post("/new", async (req, res) => {
  try {
    const { title, author, ISBN, genre, publicationYear, quantity, availableQuantity, imageUrl } = req.body;
    const newBook = new Book({ title, author, ISBN, genre, publicationYear, quantity, availableQuantity, imageUrl });
    await newBook.save();

    res.redirect("/dashboard/books");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Book.findByIdAndDelete(id);

    res.redirect("/dashboard/books");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const foundBook = await Book.findById(id);
    res.json(foundBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/", async (req, res) => {
  try {
    const { title, author, ISBN, publicationYear, quantity, availableQuantity, imageUrl, id, genre } = req.body;
    const updatedFields = {
      title,
      author,
      ISBN,
      publicationYear,
      quantity,
      availableQuantity,
      imageUrl,
      genre,
    };
    const queryCondition = { _id: id };

    await Book.findByIdAndUpdate(queryCondition, updatedFields, { new: true, runValidators: true });
    res.redirect("/dashboard/books");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  const genres = await bookService.arrayOfGenre();
  const authors = await bookService.arrayOfAuthor();

  let filters = {};
  const { genre, author } = req.query;

  if (genre) {
    filters.genre = genre;
  }
  if (author) {
    filters.author = author;
  }

  const books = await Book.find(filters);

  res.render("books.ejs", { books, genres, authors,filters });
});

router.post("/upload", upload.single("excelFile"), async (req, res) => {
  try {
    // Load the uploaded Excel file
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const worksheet = workbook.getWorksheet(1);

    const books = [];

    // Iterate through each row in the Excel file
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        // Skip header row
        const book = {
          title: row.getCell(1).value,
          author: row.getCell(2).value,
          genre: row.getCell(3).value,
          ISBN: row.getCell(4).value,
          publicationYear: row.getCell(5).value ? new Date(row.getCell(5).value) : null,
          quantity: row.getCell(6).value ? parseInt(row.getCell(6).value) : 0,
          availableQuantity: row.getCell(7).value ? parseInt(row.getCell(7).value) : 0,
          imageUrl: row.getCell(8).value,
        };
        books.push(book);
      }
    });

    await Book.insertMany(books);

    fs.unlinkSync(req.file.path);

    res.redirect("/dashboard/books");
  } catch (error) {
    console.error(error);
    res.send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookDetail = await Book.findById(id);

    res.render("book_Details.ejs", { bookDetail });
  } catch (error) {
    console.error(error);
    res.send("Internal Server Error");
  }
});

module.exports = router;
