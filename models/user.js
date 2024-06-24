const mongoose = require("mongoose");
const { randomBytes } = require("crypto");
const { getHash } = require("../services/hash");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    profile_pic_url: {
      type: String,
      default: "/images/defaults/profile-pic/profile-pic.png",
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = randomBytes(16).toString();
  const hashedPassword = getHash(salt, user.password);
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static("matchPassword", async function (email, password) {
  try {
    const user = await this.findOne({ email: email });
    if (!user) {
      return false;
    }
    const salt = user.salt;
    const storedPasswordHash = user.password;
    const recievedPasswordHash = getHash(salt, password);
    if (storedPasswordHash != recievedPasswordHash) {
      return false;
    }
    user.password = null;
    user.salt = null;
    return user;
  } catch (error) {
    return error;
  }
});

const USER = mongoose.model("user", userSchema);

module.exports = {
  USER,
};
