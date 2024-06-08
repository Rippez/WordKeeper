const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const memberSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member",
  },
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  preferences: {
    bookIssueNotifications: {
      type: Boolean,
      default: true, // Default to receiving notifications
    },
    bookReturnNotifications: {
      type: Boolean,
      default: true,
    },
    newBookLaunches: {
      type: Boolean,
      default: true,
    },
    newsletterSubscriptions: {
      type: Boolean,
      default: true,
    },
    passwordChangedNotification: {
      type: Boolean,
      default: true,
    },
    detailsChangedNotification: {
      type: Boolean,
      default: true,
    },
  },
  mobileNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: "Mobile number must be 10 digits long",
    },
  },
  profilePicture: {
    type: String,
    default: null,
  },
});

// Hash the password before saving it to the database
memberSchema.pre("save", async function (next) {
  const member = this;
  if (member.isModified("password") || member.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(member.password, 10);
      member.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

// Compare the stored hashed password with the provided password during login
memberSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
