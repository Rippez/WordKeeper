# Word Keeper - Library Management System (LMS)

Word Keeper is a Library Management System (LMS) designed to help libraries and bookstores manage their collections, users, and transactions effectively.

## Features

- User Authentication: Register, login, and manage user accounts securely.
- Book Management: Add, edit, and delete books from the library inventory.
- Transaction Management: Issue, return, and track book transactions.
- User Preferences: Customize email notifications and preferences.
- OTP System for Password Recovery: Securely recover passwords using a one-time password (OTP) sent to the user's registered email.

## Technologies Used

- Frontend: HTML, CSS, JavaScript, Bootstrap
- Backend: Node.js, Express.js, MongoDB
- Authentication: Passport.js
- Cloud Storage: Cloudinary for storing book images
- Email Services: Mailchimp for sending email notifications
- External APIs: Integration with external APIs for various functionalities

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/word-keeper.git
   ```

2. Install dependencies:
   ```
   cd word-keeper
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     PORT=3000
     DATABASE_URL=your_mongodb_url
     SESSION_SECRET=your_session_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     MAIL_USER=your_mail_username
     MAIL_PASS=your_mail_password
     X_API_KEY=your_api-ninjas_api_key
     ```
4. Create an admin account:
    ```
    node ./utils/createAdminUser.js
    ```

5. Start the server:
   ```
   node index.js
   ```

6. Open your browser and navigate to `http://localhost:8080` to access the application.

## Usage

- Register an account or use the default admin account (username: admin, password: admin123) to access admin functionalities.
- Add books to the library, manage transactions, and customize user preferences.
- Recover passwords using the OTP system by providing the OTP sent to your registered email.
- Enjoy a seamless library management experience with enhanced security features.

## Contributing

Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, please contact [jenildev91@gmail.com](mailto:jenildev91@gmail.com).