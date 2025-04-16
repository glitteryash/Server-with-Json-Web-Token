const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  students: {
    type: [String],
    default: [],
  },
  courseImage: {
    type: String,
    default:
      "https://res.cloudinary.com/dt5ybgxgz/image/upload/v1744774225/image-1_2x_ejjbqe.jpg",
  },
});

module.exports = mongoose.model("Course", courseSchema);
