const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const Transaction = require("../models/Transaction");
const Book = require("../models/Book");
const { v4: uuidv4 } = require("uuid");

const sendMail = require("../services/mailService");

router.post("/new", async (req, res) => {
  try {
    const { memberUsername, bookName, dueDate } = req.body;
    const transcationId = uuidv4();

    const CheckBookQty = await Book.findOne({ title: bookName });

    if (CheckBookQty.availableQuantity == 0) {
      res.json("Books");
    }

    const updateBook = await Book.findOneAndUpdate({ title: bookName }, { $inc: { availableQuantity: -1 } }, { new: true });

    const newTranscation = new Transaction({ memberUsername, bookName, dueDate, transcationId });
    await newTranscation.save();

    const member = await Member.find({ username: memberUsername });
    const transactionDetails = await Transaction.find({ transcationId: transcationId });

    if (member[0].preferences.bookIssueNotifications === true) {
      const subject = "Your Book Has Been Issued Successfully";
      const text = `
      Dear ${member[0].name},
      
      This email is to inform you that your requested book has been issued successfully. You can now enjoy reading it at your leisure. Below is issued details :

      Transaction ID: ${transactionDetails[0].transcationId}
      Book Name: ${transactionDetails[0].bookName}
      Issue Date: ${transactionDetails[0].transactionDate.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
      Due Date: ${transactionDetails[0].dueDate.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
      
      Thank you for using our library services.
      
      Best regards,
      Word Keeper
      `;
      const recipient = `${member[0].mail}`; // Member's email address
      await sendMail(subject, text, recipient);
    }

    res.redirect("/dashboard/transcation");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTranscation = await Transaction.findByIdAndDelete(id);

    const updateBook = await Book.findOneAndUpdate({ title: deleteTranscation.bookName }, { $inc: { availableQuantity: 1 } }, { new: true });

    res.redirect("/dashboard/transcation");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id/find", async (req, res) => {
  try {
    const { id } = req.params;
    const searchTranscation = await Transaction.find({ transcationId: id });

    if (!searchTranscation[0]) {
      res.json("Invalid Transcation ID");
    } else {
      if (searchTranscation[0].transactionType == "Return") {
        res.json("Transcation Already Closed");
      } else {
        res.json(searchTranscation);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/close", async (req, res) => {
  try {
    const { returnDate, transcationId, transactionType, bookName, memberUsername } = req.body;
    const updatedFields = {
      returnDate,
      transactionType,
    };
    const queryCondition = { transcationId: transcationId };

    const updateBook = await Book.findOneAndUpdate({ title: bookName }, { $inc: { availableQuantity: 1 } }, { new: true });

    const updatedTransaction = await Transaction.findOneAndUpdate(queryCondition, updatedFields, { new: true, runValidators: true });

    const member = await Member.find({ username: memberUsername });
    const transactionDetails = await Transaction.find({ transcationId: transcationId });

    if (member[0].preferences.bookReturnNotifications === true) {
      const subject = "Book Return Confirmation";
      const text = `
      Dear ${member[0].name},

      We are pleased to confirm that your book has been returned to our library. We hope you found it enjoyable and informative. Below are transcation details : 

      Transaction ID: ${transactionDetails[0].transcationId}
      Book Name: ${transactionDetails[0].bookName}
      Issue Date: ${transactionDetails[0].transactionDate.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
      Due Date: ${transactionDetails[0].dueDate.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}

      Thank you for returning the book on time.

      Best regards,
      Word Keeper
      `;
      const recipient = `${member[0].mail}`; // Member's email address
      await sendMail(subject, text, recipient);
    }

    res.redirect("/dashboard/return-transcation");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    const foundTranscation = await Transaction.find({ transcationId: id });
    res.json(foundTranscation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Intetrnal Server Error" });
  }
});

router.patch("/", async (req, res) => {
  try {
    let { transcationId, memberUsername, bookName, dueDate, id } = req.body;

    const updatedFields = {
      transcationId,
      memberUsername,
      bookName,
      dueDate,
    };

    const queryCondition = {
      _id: id,
    };

    await Transaction.findByIdAndUpdate(queryCondition, updatedFields, { new: true, runValidators: true });

    res.redirect("/dashboard/transcation");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Intetrnal Server Error" });
  }
});

module.exports = router;
