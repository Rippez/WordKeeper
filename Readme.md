# 📚 WordKeeper - MERN Library Management System

**WordKeeper** is a **MERN-based library management system** that helps efficiently organize and manage your library collections. With user authentication, book search, loan management, and admin controls, it simplifies the entire library experience.

---

## 📑 Table of Contents

1. [Overview](#-overview)
2. [Technologies](#-technologies)
3. [Packages & Libraries Used](#-packages--libraries-used)
4. [Getting Started](#-getting-started)
5. [Setup](#-setup)
6. [Features](#-features)
7. [Demo & Screenshots](#-demo--screenshots)
8. [Acknowledgments](#-acknowledgments)
9. [License](#-license)

---

## 🌟 Overview

WordKeeper is a **library management system** built with the **MERN stack** to provide a seamless experience for managing books, members, and borrowing records. It offers both **user and admin dashboards** with essential features like **book search, loan tracking, authentication, and notifications**.

---

## 💻 Technologies

| Technology     | Description               |
| -------------- | ------------------------- |
| **HTML**       | Frontend structure        |
| **CSS**        | Styling and UI design     |
| **JavaScript** | Dynamic interactions      |
| **EJS**        | Server-side rendering     |
| **Node.js**    | Backend logic             |
| **MongoDB**    | Database management       |
| **Express.js** | Web framework for Node.js |

---

## 📦 Packages / Libraries Used

| Package / Library | Purpose                       |
| ----------------- | ----------------------------- |
| **Express.js**    | Backend framework             |
| **Axios**         | HTTP requests                 |
| **bcrypt**        | Password hashing              |
| **body-parser**   | Handling form data            |
| **Cloudinary**    | Image storage                 |
| **dotenv**        | Manage environment variables  |
| **exceljs**       | Exporting reports in Excel    |
| **fs**            | File system operations        |
| **Mongoose**      | MongoDB ODM                   |
| **Multer**        | File uploads                  |
| **Nodemailer**    | Sending email notifications   |
| **OTP Generator** | Generating one-time passwords |
| **Request**       | HTTP client                   |
| **UUID**          | Unique ID generation          |
| **Bootstrap**     | UI framework                  |

---

## 🚀 Getting Started

1. Clone the repository: `git clone https://github.com/jenil-desai/Wordkeeper.git`
2. Navigate to the project directory: `cd Wordkeeper`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - `PORT=8080`
   - `SECRET=For Hashing`
   - `DATABASE_URL=MongoDB URL`
   - `MAIL_USER=mail_ID to send emails`
   - `MAIL_PASS=mail_password to send emails`
   - `CLOUD_NAME=cloudinary cloud name to store images`
   - `API_KEY=cloudinary api_key`
   - `API_SECRET=cloudinary api_secret`
   - `X_API_KEY=ninjaAPI api key`
5. Create an admin account: `node ./utils/createAdminUser.js`
6. Start the server: `node index.js`

---

## ⚙️ Setup

- Register an account or use the default admin account (username: admin, password: admin123) to access admin functionalities.
- Add books to the library, manage transactions, and customize user preferences.
- Recover passwords using the OTP system by providing the OTP sent to your registered email.
- Enjoy a seamless library management experience with enhanced security features.

---

## 🎯 Features

✔️ **User authentication and authorization system**  
✔️ **Dashboard for members** to view their borrowed books and account details  
✔️ **Profile management** - users can update their information  
✔️ **Book management** - add, edit, and delete books  
✔️ **Advanced book search functionality**  
✔️ **Loan and return tracking system**  
✔️ **Email notifications for overdue books**  
✔️ **Password reset functionality**  
✔️ **Admin dashboard with library statistics**

---

## 🔗 Demo & Screenshots

- Demo and screenshots will be added by the project owner.

---

## 🙏 Acknowledgments

1. [EJS Docs](https://ejs.co/)
2. [MongoDB Docs](https://www.mongodb.com/docs/)
3. [Node.js Docs](https://nodejs.org/en/docs/)
4. [Express.js Docs](https://expressjs.com/)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

---

### 📚 **Simplify library management with WordKeeper!**
