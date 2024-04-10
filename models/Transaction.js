const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  memberUsername: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["Borrow", "Return"],
    default: "Borrow",
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
    default: null,
  },
  transcationId:{
    type: String,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
