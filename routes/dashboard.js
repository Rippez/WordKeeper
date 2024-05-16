const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

const Member = require("../models/Member");
const Book = require("../models/Book");
const Transaction = require("../models/Transaction");

const getRandomQuote = require("../services/quoteService");
const getRandomRiddle = require("../services/riddleService");
const dashboardService = require("../services/dashboardService");
const transcationService = require("../services/transcationService");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const checkAuthentication = (req, res, next) => {
  if (req.session && req.session.memberId && req.session.role == "admin") {
    next();
  } else {
    res.redirect("/login");
  }
};

const checkMemberAuthentication = (req, res, next) => {
  if (req.session && req.session.memberId && req.session.role == "member") {
    next();
  } else {
    res.redirect("/login");
  }
};

const genres = {
  Fiction: {
    generalFiction: "General Fiction",
    historicalFiction: "Historical Fiction",
    scienceFiction: "Science Fiction",
    fantasy: "Fantasy",
    mysteryThriller: "Mystery/Thriller",
    horror: "Horror",
    romance: "Romance",
    adventure: "Adventure",
  },
  "Non-Fiction": {
    biographyAutobiography: "Biography/Autobiography",
    memoir: "Memoir",
    trueCrime: "True Crime",
    selfHelp: "Self-Help",
    psychology: "Psychology",
    philosophy: "Philosophy",
    history: "History",
    science: "Science",
    technology: "Technology",
  },
  "Children's": {
    pictureBooks: "Picture Books",
    middleGrade: "Middle-Grade",
    youngAdult: "Young Adult (YA)",
    childrensFantasy: "Children's Fantasy",
    childrensMystery: "Children's Mystery",
    childrensScienceFiction: "Children's Science Fiction",
  },
  Poetry: {
    traditionalPoetry: "Traditional Poetry",
    modernPoetry: "Modern Poetry",
    epicPoetry: "Epic Poetry",
    haiku: "Haiku",
    sonnets: "Sonnets",
  },
  "Mystery/Thriller": {
    crimeFiction: "Crime Fiction",
    detectiveFiction: "Detective Fiction",
    psychologicalThriller: "Psychological Thriller",
    legalThriller: "Legal Thriller",
    spyThriller: "Spy Thriller",
  },
  "Science Fiction (Sci-Fi)": {
    spaceOpera: "Space Opera",
    cyberpunk: "Cyberpunk",
    hardScienceFiction: "Hard Science Fiction",
    softScienceFiction: "Soft Science Fiction",
    dystopianFiction: "Dystopian Fiction",
  },
  Fantasy: {
    highFantasy: "High Fantasy",
    lowFantasy: "Low Fantasy",
    urbanFantasy: "Urban Fantasy",
    magicalRealism: "Magical Realism",
    paranormalFantasy: "Paranormal Fantasy",
  },
  Romance: {
    contemporaryRomance: "Contemporary Romance",
    historicalRomance: "Historical Romance",
    regencyRomance: "Regency Romance",
    paranormalRomance: "Paranormal Romance",
  },
  Horror: {
    supernaturalHorror: "Supernatural Horror",
    psychologicalHorror: "Psychological Horror",
    gothicHorror: "Gothic Horror",
    zombieFiction: "Zombie Fiction",
    vampireFiction: "Vampire Fiction",
  },
  "Historical Fiction": {
    ancientHistory: "Ancient History",
    medievalHistoricalFiction: "Medieval Historical Fiction",
    renaissanceHistoricalFiction: "Renaissance Historical Fiction",
    worldWarIAndII: "World War I and II Fiction",
  },
  "Biography/Autobiography": {
    celebrityBiographies: "Celebrity Biographies",
    politicalBiographies: "Political Biographies",
    literaryBiographies: "Literary Biographies",
    memoirs: "Memoirs",
  },
  "Self-Help": {
    personalDevelopment: "Personal Development",
    motivational: "Motivational",
    successStories: "Success Stories",
    mindfulness: "Mindfulness",
  },
  "Science and Nature": {
    physics: "Physics",
    chemistry: "Chemistry",
    biology: "Biology",
    astronomy: "Astronomy",
    earthSciences: "Earth Sciences",
  },
  "Business and Finance": {
    leadership: "Leadership",
    entrepreneurship: "Entrepreneurship",
    personalFinance: "Personal Finance",
    economics: "Economics",
  },
  Travel: {
    travelGuides: "Travel Guides",
    adventureTravel: "Adventure Travel",
    travelMemoirs: "Travel Memoirs",
  },
  "Cookbooks and Food": {
    cuisineSpecificCookbooks: "Cuisine-specific Cookbooks",
    baking: "Baking",
    healthyEating: "Healthy Eating",
    foodMemoirs: "Food Memoirs",
  },
  "Graphic Novels and Comics": {
    superheroComics: "Superhero Comics",
    graphicMemoirs: "Graphic Memoirs",
    manga: "Manga",
    webcomics: "Webcomics",
  },
  "Religion and Spirituality": {
    christianity: "Christianity",
    islam: "Islam",
    buddhism: "Buddhism",
    hinduism: "Hinduism",
    newAge: "New Age",
  },
  Humor: {
    satire: "Satire",
    comedy: "Comedy",
    funnyEssays: "Funny Essays",
  },
  "Essays and Short Stories": {
    literaryEssays: "Literary Essays",
    shortStoryCollections: "Short Story Collections",
  },
};

