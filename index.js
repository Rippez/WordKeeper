const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const port = process.env.port || 8080;

const memberRoutes = require("./routes/members");
const dashboardRoutes = require("./routes/dashboard");
const bookRoutes = require("./routes/books");
const transcationRoutes = require("./routes/transcation");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(
  session({
    secret: "process.env.secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/members", memberRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/books", bookRoutes);
app.use("/transcation", transcationRoutes);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 20000,
});

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.listen(port, (req, res) => {
  console.log(`Listening On Port ${port} `);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/signup", (req, res) => {
  let error;
  res.render("signup.ejs", { error });
});

app.get("/login", (req, res) => {
  if (req.session && req.session.memberId && req.session.role) {
    if (req.session.role == "admin") {
      res.redirect("/dashboard");
    } else {
      res.redirect("/dashboard/user");
    }
  } else {
    let error;
    res.render("login.ejs", { error });
  }
});

app.get("/contact-us", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact-us.html"));
});

app.get("/otp", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "chat.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});
