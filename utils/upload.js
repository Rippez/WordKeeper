const multer = require("multer");
const path = require("path");

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // Uploads will be stored in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    // Rename uploaded file with timestamp + original file extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Initialize Multer with storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
