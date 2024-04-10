const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Member = require("../models/Member");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 20000 })
  .then(() => {
    console.log("Connected to MongoDB");

    // Check if the admin Member already exists
    Member.findOne({ username: "admin" })
      .then((existingUser) => {
        if (existingUser) {
          console.log("Admin Member already exists");
          mongoose.connection.close(); // Close the connection
        } else {
          // Create the admin Member
          const hashedPassword = bcrypt.hash("admin123", 10); // Hash the password for security
          const adminUser = new Member({
            name: "Admin User",
            username: "admin",
            mail: "admin@example.com",
            password: `${hashedPassword}`,
            role: "admin", // Assuming you have a 'role' field in your Member schema
          });

          adminUser
            .save()
            .then(() => {
              console.log("Admin Member created successfully  | Username: admin | Password: admin123");
              mongoose.connection.close(); // Close the connection
            })
            .catch((err) => {
              console.error("Error creating admin Member:", err);
              mongoose.connection.close(); // Close the connection
            });
        }
      })
      .catch((err) => {
        console.error("Error finding admin Member:", err);
        mongoose.connection.close(); // Close the connection
      });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
