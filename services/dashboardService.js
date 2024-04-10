// services/dashboardService.js
const Member = require("../models/Member");
const Book = require("../models/Book");
const Transaction = require("../models/Transaction");

async function getTotalMembersCount() {
  return Member.countDocuments();
}

async function getNewMembersCountToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Member.countDocuments({ createdAt: { $gte: today } });
}

async function getTotalBookCount() {
  return Book.countDocuments();
}

async function getTotalBookCountToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Book.countDocuments({ createdAt: { $gte: today } });
}

async function getTotalTranscationCount() {
  return Transaction.countDocuments();
}

async function getTotalBookTranscationToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Transaction.countDocuments({ transactionDate: { $gte: today } });
}

async function getTotalMembersPerMonth() {
  try {
    const members = await Member.find();

    const totalMembersArray = new Array(12).fill(0);

    members.forEach((member) => {
      const month = member.createdAt.getMonth();
      totalMembersArray[month]++;
    });

    return totalMembersArray;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getTotalBooksPerMonth() {
  try {
    const books = await Book.find();

    const totalBooksArray = new Array(12).fill(0);

    books.forEach((book) => {
      const month = book.createdAt.getMonth();
      totalBooksArray[month]++;
    });

    return totalBooksArray;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getTotalTranscationPerMonth() {
  try {
    const Transactions = await Transaction.find();

    const totalTrasactionsArray = new Array(12).fill(0);

    Transactions.forEach((transaction) => {
      const month = transaction.transactionDate.getMonth();
      totalTrasactionsArray[month]++;
    });

    return totalTrasactionsArray;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getTotalMembersPerMonthForMember(username) {
  try {
    const Transactions = await Transaction.find({memberUsername: username});

    const totalTrasactionsArray = new Array(12).fill(0);

    Transactions.forEach((transaction) => {
      const month = transaction.transactionDate.getMonth();
      totalTrasactionsArray[month]++;
    });

    return totalTrasactionsArray;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getTotalBookTranscationTodayForMember(username) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Transaction.countDocuments({$and: [{ transactionDate: { $gte: today } },{memberUsername: username}]});
}

async function getTotalTranscationCountForMember(username) {
  return Transaction.countDocuments({memberUsername: username});
}

module.exports = {
  getTotalMembersCount,
  getNewMembersCountToday,
  getTotalBookCount,
  getTotalBookCountToday,
  getTotalTranscationCount,
  getTotalBookTranscationToday,
  getTotalMembersPerMonth,
  getTotalBooksPerMonth,
  getTotalTranscationPerMonth,
  getTotalMembersPerMonthForMember,
  getTotalBookTranscationTodayForMember,
  getTotalTranscationCountForMember,
};
