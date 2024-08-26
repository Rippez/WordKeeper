# Word Keeper

<div align="center">
	<img src="https://res.cloudinary.com/dg4bxglze/image/upload/v1715843875/logo.png" style="height: 150px; width: 150px;" />
</div>

<div align="center">
	A MERN-based library management system to efficiently organize and manage your library collections.
</div>

## Features
- User authentication and authorization system
- Dashboard for members to view their borrowed books and account information
- Profile pages for users to edit their personal information
- Add, edit, and delete books
- Search functionality to find books quickly
- Manage book loans and returns
- Email notifications for overdue books
- Password resetting functionality
- Dashboard for admin to view overall library statistics

## Future Features
- Advanced Book Recommendation System
- Advanced Online Book Reading
- Online Books reading progress saving
- Payments Plans for online books reading
- Clubs for similar interested Users to discuss


## Technologies Used
- **MongoDB**: For Database
- **Node.js**: For server-side JavaScript runtime
- **Express.js**: For building web applications and APIs
- **bcrypt**: For password hashing
- **Express Sessions**: For session management
- **EJS (Embedded JavaScript)**: For templating
- **Bootstrap**: For front-end design
- **HTML**: For web page structure
- **CSS**: For styling
- **JavaScript**: For client-side interactivity

## Installation
1. Clone the repository: `git clone https://github.com/jenil-desai/word-keeper.git`
2. Navigate to the project directory: `cd word-keeper`
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

## Usage
- Register an account or use the default admin account (username: admin, password: admin123) to access admin functionalities.
- Add books to the library, manage transactions, and customize user preferences.
- Recover passwords using the OTP system by providing the OTP sent to your registered email.
- Enjoy a seamless library management experience with enhanced security features.

## Version History
Please refer to our [Notion page](https://jenil-desai.notion.site/Version-Releases-Wanderlust-c373e18729c844dcae64495edb58f865?pvs=4) for the detailed version history.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries or feedback, please contact [Jenil Desai](mailto:jenildev91@gmail.com).
