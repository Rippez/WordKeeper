const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");

const Member = require("../models/Member");
const Transcation = require("../models/Transaction");
const OTP = require("../models/Otp");

const upload = require("../utils/upload");

const sendMail = require("../services/mailService");

// Handle POST requests to create a new member
router.post("/signup", async (req, res) => {
  try {
    const { username, name, mail, password, mobileNumber } = req.body;

    const memebers = await Member.find();

    for (const member of memebers) {
      if (member.username == username) {
        return res.render("signup.ejs", { error: "Username Already Exists" });
      }

      if (member.mail == mail) {
        return res.render("signup.ejs", { error: "Email Already In Use" });
      }
    }

    const newMember = new Member({ username, name, mail, password, mobileNumber });
    await newMember.save();

    const subject = "Welcome to Word Keeper - Your Account Details";
    const text = `Dear ${name},

    Welcome to Word Keeper! We are excited to have you join our community of book enthusiasts. Your account has been successfully created, and here are the details:
    
    Username: ${username}
    Email: ${mail}
    Name: ${name}
    Mobile Number: ${mobileNumber}
    Role: Member
    You can now start exploring our vast collection of books, manage your preferences, and stay updated on new releases and book clubs. If you have any questions or need assistance, feel free to reach out to us.
    
    Happy reading!
    
    Best regards,
    Word Keeper`;

    const recipient = `${mail}`;
    await sendMail(subject, text, recipient);

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/new", async (req, res) => {
  try {
    const { username, password, name, mail, role, mobileNumber } = req.body;
    const newMember = new Member({ username, password, name, mail, role, mobileNumber });
    await newMember.save();

    const subject = "Welcome to Word Keeper - Your Account Details";
    const text = `Dear ${name},

    Welcome to Word Keeper! We are excited to have you join our community of book enthusiasts. Your account has been successfully created, and here are the details:
    
    Username: ${username}
    Email: ${mail}
    Name: ${name}
    Mobile Number: ${mobileNumber}
    Role: ${role}
    You can now start exploring our vast collection of books, manage your preferences, and stay updated on new releases and book clubs. If you have any questions or need assistance, feel free to reach out to us.
    
    Happy reading!
    
    Best regards,
    Word Keeper`;

    const recipient = `${mail}`;
    await sendMail(subject, text, recipient);

    res.redirect("/dashboard/members");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the member by username
    const member = await Member.findOne({ username });

    // Check if the member exists and the provided password is correct
    if (member && (await member.comparePassword(password))) {
      req.session.memberId = member._id;
      req.session.username = member.username;
      req.session.role = member.role;

      if (member.role === "admin") {
        return res.redirect(`/dashboard?username=${username}`);
      } else {
        return res.redirect(`/dashboard/user?username=${username}`);
      }
    } else {
      return res.render("login.ejs", { error: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Member.findByIdAndDelete(id);
    res.redirect("/dashboard/members");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const foundBook = await Member.findById(id);
    res.json(foundBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/", upload.single("profilePicture"), async (req, res) => {
  try {
    const referer = req.headers.referer;
    const { username, name, mail, id, mobileNumber, role } = req.body;

    const updatedFields = {
      username,
      name,
      mail,
      mobileNumber,
      role,
    };
    const queryCondition = { _id: id };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedFields.profilePicture = result.secure_url;
    }

    if (referer == "http://localhost:8080/dashboard/Members") {
      const memberDetails = await Member.findById(id);
      if (memberDetails.username != username) {
        await Transcation.updateMany({ memberUsername: memberDetails.username }, { $set: { memberUsername: username } });
      }
    } else {
      if (username != req.session.username) {
        await Transcation.updateMany({ memberUsername: req.session.username }, { $set: { memberUsername: username } });
        req.session.username = username;
      }
    }

    const result = await Member.findByIdAndUpdate(queryCondition, updatedFields, { new: true, runValidators: true });

    if (result.preferences.detailsChangedNotification === true) {
      const subject = "Profile Details Updated Successfully";
      const text = `Dear ${result.name},

      This is to inform you that your profile details have been successfully updated on our platform. Your account information has been modified as per your request. Below are the updated details:
      
      Username: ${result.username}
      Full Name: ${result.name}
      Email Address: ${result.mail}
      Mobile Number: ${result.mobileNumber}

      If you did not make these changes or if you have any concerns regarding your account, please contact our support team immediately.
      
      Thank you for using our service.
      
      Best regards,
      Word Keeper
      `;
      const recipient = `${result.mail}`;
      await sendMail(subject, text, recipient);
    }

    if (referer == "http://localhost:8080/dashboard/Members") {
      res.redirect("/dashboard/members");
    } else {
      res.redirect("/dashboard/profile");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/preferences", async (req, res) => {
  try {
    const { bookIssueNotifications, bookReturnNotifications, newBookLaunches, newsletterSubscriptions, passwordChangedNotification, detailsChangedNotification } = req.body;
    const memberId = req.session.memberId;
    const member = await Member.findById(memberId);

    member.preferences = {
      bookIssueNotifications: bookIssueNotifications === "on",
      bookReturnNotifications: bookReturnNotifications === "on",
      newBookLaunches: newBookLaunches === "on",
      newsletterSubscriptions: newsletterSubscriptions === "on",
      passwordChangedNotification: passwordChangedNotification === "on",
      detailsChangedNotification: detailsChangedNotification === "on",
    };

    await member.save();

    res.redirect(`/dashboard/profile`);
  } catch (error) {
    console.error(error);
    res.send({ error: "Internal Server Error" });
  }
});

router.get("/recover-password", async (req, res) => {
  try {
    res.render("recover_password.ejs");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

router.post("/recover-password", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    await OTP.create({ email, otp });

    const subject = "OTP for Password Reset";
    const text = `Your OTP for resetting the password is: ${otp}. This OTP is valid for 10 minutes.`;
    const recipient = `${email}`;
    await sendMail(subject, text, recipient);

    res.render("otp.ejs", { error: "" });
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

router.post("/check-otp", async (req, res) => {
  try {
    const { num1, num2, num3, num4, num5, num6 } = req.body;
    let otp = num1 + num2 + num3 + num4 + num5 + num6;

    const storedOTP = await OTP.findOne({ otp });

    if (storedOTP.otp == otp) {
      email = storedOTP.email;
      res.render("reset_password.ejs", { email });
      await OTP.findOneAndDelete({ otp });
    } else {
      res.render("otp.ejs", { error: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await Member.updateOne({ mail: email }, { $set: { password: hashedPassword } });

    const member = await Member.findOne({ mail: email });
    if (member.preferences.passwordChangedNotification === true) {
      const subject = "Password Changed Successfully";
      const text = `Dear ${member.name},
      
      We wanted to inform you that your password has been successfully changed for your account on our platform. Your account is now secured with the new password.
      
      If you did not initiate this password change, please contact us immediately for further assistance. It's important to keep your account secure at all times.
      
      Thank you for choosing us.
      
      Best regards,
      Word Keeper`;
      const recipient = `${member.mail}`;
      await sendMail(subject, text, recipient);
    }

    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

router.post("/change-password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const memberId = req.session.memberId;
    const member = await Member.findById(memberId);

    if (await member.comparePassword(currentPassword)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await Member.updateOne({ username: member.username }, { $set: { password: hashedPassword } });

      if (member.preferences.passwordChangedNotification === true) {
        const subject = "Password Changed Successfully";
        const text = `Dear ${member.name},
        
        We wanted to inform you that your password has been successfully changed for your account on our platform. Your account is now secured with the new password.
        
        If you did not initiate this password change, please contact us immediately for further assistance. It's important to keep your account secure at all times.
        
        Thank you for choosing us.
        
        Best regards,
        Word Keeper`;
        const recipient = `${member.mail}`;
        await sendMail(subject, text, recipient);
      }
    }

    res.redirect("/dashboard/profile");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

module.exports = router;
