const Transaction = require("../models/Transaction");

async function arrayOfBooksTitleOfMember(username) {
  let booksTitle = [];
  let flag = 0;
  const transcations = await Transaction.find({ memberUsername: username });

  for (const transcation of transcations) {
    flag = 0;
    for (let index = 0; index <= booksTitle.length; index++) {
      if (booksTitle[index] == transcation.bookName) {
        flag = 1;
      }
    }

    if (flag == 0) {
      booksTitle.push(transcation.bookName);
    }
  }
  return booksTitle;
}

module.exports = {
  arrayOfBooksTitleOfMember,
};
