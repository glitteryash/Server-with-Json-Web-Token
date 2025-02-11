const router = require("express").Router();
const courseValidation = require("../validation").courseValidation;
const Course = require("../models").courseModel;

router.use((req, res, next) => {
  console.log("A request is coming in to /course");
  next();
});

router.post("/", async (req, res) => {
  const { error } = courseValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  if (req.user.isStudent) {
    return res.status(401).send("You are not authorized to create a course.");
  }
  const { title, description, price } = req.body;
  let newCourse = new Course({
    title,
    description,
    price,
    instructor: req.user._id,
  });
  try {
    await newCourse.save();
    res.status(200).send({
      msg: "Course has been saved successfully",
      data: newCourse,
    });
  } catch (err) {
    res
      .status(400)
      .send({ msg: "Course could not be saved", error: err.message });
  }
});

module.exports = router;
