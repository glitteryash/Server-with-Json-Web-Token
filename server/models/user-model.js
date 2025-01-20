import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.methods.comparePassword = async function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(bnull, isMAtch);
  });
};

module.exports = mongoose.model("User", userSchema);
