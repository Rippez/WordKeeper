const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmailNotification(subject, text, recipient) {
  const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
      user: process.env.mailUser, // Your email address
      pass: process.env.mailPass, // Your email password
    },
  });

  // Email message options
  const mailOptions = {
    from: '"Word Keeper" <jenildev91@gmail.com>',
    to: recipient,
    subject: subject,
    text: text,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email notification sent successfully");
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
}

module.exports = sendEmailNotification;