router.get("/", checkAuthentication, async (req, res) => {
  try {
    const username = req.query.username;

    const totalMembers = await dashboardService.getTotalMembersCount();
    const newMembersToday = await dashboardService.getNewMembersCountToday();
    const totalBooks = await dashboardService.getTotalBookCount();
    const newBooksToday = await dashboardService.getTotalBookCountToday();
    const totalTransactions = await dashboardService.getTotalTranscationCount();
    const newTransactionsToday = await dashboardService.getTotalBookTranscationToday();
    const totalMembersMonth = await dashboardService.getTotalMembersPerMonth();
    const totalBooksMonth = await dashboardService.getTotalBooksPerMonth();
    const totalTransactionsMonth = await dashboardService.getTotalTranscationPerMonth();

    const randomQuote = await getRandomQuote();
    const randomRiddle = await getRandomRiddle();

    res.render("dashboard_admin.ejs", { username, totalMembers, totalBooks, totalTransactions, newBooksToday, newMembersToday, newTransactionsToday, randomQuote, randomRiddle, totalMembersMonth, totalBooksMonth, totalTransactionsMonth });
  } catch (error) {
    console.error(error);
    res.send("Internal Server Error");
  }
});

router.get("/user", checkMemberAuthentication, async (req, res) => {
  try {
    const username = req.session.username;

    const totalTransactionsMonth = await dashboardService.getTotalTranscationPerMonth();
    const totalTransactionsMonthForMember = await dashboardService.getTotalMembersPerMonthForMember(username);
    const newTransactionsTodayForMember = await dashboardService.getTotalBookTranscationTodayForMember(username);
    const totalTransactionsForMember = await dashboardService.getTotalTranscationCountForMember(username);

    const randomQuote = await getRandomQuote();
    const randomRiddle = await getRandomRiddle();

    res.render("dashboard_member.ejs", { username, totalTransactionsMonthForMember, totalTransactionsMonth, newTransactionsTodayForMember, totalTransactionsForMember, randomQuote, randomRiddle });
  } catch (error) {
    console.error(error);
    res.send("Internal Server Error");
  }
});

router.get("/my-transcations", checkMemberAuthentication, async (req, res) => {
  try {
    const username = req.session.username;
    const filters = {};
    const { transcationId, transactionType, bookName } = req.query;
    const booksTitle = await transcationService.arrayOfBooksTitleOfMember(username);

    if (transcationId) {
      filters.transcationId = transcationId;
    }

    if (transactionType) {
      filters.transactionType = transactionType;
    }

    if (bookName) {
      filters.bookName = bookName;
    }

    filters.memberUsername = username;

    const transcations = await Transaction.find(filters);

    res.render("dashboard_member_transcations.ejs", { transcations, filters, booksTitle });
  } catch (error) {
    console.error(error);
    res.send("Internal Server Error");
  }
});

router.get("/books", checkAuthentication, async (req, res) => {
  try {
    let filters = {};
    const { title, author, ISBN, genre } = req.query;

    if (title) {
      filters.title = title;
    }

    if (author) {
      filters.author = author;
    }

    if (ISBN) {
      filters.ISBN = ISBN;
    }

    if (genre) {
      filters.genre = genre;
    }

    const books = await Book.find(filters);

    res.render("dashboard_admin_books.ejs", { books, filters, genres });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/members", checkAuthentication, async (req, res) => {
  try {
    let filters = {};
    const { username, name, role, mail, mobileNumber } = req.query;

    if (username) {
      filters.username = username;
    }

    if (name) {
      filters.name = name;
    }

    if (role) {
      filters.role = role;
    }

    if (mail) {
      filters.mail = mail;
    }

    if (mobileNumber) {
      filters.mobileNumber = mobileNumber;
    }

    const members = await Member.find(filters);

    res.render("dashboard_admin_members.ejs", { members, filters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/transcation", checkAuthentication, async (req, res) => {
  try {
    const members = await Member.find();
    const books = await Book.find();

    let filters = {};
    const { transcationId, memberUsername, transactionType, bookName } = req.query;

    if (transcationId) {
      filters.transcationId = transcationId;
    }

    if (memberUsername) {
      filters.memberUsername = memberUsername;
    }

    if (transactionType) {
      filters.transactionType = transactionType;
    }

    if (bookName) {
      filters.bookName = bookName;
    }

    const transcations = await Transaction.find(filters);

    res.render("dashboard_admin_Btranscation.ejs", { members, books, transcations, filters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/return-transcation", checkAuthentication, async (req, res) => {
  try {
    let filters = {};
    const { memberUsername } = req.query;

    if (memberUsername) {
      filters.memberUsername = memberUsername;
    }

    filters.transactionType = "Borrow";

    const transcations = await Transaction.find(filters);

    res.render("dashboard_admin_Rtranscation.ejs", { transcations, filters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/signout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      res.redirect("/");
    }
  });
});

router.get("/profile", async (req, res) => {
  try {
    const username = req.session.username;
    const userDetails = await Member.findOne({ username: username });

    if (req.session.role === "admin") {
      res.render("dashboard_admin_profile.ejs", { userDetails });
    } else {
      res.render("dashboard_member_profile.ejs", { userDetails });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
