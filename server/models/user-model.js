const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    unique: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  role: {
    type: String,
    enum: ["student", "instructor"],
    required: true,
  },
  profileImage: {
    type: String,
    default:
      "https://res.cloudinary.com/dt5ybgxgz/image/upload/v1744614681/23630343_1_iyuagg.png",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.isStudent = function () {
  return this.role === "student";
};

userSchema.methods.isInstructor = function () {
  return this.role === "instructor";
};

userSchema.methods.isAdmin = function () {
  return this.role === "admin";
};
//mongoose schema middleware
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
    }
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
