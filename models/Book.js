const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    unique: true,
    required: true,
  },
  genre: {
    type: String,
  },
  publicationYear: {
    type: Date,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  availableQuantity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    default: "",
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;